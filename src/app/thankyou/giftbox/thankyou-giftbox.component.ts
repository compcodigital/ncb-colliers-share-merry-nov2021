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
  selector: 'app-thankyou-giftbox',
  templateUrl: './thankyou-giftbox.component.html',
  styleUrls: ['./thankyou-giftbox.component.scss']
})
export class ThankyouGiftboxComponent implements OnInit, AfterViewInit {

  showType:any;
  giftStyle: string;
  giftLidStyle: string;
  boxStyle: string;
  boxStyleBtn: string;
  flipStyle: string;
  clickStyle: string;
  click1Style: string;
  backStyle: string;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
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
  ) { }

  ngOnInit() {
    this.clickStyle = 'displayblock';
    this.click1Style = 'displaynone';
    this.status = false;
    this.showType = 'IMAGE';
  }

  ngAfterViewInit() { }
  opengift(type) {
    console.log('openfunction');
    this.showType = type;

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
    //       }, 2500);
    //     }
    //   }, 50);
    // }
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  anotherCode() {
    console.log('click another code');
    if (this.campaignCenterService.pubid) {
      this.router.navigate(['/entercode'], { relativeTo: this.route });
    }
  }
  onDone() {
    // clear up
    // localStorage.removeItem('prize_info');
    // localStorage.removeItem('prize_info_name');
    // localStorage.removeItem('prize_info_retailer');
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
