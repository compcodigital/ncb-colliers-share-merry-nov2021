import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-thankyou-giftbox2d',
  templateUrl: './thankyou-giftbox2d.component.html',
  styleUrls: ['./thankyou-giftbox2d.component.scss']
})
export class ThankyouGiftbox2dComponent implements OnInit, AfterViewInit {
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
    this.inx = 0;
    this.status = false;
  }
  ngAfterViewInit() {
    // you'll get your through 'elements' below code
    // setTimeout(() => this.giftboxEl.nativeElement.focus());
    // this.giftboxEl.nativeElement.scrollIntoView();
    this.elements = this.elem.nativeElement.querySelectorAll('.fold').length;
    // console.log(this.elements);
  }
  opengift() {
    console.log('openfunction');
    if (this.status === false) {
      console.log('open card');
      // this.giftStyle = 'move';
      this.giftLidStyle += ' opened';
      this.boxStyleBtn = 'displaynone';
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          this.giftStyle += ' opened';
          this.clickStyle = 'displaynone';
          setTimeout(() => {
            this.giftStyle += ' timedelay ';
            // this.giftLidStyle += ' timedelay ';

            // this.letterEl.nativeElement.scrollIntoView();
            // this.unfold(this.elements,this.inx);
          }, 1000);
        }
      }, 1000);
    }
    // else {
    //   console.log('close card');
    //   this.giftStyle = ' ';
    //   this.clickStyle = 'displayblock';
    //   this.status = false;
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
    // clear up
    // localStorage.removeItem('prize_info');
    // localStorage.removeItem('prize_info_name');
    // localStorage.removeItem('prize_info_retailer');
    // this.campaignCenterService.pubid = '';
    this.router.navigate(['/finish'], { relativeTo: this.route });
  }
}
