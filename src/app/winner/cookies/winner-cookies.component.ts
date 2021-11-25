import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-winner-cookies',
  templateUrl: './winner-cookies.component.html',
  styleUrls: ['./winner-cookies.component.scss'],
  animations: [
    fadeIn
  ]
})
export class WinnerCookiesComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
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
    if (window.innerWidth < 1024) {
      this.src = './assets/img/cookies/Cookie4.png';
    }
    else {
      this.src = './assets/img/cookies/Cookiebreak4.png';
    }
    this.status = false;
    this.displayStyle = 'displaynone';
    if (this.campaignCenterService.prizeInfo && this.campaignCenterService.prizeInfoName) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
    }
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  } opengift() {
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
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
