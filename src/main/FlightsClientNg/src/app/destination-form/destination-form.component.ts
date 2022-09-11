import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent {

  startDest: Destination;
  targetDest: Destination;
  departure: Date = new Date();
  arrival: Date = new Date();
  isOneWay: boolean = false;
  departDate: string = "";
  arriveDate: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DestinationService) {
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
      this.departDate = this.customStringDate(this.departure); 
  }

  onSubmit(destForm: NgForm) {

    this.isOneWay = destForm.value.isOneWay;
    this.departure = destForm.value.departure;
    this.arrival = destForm.value.arrival;
    this.startDest.name = destForm.value.startDest;
    this.targetDest.name = destForm.value.targetDest;

    // the Date from datepicker
    this.departDate = this.customStringDate(this.departure);
    console.log("Searching flights for destinations: " + this.startDest.name + " - " + this.targetDest.name
     + " with departure date: " +this.departDate);
  }

  /**
   * Converts date from Date object to a nice readable string
   * @param date current date from input or default
   * @returns string with date in format dd/MM/yyyy
   */
  customStringDate(date: Date): string {
    return new Date(date).getDate() + "/" + (new Date(date).getMonth()+1) + "/" + new Date(date).getFullYear()
  }

  ngOnInit(): void {
    console.log("Initial dates value: " + this.customStringDate(this.departure) +
    ", arrival: " + this.customStringDate(this.arrival));
  }

}
