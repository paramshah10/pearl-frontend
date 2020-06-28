import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  private _url: string = 'https://x17hs8niwh.execute-api.us-east-1.amazonaws.com/dev/demo/get-seekers'//'https://jsonplaceholder.typicode.com/comments' //

  fetchMessages(): Observable<any> {
    return this.http.get<any>(this._url);
  }
}
