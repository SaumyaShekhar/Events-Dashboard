import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/index';

@Component({
  templateUrl: './create-event.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder {color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent {
  newEvent;
  isDirty = true;
  constructor(private router: Router, private eventService: EventService) {

  }
// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
      // this.newEvent = {
      //   id: 50,
      //   name: 'dddd',
      //   date: new Date('9/26/2036'),
      //   time: '10:00 am',
      //   price: 599.99,
      //   imageUrl: '/assets/images/angularconnect-shield.png',
      //   location: {
      //     address: '1057 DT',
      //     city: 'London',
      //     country: 'England'
      //   }
      // }
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
