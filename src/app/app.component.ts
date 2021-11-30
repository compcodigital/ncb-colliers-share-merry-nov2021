import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  TemplateRef,
  AfterViewInit,
  HostListener,
  OnChanges,
} from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { NgModel } from "@angular/forms";
import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CampaignCenterService } from "./services/campaigncenter.service";
import { Center } from "./shared/center";
import * as $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import { Title, Meta } from "@angular/platform-browser";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [DatePipe],
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  // title is used as a title in all the places
  title = "Share The Merry";
  centers: Center[];
  deviceInfo = null;
  deviceStyle: string;
  pageStyle: string; // used for page based style
  backgroundStyle: string;
  modalRef: BsModalRef;
  @ViewChild("mainbg", { static: false }) mainbg: ElementRef;
  @ViewChild("newversion", { static: false }) terms: TemplateRef<any>;

  // to check the date of the current campaign
  todaydate: Date = new Date();
  campaignOpenDate: Date; // = new Date('MARCH 31, 2019 21:00:00');
  campaignCloseDate: Date; // = new Date('MARCH 31, 2019 21:00:00');

  validUrl: boolean; // to check the user is nagivation and entering the data in the correct url.
  opencampaign: boolean; // to check the campaign is opened or not
  pageNotAvailable: boolean;
  giftAvailable: boolean;
  requiredsubdomain: boolean;
  comingsoon: boolean;
  ishome: boolean;
  kioskonly: boolean;
  anyserverupdate: boolean;
  testurl = `assets/video/BubbleVideoHR.mp4`;
  domainurl: string;
  domainmp4: string;
  domainwebm: string;
  domainogg: string;
  path: string;
  gaCode: string = "";
  constructor(
    public campaignCenterService: CampaignCenterService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private location: Location,
    public el: ElementRef,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private swUpdate: SwUpdate,
    private titleService: Title,
    private metaService: Meta
  ) {
    // console.log('construction');
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator and navigating this will be occured in the start of the navigation
        this.loadingScreen();
        this.giftAvail();
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentLocation();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
    this.deviceDetect();
  }
  giftAvail() {
    // is used for only to check 180 gift for hyperdome campaign in feb 2020
    this.campaignCenterService.checkgiftAvaiablity().subscribe(
      (response) => {
        if (response.company) {
          if (response.company.reached === true) {
            this.giftAvailable = false;
          } else if (response.company.reached === false) {
            this.giftAvailable = true;
          }
        }
        // this.giftAvailable = true;//used for test purpose
      },
      (error) => {},
      () => {}
    );
  }
  ngAfterViewInit() {
    this.updateOffset();
  }
  @HostListener("window:resize", [])
  onWindowResize() {
    window.scroll(0, 0);
    this.updateOffset();
  }

  updateOffset(): void {
    /* this function is used for many domain(many center is running this campaign) then the
    video is not working to make it to work video in different domain then need to do in
    this following way to add it in main page as a background
    */
    this.domainurl = window.location.hostname;
    this.domainmp4 =
      "http://" + this.domainurl + "/assets/video/bubblesDesktop.mp4";
    this.domainwebm =
      "http://" + this.domainurl + "/assets/video/BubbleVideoHRDarker.webm";
    this.domainogg =
      "http://" + this.domainurl + "/assets/video/BubbleVideoHRDarker.ogg";
    if (window.innerWidth < 1200) {
      this.domainmp4 =
        "http://" + this.domainurl + "/assets/video/BubblesiPadv2.mp4";
    }
  }
  openModal(template: TemplateRef<any>) {
    //open modal to use it in component level
    this.modalRef = this.modalService.show(template);
  }
  updateApp() {
    window.location.reload();
    document.location.reload();
    console.log("The app is updating right now");
  }
  ngOnInit() {
    // console.log('oninit');
    this.validUrl = true;
    this.opencampaign = true;
    this.pageNotAvailable = false;
    this.requiredsubdomain = true;
    this.comingsoon = false;
    // this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: "keywords", content: this.title },
      { name: "description", content: this.title },
      { name: "robots", content: "index, follow" },
    ]);
    this.loadingScreen(); // loading gif
    this.preventScrollmobile(); // this will prevent scrolling
    this.miscellanious();
    this.softwareUpdate(); // service worker update
    this.campaignSettings(); // will check about the campaign details
    this.getCenters(); // will check about the center details
    setInterval(() => {
      this.giftAvail();
    }, 60000);
    // this.campaignCenterService();
    this.campaignCenterService.campaignTitle = this.title;
  }
  loadingScreen() {
    setTimeout(() => {
      $(".load-icon-div").fadeOut("slow");
    }, 1000);
  }
  preventScrollmobile() {
    // How to prevent native scrolling on mobile browsers
    document.body.addEventListener(
      "touchmove",
      (event) => {
        if (
          window.location.pathname === "/thankyou" ||
          window.location.pathname === "/winner"
        ) {
          event.preventDefault();
          event.stopPropagation();
          console.log("not reg");
        }
      },
      false
    );
  }
  miscellanious() {
    // used for the date picker for date of birth and purchase date
    // only used for desktop
    // Getter
    const dateFormat = $("#bsDatepicker").datepicker("option", "dateFormat");

    // Setter
    $("#bsDatepicker").datepicker("option", "dateFormat", "dd-mm-yy");
    // console.log();

    $(window).bind("orientationchange resize", (event) => {
      if (event.orientation) {
        if (event.orientation === "landscape") {
          if ($(window).rotation === 90) {
            this.rotate(this, -90);
          } else {
            this.rotate(this, 90);
          }
        }
      }
    });
  }
  rotate(el, degs) {
    let iedegs = degs / 90;
    if (iedegs < 0) {
      iedegs += 4;
    }
    const transform = "rotate(" + degs + "deg)";
    const iefilter =
      "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + iedegs + ")";
    const styles = {
      transform,
      "-webkit-transform": transform,
      "-moz-transform": transform,
      "-o-transform": transform,
      filter: iefilter,
      "-ms-filter": iefilter,
    };
    $(el).css(styles);
  }
  // ngOnChanges(){
  //   this.pageStyle=this.campaignCenterService.pageStyle;
  //   console.log('main',this.campaignCenterService.pageStyle);
  // }
  currentLocation() {
    this.path = this.location.path();
    if (this.path.indexOf("home") === 1) {
      // this.ishome = true;//use it for video home page
      this.pageStyle = "home";
      // ||
      // this.path.indexOf('register') === 1 ||
      // this.path.indexOf('welcome') === 1 ||
      // this.path.indexOf('finish') === 1
      this.campaignCenterService.showFooter = true;
      this.campaignCenterService.footerSecondary = false;

      console.log("home", this.path);
    } else if (this.path.indexOf("register") === 1) {
      this.campaignCenterService.showFooter = true;
    } else if (this.path.indexOf("entercode") === 1) {
      this.pageStyle = "entercode";
      this.campaignCenterService.showFooter = true;
    } else if (
      this.path.indexOf("thankyou") === 1 ||
      this.path.indexOf("winner") === 1
    ) {
      // this.ishome = false;//use it for video home page
      this.campaignCenterService.footerSecondary = true;
      this.campaignCenterService.showFooter = true;
      //   // this.footerStyle = 'other';
      //   // console.log('thankyou', this.path);
    } else {
      // this.ishome = false;//use it for video home page
      this.campaignCenterService.footerSecondary = true;
      // this.footerStyle = 'home';
      console.log("other", this.path);
    }
    // Load Google Analytics

    if (this.gaCode) {
      this.loadGaCode(this.gaCode, this.path);
    }
  }
  softwareUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(
        (event) => {
          console.log(
            "[App] Update available: current version is",
            event.current,
            "available version is",
            event.available
          );
          // if(confirm('New version available. Load New Version?1')) {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
          // setInterval(function(){
          // window.location.reload();
          // document.location.reload();
          console.log("trying to reload");
          // }, 1000);
          // }
          console.log(event); // <--always gets 'pending' event, never seen log for 'activation' event
          // if (event === 'pending') {
          //   this.sw.activateUpdate(event.version);
          // } else if (event.type === 'activation') {
          //   location.reload();
          // }
        },
        (err) => {
          console.log("[App] subscriber request failed", err);
        }
      );
    }
    // setInterval(function(){ this.swUpdate.checkForUpdate(); console.log('swupdate check');}, 1000);
    // this.swUpdate.checkForUpdate();
  }
  deviceDetect() {
    // used for the kiosk restriction for ipad only campaign.
    // console.log(navigator);
    if (navigator.platform === "iPad") {
      // console.log('iPad');
      this.kioskonly = true;
    } else {
      // console.log(navigator.platform);
      this.kioskonly = false;
    }
  }

  deviceblock() {
    this.deviceStyle = "displayblock fixed";
    // console.log('block');
  }
  devicenone() {
    this.deviceStyle = "displaynone relative";
    // console.log('none');
  }

  campaignSettings() {
    // used for the campaign details like start date and end date and minmum spend. For more see the API

    this.campaignCenterService.campaignSettings().subscribe(
      (response) => {
        console.log(response);
        this.campaignOpenDate = response.form_fields.start_time_format;
        this.campaignCloseDate = response.form_fields.end_time_format;
        this.campaignCenterService.linkPrivacy =
          response.form_fields.link_privacy;
        // this.campaignOpenDate = new Date('14 October 2019 09:00:00');
        // console.log(this.campaignOpenDate);
        console.log(this.campaignCloseDate);
        this.campaignCenterService.minimumspend =
          response.form_fields.minimum_spend;
        this.campaignCenterService.opendate = "May 13, 2019 00:00:00"; // response.form_fields.start_time_format;
        this.campaignCenterService.closedate =
          response.form_fields.end_time_format;
        // console.log(this.campaignCenterService.minimumspend,this.campaignCenterService.opendate,this.campaignCenterService.closedate);
        const diff = this.getdatediff(
          this.campaignOpenDate,
          this.campaignCloseDate
        );
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.requiredsubdomain) {
      setTimeout(() => {
        this.domainSettings();
      }, 1000);
    }
  }
  getdatediff(openDateString, closeDateString) {
    // to check the open and close of the campaign to autocmatically to trigger on the date.
    // get calculation
    const today = new Date();
    const date1 = new Date(openDateString);
    const date2 = new Date(today);
    const date3 = new Date(closeDateString);
    if (
      date2.getTime() >= date1.getTime() &&
      date2.getTime() <= date3.getTime()
    ) {
      this.opencampaign = true;
    } else {
      if (date2.getTime() < date1.getTime()) {
        this.comingsoon = true;
      }
      if (date2.getTime() > date3.getTime()) {
        this.comingsoon = false;
      }
      console.log(this.comingsoon);
      this.opencampaign = false;
    }
    console.log("campaign opened", this.opencampaign);
  }
  domainSettings() {
    // the url check for the main domain and staging site
    // and subdomain to check in the campaign center
    if (this.opencampaign === false) {
      console.log("Setting, campaign not opened");
    } else {
      let domain = window.location.hostname;
      domain = domain.replace("www.", "");

      let subdomain = "";
      const domainkey = domain.split(".");
      if (domain.indexOf("com.au") > 1) {
        if (domainkey.length > 3) {
          subdomain = domainkey[0];
        }
      } else {
        if (domainkey.length > 2) {
          subdomain = domainkey[0];
        }
      }

      // subdomain = 'colkel';
      // subdomain = 'colpon';
      // subdomain = 'colwin';
      // subdomain = 'colkat';
      // subdomain = 'coldee';
      // subdomain = 'colkin';
      // subdomain = 'colnor';
      // subdomain = 'colwba';
      // subdomain = 'colfle';
      // subdomain = 'colgun';
      // subdomain = 'col19t';


      if (subdomain.length) {
        console.log("Setting, subdomain: " + subdomain);

        this.campaignCenterService
          .checkUrlCampaign(subdomain)
          .subscribe((response: any) => {
            if (response.company && response.company.company_id) {
              this.titleService.setTitle(response.company.centreName);

              this.campaignCenterService.companyId =
                response.company.company_id;
              this.campaignCenterService.entryLocation =
                response.company.k_label;

              this.campaignCenterService.centreName =
                response.company.centreName;

              if (response.company.gaCode) {
                this.gaCode = response.company.gaCode;
                this.loadGaCode(response.company.gaCode, this.path);
              }
            } else {
              // this.campaignCenterService.companyId = '344';
              this.campaignCenterService.entryLocation =
                subdomain + " " + navigator.platform;
              // this.validUrl = false;
              // this.opencampaign = false;
              console.log("url not from db");
            }
          });
      } else {
        // main domain to trigger invalid url
        // this.opencampaign = false;
        // this.pageNotAvailable = true;
        // console.log('Setting, page not available');

        // main domain to trigger valid url
        // this.campaignCenterService.companyId = '344';
        this.campaignCenterService.entryLocation = "";
      }

      // let path = this.location.path();
      // if (path.indexOf('register') > -1) {
      //   this.backgroundStyle='';
      //   this.backgroundStyle='app-content-wrapper2';
      //   console.log('registeration page')
      // }
      // else{
      //   this.backgroundStyle='';
      //   this.backgroundStyle='app-content-wrapper1';
      // }
    }
  }
  getCenters() {
    // to get the center details
    this.campaignCenterService.getCenters().subscribe((data) => {
      // console.log(data);
      if (data) {
        this.campaignCenterService.centers = this.centers = data.companies;
        // this.campaignCenterService.centers = this.centers = data.companies;
        // console.log(this.campaignCenterService.centers);
        localStorage.setItem(
          "centers",
          JSON.stringify(this.campaignCenterService.centers)
        );
      }
    });
  }
  loadGaCode(gaCode, path) {
    console.log("google analytics path: " + path);
    gtag("config", gaCode, {
      page_path: path,
    });
  }
}
