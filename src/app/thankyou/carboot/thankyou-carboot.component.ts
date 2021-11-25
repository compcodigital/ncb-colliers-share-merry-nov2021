import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { fadeIn } from '../../shared/animation';
@Component({
  selector: 'app-thankyou-carboot',
  templateUrl: './thankyou-carboot.component.html',
  styleUrls: ['./thankyou-carboot.component.scss'],
  animations: [
    fadeIn
  ]
})
export class ThankyouCarbootComponent implements OnInit {
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
    private modalService: BsModalService) { }
  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateOffset();
  }
  ngOnInit() {
    this.updateOffset();
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
