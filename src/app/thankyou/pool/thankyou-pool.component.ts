import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';

@Component({
  selector: 'app-thankyou-pool',
  templateUrl: './thankyou-pool.component.html',
  styleUrls: ['./thankyou-pool.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ThankyouPoolComponent implements OnInit {
  website: any;
  modalRef: BsModalRef;
  weeklyEntries: number;
  entry: string;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.weeklyEntries = this.campaignCenterService.weeklyEntry;
    // console.log(this.campaignCenterService.weeklyEntry,this.weeklyEntries);
    if (this.weeklyEntries === 1) {
      this.entry = 'entry';
    } else {
      this.entry = 'entries';
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
    localStorage.removeItem('prize_info');
    localStorage.removeItem('prize_info_name');
    localStorage.removeItem('prize_info_retailer');
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }


}
