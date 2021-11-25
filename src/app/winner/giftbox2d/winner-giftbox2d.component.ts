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
  selector: 'app-winner-giftbox2d',
  templateUrl: './winner-giftbox2d.component.html',
  styleUrls: ['./winner-giftbox2d.component.scss']
})
export class WinnerGiftbox2dComponent implements OnInit, AfterViewInit {
  giftStyle: string;
  giftLidStyle: string;
  boxStyle: string;
  boxStyleBtn: string;
  flipStyle: string;
  clickStyle: string;
  inx: number;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
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
  }
  ngAfterViewInit() {}
  opengift() {
    console.log('openfunction');
    if (this.status === false) {
      console.log('open card');
      this.giftLidStyle += ' opened';
      this.giftStyle += ' opened';
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          this.giftStyle += ' timedelay ';
          setTimeout(() => {
            this.boxStyleBtn = 'displaynone';
            this.clickStyle = 'displaynone';
          }, 200);
        }
      }, 300);
    }
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  // anotherCode() {
  //   if (this.campaignCenterService.pubid) {
  //     this.router.navigate(['/entercode'], { relativeTo: this.route });
  //   }
  // }
  onDone() {
    this.router.navigate(['/finish'], { relativeTo: this.route });
  }
}
