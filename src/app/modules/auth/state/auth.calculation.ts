import { AuthState } from "./auth.store";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ErrorService } from 'src/app/services/errors/error.service';
import { map, catchError } from "rxjs/operators";
import { empty } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user-service.service';

export function isAuthenticatedAuthState(s: AuthState, jwtHelper: JwtHelperService): boolean {
  return (s.token && !jwtHelper.isTokenExpired(s.token)) || (s.error ? !s.error.isError : false);
}

export function getAccessTokenJson(jwtHelper: JwtHelperService, s: AuthState) {
  return jwtHelper.decodeToken(s.token);
}

export function responseByEmployeers(emailFromAD: string, userService: UserService) {
  return userService
    .getResponseWithEmployeer(emailFromAD);
}

export function getUserData(userService: UserService, authState: AuthState, jwtHelper: JwtHelperService) {
  const tokenJson = getAccessTokenJson(jwtHelper, authState);
  const emailFromAD = tokenJson.unique_name;
  return responseByEmployeers(emailFromAD, userService)
    .pipe(
      map(it => ({
        email: tokenJson.unique_name,
        username: tokenJson.name,
        bussinessUnitId: it.Employeer_id,
      })),
      catchError(it => empty())
    );
}
