import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { Destination } from '../destination';
import { DateUtils } from '../utils/date-utils';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent implements OnInit {

  searchForm: FormGroup;
  startDest: Destination;
  targetDest: Destination;

  departure: Date = new Date();
  arrival: Date = new Date();
  isOneWay: boolean = false;
  departDate: string = "";
  arriveDate: string = "";

  constructor(
    private dateUtil: DateUtils,
    private fb: FormBuilder) {
      this.startDest = {
        id: 23,
        name: 'Brno'
      }
      this.targetDest = {
        id: 123,
        name: 'Ostrava'
      }
      // setting Date to current date plus X days - as default for datepicker
      this.departure.setDate(this.departure.getDate() + 5);
      this.arrival.setDate(this.departure.getDate() + 10);
      this.departDate = this.dateUtil.customStringDate(this.departure); 

      this.searchForm = this.fb.group({
        startDestControl: 'Brno',
        targetDestControl: 'London',
        departureControl: [formatDate(this.departure, 'yyyy-MM-dd', 'en')],
        arrivalControl: [formatDate(this.arrival, 'yyyy-MM-dd', 'en')]
      })
  }

  onSubmit() {
    this.startDest = this.searchForm.value.startDestControl;
    this.targetDest = this.searchForm.value.targetDestControl;
    this.departure = this.searchForm.value.departureControl;
    this.arrival = this.searchForm.value.arrivalControl;
    
    console.log("Searching flights for destinations: " + this.startDest + " - " + this.targetDest
     + " with departure date: " +this.departDate);
  }

  ngOnInit(): void {
    console.log("Initial dates value: " + this.dateUtil.customStringDate(this.departure) +
    ", arrival: " + this.dateUtil.customStringDate(this.arrival));
  }

}
