import {Routes} from '@angular/router';
import {Error404Component} from './errors/404.component';
import { UserModule} from './user/user.module'
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    EventResolver
  } from './events/index'

export const appRoutes: Routes = [
    // CanDeactivate to stop user from leaving the page before saving the data
    {path: 'events/new', component: CreateEventComponent, canDeactivate:['canDeactivateCreateEvent']},
     // Before resolving the route, call eventlistresolver and when the resolver returns us some data
     // add/set this data to the property name events on the route and then call the component
    {path: 'events' , component: EventsListComponent, resolve:
        {events: EventListResolver}},
    // CanActivate to restrict the user to go to a page
    {path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver}},
    {path: 'events/session/new', component: CreateSessionComponent},
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch:'full'},
    // {path: 'user', loadChildren:'./user/user.module#UserModule'}
    // {path: 'user', loadChildren: () => import('./user/user.module').then(mod=>mod.UserModule) }
    {path: 'user', loadChildren: () => UserModule }
]