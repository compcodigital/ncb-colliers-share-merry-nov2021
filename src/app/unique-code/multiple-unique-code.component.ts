import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  OnChanges,
  ComponentFactoryResolver,
} from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { CampaignCenterService } from "../services/campaigncenter.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ErrorMsg } from "../shared/errorMsg";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Center } from "../shared/center";
import { Retailer } from "../shared/retailer";
import { LiteralMapEntry } from "@angular/compiler/src/output/output_ast";
import { DatepickerDateCustomClasses } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-multiple-unique-code",
  templateUrl: "./multiple-unique-code.component.html",
  styleUrls: ["./multiple-unique-code.component.scss"],
})
export class MultipleUniqueCodeComponent implements OnInit {
  code1: string;
  modalRef: BsModalRef;
  @ViewChild("templateAlreadyEntered", { static: false })
  templateAlreadyEntered: TemplateRef<any>;
  @ViewChild("kioskAlreadyEntered", { static: false })
  kioskAlreadyEntered: TemplateRef<any>;
  @ViewChild("templateInvalidCode", { static: false })
  templateInvalidCode: TemplateRef<any>;
  @ViewChild("participat", { static: false }) participat: TemplateRef<any>;
  @ViewChild("serverErrorCode", { static: false })
  serverErrorCode: TemplateRef<any>;
  @ViewChild("customError", { static: false }) customError: TemplateRef<any>;
  @ViewChild("customError1", { static: false }) customError1: TemplateRef<any>;
  @ViewChild("memberNotFound", { static: false })
  memberNotFound: TemplateRef<any>;
  @ViewChild("templateEntryInvalid", { static: false })
  templateEntryInvalid: TemplateRef<any>;
  @ViewChild("templateDuplicateValuesEntered", { static: false })
  templateDuplicateValuesEntered: TemplateRef<any>;
  @ViewChild("templateMiniSpend", { static: false })
  templateMiniSpend: TemplateRef<any>;

  submitted: boolean;
  /*for the drop list*/
  centers: Center[];
  centerOne: any;
  retailersOfSelectedCenter: Retailer[];
  /*unique code section*/
  companyId: string;
  centreName: string;
  outletId: string;
  outletName: string;
  purchaseamt;
  outletIdArr: any = [];
  outletNameArr: any = [];
  purchaseAmtArr: any = [];
  errorcode;
  purDate;
  refStores: any = [];
  listStores: any = [];
  lensub: number;
  retaillen: number;
  errorMsg = new ErrorMsg();
  spentForm: FormGroup;
  showSpentInput: boolean;
  confirmAnotherCode: boolean;
  needStoreName: boolean;
  storeDB: boolean;
  storeStyle: string;
  spendStyle: string;
  spendStyles: any = [];
  storeStyles: any = [];
  displayStyle: string;
  purchaseDateStyle: string;
  purchaseDateStyles: any = [];
  loadingStyle: string;
  minispend: number;
  maxspend: number;
  isMobile: boolean;
  purchaseValidation: boolean;
  purchaseFutureValidation: boolean;
  campaignOpenDate: any; // = new Date('MARCH 31, 2019 21:00:00');
  campaignCloseDate: any; // = new Date('MARCH 31, 2019 21:00:00');
  today: Date;
  minDate: Date;
  maxDate: Date;
  myDate: any;
  buttonDisabled: boolean;
  arrayInputs = [
    {
      spend: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/),
        // Validators.min(this.minispend)
      ]),
      store: new FormControl("", [Validators.required]),
      purchaseDate: new FormControl("", [Validators.required]),
    },
  ];
  counter: number;
  showStoreByKey: number;
  entryid: number;
  multipleCode: boolean;
  showFormMultipleUniqueCode: boolean;

  dateCustomClasses: DatepickerDateCustomClasses[];

  constructor(
    public campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
    this.today.setHours(0);
    this.showFormMultipleUniqueCode = true;
    // console.log(this.today);

    const now = new Date();
    const oneDaysAhead = new Date();
    oneDaysAhead.setDate(now.getDate());

    this.dateCustomClasses = [
      { date: now, classes: [] },
      { date: oneDaysAhead, classes: ["one-days-ahead"] },
    ];
  }

  openModal(template: TemplateRef<any>, size = "lg") {
    let modalCss = { class: "modal-dialog-centered modal-" + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }

  ngOnInit() {
    this.submitted = false;
    this.buttonDisabled = false;
    this.multipleCode = false;
    this.showStoreByKey = 0;
    this.showSpentInput = false;
    this.confirmAnotherCode = false;
    this.needStoreName = false;
    this.storeDB = false;
    this.loadingStyle = "displaynone";
    this.isMobile = false;
    this.purchaseValidation = false;
    this.purchaseFutureValidation = false;
    this.maxspend = 10000;
    window.scroll(20, 0);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.isMobile = true;
    }
    // this.campaignCenterService.showFooter = false;
    // this.campaignCenterService.footerSecondary = false;
    this.minispend = this.campaignCenterService.minimumspend;
    this.campaignOpenDate = this.datePipe.transform(
      this.campaignCenterService.opendate,
      "dd/MM/yyyy"
    );
    this.campaignCloseDate = this.datePipe.transform(
      this.campaignCenterService.closedate,
      "dd/MM/yyyy"
    );

    this.minDate = new Date(this.campaignCenterService.opendate);
    this.maxDate = new Date(this.campaignCenterService.closedate);

    // console.log(this.minispend, this.campaignOpenDate, this.campaignCloseDate, this.minDate, this.maxDate);

    // const today = new Date();
    // if (today.getTime() < this.minDate.getTime()) {
    //   this.maxDate.setTime(this.minDate.getTime() - 1);
    // } else if (today.getTime() <= this.maxDate.getTime()) {
    //   this.maxDate = today;
    // }

    /*customize the unique code,spend and store name section*/
    this.showSpentInput = true; //to make unique section  hide when need and show the spend section
    // this.confirmAnotherCode=true;//to make confirmation
    this.needStoreName = true; //to make visible of the retailer list

    this.initForm();
    this.setArrayInputs(this.arrayInputs);
    this.retailerList(); // use when its a drop down list for retailer (store name)

    // if (this.campaignCenterService.companyId) {
    //     this.getStores();
    // }
  }

  displayblock() {
    this.displayStyle = "displayblock";
    // console.log('block');
  }

  displaynone() {
    this.displayStyle = "displaynone";
    // console.log('none');
  }

  private initForm() {
    this.spentForm = this.fb.group({
      purchaseDate: new FormControl("", [Validators.required]),
      spentretailer: this.fb.array([]),
    });
  }
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map((address) => this.fb.group(address));
    const formArray = this.fb.array(arrayFG);
    this.spentForm.setControl("spentretailer", formArray);
  }
  addItems() {
    const purchaseDateInit =
      this.spentForm.controls.spentretailer.value[0].purchaseDate;

    const purchaseDate = this.spentForm.value.purchaseDate;
    this.datePipe.transform(purchaseDate, "yyyy-MM-dd");

    var i = 0;
    var item = this.spentForm.get("spentretailer") as FormArray;

    for (const sp of item.controls) {
      document.getElementById("retailer-item-label-" + i).style.display =
        "block";
      document.getElementById("retailer-item-input-" + i).style.display =
        "none";
      i++;
    }

    this.minDate = new Date(purchaseDateInit);
    this.maxDate = new Date(purchaseDateInit);
    this.minDate.setDate(this.minDate.getUTCDate());
    this.maxDate.setDate(this.maxDate.getUTCDate());

    (this.spentForm.get("spentretailer") as FormArray).push(
      this.fb.group({
        spend: new FormControl("", [Validators.required]),
        store: new FormControl("", [
          Validators.required,
          // Todo: Please use other patterm because generate a bug when is validate inputs multiples (store name).
          // Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/),
          // Validators.min(this.minispend)
        ]),
        // purchaseDate: new FormControl(
        //   this.datePipe.transform(purchaseDate, "yyyy-MM-dd"),
        //   [Validators.required]
        // ),
        purchaseDate: new FormControl(purchaseDateInit, [Validators.required]),
      })
    );

    // let firstdetails = ((document.getElementById("exchageRateDate") as HTMLInputElement).value);
    // console.log(firstdetails);
    // (this.spentForm.get('spentretailer') as FormArray).push(this.fb.group({ store: '' }));
  }

  removeItem(key) {
    const item = this.spentForm.get("spentretailer") as FormArray;
    if (item.length > 1) {
      item.removeAt(key);
    } else {
      this.minDate = new Date(this.campaignCenterService.opendate);
      this.maxDate = new Date(this.campaignCenterService.closedate);

      document.getElementById("retailer-item-label-" + key).style.display =
        "none";
      document.getElementById("retailer-item-input-" + key).style.display =
        "block";
      this.errorMsg.message = "You must enter atleast one receipt";
    }
  }

  removeItems(i) {
    const item = this.spentForm.get("spentretailer") as FormArray;
    console.log(item.length);
    if (item.length > 1) {
      item.removeAt(item.length - 1);
    } else {
      this.errorMsg.message = "You must enter atleast one receipt";
    }
  }

  onKeyUp(event: any) {
    this.errorMsg.valid = false;
    const value = event.target.value.replace(/\s/g, "");

    if (
      event.keyCode !== 9 &&
      event.keyCode !== 37 &&
      event.keyCode !== 38 &&
      event.keyCode !== 39 &&
      event.keyCode !== 40 &&
      event.keyCode !== 46
    ) {
      if (event.target.id === "code1") {
        if (value.length > 0) {
          // console.log('value code');
          this.errorMsg.valid = true;
        }
      }
      if (event.keyCode === 13) {
        if (value.length > 0) {
          // console.log('enter key');
          this.onEnterCode();
        } else {
          console.log("error");
          this.errorMsg.message =
            "Please make sure your have entered the unique code";
        }
      }
    }
  }
  resetCode() {
    this.code1 = "";
    this.errorMsg.valid = false;
  }
  resetSpent() {
    this.spentForm.value.spend = "";
    this.errorMsg.valid = false;
  }
  onEnterCode() {
    // used for the Single Entry
    this.loadingStyle = "displayinlineblock";
    this.buttonDisabled = true;
    if (this.errorMsg.valid) {
      this.errorMsg.message = "";
      if (this.submitted) {
        return;
      }
      this.submitted = true;

      this.campaignCenterService
        .uniqueCode(this.code1, null, null, true)
        .subscribe(
          (response: any) => {
            this.submitted = false;
            console.log("response on unique", response);
            if (response.error) {
              this.loadingStyle = "displaynone";
              this.buttonDisabled = false;
              if (response.error.code === "NCB-0015") {
                // invalid code
                this.openModal(this.templateInvalidCode, "sm");
                this.resetCode();
              } else if (
                response.error.code === "NCB-0017" ||
                response.error.code === "NCB-0026"
              ) {
                // already entered
                this.openModal(this.templateAlreadyEntered, "sm");
                this.resetCode();
              } else if (response.error.code === "NCB-0007") {
                // already entered
                this.openModal(this.memberNotFound, "sm");
                this.resetCode();
              } else if (response.error.code === "NCB-0027") {
                this.openModal(this.templateMiniSpend, "sm");
                // this.openModal(this.templateDuplicateValuesEntered, "sm");
                this.resetCode();
              } else {
                this.openModal(this.templateInvalidCode, "sm"); // invalid code
                this.resetCode();
              }
            } else if (response.entry_id) {
              // (response.type_out == 'getOutletInfo') {

              this.loadingStyle = "displaynone";
              this.buttonDisabled = false;
              // this.showSpentInput = true;
              this.confirmAnotherCode = true;
              this.showSpentInput = false;
              this.entryid = response.entry_id;
              console.log(this.entryid);
              if (response.outlet_id) {
                // use to get the retailer allocated code is present.
                // this.needStoreName = false;
                this.centreName = response.centre_name;
                this.spentForm.value.store = response.outlet_id;
                this.outletId = response.outlet_id;
                this.outletName = response.outlet_name;
                // this.storeDB = true;
              }
              // else {
              //   this.needStoreName = true;
              // }

              if (!this.campaignCenterService.companyId) {
                this.campaignCenterService.companyId = response.company_id;
                // this.getStores();
              }
            }
          },
          (error) => {
            // console.log(error);
            this.submitted = false;
            this.openModal(this.serverErrorCode, "sm");
            this.resetCode();
          },
          () => {
            this.submitted = false;
          }
        );
    } else {
      this.errorMsg.message =
        "Please make sure your have entered the unique code";
      this.loadingStyle = "displaynone";
      this.buttonDisabled = false;
    }
  }
  onceAgainEnterCode() {
    this.showSpentInput = false;
    this.confirmAnotherCode = false;
    this.multipleCode = true;
    this.resetCode();
  }
  goBacktoConfirmation() {
    this.showSpentInput = false;
    this.confirmAnotherCode = true;
    this.multipleCode = true;
  }
  goToSpent() {
    this.showSpentInput = true;
    this.confirmAnotherCode = false;
    this.needStoreName = true;
    this.multipleCode = false;
  }
  onSpent(email: string) {
    this.spendStyles = [];
    this.loadingStyle = "displayinlineblock";
    this.buttonDisabled = true;
    this.errorMsg.message = "";
    console.log(this.spentForm.value);
    // console.log(this.spentForm.controls.spentretailer);
    // console.log(this.spentForm.value.spentretailer.length);
    // this.purchaseamt = this.spentForm.value.spend;
    // this.purchaseDate();//use it when you have purchase date
    let ind = 0;
    let totalSpend = 0;
    let validateStore = 0;
    for (const sp of this.spentForm.controls.spentretailer.value) {
      let spendStyleMsg;
      let storeStyleMsg;
      let purchaseDateStyleMsg;
      if (sp.spend && sp.spend !== "") {
        spendStyleMsg = "success-msg";
      } else {
        spendStyleMsg = "error-msg";
        this.errorMsg.valid = false;
        this.errorMsg.message += "\nPlease enter value."; // In spend field number-' + (ind + 1);
        this.errorMsg.type = "spend";
        this.loadingStyle = "displaynone";
        this.storeStyle = "error-msg";
        this.buttonDisabled = false;
      }

      if (sp.store && sp.store !== "") {
        let retailer = this.retailersOfSelectedCenter.filter(
          (item) =>
            item.name.toLowerCase().trim() === sp.store.toLowerCase().trim()
        );

        if (retailer && retailer[0]) {
          storeStyleMsg = "success-msg";
          this.outletId = this.spentForm.value.store;
        } else {
          validateStore++;
          storeStyleMsg = "error-msg";
          this.errorMsg.valid = false;
          this.errorMsg.message +=
            "\nThis retailer is not included in this promotion";
          this.errorMsg.type = "store";
          this.loadingStyle = "displaynone";
          this.buttonDisabled = false;
        }
      } else {
        storeStyleMsg = "error-msg";
        this.errorMsg.valid = false;
        this.errorMsg.message += "\nPlease enter store name."; // In store field number-' + (ind + 1);
        this.errorMsg.type = "store";
        this.loadingStyle = "displaynone";
        this.buttonDisabled = false;
      }
      if (sp.purchaseDate && sp.purchaseDate !== "") {
        purchaseDateStyleMsg = "success-msg";
      } else {
        purchaseDateStyleMsg = "error-msg";
        this.errorMsg.valid = false;
        this.errorMsg.message += "\nPlease enter date of purchase."; // In spend field number-' + (ind + 1);
        this.errorMsg.type = "purchaseDate";
        this.loadingStyle = "displaynone";
        this.purchaseDateStyle = "error-msg";
        this.buttonDisabled = false;
      }
      this.errorMsg.message += "\n";

      this.spendStyles[ind] = spendStyleMsg;
      this.storeStyles[ind] = storeStyleMsg;
      this.purchaseDateStyles[ind] = purchaseDateStyleMsg;
      ind++;
      totalSpend += sp.spend;
    }
    if (
      this.spentForm.controls.spentretailer.status === "VALID" &&
      validateStore < 1
    ) {
      console.log("passing entercode");
      // this.callUnique();
      if (totalSpend < this.minispend) {
        this.errorMsg.valid = false;
        this.errorMsg.message +=
          "\nPurchase amount should be minimum $" + this.minispend + ".";
        this.errorMsg.type = "spend";
        this.loadingStyle = "displaynone";
        this.buttonDisabled = false;
        this.openModal(this.customError, "sm");
        // this.openModal(this.customError1);
        return;
      } else if (totalSpend > this.maxspend) {
        this.errorMsg.valid = false;
        this.errorMsg.message +=
          "\nYour spend looks rather high, please enter the correct spend and retain your receipt to claim your prize.Spend must not exceed $9,999.";
        this.errorMsg.type = "spend";
        this.loadingStyle = "displaynone";
        this.buttonDisabled = false;
        // this.openModal(this.customError);
        this.openModal(this.customError1, "sm");
        return;
      } else {
        this.enterReceipts(this.entryid);
      }
    } else {
      console.log("not passing", this.spentForm.controls.spentretailer.status);
      return;
    }

    // if (this.spentForm.controls.spend.status === 'INVALID' ||
    //   this.spentForm.controls.spend.value < this.minispend) {
    //   if (this.spentForm.controls.spend.value < this.minispend) {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nPurchase amount should be minimum $' + this.minispend + '.';
    //     this.errorMsg.type = 'spend';
    //     this.spendStyle = 'error-msg';
    //     this.openModal(this.customError);
    //     this.resetSpent();
    //   } else {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nPurchase amount should be numbers only.';
    //     this.errorMsg.type = 'spend';
    //     this.spendStyle = 'error-msg';
    //   }
    //   this.loadingStyle = 'displaynone';
    //   this.buttonDisabled = false;
    // } else {
    //   this.spendStyle = 'success-msg';
    // }

    // console.log(this.needStoreName, this.storeDB,
    //   this.spentForm.controls.store.status,
    //   this.spentForm.controls.spend.status,
    //   this.spentForm.controls.spend.value < this.minispend,
    //   this.code1, this.outletId, this.purchaseamt);
    // if (this.needStoreName && !this.storeDB) {
    //   console.log(this.spentForm.value.store);
    //   if (this.spentForm.controls.store.status === 'INVALID') {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nWe need your store name.';
    //     this.errorMsg.type = 'store';
    //     this.storeStyle = 'error-msg';
    //     this.loadingStyle = 'displaynone';
    //     this.buttonDisabled = false;
    //   } else {
    //     this.storeStyle = 'success-msg';
    //     this.outletId = this.spentForm.value.store;
    //   }
    // }
    // this.spentForm.controls.purchaseDate.status==='VALID' &&
    // this.spentForm.controls.store.status==='VALID' &&
    // && this.purchaseValidation===true
    // && this.purchaseFutureValidation===true
    // if (this.needStoreName && !this.storeDB) {
    //   if (this.spentForm.controls.store.status === 'VALID' && this.code1 && this.purchaseamt && this.purchaseamt >= this.minispend) {
    //     console.log('passing entercode');
    //     this.callUnique();
    //   } else {
    //     console.log('not passing');
    //     return;
    //   }
    // }
    // else {
    //   if (this.outletId && this.code1 && this.purchaseamt && this.purchaseamt >= this.minispend) {
    //     console.log('passing entercode');//,this.outletId , this.code1,this.purchaseamt, this.minispend,this.purchaseamt>= this.minispend
    //     this.callUnique();
    //   } else {
    //     console.log('not passing');
    //     return;
    //   }
    // }
  }
  purchaseDate() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    // this.myDate = this.spentForm.controls.purchaseDate.value instanceof Date;
    this.myDate = this.spentForm.value.purchaseDate;
    console.log("mydate = ", this.myDate);
    // const myDataArray = this.spentForm.get("spentretailer") as FormArray;
    // const my = myDataArray.at(myDataArray.length - 1);
    // console.log(my.value, myDataArray.length - 1);
    // this.myDate = my.value.purchaseDate;
    // console.log('My date of purchase date',this.spentForm.controls.purchaseDate.value);
    // var tmp=this.datePipe.transform(this.spentForm.controls.purchaseDate.value, 'dd/MM/yyyy HH:mm:ss');
    if (this.myDate) {
      // this.purDate = this.spentForm.controls.purchaseDate.value;
      this.purDate = this.myDate;
      // console.log('assign',this.purDate);
    } else {
      // const dateParts = this.spentForm.controls.purchaseDate.value.split('-');
      const dateParts = this.myDate.split("-");
      this.purDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    }
    // console.log('assign 555 ',this.purDate);
    // // if(this.purDate.getHours()===0){
    //   console.log(this.purDate.getHours());
    //   this.purDate.setHours(this.purDate.getHours()+9);
    //   console.log(this.purDate.getHours());
    // // }
    // console.log(this.purDate);
    //closing it 13nov

    // if (this.purDate.getTime() >= this.minDate.getTime() && this.purDate.getTime() <= this.maxDate.getTime()) {
    //   this.purchaseValidation = true;
    //   console.log('opened');
    // } else {
    //   this.purchaseValidation = false;
    //   console.log('closed');
    // }

    // to confirm purchase date is not in future
    // if (this.purDate.getTime() > this.today.getTime()) {
    //   this.purchaseFutureValidation = false;
    //   console.log('future');
    // } else {
    //   this.purchaseFutureValidation = true;
    //   console.log('current');
    // }

    // this.purDate=this.spentForm.controls.purchaseDate.value;
    // console.log(this.purDate);
    // let purchaseDateString = (this.spentForm.controls.purchaseDate.value);
    // let purchaseDateString = this.myDate;
    // console.log('purchaseDateString + ' + purchaseDateString);
    // this.purDate.setHours(d.toTimeString());
    // console.log(this.code1, this.outletId);
    // console.log(this.spentForm.controls.spend.status, this.spentForm.controls.spend.value, this.spendStyle);

    // if(!){
    //   console.log('true gettime');
    // }
    // else{
    //   console.log('false gettime');
    // }
    // to Confirm that purchase date in within the promotion period

    // converting the date format after check the validation date of purchase promotion period and not future date
    // if (purchaseDateString) {
    //   if (!(purchaseDateString instanceof Date)) {
    //     const dateParts = purchaseDateString.split('/');
    //     purchaseDateString = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
    //   }

    // console.log('purchaseDateString : '+purchaseDateString);
    // if(this.datePipe.transform(purchaseDateString, 'dd/MM/yyyy') !== purchaseDateString) {
    //     this.spentForm.patchValue({
    //       purchaseDate:this.datePipe.transform(purchaseDateString, 'dd/MM/yyyy')
    //     });
    // }
    // }

    // console.log('purchase date status',this.spentForm.controls.purchaseDate.status);

    // console.log(this.spentForm.controls['purchaseDate'].value);
    // console.log('different format : '+this.spentForm.controls.purchaseDate.status);
    // console.log(this.spentForm.controls.purchaseDate.status,this.purchaseValidation,this.purchaseFutureValidation );

    // const myStatus = my.value.purchaseDate;
    // if (this.spentForm.controls.purchaseDate.status === 'INVALID'
    //   || this.purchaseValidation === false
    //   || this.purchaseFutureValidation === false) {
    //   if (this.purchaseFutureValidation === false) {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nInvalid date.';
    //     this.errorMsg.type = 'spend';
    //     this.purchaseDateStyle = 'error-msg';
    //   }
    //   if (this.purchaseValidation === false) {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nYour purchase must be made within the promotional period to enter this competition.';
    //     this.errorMsg.type = 'spend';
    //     this.purchaseDateStyle = 'error-msg';
    //   }
    //   if (this.spentForm.controls.purchaseDate.status === 'INVALID') {
    //     this.errorMsg.valid = false;
    //     this.errorMsg.message += '\nPlease select a date from the date selector.';
    //     this.errorMsg.type = 'spend';
    //     this.purchaseDateStyle = 'error-msg';
    //   }
    //   this.loadingStyle = 'displaynone';
    //   this.buttonDisabled = false;
    // } else {
    //   this.purchaseDateStyle = 'success-msg';
    // }
  }
  callUnique() {
    if (this.submitted) {
      this.errorMsg.message = "";
      return;
    }
    this.submitted = true;
    // this.purDate=this.spentForm.value.purchaseDate;
    // this.purchaseamt = this.spentForm.value.spend;
    // console.log(this.code1, this.outletId, this.purchaseamt);
    // this.uniqueCode(this.code1); //use it when unique code is needed
    // this.noUniqueCode(this.outletId,this.purDate, this.purchaseamt);//use it when unique code is not needed
  }
  enterReceipts(entryId) {
    // let i = 0;
    // const receipts = [];

    // for (const item of this.spentForm.controls.spentretailer.value) {

    //   receipts[i] = {
    //     store: item.store,
    //     amountSpent: item.spend,
    //     purchasedate: item.purchasedate,
    //   };
    //   i++;
    // }
    // console.log('this.spentForm.value.purchaseDate = ', this.spentForm.value.purchaseDate)
    // return false;
    const purchaseDate = this.spentForm.value.purchaseDate;
    const myDataArray = this.spentForm.get("spentretailer") as FormArray;
    const receipts = [];
    myDataArray.value.map((each) => {
      receipts.push({
        store: each.store,
        amountSpent: each.spend,
        // purchasedate: this.datePipe.transform(purchaseDate, "yyyy-MM-dd"),
        purchasedate: this.datePipe.transform(each.purchaseDate, "yyyy-MM-dd"),
      });
    });
    // Pending
    // Todo: Pass the receipts variable as an array and send it to the service
    console.log("receipts = ", receipts);

    this.campaignCenterService.enterReceipts(this.entryid, receipts).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          if (response.error.code === "NCB-0022") {
            // invalid entry
            this.openModal(this.templateEntryInvalid, "sm");
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
          } else if (
            response.error.code === "NCB-0017" ||
            response.error.code === "NCB-0013" ||
            response.error.code === "NCB-0026"
          ) {
            // already entered today
            this.openModal(this.templateAlreadyEntered, "sm");
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
          } else if (response.error.code === "NCB-0007") {
            // already entered
            this.openModal(this.memberNotFound, "sm");
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
          } else if (response.error.code === "NCB-0027") {
            // duplicate details, already entered
            this.openModal(this.templateMiniSpend, "sm");
            // this.openModal(this.templateDuplicateValuesEntered, "sm");
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
          } else {
            this.openModal(this.serverErrorCode, "sm");
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
          }
        } else if (response.entry_id) {
          this.campaignCenterService.weeklyEntry =
            response.numberEntriesThisWeek;
          // console.log(this.campaignCenterService.weeklyEntry);
          this.campaignCenterService.numberEntriesBySpend =
            response.numberEntriesBySpend;

          this.campaignCenterService.prizeInfoTymsg = response.prize_info_tymsg;
          this.campaignCenterService.prizeInfoTymsg1 =
            response.prize_info_tymsg1;
          this.campaignCenterService.prizeInfoTymsg2 =
            response.prize_info_tymsg2;
          this.campaignCenterService.prizeInfoTymsg3 =
            response.prize_info_tymsg3;

          if (response.prize_info) {
            if (response.prize_info_name !== null) {
              console.log("enter code page, has prize:");
              console.log(response.prize_info);
              this.campaignCenterService.prizeInfo = response.prize_info;
              this.campaignCenterService.prizeInfoName =
                response.prize_info_name;
              this.campaignCenterService.prizeInfoRetailer =
                response.prize_info_retailer;

              if (response.prizes_remaining) {
                this.campaignCenterService.prizesRemaining =
                  response.prizes_remaining;
              }

              this.loadingStyle = "displaynone";
              this.buttonDisabled = false;
              this.router.navigate(["/winner"], { relativeTo: this.route });
            }
          } else {
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
            this.router.navigate(["/thankyou"], { relativeTo: this.route });
          }
        }
      },
      (error) => {
        console.log("error = ", error);
      },
      () => {}
    );
  }
  uniqueCode(code1) {
    this.campaignCenterService.uniqueCode(code1).subscribe(
      (response: any) => {
        console.log(response);
        this.submitted = false;
        if (response.error) {
          this.loadingStyle = "displaynone";
          this.buttonDisabled = false;
          /*
            NCB-0019 = If the code is used in the microsite (no subdomain) for a second time (used code)
            NCB-0020 = If the person is using a subdomain which is invalid
            (e.g. if they are using kiosk 004, when in fact there are only 3 setup).
            You will normally not reach this error, as there are other validations that would happen
            before hand that would stop you from viewing the campaign completely if the URL was invalid
            NCB-0021 = If the code is used in the kiosk for a second time (used code)
            NCB-0013 =Sorry, cannot enter the campaign, you have already entered today
            */
          if (response.error.code === "NCB-0015") {
            // invalid code
            this.openModal(this.templateInvalidCode, "sm");
            this.resetCode();
          } else if (
            response.error.code === "NCB-0017" ||
            response.error.code === "NCB-0026"
          ) {
            // already entered
            this.openModal(this.templateAlreadyEntered, "sm");
            this.resetCode();
          } else if (response.error.code === "NCB-0007") {
            // already entered
            this.openModal(this.memberNotFound, "sm");
            this.resetCode();
          } else if (response.error.code === "NCB-0027") {
            // already entered
            this.openModal(this.templateMiniSpend, "sm");
            // this.openModal(this.templateDuplicateValuesEntered, "sm");
            this.resetCode();
          } else {
            this.openModal(this.serverErrorCode, "sm");
            this.resetCode();
          }
        } else {
          this.enterReceipts(response.entry_id);

          // if (response.prize_info) {
          //   if (response.prize_info_name !== null) {
          //     console.log('enter code page, has prize:');
          //     console.log(response.prize_info);
          //     this.campaignCenterService.prize_info = response.prize_info;
          //     this.campaignCenterService.prize_info_name = response.prize_info_name;
          //     this.campaignCenterService.prize_info_retailer = response.prize_info_retailer;
          //     // localStorage.setItem('prize_info', response.prize_info);
          //     // // localStorage.setItem('purchase_amount', response.prize_info_name);
          //     // localStorage.setItem('prize_info_name', response.prize_info_name);
          //     // localStorage.setItem('prize_info_retailer', response.prize_info_retailer);
          //     // this.submitted = false;
          //     this.loadingStyle = 'displaynone';
          //     this.buttonDisabled = false;
          //     this.router.navigate(['/winner'], { relativeTo: this.route });
          //   }
          //   else {
          //     this.loadingStyle = 'displaynone';
          //     this.buttonDisabled = false;
          //     this.router.navigate(['/thankyou'], { relativeTo: this.route });
          //   }
          // }
          // else {
          this.loadingStyle = "displaynone";
          this.buttonDisabled = false;
          // this.router.navigate(['/thankyou'], { relativeTo: this.route });
          // }
        }
      },
      (error) => {
        console.log(error);
        this.loadingStyle = "displaynone";
        this.buttonDisabled = false;
        this.openModal(this.serverErrorCode, "sm");
        this.resetCode();
      },
      () => {
        this.submitted = false;
      }
    );
  }
  noUniqueCode(outletId, purDate, purchaseamt) {
    // no unique but spend and store only
    // console.log(outletId, purchaseamt);
    this.campaignCenterService
      .noUniqueCode(outletId, purDate, purchaseamt)
      .subscribe((response1) => {
        // console.log(response1);
        this.errorcode = response1.error;
        if (this.errorcode) {
          this.loadingStyle = "displaynone";
          this.buttonDisabled = false;
          this.openModal(this.serverErrorCode, "sm");
        } else {
          if (response1.prize_info) {
            // console.log('enter code page, has prize:');
            // console.log(response1.prize_info);
            if (response1.prize_info_name !== null) {
              console.log("winner");
              localStorage.setItem("prize_info", response1.prize_info);
              // localStorage.setItem('purchase_amount', response.prize_info_name);
              localStorage.setItem(
                "prize_info_name",
                response1.prize_info_name
              );
              // localStorage.setItem('prize_info_retailer', response1.prize_info_retailer);
              // this.submitted = false;
              this.loadingStyle = "displaynone";
              this.buttonDisabled = false;
              this.router.navigate(["/winner"], { relativeTo: this.route });
            } else {
              console.log("losser");
              this.loadingStyle = "displaynone";
              this.buttonDisabled = false;
              this.router.navigate(["/thankyou"], { relativeTo: this.route });
            }
          } else {
            this.loadingStyle = "displaynone";
            this.buttonDisabled = false;
            this.router.navigate(["/thankyou"], { relativeTo: this.route });
          }
        }
      });
  }
  getStores(event, key) {
    this.showStoreByKey = key;
    const keyword = event.target.value.trim();
    if (keyword.length) {
      this.campaignCenterService
        .getStores(keyword)
        .subscribe((response: any) => {
          this.refStores = response.output;
        });
    } else {
      this.refStores = [];
    }
  }
  closeModalToHome() {
    this.modalRef.hide();
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
  backHome() {
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
  // getStores() {
  //   this.spentForm.controls['store'].valueChanges
  //     .debounceTime(200)
  //     .distinctUntilChanged()
  //     .switchMap((store) => this.campaignCenterService.getStores(store))
  //     .subscribe(
  //       (response: any) => {
  //         if (response.output &&
  //           response.output.length) {
  //             // console.log('length of retailer',response.output.length);
  //           this.refStores = [];
  //           this.lensub=10;
  //           if(this.lensub>=response.output.length){
  //             this.lensub=response.output.length;
  //           }
  //             for (var i = 0; i < this.lensub; i++) {
  //               this.listStores[i] = response.output[i];
  //               this.refStores[i] = this.listStores[i];
  //               this.retaillen=1;
  //               this.displayblock();
  //             }
  //         }
  //         else if(response.output.length===0){
  //           // console.log('length of retailer',response.output.length);
  //             this.retaillen=0;
  //             this.refStores = [];
  //             this.displaynone();
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         console.log('completed');
  //       }
  //     );
  // }

  fill(key, storeId, storeName) {
    // console.log(this.spentForm.value.spentretailer);
    this.spentForm["controls"]["spentretailer"]["controls"][key].patchValue({
      store: storeName,
    });
    this.refStores = [];
    // this.spentForm.patchValue({
    //   spentretailer[key]: ({store: storeName})
    // });

    // this.spentForm.controls.spentretailer.patchValue([this.fb.group[store]]);
    // .controls['store'].patchValue([store ]);
    // this.spentForm.patchValue({[store]: store});

    // this.displaynone();
    // this.outletIdArr.push[id];
  }
  /*drop down list of retailer function*/
  async retailerList() {
    // for one center
    this.centers = JSON.parse(localStorage.getItem("centers"));
    // this.centerOne = this.centers[0];
    // // console.log(this.centerOne.retailers);
    // this.retailersOfSelectedCenter = this.centerOne.retailers;
    // console.log(this.retailersOfSelectedCenter)

    const getCenterByCompany = await this.centers.filter(
      (item) => item.id == this.campaignCenterService.companyId
    );
    this.centerOne = getCenterByCompany[0];
    this.retailersOfSelectedCenter = this.centerOne.retailers;
  }
  onChangePurcharse(event) {
    var item = this.spentForm.get("spentretailer") as FormArray;

    for (const sp of item.controls) {
      var itemGroup = sp as FormGroup;
      itemGroup.controls.purchaseDate.setValue(event);
    }

    this.showFormMultipleUniqueCode = event ? true : false;
  }
}
