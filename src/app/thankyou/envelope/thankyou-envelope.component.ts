import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CampaignCenterService } from "../../services/campaigncenter.service";
import {
  BsModalService,
  BsModalRef,
} from "../../../../node_modules/ngx-bootstrap/modal";
import { fadeIn } from "../../shared/animation";
import { PageFlip } from "page-flip";

@Component({
  selector: "app-thankyou-envelope",
  templateUrl: "./thankyou-envelope.component.html",
  styleUrls: ["./thankyou-envelope.component.scss"],
  animations: [fadeIn],
})
export class ThankyouEnvelopeComponent implements OnInit, AfterViewInit {
  envStyle: string;
  boxStyle: string;
  flipStyle: string;
  // contentOpenedStyle: string;
  imgOpenedStyle: string;
  inx: number;
  elements: any;
  website: any;
  modalRef: BsModalRef;
  status: boolean;
  showDone: boolean = false;
  housetmp: boolean;
  closeDate: Date;
  today: Date;
  adaybeforeclosedate: boolean; //used to check a day before the close date
  pageFlip;
  @ViewChild("envelopetag", { static: false }) envelopeEl: ElementRef;
  @ViewChild("imgopenedtag", { static: false }) imgopenedtagEl: ElementRef;
  @ViewChild("letter", { static: false }) letterEl: ElementRef;
  @ViewChild("participat", { static: false }) template: TemplateRef<any>;

  // @ViewChild('', { static: false }) htmlParentElement: HTMLParamElement
  prizeInfoTymsg: string;
  prizeInfoTymsg1: string;
  prizeInfoTymsg2: string;
  prizeInfoTymsg3: string;

  constructor(
    private renderer: Renderer2,
    private elem: ElementRef,
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.prizeInfoTymsg = this.campaignCenterService.prizeInfoTymsg;
    this.prizeInfoTymsg1 = this.campaignCenterService.prizeInfoTymsg1;
    this.prizeInfoTymsg2 = this.campaignCenterService.prizeInfoTymsg2;
    this.prizeInfoTymsg3 = this.campaignCenterService.prizeInfoTymsg3;

    this.status = false;
    this.inx = 0;
    this.adaybeforeclosedate = true;
    this.closeDateCheck();
  }
  closeDateCheck() {
    this.closeDate = new Date("9 Feburary 2020 00:00:00"); //
    this.today = new Date();
    console.log(this.closeDate.getTime(), this.today.getTime());
    if (this.today.getTime() >= this.closeDate.getTime()) {
      this.adaybeforeclosedate = false;
      console.log(this.adaybeforeclosedate);
    }
  }
  ngAfterViewInit() {
    console.log("after view init");
    console.log("innerWidth", window.innerWidth);

    let wFlip = 748;
    let hFlip = 674;
    // 748 × 674 pix
    if (window.innerWidth <= 576) {
      // wFlip = 448;
      // hFlip = 374;
    }
    this.housetmp = true;
    this.showDone = false;
    this.pageFlip = new PageFlip(document.getElementById("example"), {
      width: wFlip, // required parameter - base page width
      height: hFlip, // required parameter - base page height
      clickEventForward: false,
      useMouseEvents: false,
      drawShadow: false,
      maxShadowOpacity: 0.0, // Half shadow intensity
      showCover: true,
      mobileScrollSupport: false,
    });
    this.pageFlip.loadFromImages([
      "../../assets/img/envelope/house-1.png",
      "../../assets/img/envelope/house-2.png",
      // "../../assets/img/envelope/house-2.png",
    ]);
  }

  openenv() {
    this.pageFlip.flipNext();

    setTimeout(() => {
      this.showDone = true;
    }, 1500);
    // setTimeout(() => {
    //   this.housetmp = false;
    // }, 1500);
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
    localStorage.removeItem("prize_info");
    localStorage.removeItem("prize_info_name");
    localStorage.removeItem("prize_info_retailer");
    this.campaignCenterService.pubid = "";
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
}
