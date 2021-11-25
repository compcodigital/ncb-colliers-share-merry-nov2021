import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  OnChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignCenterService } from '../services/campaigncenter.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorMsg } from '../shared/errorMsg';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Center } from '../shared/center';
import { Retailer } from '../shared/retailer';

@Component({
  selector: 'app-unique-code',
  templateUrl: './unique-code.component.html',
  styleUrls: ['./unique-code.component.scss']
})
export class UniqueCodeComponent implements OnInit {
  code1: string;
  modalRef: BsModalRef;
  @ViewChild('templateAlreadyEntered', { static: false })
  templateAlreadyEntered: TemplateRef<any>;
  @ViewChild('kioskAlreadyEntered', { static: false })
  kioskAlreadyEntered: TemplateRef<any>;
  @ViewChild('templateInvalidCode', { static: false })
  templateInvalidCode: TemplateRef<any>;
  @ViewChild('participat', { static: false }) participat: TemplateRef<any>;
  @ViewChild('serverErrorCode', { static: false }) serverErrorCode: TemplateRef<
    any
  >;
  @ViewChild('customError', { static: false }) customError: TemplateRef<any>;
  @ViewChild('customError1', { static: false }) customError1: TemplateRef<any>;
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
  errorcode;
  purDate;
  refStores: any = [];
  listStores: any = [];
  lensub: number;
  retaillen: number;
  errorMsg = new ErrorMsg();
  spentForm: FormGroup;
  showSpentInput: boolean;
  needStoreName: boolean;
  storeDB: boolean;
  storeStyle: string;
  spendStyle: string;
  displayStyle: string;
  purchaseDateStyle: string;
  loadingStyle: string;
  minispend;
  maxspend: number;
  isMobile: boolean;
  purchaseValidation: boolean;
  purchaseFutureValidation: boolean;
  campaignOpenDate: any; // = new Date('MARCH 31, 2019 21:00:00');
  campaignCloseDate: any; // = new Date('MARCH 31, 2019 21:00:00');
  today: Date;
  minDate: Date;
  maxDate: Date;
  myDate: boolean;
  buttonDisabled: boolean;
  acc: string;//check auto complete browser

  constructor(
    public campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private datePipe: DatePipe
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
    this.today.setHours(0);
    console.log(this.today);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-customize oops' })
    );
    // console.log(this.modalRef);
  }

  ngOnInit() {
    this.checkAuto();
    this.submitted = false;
    this.buttonDisabled = false;
    this.showSpentInput = false;
    this.needStoreName = false;
    this.storeDB = false;
    this.loadingStyle = 'displaynone';
    this.isMobile = false;
    this.purchaseValidation = false;
    this.purchaseFutureValidation = false;
    this.maxspend = 10000;
    window.scroll(20, 0);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.isMobile = true;
    }
    this.minispend = this.campaignCenterService.minimumspend;
    // console.log(this.minispend);
    this.campaignOpenDate = this.datePipe.transform(
      this.campaignCenterService.opendate,
      'dd/MM/yyyy'
    );
    this.campaignCloseDate = this.datePipe.transform(
      this.campaignCenterService.closedate,
      'dd/MM/yyyy'
    );
    // this.minDate = new Date(this.campaignCenterService.opendate);
    this.minDate = new Date('May 13, 2019 00:00:00');
    // console.log(this.minDate);
    this.maxDate = new Date(this.campaignCenterService.closedate);
    // console.log(this.minispend,this.campaignOpenDate,this.campaignCloseDate,this.minDate,this.maxDate);

    /* customize the unique code,spend and store name section*/
    if (this.campaignCenterService.campaignType === 'spentOnly') {
      this.showSpentInput = true; // to make unique section  hide when need and show the spend section
      this.needStoreName = true; // to make visible of the retailer list
    }
    this.initForm();
    this.retailerList(); // use when its a drop down list for retailer (store name)

    // if (this.campaignCenterService.companyId) {
    //     this.getStores();
    // }
  }

  checkAuto() {
    if (navigator.userAgent.indexOf("Chrome") !== -1) {
      this.acc = "no";
    }
    else {
      this.acc = "off"
    }
  }
  displayblock() {
    this.displayStyle = 'displayblock';
    // console.log('block');
  }

  displaynone() {
    this.displayStyle = 'displaynone';
    // console.log('none');
  }

  private initForm() {
    this.spentForm = new FormGroup({
      // 'purchaseDate': new FormControl('', [
      //   Validators.required
      // ]),
      store: new FormControl('', [Validators.required]),
      spend: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/),
        Validators.min(this.minispend)
      ])
    });
  }

  onKeyUp(event: any) {
    this.errorMsg.valid = false;
    const value = event.target.value.replace(/\s/g, '');

    if (
      event.keyCode !== 9 &&
      event.keyCode !== 37 &&
      event.keyCode !== 38 &&
      event.keyCode !== 39 &&
      event.keyCode !== 40 &&
      event.keyCode !== 46
    ) {
      if (event.target.id === 'code1') {
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
          console.log('error');
          this.errorMsg.message =
            'Please make sure your have entered the unique code';
        }
      }
    }
  }

  resetCode() {
    this.code1 = '';
    this.errorMsg.valid = false;
  }
  resetSpent() {
    this.spentForm.value.spend = '';
    this.errorMsg.valid = false;
  }

  onEnterCode() {
    this.loadingStyle = 'displayinlineblock';
    this.buttonDisabled = true;
    if (this.errorMsg.valid) {
      this.errorMsg.message = '';

      if (this.submitted) {
        return;
      }

      this.submitted = true;

      this.campaignCenterService
        .uniqueCode(this.code1, this.outletId, this.purchaseamt, true)
        .subscribe(
          (response: any) => {
            this.submitted = false;
            console.log('response on unique', response);
            if (response.error) {
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              if (response.error.code === 'NCB-0015') {
                // invalid code
                this.openModal(this.templateInvalidCode);
                this.resetCode();
              } else if (response.error.code === 'NCB-0017') {
                // already entered
                this.openModal(this.templateAlreadyEntered);
                this.resetCode();
              } else {
                this.openModal(this.templateInvalidCode); // invalid code
                this.resetCode();
              }
            } else if (response.type_out === 'getOutletInfo') {
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              this.showSpentInput = true;

              if (response.outlet_id) {
                this.needStoreName = false;
                this.centreName = response.centre_name;
                this.spentForm.value.store = response.outlet_id;
                this.outletId = response.outlet_id;
                this.outletName = response.outlet_name;
                this.storeDB = true;
              } else {
                this.needStoreName = true;
              }

              if (!this.campaignCenterService.companyId) {
                this.campaignCenterService.companyId = response.company_id;
                // this.getStores();
              }
            } else if (response.entry_id) {
              if (response.prize_info_name !== null) {
                console.log("enter code page, has prize:");
                console.log(response.prize_info);
                this.campaignCenterService.prizeInfo = response.prize_info;
                this.campaignCenterService.prizeInfoName =
                  response.prize_info_name;
                this.campaignCenterService.prizeInfoRetailer =
                  response.prize_info_retailer;
                this.loadingStyle = "displaynone";
                this.buttonDisabled = false;
                this.router.navigate(["/winner"], { relativeTo: this.route });
              } else {
                this.loadingStyle = "displaynone";
                this.buttonDisabled = false;
                this.router.navigate(["/thankyou"], { relativeTo: this.route });
              }
            }
          },
          error => {
            // console.log(error);
            this.submitted = false;
            this.openModal(this.serverErrorCode);
            this.resetCode();
          },
          () => {
            this.submitted = false;
          }
        );
    } else {
      this.errorMsg.message =
        'Please make sure your have entered the unique code';
      this.loadingStyle = 'displaynone';
      this.buttonDisabled = false;
    }
  }
  purchaseDate() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    this.myDate = this.spentForm.controls.purchaseDate.value instanceof Date;
    // console.log('My date of purchase date',this.spentForm.controls.purchaseDate.value);
    // let tmp=this.datePipe.transform(this.spentForm.controls.purchaseDate.value, 'dd/MM/yyyy HH:mm:ss');
    if (this.myDate) {
      this.purDate = this.spentForm.controls.purchaseDate.value;
      // console.log('assign',this.purDate);
    } else {
      const dateParts = this.spentForm.controls.purchaseDate.value.split('-');
      this.purDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    }
    // console.log('assign 555 ',this.purDate);

    // // if(this.purDate.getHours()===0){
    //   console.log(this.purDate.getHours());
    //   this.purDate.setHours(this.purDate.getHours()+9);
    //   console.log(this.purDate.getHours());
    // // }
    // console.log(this.purDate);
    if (
      this.purDate.getTime() >= this.minDate.getTime() &&
      this.purDate.getTime() <= this.maxDate.getTime()
    ) {
      this.purchaseValidation = true;
      console.log('opened');
    } else {
      this.purchaseValidation = false;
      console.log('closed');
    }

    // to confirm purchase date is not in future
    if (this.purDate.getTime() > this.today.getTime()) {
      this.purchaseFutureValidation = false;
      console.log('future');
    } else {
      this.purchaseFutureValidation = true;
      console.log('current');
    }
    // this.purDate=this.spentForm.controls.purchaseDate.value;
    // console.log(this.purDate);
    let purchaseDateString = this.spentForm.controls.purchaseDate.value;
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
    if (purchaseDateString) {
      if (!(purchaseDateString instanceof Date)) {
        const dateParts = purchaseDateString.split('/');
        purchaseDateString = new Date(
          dateParts[2],
          dateParts[0] - 1,
          dateParts[1]
        );
      }

      // console.log('purchaseDateString : '+purchaseDateString);
      // if(this.datePipe.transform(purchaseDateString, 'dd/MM/yyyy') !== purchaseDateString) {
      //     this.spentForm.patchValue({
      //       purchaseDate:this.datePipe.transform(purchaseDateString, 'dd/MM/yyyy')
      //     });
      // }
    }

    // console.log('purchase date status',this.spentForm.controls.purchaseDate.status);

    // console.log(this.spentForm.controls['purchaseDate'].value);
    // console.log('different format : '+this.spentForm.controls.purchaseDate.status);
    // console.log(this.spentForm.controls.purchaseDate.status,this.purchaseValidation,this.purchaseFutureValidation );
    if (
      this.spentForm.controls.purchaseDate.status === 'INVALID' ||
      this.purchaseValidation === false ||
      this.purchaseFutureValidation === false
    ) {
      if (this.purchaseFutureValidation === false) {
        this.errorMsg.valid = false;
        this.errorMsg.message += '\nInvalid date.';
        this.errorMsg.type = 'spend';
        this.purchaseDateStyle = 'error-msg';
      }
      if (this.purchaseValidation === false) {
        this.errorMsg.valid = false;
        this.errorMsg.message +=
          '\nYour purchase must be made within the promotional period to enter this competition.';
        this.errorMsg.type = 'spend';
        this.purchaseDateStyle = 'error-msg';
      }
      if (this.spentForm.controls.purchaseDate.status === 'INVALID') {
        this.errorMsg.valid = false;
        this.errorMsg.message +=
          '\nPlease select a date from the date selector.';
        this.errorMsg.type = 'spend';
        this.purchaseDateStyle = 'error-msg';
      }
      this.loadingStyle = 'displaynone';
      this.buttonDisabled = false;
    } else {
      this.purchaseDateStyle = 'success-msg';
    }
  }
  onSpent(email: string) {
    this.loadingStyle = 'displayinlineblock';
    this.buttonDisabled = true;
    this.errorMsg.message = '';
    this.purchaseamt = this.spentForm.value.spend;
    // this.purchaseDate();//use it when you have purchase date
    if (
      this.spentForm.controls.spend.status === 'INVALID' ||
      this.spentForm.controls.spend.value < this.minispend ||
      this.spentForm.controls.spend.value > this.maxspend
    ) {
      if (this.spentForm.controls.spend.value < this.minispend) {
        this.errorMsg.valid = false;
        this.errorMsg.message +=
          '\nPurchase amount should be minimum $' + this.minispend + '.';
        this.errorMsg.type = 'spend';
        this.spendStyle = 'error-msg';
        this.openModal(this.customError);
        this.resetSpent();
      }
      else if (this.spentForm.controls.spend.value > this.maxspend) {
        this.errorMsg.valid = false;
        this.errorMsg.message += ' Your spend looks rather high, please enter the correct spend and retain your receipt to claim your prize.Spend must not exceed $9,999.';
        this.errorMsg.type = 'spend';
        this.spendStyle = 'error-msg';
        this.openModal(this.customError1);
        this.resetSpent();
      }
      else {
        this.errorMsg.valid = false;
        this.errorMsg.message += '\nPurchase amount should be numbers only.';
        this.errorMsg.type = 'spend';
        this.spendStyle = 'error-msg';
      }
      this.loadingStyle = 'displaynone';
      this.buttonDisabled = false;
    } else {
      this.spendStyle = 'success-msg';
    }
    console.log(
      this.needStoreName,
      this.storeDB,
      this.spentForm.controls.store.status,
      this.spentForm.controls.spend.status,
      this.spentForm.controls.spend.value < this.minispend,
      this.code1,
      this.outletId,
      this.purchaseamt
    );
    if (this.needStoreName && !this.storeDB) {
      console.log(this.spentForm.value.store);
      if (this.spentForm.controls.store.status === 'INVALID') {
        this.errorMsg.valid = false;
        this.errorMsg.message += '\nWe need your store name.';
        this.errorMsg.type = 'store';
        this.storeStyle = 'error-msg';
        this.loadingStyle = 'displaynone';
        this.buttonDisabled = false;
      } else {
        this.storeStyle = 'success-msg';
        this.outletId = this.spentForm.value.store;
      }
    }
    // this.spentForm.controls.purchaseDate.status==='VALID' &&
    // this.spentForm.controls.store.status==='VALID' &&
    // && this.purchaseValidation===true
    // && this.purchaseFutureValidation===true
    if (this.needStoreName && !this.storeDB) {
      if (
        this.spentForm.controls.store.status === 'VALID' &&

        this.purchaseamt &&
        this.purchaseamt >= this.minispend &&
        this.purchaseamt <= this.maxspend
      ) {// this.code1 &&
        console.log('passing entercode');
        this.callUnique();
      } else {
        console.log('not passing');
        return;
      }
    } else {
      if (
        this.outletId &&

        this.purchaseamt &&
        this.purchaseamt >= this.minispend &&
        this.purchaseamt <= this.maxspend
      ) {// this.code1 &&
        console.log('passing entercode'); // ,this.outletId , this.code1,this.purchaseamt, this.minispend,this.purchaseamt>= this.minispend
        this.callUnique();
      } else {
        console.log('not passing');
        return;
      }
    }
  }
  callUnique() {
    if (this.submitted) {
      this.errorMsg.message = '';
      return;
    }

    this.submitted = true;
    // this.purDate=this.spentForm.value.purchaseDate;
    this.purchaseamt = this.spentForm.value.spend;
    console.log(this.code1, this.outletId, this.purchaseamt);
    if (this.campaignCenterService.campaignType === 'uniqueCode') {
      this.uniqueCode(this.code1, this.outletId, this.purchaseamt); // use it when unique code is needed
    }
    if (this.campaignCenterService.campaignType === 'spentOnly') {
      this.noUniqueCode(this.outletId, this.purDate, this.purchaseamt); // use it when unique code is not needed
    }
  }
  uniqueCode(code1, outletId, purchaseamt) {
    this.campaignCenterService
      .uniqueCode(code1, outletId, purchaseamt)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.submitted = false;

          if (response.error) {
            this.loadingStyle = 'displaynone';
            this.buttonDisabled = false;
            /*
            NCB-0019 = If the code is used in the microsite (no subdomain) for a second time (used code)
            NCB-0020 = If the person is using a subdomain which is invalid
            (e.g. if they are using kiosk 004, when in fact there are only 3 setup).
            You will normally not reach this error, as there are other validations that would happen
            before hand that would stop you from viewing the campaign completely if the URL was invalid
            NCB-0021 = If the code is used in the kiosk for a second time (used code)
           */
            if (response.error.code === 'NCB-0015') {
              // invalid code
              this.openModal(this.templateInvalidCode);
              this.resetCode();
            } else if (response.error.code === 'NCB-0017') {
              // already entered
              this.openModal(this.templateAlreadyEntered);
              this.resetCode();
            } else {
              this.openModal(this.serverErrorCode);
              this.resetCode();
            }
          } else if (response.prize_info) {
            if (response.prize_info_name !== null) {
              console.log('enter code page, has prize:');
              console.log(response.prize_info);
              this.campaignCenterService.prizeInfo = response.prize_info;
              this.campaignCenterService.prizeInfoName =
                response.prize_info_name;
              this.campaignCenterService.prizeInfoRetailer =
                response.prize_info_retailer;
              // this.submitted = false;
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              this.router.navigate(['/winner'], { relativeTo: this.route });
            } else {
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              this.router.navigate(['/thankyou'], { relativeTo: this.route });
            }
          } else {
            this.loadingStyle = 'displaynone';
            this.buttonDisabled = false;
            this.router.navigate(['/thankyou'], { relativeTo: this.route });
          }
        },
        error => {
          console.log(error);
          this.loadingStyle = 'displaynone';
          this.buttonDisabled = false;
          this.openModal(this.serverErrorCode);
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
      .subscribe(response1 => {
        // console.log(response1);
        this.errorcode = response1.error;
        if (this.errorcode) {
          this.loadingStyle = 'displaynone';
          this.buttonDisabled = false;
          this.openModal(this.serverErrorCode);
        } else {
          if (response1.prize_info) {
            // console.log('enter code page, has prize:');
            // console.log(response1.prize_info);
            if (response1.prize_info_name !== null) {
              console.log('winner');
              // localStorage.setItem('prize_info', response1.prize_info);
              // // localStorage.setItem('purchase_amount', response.prize_info_name);
              // localStorage.setItem(
              //   'prize_info_name',
              //   response1.prize_info_name
              // );
              // localStorage.setItem('prize_info_retailer', response1.prize_info_retailer);
              // this.submitted = false; //thankyou
              this.campaignCenterService.prizeInfo = response1.prize_info;
              this.campaignCenterService.prizeInfoName = response1.prize_info_name;
              // this.campaignCenterService.prizeInfoRetailer = response1.prize_info_retailer;
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              this.router.navigate(['/winner'], { relativeTo: this.route });
            } else {
              console.log('losser');
              this.loadingStyle = 'displaynone';
              this.buttonDisabled = false;
              this.router.navigate(['/thankyou'], { relativeTo: this.route });
            }
          } else {
            this.loadingStyle = 'displaynone';
            this.buttonDisabled = false;
            this.router.navigate(['/thankyou'], { relativeTo: this.route });
          }
        }
      });
  }
  getStores(event) {
    const keyword = event.target.value.trim();
    if (keyword.length) {
      this.campaignCenterService
        .getStores(keyword)
        .subscribe((response: any) => {
          this.refStores = response.output;
          console.log(this.refStores);
        });
    } else {
      this.refStores = [];
    }
  }
  backHome() {
    this.router.navigate(['/home'], { relativeTo: this.route });
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
  //             for (let i = 0; i < this.lensub; i++) {
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

  fill(store) {
    // for autofill content when click
    console.log(store);
    this.spentForm.patchValue({ store });
    this.displaynone();
  }

  /* drop down list of retailer function*/
  retailerList() {
    // for one center
    this.centers = JSON.parse(localStorage.getItem('centers'));
    this.centerOne = this.centers[0];
    // console.log(this.centerOne.retailers);
    this.retailersOfSelectedCenter = this.centerOne.retailers;
  }
}
