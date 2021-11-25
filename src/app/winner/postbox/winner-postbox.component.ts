import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  HostListener,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-winner-postbox',
  templateUrl: './winner-postbox.component.html',
  styleUrls: ['./winner-postbox.component.scss']
})
export class WinnerPostboxComponent implements OnInit, AfterViewInit {
  postStyle: string;
  postLidStyle: string;
  boxStyle: string;
  boxStyleBtn: string;
  flipStyle: string;
  clickStyle: string;
  click1Style: string;
  backStyle: string;
  boxMoveStyle: string;
  paperStyle: string;
  slideStyle: string;
  inx: number;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
  lidHeight: any;
  lidContainer: any;
  src: string;
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  @ViewChild('postboxtag', { static: false }) postboxEl: ElementRef;
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
    this.paperStyle = 'displaynone';
    this.status = false;
    this.inx = 0;
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
  ngAfterViewInit() { }
  updateOffset(): void {
    if (window.innerWidth <= 992) {
      this.src = '../../../assets/img/postbox/newmailboxstart.png'; // mailboxclosediPad.png
    } else {
      this.src = '../../../assets/img/postbox/mailboxdesktop5.png'; // mailboxclosed.png
    }
  }
  openpost() {
    console.log('openfunction');
    if (this.status === false) {
      console.log('open card');
      this.postLidStyle += ' opened';
      this.boxStyle += ' opened';
      this.postStyle += ' opened';
      this.boxStyleBtn = 'displaynone';

      if (window.innerWidth <= 992) {
        this.src = '../../../assets/img/postbox/newmailbox.gif'; // mailboxfinal.gif
      } else {
        this.src = '../../../assets/img/postbox/newmailboxdesktop5.gif'; // mailboxfinal2.gif
      }
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          this.boxStyle += ' timedelay ';
          this.paperStyle = 'paperslideout';
          setTimeout(() => {
            this.clickStyle = 'displaynone';
            this.click1Style = 'displayblock z-i0';
            this.slideStyle += ' z-1 pos-rel';
            this.boxMoveStyle += ' z-1 pos-rel';
            this.paperStyle += ' z-i0';
          }, 2500);
        }
      }, 4500);
    }
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
    this.campaignCenterService.pubid = '';
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    // this.router.navigate(['/home'], { relativeTo: this.route });
    window.location.href = '/';
  }
}
