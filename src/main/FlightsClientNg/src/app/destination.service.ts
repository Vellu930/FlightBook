import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Destination } from 'src/app/destination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destUrl: string;

  constructor(private http: HttpClient) {
    this.destUrl = 'http://localhost:8080/destinations';
  }

  public findAll(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.destUrl);
  }

  public save(destination: Destination) {
    return this.http.post<Destination>(this.destUrl, destination);
  }
}
