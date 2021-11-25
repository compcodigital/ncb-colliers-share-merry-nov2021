import { Component, OnInit, HostListener } from '@angular/core';
import { CampaignCenterService } from 'src/app/services/campaigncenter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-winner-wardrobe',
  templateUrl: './winner-wardrobe.component.html',
  styleUrls: ['./winner-wardrobe.component.scss']
})
export class WinnerWardrobeComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  // modalRef: BsModalRef;
  // @ViewChild('participat') template: TemplateRef<any>;
  dooropenStyle: string;
  wardrobeStyle: string;
  wardrobeStyle1: string;
  wardrobebtnStyle: boolean;
  doorMsg: string;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // ,private modalService: BsModalService
  }
  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateOffset();
  }
  ngOnInit() {
    this.wardrobebtnStyle = true;
    this.updateOffset();
    if (
      this.campaignCenterService.prizeInfo &&
      this.campaignCenterService.prizeInfoName
    ) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
    }
  }
  updateOffset(): void {
    if (window.innerWidth < 767) {
      this.doorMsg = 'Touch here to open the wardrobe';
    } else {
      this.doorMsg = 'Click here to open the wardrobe';
    }
    // console.log(this.doorMsg);
  }
  // openModal(participat: TemplateRef<any>) {
  //   // this.modalRef = this.modalService.show(participat);
  // }
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
