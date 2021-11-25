import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-winner-plantanimation',
  templateUrl: './winner-plantanimation.component.html',
  styleUrls: ['./winner-plantanimation.component.scss'],
  animations: [
    fadeIn
  ]
})
export class WinnerPlantanimationComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  animationStyle: string;
  animationStyle1: string;
  displayStyle: string;
  domainurl: string;
  imgs = new Array();
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.animationStyle = 'plantanimleft';
    this.animationStyle1 = 'plantanimright';
    if (this.campaignCenterService.prizeInfo && this.campaignCenterService.prizeInfoName) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
    }

  }
  startAnimation() {
    this.animationStyle = 'plantanimleft RotLefAn';
    this.animationStyle1 = 'plantanimright RotRigAn';
    setTimeout(() => {
      this.animationStyle = 'plantanimleftrotate';
      this.animationStyle1 = 'plantanimrightrotate';
    }, 1500);
    // console.log('clicked');
    this.displaynone();
  }
  displaynone() {
    this.displayStyle = 'displaynone';
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
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
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
