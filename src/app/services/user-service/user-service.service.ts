import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/auth/state/user';
import { StructValue } from '../../../vendoring/arrow-js/type';
import linq from 'linq-es2015';
import { map, shareReplay, combineLatest, switchMap, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NestedArrowValues } from 'src/app/shared/models/_shared_';
import { DjangoPagedRestResponse, DjangoRestResponse } from 'src/app/modules/core/dataservices/generic-table.service';
import { UserResponseTableService } from 'src/app/modules/core/dataservices/user';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    private tsUserResponse: UserResponseTableService
  ) { }

  public register(user: User) {
    this.users.push(user);
  }

  public getResponseWithEmployeer(email: string) {
    return this.tsUserResponse.simpleList({
      username: email.split('@')[0]
    }).pipe(
      map(it => linq(it).FirstOrDefault())
    );
  }

}
