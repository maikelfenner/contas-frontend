import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Bill } from './bill/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  listBills(): Observable<any> {
    return this.http.get('https://contas-backend.herokuapp.com/bill');
  }

  add(bill: Bill): Observable<any> {
    return this.http.post('https://contas-backend.herokuapp.com/bill', bill);
  }
}
