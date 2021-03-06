import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  private _url: string = 'https://cors-anywhere.herokuapp.com/'+'https://x17hs8niwh.execute-api.us-east-1.amazonaws.com/dev/demo/get-seekers'

  fetchMessages(): Observable<any> {
    return this.http.get<any>(this._url);
  }
}
