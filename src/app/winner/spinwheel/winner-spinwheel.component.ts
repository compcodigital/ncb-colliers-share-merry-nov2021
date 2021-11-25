import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  HostListener,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';
import { fadeIn } from '../../shared/animation';

@Component({
  selector: 'app-winner-spinwheel',
  templateUrl: './winner-spinwheel.component.html',
  styleUrls: ['./winner-spinwheel.component.scss'],
  animations: [fadeIn]
})
export class WinnerSpinwheelComponent implements OnInit, AfterViewInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  spinStyle: string;
  playbtnStyle: string;
  contentBoxStyle: string;
  oneTimeonly: number;
  @ViewChild('statusheight', { static: false }) statusheight: ElementRef;
  @ViewChild('mainheight', { static: false }) mainheight: ElementRef;
  @ViewChild('winnerpage', { static: false }) winnerpage: ElementRef;
  viewHeight: number;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.oneTimeonly = 0;
    // this.spinStyle = 'absCenter';
    // this.playbtnStyle = 'absCenter';
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
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
  onPlay() {
    if (this.oneTimeonly < 1) {
      this.spinStyle = 'spin-animation';
      this.playbtnStyle = 'displaynone';

      setTimeout(() => {
        this.spinStyle = '';
        this.playbtnStyle = ' displaynone';
        this.contentBoxStyle = 'displayblock animated fadeIn';
      }, 3000);
      this.oneTimeonly++;
    }
  }
}
