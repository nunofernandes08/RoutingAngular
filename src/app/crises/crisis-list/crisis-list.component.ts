import { Component, OnInit } from '@angular/core';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  crises!: Crisis[];

  constructor(
    private crisisService: CrisisService,) { }

  ngOnInit() {
    this.getCrises();
  }

  getCrises(): void {
    this.crisisService.getCrises()
    .subscribe(crises => 
      {
        this.crises = crises
        console.log(crises)
      }
    );
  }
}
