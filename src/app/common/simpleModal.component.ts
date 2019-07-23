import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';

@Component({
// tslint:disable-next-line: component-selector
    selector : 'simple-modal',
    template: `
    <div id="{{elementId}}" #modalContainer class="modal fade" tabIndex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body" (click)="closeModal()">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    </div>
    `,
    styles : [` .modal-body {height: 250px; overflow-y:scroll;}
    `]
})

export class SimpleModalComponent {
 @Input() title: string;
 @Input() elementId: string;
 @Input() closeOnBodyClick: string;

 // Getting access to a specific DOM without drilling down using getDocumentByClass etc. In Angular we have decorators to help with that
 // 1. @ViewChild - It will give acccess to the element with same #id used
 // 2. @ViewChildren - It is used when we have ngFor and we want to access all children
// tslint:disable-next-line: max-line-length
 // 3. @ContentChild - It is used when we projecting our content to the div using ng-content, but we have to make sure that we are using #id in the projected content
 // 4. @ContentChildren - When we have ngFor in ng-content or projected content
 @ViewChild('modalContainer') containerEl: ElementRef;

 constructor(@Inject(JQ_TOKEN) private $: any) {

 }

 closeModal() {
     if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
        this.$(this.containerEl.nativeElement).modal('hide');
     }
 }
}
