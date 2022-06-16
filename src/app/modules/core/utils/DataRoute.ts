import { Route } from '@angular/router';

export interface DataRoute<T = Data> extends Route {
    data?: T;
}

export type DataRoutes<T = Data> = DataRoute<T>[];

export interface Data {
    state: string;
    image: string;
    name: string;
    iconClass: string;
    permissions?: {
        only: string[]
    };
    onAdminShow?: boolean;
}
