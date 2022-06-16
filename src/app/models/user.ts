import { StructData, Int, Utf8, Date_, Bool, Float32, StructValue, DataType } from '../../vendoring/arrow-js/type';
import { NestedArrowValues } from '../shared/models/_shared_';
import { Enterprise, User } from '../modules/auth/state';
import { City } from '../modules/core/state/core';

// tslint:disable:interface-over-type-literal
export type UserToManyRels = {
    RatedEnterpriseUnit: Enterprise
};

export type User_ = StructValue<User>;

export type UserResponse_ = StructValue<UserResponse> & NestedArrowValues<UserToManyRels>;


export interface UserResponse extends StructData {
    id: Int<number>;
    username: Utf8;
    last_login: Date_;
    Employeer_id: Int<number>;
    IsAdministrator: Bool;
    first_name: Utf8;
    last_name: Utf8;
    email: Utf8;

}
