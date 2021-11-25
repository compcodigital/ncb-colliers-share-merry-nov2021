import { Component, OnInit, TemplateRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { CampaignCenterService } from '../../services/campaigncenter.service';

@Component({
  selector: 'app-thankyou-safelocker',
  templateUrl: './thankyou-safelocker.component.html',
  styleUrls: ['./thankyou-safelocker.component.scss']
})
export class ThankyouSafelockerComponent implements OnInit {
  website: any;
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  @ViewChild('opencontent', { static: false }) public opencontent: ElementRef;
  @ViewChild('locker', { static: false }) public locker: ElementRef;
  displayStyle: string;
  safelockerStyle: string;
  safelockeropenStyle: string;
  preStyle: string;
  safelockerbtnStyle: boolean;
  doorMsg: string;
  src: string;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }
  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.safelockerbtnStyle) {
      this.updateOpenOffset();
    } else {
      this.updateOffset();
    }
  }
  ngOnInit() {
    this.preStyle = 'frame';
    this.safelockeropenStyle = 'displaynone';
    this.updateOffset();
  }
  updateOffset(): void {
    this.safelockerbtnStyle = false;

    //   this.src='../assets/img/safeclose.png';
    //   if (window.innerWidth > 768) {
    //     this.src = '../assets/img/safeclose.png';
    //  }
    //  else{
    //   this.src = '../assets/img/safeclose_mobile.png';
    //  }
  }
  updateOpenOffset(): void {
    this.safelockerbtnStyle = true;
    //   this.src='../assets/img/safeopen.png';
    //   if (window.innerWidth > 768) {
    //     this.src = '../assets/img/safeopen.png';
    //  }
    //  else{
    //   this.src = '../assets/img/safeopen_mobile.png';
    //  }
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
    this.safelockerbtnStyle = true;
    // this.preStyle = 'frame1';
    this.safelockerStyle = 'dissolve';
    this.safelockeropenStyle = 'displayblock';
    this.safelockerStyle = 'displaynone';
    // console.log('block');
  }

  displaynone() {
    this.displayStyle = 'displaynone';
    this.safelockerbtnStyle = false;
    // console.log('none');
  }
  openDoor() {
    if (!this.safelockerStyle) {
      this.safelockerStyle = 'thumbOpened';
      //  this.updateOpenOffset();
      setTimeout(() => {
        this.displayblock();
      }, 1700);
    }
    // else {
    //   this.safelockerStyle = '';
    //   this.displaynone();
    //   // this.safelockerbtnStyle = true;
    // }
  }
}
