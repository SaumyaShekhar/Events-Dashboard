import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  EventsListComponent,
  EventsThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr, JQ_TOKEN, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {Error404Component} from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

const toastr: Toastr = window['toastr'];
const jQuery = window['$'];
import { appRoutes} from './routes';
// Providers are shared across the modules. So if it is declared in App Module, it will be available in user module
@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventsThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy : PreloadAllModules}),
    HttpClientModule
  ],
  providers: [EventService, EventRouteActivator,
    {
      provide : TOASTR_TOKEN,
      useValue : toastr
    },
    {
      provide : JQ_TOKEN,
      useValue : jQuery
    },
    // { provide : MinimalLogger, useExisting : logger},
    // Complex way to construct the class to use as a Service{ provide : Logger, useFactory : factory()},
    EventListResolver, // Same as { provider: EventListResolver, useClass: EventListResolver}
    EventResolver,
    AuthService,
    {
    provide : 'canDeactivateCreateEvent',
    useValue: checkDirtyState
  }, VoterService],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved the event, do you really want to cancel?');
  }
  return true;
}
