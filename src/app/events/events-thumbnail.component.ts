import { Component, Input, EventEmitter, Output } from '@angular/core'
import { IEvent } from './shared';

@Component({
  selector: 'event-thumbnail',
  template: `
            <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
                <h2>{{event?.name | uppercase}}</h2>
                <div>Date : {{event?.date | date:'shortDate'}}</div>
                <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
                  Time : {{event?.time}}
                  <span *ngSwitchCase="'8:00 am'" class="label label-warning">(Early Start)</span>
                  <span *ngSwitchCase="'10:00 am'" class="label label-warning">(Late Start)</span>
                  <span *ngSwitchDefault class="label label-warning">(Normal Start)</span>
                </div>
                <div>Price : {{event?.price | currency:'USD'}}</div>
                <div *ngIf="event?.location" [class.green]="event?.time === '8:00 am'">
                <span>Location: {{event?.location.address}}</span>
                <span class="pad-left">{{event?.location?.city}}, {{event.location?.country}}</span>
                </div>
                <div [hidden]="!event?.onlineUrl">Online URL : {{event?.onlineUrl}}</div>
                <button class="btn btn-primary" (click)="handleClickMe()">Click</button>
            </div>
            `,
  //Can be put in a separate css file and can be referred by styleUrls:[]
  // Encapsulation of the CSS in angular - Below css only affects the component and not the parent where the same css would have been used for example - well below
  //Angular takes care of Encapsulation - If we add this to parent, it doesn't affect the children components
  // Global CSS can also be used using styles.css
  //Deep selector can be used if we want to propagate the styles to parent of child components
  styles : [`.pad-left {margin-left: 10px;}
              .well div {color: #bbb;}
              .thumbnail {min-height: 210px;}
              .green {color: '#003300' !important}
          `]
})
export class EventsThumbnailComponent { 
 //Input from another component - Passing Input from Parent to Child Component
  @Input() event: IEvent
  variable:any = "Template Usage";
  @Output() eventClick = new EventEmitter();

  handleClickMe(){
    this.eventClick.emit(this.event.name);
  }
  logTemplate(){
    console.log("Using Template Variable");
  }

  getStartTimeStyle():any {
    if (this.event && this.event.time === '8:00 am')
      return {color: '#003300', 'font-weight': 'bold'}
    return {}
  }
}