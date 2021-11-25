import { Component, OnInit } from "@angular/core";
import { CampaignCenterService } from "../services/campaigncenter.service";
import { Companies } from "../shared/companies";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-centreselect",
  templateUrl: "./centreselect.component.html",
  styleUrls: ["./centreselect.component.scss"],
})
export class CentreselectComponent implements OnInit {
  companies;
  centreUrl: string;
  centreName: string;

  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCompanies();
    this.campaignCenterService.showFooter = false;
  }
  selectCentre(url, name) {
    this.centreUrl = url;
    this.centreName = name;
    console.log("url:", url);
    if (url) {
      window.location.href = url;
    }
  }
  nextCentre() {
    window.location.href = this.centreUrl;
  }
  getCompanies() {
    this.campaignCenterService.getCompanies().subscribe((data) => {
      if (data) {
        let obj = data.companies;
        obj = Object.keys(obj).map((key) => ({
          state: key,
          centres: obj[key],
        }));
        this.campaignCenterService.companies = this.companies = obj;
      }
    });
  }
}
