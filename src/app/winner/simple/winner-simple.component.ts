import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
} from "@angular/core";
import { CampaignCenterService } from "../../services/campaigncenter.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BsModalService,
  BsModalRef,
} from "../../../../node_modules/ngx-bootstrap/modal";
import { fadeIn } from "../../shared/animation";
@Component({
  selector: "app-winner-simple",
  templateUrl: "./winner-simple.component.html",
  styleUrls: ["./winner-simple.component.scss"],
  animations: [fadeIn],
})
export class WinnerSimpleComponent implements OnInit {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  modalRef: BsModalRef;
  src: string;
  displayStyle: string;
  clickStyle: string;
  status: boolean;
  @ViewChild("participat", { static: false }) template: TemplateRef<any>;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
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
    if (window.innerWidth < 1024) {
      this.src = "./assets/img/cookies/box.jpg";
    } else {
      this.src = "./assets/img/cookies/box.jpg";
    }
    this.status = false;
    this.displayStyle = "displaynone";
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  anotherCode() {
    if (this.campaignCenterService.pubid) {
      this.router.navigate(["/entercode"], { relativeTo: this.route });
    }
  }
  onDone() {
    // clear up
    this.campaignCenterService.prizeInfo = "";
    this.campaignCenterService.prizeInfoName = "";
    this.campaignCenterService.prizeInfoRetailer = "";
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
  opengift() {
    console.log("openfunction");
    if (this.status === false) {
      console.log("open cookies");
      if (window.innerWidth < 1024) {
        this.src = "../../../assets/img/cookies/box.gif";
      } else {
        this.src = "../../../assets/img/cookies/box.gif";
      }
      this.status = true;
      setTimeout(() => {
        if (this.status === true) {
          this.clickStyle = "d-none";
          this.displayStyle = "d-block animated fadeIn";
        }
      }, 3500);
    }
  }
}
