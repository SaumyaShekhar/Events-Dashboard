import {Component, OnInit} from '@angular/core';
import {EventService} from './shared/events.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

// (eventClick)="handleEventClicked($event) $ sign in this represents data emitted in this event
// Inter Component Variable : Input, Output & Template Variables

// Interpolation is {{event.name}}
// Prpoerty Binding is [event]
// Expression is value assigned to interpolation and property binding Ex = {{ 2+ 2 }}
@Component({
    selector: 'events-list',
    template: `
            <div class="well">
            <h1>Upcoming Angular Events</h1>
            <hr/>
            <div>Hello World</div>
            <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                    <event-thumbnail #thumbnail  eventClick="handleEventClicked($event)" [event]="event"></event-thumbnail>
                </div>
            </div>
        </div>`,
    styles : [`.pad-left {margin-left: 10px;}
        .well div {color: red;}
    `]
})
//    <h2>{{thumbnail.variable}}</h2>
// <button class="btn btn-primary" (click)="thumbnail.logTemplate()">Using Template Variable</button>

// Have added implements OnInit to let the component know that we have added ngOnInit lifecycle function. So we forget to implement it now it will throw the error.
// Just a type of Typescript compilation safety
export class EventsListComponent implements OnInit {
  // We should not call the service method inside the constructor because the getEvents method might take some time to get the events and hence will slow down the execution of the component.
  // For Example: getEvents can contain the ajax call which will retrieve data from backend.
  // Hence, we are calling it inside a lifecycle method ngOnInit, which gets called when the component is loaded.
  // We still need the constructor even though it is not doing anything because thats where our service is getting injected.

   events: IEvent[];
   constructor(private eventService: EventService, private route: ActivatedRoute) {

   }
   ngOnInit() {
    // After adding the resolver, we are picking the data from parameter of route "events" which is coming from resolver
    this.events = this.route.snapshot.data['events'];
   }
    handleEventClicked(data) {
        console.log('Received:' + data);
    }
    // handleThumbnailClick(name){
    //   this.toastr.success(name);
    // }
}
