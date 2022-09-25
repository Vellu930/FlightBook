import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DateUtils {

    constructor() {}
    /**
   * Converts date from Date object to a nice readable string
   * @param date current date from input or default
   * @returns string with date in format dd/MM/yyyy
   */
    customStringDate(date: Date): string {
        return new Date(date).getDate() + "/" + (new Date(date).getMonth() + 1) + "/" + new Date(date).getFullYear()
    }
}