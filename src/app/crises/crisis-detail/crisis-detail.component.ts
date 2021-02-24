import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: [ './crisis-detail.component.css' ]
})
export class CrisisDetailComponent implements OnInit {
  
  @Input() hero!: Crisis;

  constructor(
    private route: ActivatedRoute,
    private heroService: CrisisService,
    private location: Location,
    private router: Router,
    private service: CrisisService
  ) {}

  ngOnInit(): void {
    this.getCrisis();
  }

  getCrisis(): void {
    const id = +<String>this.route.snapshot.paramMap.get('id');
    this.heroService.getCrisis(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  gotoCrisis() {
    this.router.navigate(['/crises']);
  }

  save(): void {
    this.heroService.updateCrisis(this.hero)
      .subscribe(() => this.goBack());
  }
}