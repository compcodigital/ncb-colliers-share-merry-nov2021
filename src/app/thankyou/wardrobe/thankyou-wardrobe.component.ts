import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from '../../../../node_modules/ngx-bootstrap/modal';
import { CampaignCenterService } from '../../services/campaigncenter.service';

@Component({
  selector: 'app-thankyou-wardrobe',
  templateUrl: './thankyou-wardrobe.component.html',
  styleUrls: ['./thankyou-wardrobe.component.scss']
})
export class ThankyouWardrobeComponent implements OnInit {
  website: any;
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  dooropenStyle: string;
  wardrobeStyle: string;
  wardrobeStyle1: string;
  wardrobebtnStyle: boolean;
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
    this.wardrobebtnStyle = true;
    this.updateOffset();
  }
  updateOffset(): void {
    if (window.innerWidth < 767) {
      this.doorMsg = 'Touch here to open the wardrobe';
    } else {
      this.doorMsg = 'Click here to open the wardrobe';
    }
    // console.log(this.doorMsg);
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
  openDoor() {
    if (!this.dooropenStyle) {
      this.dooropenStyle = 'perspectiveOpen';
    } else {
      this.dooropenStyle = '';
    }
    if (!this.wardrobeStyle) {
      this.wardrobeStyle = 'thumbOpened';
      this.wardrobebtnStyle = false;
    } else {
      this.wardrobeStyle = '';
      this.wardrobebtnStyle = true;
    }
    if (!this.wardrobeStyle1) {
      this.wardrobeStyle1 = 'thumbOpened1';
      this.wardrobebtnStyle = false;
    } else {
      this.wardrobeStyle1 = '';
      this.wardrobebtnStyle = true;
    }
  }
}
