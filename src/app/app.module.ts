import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { bootstrap } from "bootstrap";
import * as $ from "jquery";
import { PageFlip } from "page-flip";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CampaignCenterService } from "./services/campaigncenter.service";
import { SecurityGuard } from "./services/security.guard";
import { AutoFocusDirective } from "./directive/auto-focus.directive";

import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UniqueCodeComponent } from "./unique-code/unique-code.component";
import { WinnerCloudComponent } from "./winner/cloud/winner-cloud.component";
import { ThankyouCloudComponent } from "./thankyou/cloud/thankyou-cloud.component";
import { ThankyouEnvelopeComponent } from "./thankyou/envelope/thankyou-envelope.component";
import { WinnerEnvelopeComponent } from "./winner/envelope/winner-envelope.component";
import { WinnerScratchComponent } from "./winner/scratch/winner-scratch.component";
import { ThankyouScratchComponent } from "./thankyou/scratch/thankyou-scratch.component";
import { ThankyouWardrobeComponent } from "./thankyou/wardrobe/thankyou-wardrobe.component";
import { WinnerWardrobeComponent } from "./winner/wardrobe/winner-wardrobe.component";
import { WinnerSimpleComponent } from "./winner/simple/winner-simple.component";
import { ThankyouSimpleComponent } from "./thankyou/simple/thankyou-simple.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ThankyouCarbootComponent } from "./thankyou/carboot/thankyou-carboot.component";
import { WinnerCarbootComponent } from "./winner/carboot/winner-carboot.component";
import { ThankyouSafelockerComponent } from "./thankyou/safelocker/thankyou-safelocker.component";
import { WinnerSafelockerComponent } from "./winner/safelocker/winner-safelocker.component";
import { WinnerPlantanimationComponent } from "./winner/plantanimation/winner-plantanimation.component";
import { ThankyouPlantanimationComponent } from "./thankyou/plantanimation/thankyou-plantanimation.component";
import { MultipleUniqueCodeComponent } from "./unique-code/multiple-unique-code.component";
import { ThankyouSpinwheelComponent } from "./thankyou/spinwheel/thankyou-spinwheel.component";
import { WinnerSpinwheelComponent } from "./winner/spinwheel/winner-spinwheel.component";
import { TermsComponent } from "./terms/terms.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ThankyouGiftboxComponent } from "./thankyou/giftbox/thankyou-giftbox.component";
import { WinnerGiftboxComponent } from "./winner/giftbox/winner-giftbox.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { FinishComponent } from "./finish/finish.component";
import { ThankyouPostboxComponent } from "./thankyou/postbox/thankyou-postbox.component";
import { WinnerPostboxComponent } from "./winner/postbox/winner-postbox.component";
import { WinnerGiftbox2dComponent } from "./winner/giftbox2d/winner-giftbox2d.component";
import { ThankyouGiftbox2dComponent } from "./thankyou/giftbox2d/thankyou-giftbox2d.component";
import { ThankyouGingerbreadComponent } from "./thankyou/gingerbread/thankyou-gingerbread.component";
import { WinnerGingerbreadComponent } from "./winner/gingerbread/winner-gingerbread.component";
import { WinnerPoolComponent } from "./winner/pool/winner-pool.component";
import { ThankyouPoolComponent } from "./thankyou/pool/thankyou-pool.component";
import { ThankyouCookiesComponent } from "./thankyou/cookies/thankyou-cookies.component";
import { WinnerCookiesComponent } from "./winner/cookies/winner-cookies.component";
import { BreadcrumComponent } from "./breadcrum/breadcrum.component";
import { CentreselectComponent } from "./centreselect/centreselect.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    UniqueCodeComponent,
    WinnerCloudComponent,
    ThankyouCloudComponent,
    ThankyouEnvelopeComponent,
    WinnerEnvelopeComponent,
    WinnerScratchComponent,
    ThankyouScratchComponent,
    ThankyouWardrobeComponent,
    WinnerWardrobeComponent,
    WinnerSimpleComponent,
    ThankyouSimpleComponent,
    ThankyouCarbootComponent,
    WinnerCarbootComponent,
    ThankyouSafelockerComponent,
    WinnerSafelockerComponent,
    WinnerPlantanimationComponent,
    ThankyouPlantanimationComponent,
    MultipleUniqueCodeComponent,
    ThankyouSpinwheelComponent,
    WinnerSpinwheelComponent,
    TermsComponent,
    PrivacyComponent,
    ThankyouGiftboxComponent,
    WinnerGiftboxComponent,
    ThankyouGiftbox2dComponent,
    WinnerGiftbox2dComponent,
    WelcomeComponent,
    FinishComponent,
    ThankyouPostboxComponent,
    WinnerPostboxComponent,
    ThankyouGingerbreadComponent,
    WinnerGingerbreadComponent,
    ThankyouPoolComponent,
    WinnerPoolComponent,
    ThankyouCookiesComponent,
    WinnerCookiesComponent,
    BreadcrumComponent,
    CentreselectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgbModule,
  ],
  providers: [SecurityGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
