import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';


@Directive({
    selector : '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement;
    // Creating an Alias of an Input
    @Input('modal-trigger') modalId: string
    constructor(@Inject(JQ_TOKEN) private $: any, ref: ElementRef) {
        this.el = ref.nativeElement;
    }
    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({});
        });
    }
}