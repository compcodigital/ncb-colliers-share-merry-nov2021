import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignCenterService } from '../services/campaigncenter.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  buttonDisabled: boolean; // used to avoid the duplicate submissions
  loadingStyle: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignCenterService: CampaignCenterService
  ) {}

  ngOnInit() {
    this.loadingStyle = 'displaynone';
    this.buttonDisabled = false;
  }
  finish() {
    this.campaignCenterService.pubid = '';
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/welcome'], { relativeTo: this.route });
  }
}
