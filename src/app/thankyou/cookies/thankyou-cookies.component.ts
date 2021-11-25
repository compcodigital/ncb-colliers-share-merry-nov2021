import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';

@Component({
  selector: 'app-thankyou-cookies',
  templateUrl: './thankyou-cookies.component.html',
  styleUrls: ['./thankyou-cookies.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ThankyouCookiesComponent implements OnInit {
  website: any;
  modalRef: BsModalRef;
  weeklyEntries: number;
  entry: string;
  src: string;
  displayStyle: string;
  boxStyleBtn: string;
  clickStyle: string;
  status: boolean;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.weeklyEntries = this.campaignCenterService.weeklyEntry;
    if (window.innerWidth < 1024) {
      this.src = './assets/img/cookies/Cookie4.png';
    }
    else {
      this.src = './assets/img/cookies/Cookiebreak4.png';
    }
    this.status = false;
    this.displayStyle = 'displaynone';
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  opengift() {
    console.log('openfunction');
    if (this.status === false) {
      console.log('open cookies');
      this.boxStyleBtn = 'displaynone';
      if (window.innerWidth < 1024) {
        this.src = '../../../assets/img/cookies/Cookiebreak2.gif';
      }
      else {
        this.src = '../../../assets/img/cookies/Cookiebreak4.gif';
      }
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          // this.src = '../../../assets/img/cookies/Cookiebreak2.png';
          this.displayStyle = 'displayblock animated fadeIn';
        }
      }, 3500);
    }
  }
  anotherCode() {
    if (this.campaignCenterService.pubid) {
      this.router.navigate(['/entercode'], { relativeTo: this.route });
    }
  }
  onDone() {
    // clear up
    localStorage.removeItem('prize_info');
    localStorage.removeItem('prize_info_name');
    localStorage.removeItem('prize_info_retailer');
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }


}
