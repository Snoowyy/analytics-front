import { DialogErrorComponent } from '../components/dialog-error/dialog-error.component';
import { Injectable, ErrorHandler, NgZone, Component } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { constants } from '../shared/constants';
import { ErrorService } from '../services/errors/error.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth/state';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constantErrors = constants.httpInterceptor;

    constructor(
        public errorHandler: ErrorHandler,
        private dialogService: DialogService,
        private ngZone: NgZone,
        private errorService: ErrorService,
        private router: Router,
        private authService: AuthService
    ) { }

    public async logout() {
        this.authService.deauthenticate();
        this.router.navigateByUrl('/user?AuthState=0', {skipLocationChange : true});
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (!this.errorService.fetch) {
                        this.errorService.fetch = true;
                        const codeErrors = this.constantErrors[`${error.status}`] ? this.constantErrors[`${error.status}`] : this.constantErrors.Default;
                        this.errorService.error.code = codeErrors.StatusCode;
                        this.errorService.error.imageUrl = codeErrors.image;
                        this.errorService.error.title = codeErrors.title;
                        this.errorService.error.message = codeErrors.message;
                        this.errorService.error.redirectoUrl = codeErrors.redirecTo;
                        const actionButtons = [
                            { text: 'Aceptar', primary: true }
                        ];
                        if (codeErrors.reload) {
                            actionButtons.push({ text: 'Recargar', primary: false });
                        }
                        if (error.status === this.constantErrors[403].StatusCode) {
                            error.url.includes('user') ? this.logout() : this.dialogReference(actionButtons);
                        } else {
                            this.dialogReference(actionButtons);
                        }
                    }
                    return throwError(error);
                })
            );
    }

    dialogReference(actionButtons) {
        const dialogRef = this.dialogService.open({
            // title: '!Ops¡',
            content: DialogErrorComponent,
            actions: actionButtons,
            width: 600,
            minWidth: 300
        });
        const componentInfo = dialogRef.content.instance;
        componentInfo.image = this.errorService.error.imageUrl;
        componentInfo.title = this.errorService.error.title;
        componentInfo.description = this.errorService.error.message;
        dialogRef.result.subscribe(result => {
            if (result['text'] === constants.DialogErroroptions.reload) {
                this.errorService.fetch = false;
                location.reload();
            } else {
                this.errorService.fetch = false;
                if (!_.isEmpty(this.errorService.error.redirectoUrl)) {
                    this.router.navigateByUrl(this.errorService.error.redirectoUrl);
                }
            }
        });
    }
}

