import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

const STORAGE_KEY = `AuthStore.data`;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    const storedStr = localStorage.getItem(STORAGE_KEY);
    let stored = <any>{};
    if (storedStr) {
      stored = JSON.parse(storedStr);
    }

    super({
      ...createInitialState(),
      ...stored
    });
  }

  login(session: AuthState) {
    this.update(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.update(createInitialState());
  }
}

export interface Credential {
  Email: string;
  Password: string;
}

export interface TokenData {
  token: string;
  refreshToken: string;
  result: string;
  error: any;
  emailActiveDirectory: string;
  message: string;
}

interface ApiException {
  message: string;
  isError: boolean;
  detail: string;
  status: number;
}

export interface RefreshRequestData {
  Token: string;
  RefreshToken: string;
}


export interface AuthState {
  emailActiveDirectory: string | null;
  error: any | null;
  token: string | null;
  expires: Date | null;
  refreshToken: string | null;
}

export interface AuthApiResponse {
  resultToken: TokenData;
  apiException: ApiException;
  username: string;
}

export function createInitialState(): AuthState {
  return {
    emailActiveDirectory: null,
    error: null,
    token: null,
    expires: null,
    refreshToken: null
  };
}
