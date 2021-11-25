import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-thankyou-postbox',
  templateUrl: './thankyou-postbox.component.html',
  styleUrls: ['./thankyou-postbox.component.scss']
})
export class ThankyouPostboxComponent implements OnInit, AfterViewInit {
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
  ) {}

  ngOnInit() {
    this.clickStyle = 'displayblock';
    this.click1Style = 'displaynone';
    this.paperStyle = 'displaynone';
    this.inx = 0;
    this.status = false;
    this.updateOffset();
  }
  ngAfterViewInit() {}
  updateOffset(): void {
    if (window.innerWidth <= 768) {
      this.src = '../../../assets/img/postbox/newmailboxstart.png'; // mailboxclosediPad.png
    } else {
      this.src = '../../../assets/img/postbox/mailboxdesktop5.png'; // newmailboxdesktopstart.png'; // mailboxclosed.png
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

      if (window.innerWidth <= 768) {
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
    // this.router.navigate(['/home'], { relativeTo: this.route });
    window.location.href = '/';

  }
}
