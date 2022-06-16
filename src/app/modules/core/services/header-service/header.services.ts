import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'node_modules/rxjs';


export interface HeaderModel {
    headerIco: string;
    headerName: string;
    headerShowIco: boolean;
}

@Injectable()
export class HeaderServices {
    private model: HeaderModel = {
        headerIco: '',
        headerName: '',
        headerShowIco: true
    };

    public loadingNumber$ = new BehaviorSubject(false);

    public getModel() {
        return this.model;
    }

    public setModel(ico: string, name: string, showIcon: boolean) {
        this.model = {
            headerIco: ico,
            headerName: name,
            headerShowIco: showIcon
        };

    }
}
