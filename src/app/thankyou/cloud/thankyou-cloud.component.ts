import { Component, OnInit, ElementRef, TemplateRef, ViewChild, AfterViewInit, Input, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { takeUntil, pairwise, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-thankyou-cloud',
  templateUrl: './thankyou-cloud.component.html',
  styleUrls: ['./thankyou-cloud.component.scss']
})
export class ThankyouCloudComponent implements OnInit, AfterViewInit, OnDestroy {
  website: string;
  public container = document.getElementById('js-container');
  private image: HTMLImageElement = new Image();
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  @ViewChild('canvas_box', { static: false }) canvas: ElementRef;
  @ViewChild('img', { static: false }) img: ElementRef;
  @ViewChild('wincon', { static: false }) wincont: ElementRef;
  // setting a width and height for the canvas
  @Input() public width = 1212;
  @Input() public height = 750;
  public canvasHeight: any;
  public canvasWidth: any;
  src: string;
  private ctx: CanvasRenderingContext2D;
  displayStyle: string;
  loadStyle: string;
  wincontainer: any;
  topnumber: any;
  leftnumber: any;
  widthnumber: any;
  heightnumber: any;
  firstClientX: any;
  firstClientY: any;
  clientX: any;
  clientY: any;
  scratchSubscription: Subscription;
  constructor(
    private campaignCenterService: CampaignCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
    // console.log('constructor');
    this.src = '../assets/img/scratch.jpg';
    this.canvasWidth = this.width;
    this.canvasHeight = this.height;
    //   console.log(this.canvasWidth);
    //   console.log(this.canvasHeight);
    this.displaynone();
    this.loadnone();
  }
  ngOnInit() {
    // // Set body fixed
    // // document.querySelector('body').setAttribute('style','position:fixed;top:0');
    // this.campaignCenterService.footerSecondary = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.updateOffset();
    }, 500);
  }
  public ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.image = this.img.nativeElement;
    // console.log('init');
    // console.log(this.image);
    // console.log(this.canvas);
    this.ctx = canvas.getContext('2d');
    // console.log(this.ctx);
    //   canvas.style.width = '62%';
    //   canvas.style.height = '72%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    //   console.log(this.canvas);
    this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    this.captureEvents(canvas);
    // const d=this.ctx.getImageData(0,0,this.canvasWidth,this.canvasHeight);
    //     let len=d.data.length;
  }
  @HostListener('window:resize', [])
  onWindowResize() {
    window.scroll(0, 0);
    this.updateOffset();
  }
  updateOffset(): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wincontainer = this.wincont.nativeElement.getBoundingClientRect();
    // console.log(this.wincont);
    // console.log(this.wincontainer);
    // console.log(window.innerHeight);
    // this.wincontainer.style.top=(window.innerHeight-130)-(this.wincontainer.width/2);
    // console.log((((window.innerHeight-130)-(this.wincontainer.width/2))/2));
    this.topnumber = this.wincontainer.top + window.pageYOffset - document.documentElement.clientTop;
    this.leftnumber = this.wincontainer.left + window.pageXOffset - document.documentElement.clientLeft;
    this.widthnumber = this.wincontainer.width;
    this.heightnumber = this.wincontainer.height;
    // console.log(this.topnumber,this.leftnumber,this.widthnumber,this.heightnumber);
    // canvas.style.top=this.topnumber-2.5+ 'px';
    // canvas.style.left=this.leftnumber+1.5+ 'px';
    canvas.style.width = this.widthnumber + 10 + 'px';
    canvas.style.height = this.heightnumber + 5 + 'px';

    if (window.innerWidth > 1200) {
      // canvas.style.width = '805px';
      // canvas.style.height = '540px';
      this.src = '../assets/img/scratch.png';
    } else if (window.innerWidth < 1200 && window.innerWidth > 767) {
      // canvas.style.width = '510px';
      // canvas.style.height = '385px';
      this.src = '../assets/img/scratchtablet.png';
      // if(window.innerHeight>1300){
      //     const tp=this.wincontainer.top;
      //     console.log(tp);
      //     this.wincontainer.style.top=tp*2;
      // }
    } else if (window.innerWidth < 767) {
      // canvas.style.top = '0';
      // canvas.style.left = '0';
      // canvas.style.width = '100%';
      // canvas.style.height = '100%';
      this.src = '../assets/img/scratchmobile.png';
    }
  }
  openModal(participat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(participat);
  }
  anotherCode() {
    if (this.campaignCenterService.pubid) {
      this.router.navigate(['/entercode'], { relativeTo: this.route });
    }
  }
  onDone() {
    // clear up
    this.campaignCenterService.pubid = '';
    // this.campaignCenterService.footerSecondary = false;
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

  afterLoading() {
    this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    this.loadblock();
  }
  displayblock() {
    this.displayStyle = 'displayblock';
    //   console.log('block');
  }
  displaynone() {
    this.displayStyle = 'displaynone';
    //   console.log('none');
  }
  loadblock() {
    this.loadStyle = 'displayblock';
    //   console.log('block');
  }
  loadnone() {
    this.loadStyle = 'displaynone';
    //   console.log('none');
  }
  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold
    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;
    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }
  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    this.scratchSubscription = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        //   console.log('mousedown');

        const rect = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        this.drawOnCanvas(prevPos, currentPos, this.ctx);
        this.handlePercentage(this.getFilledInPixels(32));
      });
    // this will capture all touch start events from the canvas element
    this.scratchSubscription = fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all touch moves
          return fromEvent(canvasEl, 'touchmove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'touchend' event
              takeUntil(fromEvent(canvasEl, 'touchend')),
              // we'll also stop (and unsubscribe) once the touch cancel the canvas (event)
              takeUntil(fromEvent(canvasEl, 'touchcancel')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res1: [TouchEvent, TouchEvent]) => {
        console.log('touchstart');

        const rect1 = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res1[0].touches[0].clientX - rect1.left,
          y: res1[0].touches[0].clientY - rect1.top
        };
        const currentPos = {
          x: res1[1].touches[0].clientX - rect1.left,
          y: res1[1].touches[0].clientY - rect1.top
        };
        this.drawOnCanvas(prevPos, currentPos, this.ctx);
        this.handlePercentage(this.getFilledInPixels(32));
      });
  }
  private getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }
    const pixels = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    const pdata = pixels.data;
    const l = pdata.length;
    const total = (l / stride);
    let count = 0;
    // Iterate over all pixels
    for (let i = count = 0; i < l; i += stride) {
      if (pdata[i]) {
        count++;
      }
    }
    return Math.round((count / total) * 100);
  }
  private handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    //   console.log(filledInPixels + '%');
    if (filledInPixels < 45) {
      if (this.ctx.canvas.parentNode !== null) {
        this.ctx.canvas.parentNode.removeChild(this.ctx.canvas);
        this.displayblock();
      }
    }
  }
  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }, ctx) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineWidth = 100;
    if (!this.ctx) { return; }
    this.ctx.beginPath();
    if (prevPos) {
      this.ctx.moveTo(prevPos.x, prevPos.y);
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.lineJoin = this.ctx.lineCap = 'round';
      this.ctx.stroke();
      prevPos.x = currentPos.x;
      prevPos.y = currentPos.y;
      //   console.log(prevPos, currentPos, this.ctx);
    }
  }
  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.scratchSubscription.unsubscribe();
  }
}
