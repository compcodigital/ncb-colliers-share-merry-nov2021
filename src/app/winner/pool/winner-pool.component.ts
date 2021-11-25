import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-winner-pool',
  templateUrl: './winner-pool.component.html',
  styleUrls: ['./winner-pool.component.scss'],
  animations: [
    fadeIn
  ]
})
export class WinnerPoolComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
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
