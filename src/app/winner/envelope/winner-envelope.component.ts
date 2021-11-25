import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { CampaignCenterService } from "../../services/campaigncenter.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BsModalService,
  BsModalRef,
} from "../../../../node_modules/ngx-bootstrap/modal";
import { fadeIn } from "../../shared/animation";
import { PageFlip } from "page-flip";
@Component({
  selector: "app-winner-envelope",
  templateUrl: "./winner-envelope.component.html",
  styleUrls: ["./winner-envelope.component.scss"],
  animations: [fadeIn],
})
export class WinnerEnvelopeComponent implements OnInit, AfterViewInit {
  envStyle: string;
  boxStyle: string;
  flipStyle: string;
  clickStyle: string;
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  prizeInfoTymsg: string;
  prizeInfoTymsg1: string;
  prizeInfoTymsg2: string;
  prizeInfoTymsg3: string;
  inx: number;
  showDone: boolean = false;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
  pageFlip;
  @ViewChild("envelopetag", { static: false }) envelopeEl: ElementRef;
  @ViewChild("letter", { static: false }) letterEl: ElementRef;
  @ViewChild("participat", { static: false }) template: TemplateRef<any>;
  constructor(
    private renderer: Renderer2,
    private elem: ElementRef,
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.clickStyle = "displayblock";
    this.status = false;
    this.inx = 0;
    if (
      this.campaignCenterService.prizeInfo &&
      this.campaignCenterService.prizeInfoName
    ) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      this.prizeInfoTymsg = this.campaignCenterService.prizeInfoTymsg;
      this.prizeInfoTymsg1 = this.campaignCenterService.prizeInfoTymsg1;
      this.prizeInfoTymsg2 = this.campaignCenterService.prizeInfoTymsg2;
      this.prizeInfoTymsg3 = this.campaignCenterService.prizeInfoTymsg3;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
    }
  }
  ngAfterViewInit() {
    let wFlip = 748;
    let hFlip = 674;
    // 748 × 674 pix
    if (window.innerWidth <= 576) {
      // wFlip = 448;
      // hFlip = 374;
    }

    this.showDone = false;
    this.pageFlip = new PageFlip(document.getElementById("example"), {
      width: wFlip, // required parameter - base page width
      height: hFlip, // required parameter - base page height
      // showCover: false,
      clickEventForward: false,
      useMouseEvents: false,
      // maxShadowOpacity: false,
      drawShadow: false,
      maxShadowOpacity: 0.5, // Half shadow intensity
      showCover: true,
      mobileScrollSupport: false,
    });
    this.pageFlip.loadFromImages([
      "../../assets/img/envelope/house-1.png",
      "../../assets/img/envelope/house-2.png",
      // "../../assets/img/envelope/background2.png",
    ]);
  }
  openenv() {
    this.pageFlip.flipNext();
    setTimeout(() => {
      this.showDone = true;
    }, 1500);
  }
  unfold(elem, inx) {
    if (inx !== elem) {
      console.log("index: " + inx);
      inx = inx + 1;
      console.log("index: " + inx);
      setTimeout(() => {
        // this.flipStyle = 'unfolded';
        this.unfold(elem, inx);
      }, 500);
    }
  }
  closeenv() {
    console.log("closefunction");
    this.envStyle = "close";
    this.flipStyle = "fold";
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
    // this.campaignCenterService.prizeInfo='';
    // this.campaignCenterService.prizeInfoName='';
    // this.campaignCenterService.prizeInfoRetailer='';
    this.router.navigate(["/finish"], { relativeTo: this.route });
  }
}
