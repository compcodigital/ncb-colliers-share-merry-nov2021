import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CampaignCenterService } from "../services/campaigncenter.service";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  modalRef: BsModalRef;
  footerStyle: string;
  title: string;
  path: string;
  companyId: string;
  @ViewChild("template", { static: false }) template: TemplateRef<any>;

  constructor(
    private location: Location,
    private modalService: BsModalService,
    public campaignCenterService: CampaignCenterService
  ) {}

  openModal(template: TemplateRef<any>) {
    const mm = { class: "modal-lg" };
    this.modalRef = this.modalService.show(template, mm);
  }

  ngOnInit() {
    this.title = this.campaignCenterService.campaignTitle;
    setTimeout(() => {
      this.companyId = this.campaignCenterService.companyId;
    }, 1000);

    this.currentLocation();
  }
  currentLocation() {
    this.path = this.location.path();
    if (
      this.path.indexOf("home") === 1 ||
      this.path.indexOf("register") === 1 ||
      this.path.indexOf("welcome") === 1 ||
      this.path.indexOf("finish") === 1
    ) {
      this.campaignCenterService.footerSecondary = true;
      // this.footerStyle = 'home';
      // console.log('home', this.path);
    } else if (
      this.path.indexOf("thankyou") === 1 ||
      this.path.indexOf("winner") === 1
    ) {
      this.campaignCenterService.footerSecondary = false;
      // this.footerStyle = 'other';
      // console.log('thankyou', this.path);
    }
    // else if (this.path.indexOf('home') === 1) {
    //   // this.footerStyle = 'home';
    //   this.campaignCenterService.footerSecondary = false;
    //   this.campaignCenterService.showFooter = false;
    // }
    else {
      this.campaignCenterService.footerSecondary = true;
      // this.footerStyle = 'home';
      // console.log('other', this.path);
    }
  }
}
