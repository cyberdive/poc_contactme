import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMeService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  getClient(clientNumber: string): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + 'api/ContactMe/' + clientNumber);
  }

  updateEmail(clientNumber: string, email: string, sendMail: boolean): Observable<UpdateEmailRequest> {
    var updateEmailRequest = new UpdateEmailRequest(email, sendMail);
    return this.http.post<UpdateEmailRequest>(this.baseUrl + 'api/ContactMe/' + clientNumber, updateEmailRequest);
  }
}
export class Client {
  clientNumber: string;
  lastName: string;
  firstName: string;
  birthDate: Date;
  email: string;
  alert: boolean;
}
class UpdateEmailRequest {
  clientNumber: string;
  email: string;
  alert: boolean;

  constructor(email: string, alert: boolean) {
    this.email = email;
    this.alert = alert;
  }
}
