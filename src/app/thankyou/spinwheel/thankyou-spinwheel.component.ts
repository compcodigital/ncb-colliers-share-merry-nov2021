import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';

@Component({
  selector: 'app-thankyou-spinwheel',
  templateUrl: './thankyou-spinwheel.component.html',
  styleUrls: ['./thankyou-spinwheel.component.scss'],
  animations: [fadeIn]
})
export class ThankyouSpinwheelComponent implements OnInit, AfterViewInit {
  website: any;
  modalRef: BsModalRef;
  weeklyEntries: number;
  entry: string;
  spinStyle: string;
  playbtnStyle: string;
  contentBoxStyle: string;
  oneTimeonly: number;
  @ViewChild('statusheight', { static: false }) statusheight: ElementRef;
  @ViewChild('mainheight', { static: false }) mainheight: ElementRef;
  @ViewChild('thankyoupage', { static: false }) thankyoupage: ElementRef;
  viewHeight: number;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.oneTimeonly = 0;
    // this.spinStyle = 'absCenter';
    // this.playbtnStyle = 'absCenter';
  }
  public ngAfterViewInit() {
    // this.updateOffset();
  }
  @HostListener('window:resize', [])
  onWindowResize() {
    window.scroll(0, 0);
    // this.updateOffset();
  }
  updateOffset() {
    if (window.innerWidth > 576) {
      this.spinStyle = 'absCenter';
      this.playbtnStyle = 'absCenter';
    } else {
      this.spinStyle = '';
      this.playbtnStyle = '';
    }
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
    localStorage.removeItem('prize_info');
    localStorage.removeItem('prize_info_name');
    localStorage.removeItem('prize_info_retailer');
    this.campaignCenterService.pubid = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
  onPlay() {
    if (this.oneTimeonly < 1) {
      this.spinStyle = 'spin-animation';
      this.playbtnStyle = 'displaynone';

      setTimeout(() => {
        this.spinStyle = '';
        this.playbtnStyle =  ' displaynone';
        this.contentBoxStyle = 'displayblock animated fadeIn';
      }, 3000);
      this.oneTimeonly++;
    }
  }
}
