import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Crisis } from '../crisis';
import { HeroService } from '../crisis.service';

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
    private heroService: HeroService,
    private location: Location,
    private router: Router,
    private service: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +<String>this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  gotoHeroes() {
    this.router.navigate(['/heroes']);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}