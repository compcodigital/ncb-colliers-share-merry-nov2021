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
  selector: 'app-thankyou-gingerbread',
  templateUrl: './thankyou-gingerbread.component.html',
  styleUrls: ['./thankyou-gingerbread.component.scss']
})
export class ThankyouGingerbreadComponent  implements OnInit {
  website: string;
  modalRef: BsModalRef;
  slidingStyle: string;
  finishStyle: string;
  tapStyle: string;
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
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
  tapVisible() {
    console.log('image loaded');
    this.tapStyle = 'displayblock';
  }
}
