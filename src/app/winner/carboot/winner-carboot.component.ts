import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { CampaignCenterService } from 'src/app/services/campaigncenter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-winner-carboot',
  templateUrl: './winner-carboot.component.html',
  styleUrls: ['./winner-carboot.component.scss'],
  animations: [
    fadeIn
  ]
})
export class WinnerCarbootComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  displayStyle: string;
  carbootStyle: string;
  carbootbtnStyle: boolean;
  doorMsg: string;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
  }
  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateOffset();
  }
  ngOnInit() {
    this.carbootbtnStyle = true;
    this.updateOffset();
    if (this.campaignCenterService.prizeInfo && this.campaignCenterService.prizeInfoName) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
    }
  }
  updateOffset(): void {
    this.carbootbtnStyle = false;
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
  displayblock() {
    this.displayStyle = 'displayblock z-i5';
    this.carbootStyle = 'thumbOpened';
    this.carbootbtnStyle = true;
    // console.log('block');
  }

  displaynone() {
    this.displayStyle = 'displaynone';
    // console.log('none');
  }
  openDoor() {
    if (!this.carbootStyle) {
      this.carbootStyle = 'thumbOpening';
      setTimeout(() => {
        this.displayblock();
      }, 1000);
    }
    // else {
    //   this.carbootStyle = '';
    //   this.displaynone();
    //   this.carbootbtnStyle = true;
    // }
  }
}
