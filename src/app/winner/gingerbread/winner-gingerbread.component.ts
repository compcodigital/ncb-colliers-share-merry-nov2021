import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input
} from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-winner-gingerbread',
  templateUrl: './winner-gingerbread.component.html',
  styleUrls: ['./winner-gingerbread.component.scss']
})
export class WinnerGingerbreadComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  slidingStyle: string;
  finishStyle: string;
  tapStyle: string;
  manSlideStyle: string;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.tapStyle = 'displaynone';
    this.finishStyle = 'displaynone';
    this.slidingStyle = 'displaynone';
    this.manSlideStyle = 'displaynone';
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
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  anotherCode() {
    if (this.campaignCenterService.pubid) {
      this.router.navigate(['/entercode'], { relativeTo: this.route });
    }
  }
  board() {
    this.tapStyle = 'displaynone';
    this.manSlideStyle = 'displayblock slideleft';
    setTimeout(() => {
      this.slidingStyle += 'displayblock slidedown';
    }, 300);
    setTimeout(() => {
      this.finishStyle = 'displayblock';
    }, 2300);
  }
  onDone() {
    // clear up
    this.campaignCenterService.pubid = '';
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
  tapVisible() {
    console.log('image loaded');
    this.tapStyle = 'displayblock';
  }
}
