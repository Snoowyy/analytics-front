import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProgrammedDownloadsStore } from './programmed-downloads.store';
import { ProgrammedDownload } from '.';

@Injectable({ providedIn: 'root' })
export class ProgrammedDownloadsService {

  readonly PROGRAMMED_DOWNLOAD = 'ca/scheduled-download/';
  subscription: Subscription;

  constructor(
    private programmedDownloadsStore: ProgrammedDownloadsStore,
    private httpClient: HttpClient
  ) { }

  public get(): void {
    const url: string = environment.urlApi + this.PROGRAMMED_DOWNLOAD;
    this.programmedDownloadsStore.setLoading(true);

    this.subscription = this.httpClient.get<ProgrammedDownload[]>(url)
      .subscribe((response: ProgrammedDownload[]) => {
        const entities = {};
        entities[`programmedDownloads`] = response;
        this.programmedDownloadsStore.set(entities);
        this.programmedDownloadsStore.setLoading(false);
      }, error => {
        this.programmedDownloadsStore.setLoading(false);
      });
  }

  public post(programmedDownload: ProgrammedDownload): void {
    const url: string = environment.urlApi + this.PROGRAMMED_DOWNLOAD;
    this.programmedDownloadsStore.setLoading(true);

    this.subscription = this.httpClient.post<ProgrammedDownload>(url, programmedDownload)
      .subscribe((response: ProgrammedDownload) => {
        this.get();
        this.programmedDownloadsStore.setLoading(false);
      }, error => {
        this.programmedDownloadsStore.setLoading(false);
      });
  }

  public delete(id: number): void {
    const url: string = environment.urlApi + this.PROGRAMMED_DOWNLOAD + id + '\/';
    this.programmedDownloadsStore.setLoading(true);

    this.subscription = this.httpClient.delete<any>(url)
      .subscribe((response: any) => {
        this.get();
        this.programmedDownloadsStore.setLoading(false);
      }, error => {
        this.programmedDownloadsStore.setLoading(false);
      });
  }

  public unsubscribeGetInventory(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
