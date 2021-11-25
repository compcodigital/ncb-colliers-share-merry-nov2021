import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  ElementRef,
  AfterContentInit,
  HostListener,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { CampaignCenterService } from '../../services/campaigncenter.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef
} from '../../../../node_modules/ngx-bootstrap/modal';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { takeUntil, pairwise, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-winner-scratch',
  templateUrl: './winner-scratch.component.html',
  styleUrls: ['./winner-scratch.component.scss']
})
export class WinnerScratchComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  prizeInfo: string;
  prizeInfoName: string;
  prizeInfoRetailer: string;
  website: any;
  public container = document.getElementById('js-container');
  private image: HTMLImageElement = new Image();
  modalRef: BsModalRef;
  @ViewChild('participat', { static: false }) template: TemplateRef<any>;
  @ViewChild('canvas_box', { static: false }) public canvas: ElementRef;
  @ViewChild('img', { static: false }) img: ElementRef;
  @ViewChild('wincon', { static: false }) wincont: ElementRef;
  // setting a width and height for the canvas
  @Input() public width = 888;//1212;
  @Input() public height = 500;//750;
  public canvasHeight: any;
  public canvasWidth: any;
  src: string;
  private ctx: CanvasRenderingContext2D;
  canvasEl: HTMLCanvasElement;
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
    private modalService: BsModalService
  ) {
    // console.log('constructor');
    if (window.innerWidth > 1200) {
      this.width = 888;
      this.height = 500;
      this.src = '../assets/img/scratch/newscratchdesk.jpg';
    } else if (window.innerWidth < 1200 && window.innerWidth > 767) {
      this.width = 495;
      this.height = 575;
      this.src = '../assets/img/scratch/newscratchtab.jpg';
    } else if (window.innerWidth < 767) {
      this.width = 295;
      this.height = 430;
      this.src = '../assets/img/scratch/newscratchmob.jpg';
    }

    this.image.src = this.src;
    this.canvasWidth = this.width;
    this.canvasHeight = this.height;
    this.displayblock();//displaynone()
    this.loadnone();//loadnone()
  }
  ngOnInit() {
    this.prizeInfo = '';
    this.prizeInfoName = '';
    this.prizeInfoRetailer = '';
    this.website = '';
    this.displayStyle = '';
    this.loadStyle = '';
    // document.querySelector('body').setAttribute('style', 'position:fixed;top:0');
    window.scroll(0, 0);
    if (this.campaignCenterService.prizeInfo && this.campaignCenterService.prizeInfoName) {
      this.prizeInfo = this.campaignCenterService.prizeInfo;
      this.prizeInfoName = this.campaignCenterService.prizeInfoName;
      this.prizeInfoRetailer = this.campaignCenterService.prizeInfoRetailer;
      // console.log('On Winner page, prizeInfo = ' + this.prizeInfo);
      // console.log('On Winner page, prizeInfoName = ' + this.prizeInfoName);
      // console.log('On Winner page, prizeInfoRetailer = ' + this.prizeInfoRetailer);
      //500;
    }
    setTimeout(() => {
      this.updateOffset();
    }, 10);
  }
  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.updateOffset();
    }, 10);
  }
  @HostListener('window:resize', [])
  onWindowResize() {
    window.scroll(0, 0);
    this.updateOffset();
  }
  updateOffset(): void {
    this.wincontainer = this.wincont.nativeElement.getBoundingClientRect();
    this.topnumber =
      this.wincontainer.top +
      window.pageYOffset -
      document.documentElement.clientTop;
    this.leftnumber =
      this.wincontainer.left +
      window.pageXOffset -
      document.documentElement.clientLeft;
    this.widthnumber = this.wincontainer.width;
    this.heightnumber = this.wincontainer.height;
    this.canvasEl.style.width = this.widthnumber + 5 + 'px';//10
    this.canvasEl.style.height = this.heightnumber + 5 + 'px';
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;
    this.canvasWidth = this.canvasEl.width;
    this.canvasHeight = this.canvasEl.height;

    if (window.innerWidth > 1200) {
      this.src = '../assets/img/scratch/newscratchdesk.jpg';
    } else if (window.innerWidth < 1200 && window.innerWidth > 767) {
      this.src = '../assets/img/scratch/newscratchtab.jpg';
    } else if (window.innerWidth < 767) {
      this.src = '../assets/img/scratch/newscratchmob.jpg';
    }
    this.image.src = this.src;

    this.ctx.drawImage(this.image, 0, 0);
    this.captureEvents(this.canvasEl);
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
    this.campaignCenterService.prizeInfo = '';
    this.campaignCenterService.prizeInfoName = '';
    this.campaignCenterService.prizeInfoRetailer = '';
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
  afterLoading() {
    this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    this.loadblock();
  }
  displayblock() {
    this.displayStyle = 'displayblock';
    // console.log('block');
  }
  displaynone() {
    this.displayStyle = 'displaynone';
    // console.log('none');
  }
  loadblock() {
    this.loadStyle = 'displayblock';
    // console.log('block');
  }
  loadnone() {
    this.loadStyle = 'displaynone';
    // console.log('none');
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
    this.scratchSubscription = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
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
        const rect = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        this.drawOnCanvas(prevPos, currentPos);
        this.handlePercentage(this.getFilledInPixels(32));
      });
    this.scratchSubscription = fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all touch moves
          return fromEvent(canvasEl, 'touchmove').pipe(
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
        const rect1 = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res1[0].touches[0].clientX - rect1.left,
          y: res1[0].touches[0].clientY - rect1.top
        };
        const currentPos = {
          x: res1[1].touches[0].clientX - rect1.left,
          y: res1[1].touches[0].clientY - rect1.top
        };
        this.drawOnCanvas(prevPos, currentPos);
        this.handlePercentage(this.getFilledInPixels(32));
      });
  }
  private getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1;
    }
    const pixels = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    const pdata = pixels.data;
    const l = pdata.length;
    const total = l / stride;
    let count = 0;
    // Iterate over all pixels
    for (let i = (count = 0); i < l; i += stride) {
      if (pdata[i] === 0) {
        count++;
      }
    }
    return Math.round((count / total) * 100);
  }
  private handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    // console.log(filledInPixels + '%');
    if (filledInPixels > 45) {
      if (this.ctx.canvas.parentNode !== null) {
        this.ctx.canvas.parentNode.removeChild(this.ctx.canvas);
        this.displayblock();
      }
    }
  }
  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineWidth = 100; // size of brush
    this.ctx.lineJoin = this.ctx.lineCap = 'round'; // method of bush
    if (!this.ctx) {
      return;
    }
    this.ctx.beginPath();
    if (prevPos) {
      this.ctx.moveTo(prevPos.x, prevPos.y);
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
      // prevPos.x = currentPos.x;
      // prevPos.y = currentPos.y;
    }
  }
  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.scratchSubscription.unsubscribe();
  }
}
