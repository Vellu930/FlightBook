import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.css']
})
export class DestinationFormComponent {

  destination: Destination;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DestinationService) {
      this.destination = new Destination(2345, "Barcelona");
     }

  onSubmit() {
    this.service.save(this.destination).subscribe( result => this.router.navigate(['/destinations']))
  }

}
