import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BillService } from '../bill.service';
import { Bill } from './bill.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bill: Bill = new Bill();
  bills: MatTableDataSource<any>;

  displayedColumns: string[] = ['name', 'dueDate', 'paymentDate', 'value', 'correctedValue', 'delayedDays'];
  isLoading = false;
  hasErrors = false;
  error: string;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.listBills();
  }

  listBills() {
    this.isLoading = true;
    this.billService.listBills().subscribe(bills => {
      this.bills = new MatTableDataSource(bills);
      this.isLoading = false;
    }, err => {
      console.log("Error listing bills", err);
    });
  }

  add() {
    this.billService.add(this.bill).subscribe(bill => {
      this.hasErrors = false;
      this.bill = new Bill();
      this.listBills();
    }, err => {
      this.hasErrors = true;
      this.error = err.error.error;
      console.log(err)
    });
  }
}
