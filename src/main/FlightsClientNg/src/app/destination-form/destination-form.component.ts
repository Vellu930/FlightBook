import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent {

  dest!: Destination;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DestinationService) {
      // this.dest.id = 123456;
      // this.dest.name = "GoldTown";
     }

  onSubmit(destForm: NgForm) {

    this.dest = destForm.value;

    console.log("Destination name: " + this.dest.name);
    console.log(destForm)

    console.log("Saving destination: " + this.dest.name + " with a chosen ID: " + this.dest.id);

    this.service.save(this.dest).subscribe( result => 
        this.router.navigate(['/destinations']) 
        )
    }

}
