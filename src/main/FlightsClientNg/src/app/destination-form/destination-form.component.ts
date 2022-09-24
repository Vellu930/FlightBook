import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  departDate: string = "";
  arriveDate: string = "";
  oneWay: boolean = false;

  constructor(
    private dateUtil: DateUtils,
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
    this.departure.setDate(this.departure.getDate() + 5);
    this.arrival.setDate(this.departure.getDate() + 10);
    this.departDate = this.dateUtil.customStringDate(this.departure);

    this.searchForm = this.fb.group({
      startDestControl: ['Brno', Validators.required],
      targetDestControl: ['London', Validators.required],
      oneWayChecker: this.oneWay,
      departureControl: [formatDate(this.departure, 'yyyy-MM-dd', 'en'), [Validators.required]],
      arrivalControl: [formatDate(this.arrival, 'yyyy-MM-dd', 'en')]
    },{
      validators: this.compareDates('departureControl', 'arrivalControl')
    })
  }

  onSubmit() {
    this.startDest = this.searchForm.value.startDestControl;
    this.targetDest = this.searchForm.value.targetDestControl;
    this.departure = this.searchForm.value.departureControl;
    this.arrival = this.searchForm.value.arrivalControl;

    console.log("Searching flights for destinations: " + this.startDest + " - " + this.targetDest
      + " with departure date: " + this.departDate);

    console.log(this.searchForm);
  }

  ngOnInit(): void {
  }

  onCheckboxChange($event: Event) {
    this.oneWay = this.searchForm.value.oneWayChecker;
    if (this.oneWay == true) {
      this.searchForm.get('arrivalControl')?.setValue(this.searchForm.value.departureControl);
    }
  }

  get f() {
    return this.searchForm.controls;
  }

  /**
   * Validator function to prevent departure before present and arrival before departure
   * @param departure 
   * @param arrival 
   * @returns function that sets correct values or null
   */
  compareDates(departure: any, arrival: any) {

    // function can return multiple types using '|'   :-O
    return (form: AbstractControl) : void | null => {

      const depControl:number = new Date(form.value[departure]).getTime();
      const arriControl:number = new Date(form.value[arrival]).getTime();
      const present:number = new Date().getTime();

      if (depControl < present) {
        this.searchForm.get('departureControl')?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
      }
      if ((arriControl < depControl)) {
        this.searchForm.get('arrivalControl')?.setValue(form.value[departure]);
      }
      return null;
    }
  }

}
