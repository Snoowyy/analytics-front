import * as t from 'src/app/shared/models/types';
import { Module, BussinessUnit, UseDefModule, UseRightModule, Group, Permission, ContentType, UseRightUser } from '../../../auth/state';
import { Date_, Bool, Int, Utf8 } from 'src/vendoring/arrow-js/type';
import { Entity, ForeignKey } from 'src/app/shared/models/_shared_';


export interface ApiResponse extends t.StructDataSet {
    modules: Module;
    bussinessUnits: BussinessUnit;
    useRightModules: UseRightModule;
    userRightUsers: UseRightUser;
    useDefModules: UseDefModule;
    groups: Group;
    permissions: Permission;
    contentTypes: ContentType;
}

export type ApiResponseData = t.TableSet<ApiResponse>;
