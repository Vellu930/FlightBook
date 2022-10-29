import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  oneWay: boolean = false;

  constructor(
    private fb: FormBuilder) {
    this.startDest = {
      id: 1,
      name: ''
    }
    this.targetDest = {
      id: 2,
      name: ''
    }
    // Date set to current date plus X days - default for datepicker
    this.departure.setDate(new Date().getDate() + 5);
    this.arrival.setDate(new Date().getDate() + 10);

    this.searchForm = this.fb.group({
      startDestControl: ['Brno', Validators.required],
      targetDestControl: ['London', Validators.required],
      oneWayChecker: this.oneWay,
      departureControl: [formatDate(this.departure, 'yyyy-MM-dd', 'en'), [Validators.required]],
      arrivalControl: [formatDate(this.arrival, 'yyyy-MM-dd', 'en')]
    })
  }

  onSubmit() {
    this.startDest = this.searchForm.value.startDestControl;
    this.targetDest = this.searchForm.value.targetDestControl;
    this.departure = this.searchForm.value.departureControl;
    this.arrival = this.searchForm.value.arrivalControl;

    console.log("Searching flights for destinations: " + this.startDest + " - " + this.targetDest
      + " with departure date: " + this.departure);

    console.log(this.searchForm);
  }

  ngOnInit(): void {
    this.searchForm.get('departureControl')?.valueChanges.subscribe(
      value => {
        this.departure = new Date(value);
        this.adjustDeparture(new Date(formatDate(value, 'yyyy-MM-dd', 'en')));
      }
    )
    this.searchForm.get('arrivalControl')?.valueChanges.subscribe(
      value => {
        this.arrival = new Date(value);
        this.adjustArrival(new Date(formatDate(value, 'yyyy-MM-dd', 'en')));
      }
    )
  }

  adjustDeparture(departureValue: Date): void {
    const departureMilis:number = new Date(departureValue).getTime();
    const present:number = new Date().getTime() - 43200000; // minus 0.5 day
    if (departureMilis < present) {
      this.searchForm.get('departureControl')?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    }
    const arrivalMilis: number = new Date(this.arrival).getTime();
    if (arrivalMilis < departureMilis) {
      this.searchForm.get('arrivalControl')?.setValue(formatDate(this.departure, 'yyyy-MM-dd', 'en'));
    }
  }

  adjustArrival(arrivalValue: Date): void {
    const arrivalMilis: number = new Date(arrivalValue).getTime();
    const departureMilis: number = new Date(this.departure).getTime() - 43200000;
    if (departureMilis > arrivalMilis) {
      this.searchForm.get('departureControl')?.setValue(formatDate(this.arrival, 'yyyy-MM-dd', 'en'));
    }
  }

  onCheckboxChange($event: Event): void {
    this.oneWay = this.searchForm.value.oneWayChecker;
    if (new Date(this.arrival).getTime() < this.departure.getTime()) {
      this.searchForm.get('arrivalControl')?.setValue(this.searchForm.value.departureControl);
    }
  }

}
