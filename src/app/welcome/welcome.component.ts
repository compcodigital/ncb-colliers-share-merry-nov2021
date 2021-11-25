import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  buttonDisabled: boolean; // used to avoid the duplicate submissions
  loadingStyle: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.buttonDisabled = false;
    this.loadingStyle = 'displaynone';
  }
  start() {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
