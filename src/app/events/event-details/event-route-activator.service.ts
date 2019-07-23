import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { EventService } from '../shared/events.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class EventRouteActivator implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    constructor(private eventService: EventService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        const eventExists = !!this.eventService.getEvent(+route.params['id']);
        if (!eventExists) {
            this.router.navigate(['/404']);
        }
        return eventExists;
    }
}
