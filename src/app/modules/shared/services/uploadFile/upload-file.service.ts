import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    public http: HttpClient
  ) { }

  public importConfirmPost(it: number, obj: any) {
    const formData = new FormData();
    formData.append('isbulk', obj.isbulk);
    return this.http.post<any>(
      `${environment.gatewayUrl}/uploadedfile/${it}/confirm/`,
      formData,
      {
        responseType: 'json'
      });
  }

  public saveFile(it: any) {
    const formData = new FormData();
    formData.append('module_cvnpath', it.module_cvnpath);
    formData.append('file', it.file);
    formData.append('isbulk', it.isbulk);
    return this.http.post<any>(
      `${environment.gatewayUrl}/uploadedfile/`,
      formData,
      {
        observe: 'response',
        responseType: 'json'
      });
  }
}
