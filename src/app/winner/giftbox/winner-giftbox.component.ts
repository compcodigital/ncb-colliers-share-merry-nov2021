import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-winner-giftbox',
  templateUrl: './winner-giftbox.component.html',
  styleUrls: ['./winner-giftbox.component.scss']
})
export class WinnerGiftboxComponent implements OnInit, AfterViewInit {
  giftStyle: string;
  giftLidStyle: string;
  boxStyle: string;
  boxStyleBtn: string;
  flipStyle: string;
  clickStyle: string;
  click1Style: string;
  backStyle: string;
  inx: number;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  showType: string;
  @ViewChild('giftboxtag', { static: false }) giftboxEl: ElementRef;
  @ViewChild('letter', { static: false }) letterEl: ElementRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private renderer: Renderer2,
    private elem: ElementRef,
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.clickStyle = 'displayblock';
    this.click1Style = 'displaynone';
    this.status = false;
    this.inx = 0;
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
    this.showType = "IMAGE"
  }
  ngAfterViewInit() {}
  opengift(type) {
    this.showType = type;
    // console.log('openfunction');
    // if (this.status === false) {
    //   console.log('open card');
    //   this.giftLidStyle += ' opened';
    //   this.giftStyle += ' opened';
    //   this.boxStyleBtn = 'displaynone';
    //   this.boxStyle = 'z-20';
    //   this.status = true;
    //   setTimeout(() => {
    //     if (this.status === true) {
    //       this.giftStyle += ' timedelay ';
    //       setTimeout(() => {
    //         this.clickStyle = 'displaynone';
    //         this.click1Style = 'displayblock z-i0';
            this.showType = "CONTENT";
    //       }, 2000);
    //     }
    //   }, 50);
    // }
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
    this.campaignCenterService.pubid = '';
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
