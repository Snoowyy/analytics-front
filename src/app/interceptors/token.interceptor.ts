import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap, first } from 'rxjs/operators';
import { validUrls } from '../../environments/environment';
import { AuthQuery } from '../modules/auth/state';

/**
 * Interceptor del token de seguridad de Jwt
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthQuery) { }
    applyToken: boolean;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.applyToken = false;

        validUrls.forEach((url: string) => {
            if (this.isUrlWithToken(url)) this.applyToken = true;
        });

        if (!this.applyToken) return next.handle(request);

        return this.auth.jwtToken$.pipe(
            // Impide que posteriores emisiones de Observable jwtToken$ provoquen la reevaluación
            // de la petición http que se está interceptando. Al cerrar sesión, por ejemplo,
            // se reemite jwtToken$.
            first(),
            switchMap(it => intercept(request, next, it))
        );
    }

    private isUrlWithToken(url: string): boolean {
        return url.indexOf(url) >= 0;
    }
}


function intercept(request: HttpRequest<any>, next: HttpHandler, token: string) {

    // TODO: Decidir que debemos hacer si existen lo datos de autenticación, sin un error del API, con el
    // token de autenticaciòn vencido y el refreshtoken falla. ¿Debemos intentar o no intentar la llamada?
    // Ahora mismo se intenta de todas formas.
    if (!token) {
        return next.handle(request);
    }
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    return next.handle(request);
}
