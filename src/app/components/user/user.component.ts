import { Credential } from "./../../modules/auth/state/auth.store";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OnChanges, AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Input } from "@angular/core/src/metadata/directives";
import { tap, filter, map, shareReplay, switchMap } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';
import { notNull } from "../../shared/util";
import { Router, Params, ActivatedRoute  } from "@angular/router";
import { AuthService, AuthQuery, AuthStore } from "src/app/modules/auth/state";
import * as AppConsts from "../../shared/constants";
import { Observable, of, merge } from 'rxjs';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { isAuthenticatedAuthState, getAccessTokenJson } from 'src/app/modules/auth/state/auth.calculation';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorService } from 'src/app/services/errors/error.service';

@Component({
    selector: "cvn-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit, OnChanges, AfterViewInit {
    userForm: FormGroup;
    constants = AppConsts.constants;
    isAuthenticated$: Observable<LoginState>;
    parameters: any;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private authQuery: AuthQuery,
        private router: Router,
        private route: ActivatedRoute,
        private ngxSpinnerService: NgxSpinnerService,
        private jwtHelper: JwtHelperService,
        private errorService: ErrorService
    ) { }

    createForm() {
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (!this.userForm.valid) {
            return;
        }
        const saveable = this.prepareSave();
        this.authService.Authenticate(
            saveable.Name,
            saveable.Password
        );
    }
    
    prepareSave() {
        const value = this.userForm.value;
        return {
            Name: value.name.toLowerCase(),
            Password: value.password
        };
    }
    ngAfterViewInit() {
        this.router.onSameUrlNavigation = 'reload';
    }

    ngOnInit() {
        this.createForm();
        const loggedState = this.authQuery.select(it => it).pipe(
                combineLatest(this.route.queryParams.pipe(map(it => this.errorService.fetch))),
                filter(it => !it[1] && this.userForm.valid),
                map(
                    it => ({ isLogged: isAuthenticatedAuthState(it[0], this.jwtHelper) })
                ),
            );

        const unloggedState = this.authQuery.select(it => it).pipe(
                combineLatest(this.route.queryParams.pipe(map(it => this.errorService.fetch))),
                filter(it => it[1] && this.userForm.valid),
                map(
                    it => ({ isLogged: false })
                )
            );

        this.isAuthenticated$ = merge(loggedState, unloggedState).pipe(
            shareReplay(),
        );
        this.authQuery.isAuthenticated$.pipe(
            combineLatest(
                this.isAuthenticated$
            ),
            filter(it => it[0]),
        )
        .subscribe(() => this.ngOnChanges());
    }

    ngOnChanges() {
        this.userForm.reset();
        this.ngxSpinnerService.show();
        const queryParams = this.router.routerState.snapshot.root.queryParams;
        const redirecto = queryParams.redirecto ? queryParams.redirecto : 'select';
        this.router.navigateByUrl(redirecto);
    }

    get name() {
        return notNull(this.userForm.get('name'));
    }

    get password() {
        return notNull(this.userForm.get('password'));
    }
}

export interface LoginState {
    isLogged: boolean;
};
