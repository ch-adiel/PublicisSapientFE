import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/models/apiresponse';
import { CreditCardRequest } from 'src/models/creditcardrequest';
import { CreditCardResponse } from 'src/models/creditcardresponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl: string = 'http://localhost:54174/api/CreditCards';

  constructor(private http: HttpClient) { }

  public SaveCreditCard(request: CreditCardRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  public GetAllCards(): Observable<any> {
    return this.http.get(this.apiUrl + '/0');
  }

  public GetCardById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }
}
