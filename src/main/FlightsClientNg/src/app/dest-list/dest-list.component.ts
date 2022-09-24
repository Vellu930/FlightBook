import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-dest-list',
  templateUrl: './dest-list.component.html',
  styleUrls: ['./dest-list.component.css']
})
export class DestListComponent implements OnInit {

  destinations: Destination[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DestinationService) {
   }

  ngOnInit(): void {
    this.service.findAll().subscribe(
      data => this.destinations = data
    )
  }

}
