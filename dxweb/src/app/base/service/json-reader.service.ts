import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonReaderService {

  constructor(private http: HttpClient) { }

  //Any type is used because the object being read is unknown
  read(path: string): Observable<any> {
    return this.http.get(path)
  }
}