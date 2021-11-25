import { Component, OnInit } from '@angular/core';
import { Router,
  Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
  import {  Location } from '@angular/common';
@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
  breadcrum: boolean;
  image1active: string;
  image2active: string;
  image3active: string;
  path: string;
  constructor(private router: Router,private location: Location) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentLocation();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
   }

  ngOnInit() {
  }
  currentLocation() {
    this.path = this.location.path();
    if (this.path.indexOf('home') === 1){
      this.breadcrum = false; // need to false when it is not avaiabale for home page
    } else if (this.path.indexOf('register') === 1 ||
     this.path.indexOf('welcome') === 1 ) {
      this.breadcrum = true;
      this.image1active = ' active';
      this.image2active = '';
      this.image3active = '';
    } else if (this.path.indexOf('entercode') === 1 ||
    this.path.indexOf('entercode-scanned') === 1) {
      this.breadcrum = true;
      this.image1active = '';
      this.image2active = ' active';
      this.image3active = '';
    } else if (this.path.indexOf('thankyou') === 1 ||
    this.path.indexOf('winner') === 1 ||
    this.path.indexOf('wheel') === 1
    ) {
      this.breadcrum = true;
      this.image1active = '';
      this.image2active = '';
      this.image3active = ' active';
    } else {
      this.breadcrum = false;
    }
  }
}
