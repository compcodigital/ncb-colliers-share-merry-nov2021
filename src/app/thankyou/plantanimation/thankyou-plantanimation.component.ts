import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-thankyou-plantanimation',
  templateUrl: './thankyou-plantanimation.component.html',
  styleUrls: ['./thankyou-plantanimation.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ThankyouPlantanimationComponent implements OnInit {
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
    this.displayStyle = '';
    this.website = '';
    // this.preloadimg();
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
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
