import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {
        // console.log('Focus' , el);
    }

    public ngAfterContentInit() {

        setTimeout(() => {
            // console.log('Focus');
            this.el.nativeElement.focus();
        }, 0);
    }
}
