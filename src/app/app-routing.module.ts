import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { SecurityGuard } from "./services/security.guard";
import { UniqueCodeComponent } from "./unique-code/unique-code.component";
import { ThankyouSimpleComponent } from "./thankyou/simple/thankyou-simple.component";
import { WinnerSimpleComponent } from "./winner/simple/winner-simple.component";
import { ThankyouScratchComponent } from "./thankyou/scratch/thankyou-scratch.component";
import { WinnerScratchComponent } from "./winner/scratch/winner-scratch.component";
import { ThankyouEnvelopeComponent } from "./thankyou/envelope/thankyou-envelope.component";
import { WinnerEnvelopeComponent } from "./winner/envelope/winner-envelope.component";
import { ThankyouCloudComponent } from "./thankyou/cloud/thankyou-cloud.component";
import { WinnerCloudComponent } from "./winner/cloud/winner-cloud.component";
import { ThankyouWardrobeComponent } from "./thankyou/wardrobe/thankyou-wardrobe.component";
import { WinnerWardrobeComponent } from "./winner/wardrobe/winner-wardrobe.component";
import { WinnerCarbootComponent } from "./winner/carboot/winner-carboot.component";
import { ThankyouCarbootComponent } from "./thankyou/carboot/thankyou-carboot.component";
import { WinnerSafelockerComponent } from "./winner/safelocker/winner-safelocker.component";
import { ThankyouSafelockerComponent } from "./thankyou/safelocker/thankyou-safelocker.component";
import { ThankyouPlantanimationComponent } from "./thankyou/plantanimation/thankyou-plantanimation.component";
import { WinnerPlantanimationComponent } from "./winner/plantanimation/winner-plantanimation.component";
import { MultipleUniqueCodeComponent } from "./unique-code/multiple-unique-code.component";
import { ThankyouSpinwheelComponent } from "./thankyou/spinwheel/thankyou-spinwheel.component";
import { WinnerSpinwheelComponent } from "./winner/spinwheel/winner-spinwheel.component";
import { ThankyouGiftboxComponent } from "./thankyou/giftbox/thankyou-giftbox.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { FinishComponent } from "./finish/finish.component";
import { WinnerGiftboxComponent } from "./winner/giftbox/winner-giftbox.component";
import { ThankyouPostboxComponent } from "./thankyou/postbox/thankyou-postbox.component";
import { WinnerPostboxComponent } from "./winner/postbox/winner-postbox.component";
import { WinnerGiftbox2dComponent } from "./winner/giftbox2d/winner-giftbox2d.component";
import { ThankyouGiftbox2dComponent } from "./thankyou/giftbox2d/thankyou-giftbox2d.component";
import { ThankyouGingerbreadComponent } from "./thankyou/gingerbread/thankyou-gingerbread.component";
import { WinnerGingerbreadComponent } from "./winner/gingerbread/winner-gingerbread.component";
import { ThankyouPoolComponent } from "./thankyou/pool/thankyou-pool.component";
import { WinnerPoolComponent } from "./winner/pool/winner-pool.component";
import { ThankyouCookiesComponent } from "./thankyou/cookies/thankyou-cookies.component";
import { WinnerCookiesComponent } from "./winner/cookies/winner-cookies.component";
import { CentreselectComponent } from "./centreselect/centreselect.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: 'welcome', component: WelcomeComponent },
  // { path: "centre", component: CentreselectComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  {
    // 1 box one code design good to use it
    path: "entercode",
    component: MultipleUniqueCodeComponent,
    // canActivate: [SecurityGuard],
  },

  {
    path: "thankyou",
    component: ThankyouSimpleComponent,
    // , canActivate: [SecurityGuard]
  },
  {
    path: "winner",
    component: WinnerSimpleComponent,
    // canActivate: [SecurityGuard],
  },
  // {
  //   // 1 box one code design good to use it but multiple time unique and multiple receipts
  //   path: 'entercode',
  //   component: MultipleUniqueCodeComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  // just to fadeIn
  // path: 'thankyou',
  // component: ThankyouGiftboxComponent
  // , canActivate: [SecurityGuard]
  // },
  // {
  //   // just to fadeIn
  //   path: "winner",
  //   component: WinnerEnvelopeComponent,
  //   // canActivate: [SecurityGuard],
  // },
  // {
  //   // scratch card
  //   path: "thankyou",
  //   component: ThankyouEnvelopeComponent,
  //   // canActivate: [SecurityGuard],
  // },
  // {
  //   // scratch card
  //   path: 'winner',
  //   component: WinnerScratchComponent
  //   , canActivate: [SecurityGuard]
  // },
  // {
  //   // envelope
  //   path: 'thankyou',
  //   component: ThankyouEnvelopeComponent
  //   ,canActivate: [SecurityGuard]
  // },
  // {
  //   // envelope
  //   path: 'winner',
  //   component: WinnerEnvelopeComponent
  //   ,canActivate: [SecurityGuard]
  // },
  // {
  //   // cloud passing, coing falling and scratch card
  //   path: 'thankyou3',
  //   component: ThankyouCloudComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // cloud passing, coing falling and scratch card
  //   path: 'winner3',
  //   component: WinnerCloudComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // wardrobe opening
  //   path: 'thankyou4',
  //   component: ThankyouWardrobeComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // wardrobe opening
  //   path: 'winner4',
  //   component: WinnerWardrobeComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // carboot opening
  //   path: 'thankyou5',
  //   component: ThankyouCarbootComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // carboot opening
  //   path: 'winner5',
  //   component: WinnerCarbootComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // safelocker opening
  //   path: 'thankyou',
  //   component: ThankyouSafelockerComponent
  //   ,canActivate: [SecurityGuard]
  // },
  // {
  //   // safelocker opening
  //   path: 'winner',
  //   component: WinnerSafelockerComponent
  //   ,canActivate: [SecurityGuard]
  // },
  // {
  //   // plant bush move to sides
  //   path: 'thankyou7',
  //   component: ThankyouPlantanimationComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // plant bush move to sides
  //   path: 'winner7',
  //   component: WinnerPlantanimationComponent
  //   // , canActivate: [SecurityGuard]
  // },
  // {
  //   // simple spin wheel rotation
  //   path: 'thankyou8',
  //   component: ThankyouSpinwheelComponent
  //   // ,canActivate: [SecurityGuard]
  // },
  // {
  //   // simple spin wheel rotation
  //   path: 'winner8',
  //   component: WinnerSpinwheelComponent
  //   // , canActivate: [SecurityGuard]
  // },
  // {
  //   path: "thankyou9",
  //   component: ThankyouGiftboxComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: "winner9",
  //   component: WinnerGiftboxComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'thankyou10',
  //   component: ThankyouGiftbox2dComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'winner10',
  //   component: WinnerGiftbox2dComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'thankyou11',
  //   component: ThankyouPostboxComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'winner11',
  //   component: WinnerPostboxComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'thankyou12',
  //   component: ThankyouGingerbreadComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   path: 'winner12',
  //   component: WinnerGingerbreadComponent,
  //   // canActivate: [SecurityGuard]
  // },
  // {
  //   // just to fadeIn
  //   path: 'thankyou',
  //   component: ThankyouPoolComponent
  //   , canActivate: [SecurityGuard]
  // },
  // {
  //   // just to fadeIn
  //   path: 'winner',
  //   component: WinnerPoolComponent
  //   , canActivate: [SecurityGuard]
  // },
  // {
  //   // just to fadeIn
  //   path: 'thankyou',
  //   component: ThankyouCookiesComponent
  //   // , canActivate: [SecurityGuard]
  // },
  // {
  //   // just to fadeIn
  //   path: 'winner',
  //   component: WinnerCookiesComponent
  //   // , canActivate: [SecurityGuard]
  // },
  // { path: 'finish', component: FinishComponent, canActivate: [SecurityGuard] },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
