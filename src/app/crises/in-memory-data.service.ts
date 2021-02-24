import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Crisis } from './crisis';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService2 implements InMemoryDbService {
  createDb() {
    const crises = [
      { id: 1, name: 'Dragon' },
      { id: 2, name: 'Sky Rains' },
      { id: 3, name: 'Giant Asteroid' },
      { id: 4, name: 'Procrastinators' }
    ];
    return {crises};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(crises: Crisis[]): number {
    return crises.length > 0 ? Math.max(...crises.map(crisis => crisis.id)) + 1 : 11;
  }
}