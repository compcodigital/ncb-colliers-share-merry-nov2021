import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { CampaignCenterService } from "../../services/campaigncenter.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BsModalService,
  BsModalRef,
} from "../../../../node_modules/ngx-bootstrap/modal";
import { fadeIn } from "../../shared/animation";

@Component({
  selector: "app-thankyou-simple",
  templateUrl: "./thankyou-simple.component.html",
  styleUrls: ["./thankyou-simple.component.scss"],
  animations: [fadeIn],
})
export class ThankyouSimpleComponent implements OnInit {
  website: any;
  modalRef: BsModalRef;
  weeklyEntries: number;
  entry: string;
  src: string;
  displayStyle: string;
  clickStyle: string;
  status: boolean;
  companyId: string;
  @ViewChild("participat", { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.companyId = this.campaignCenterService.companyId;
    this.weeklyEntries = this.campaignCenterService.weeklyEntry;
    // console.log(this.campaignCenterService.weeklyEntry,this.weeklyEntries);
    if (this.weeklyEntries === 1) {
      this.entry = "entry";
    } else {
      this.entry = "entries";
    }
    this.weeklyEntries = this.campaignCenterService.weeklyEntry;
    if (window.innerWidth < 1024) {
      this.src = "./assets/img/cookies/boxloop.jpg";
    } else {
      this.src = "./assets/img/cookies/boxloop.jpg";
    }
    this.status = false;
    this.displayStyle = "displaynone";
  }
  openModal(template: TemplateRef<any>, size = "lg") {
    let modalCss = { class: "modal-dialog-centered modal-" + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  anotherCode() {
    if (this.campaignCenterService.pubid) {
      this.router.navigate(["/entercode"], { relativeTo: this.route });
    }
  }
  onDone() {
    // clear up
    localStorage.removeItem("prize_info");
    localStorage.removeItem("prize_info_name");
    localStorage.removeItem("prize_info_retailer");
    this.campaignCenterService.pubid = "";
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
  opengift() {
    console.log("openfunction");
    if (this.status === false) {
      console.log("open cookies");
      if (window.innerWidth < 1024) {
        this.src = "../../../assets/img/cookies/boxloop.gif";
      } else {
        this.src = "../../../assets/img/cookies/boxloop.gif";
      }
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          this.clickStyle = "d-none";
          this.displayStyle = "d-block animated fadeIn";
        }
      }, 4000);
    }
  }
}
