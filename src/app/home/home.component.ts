import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservable: Subscription;

  constructor() { }

  ngOnInit() {
    this.firstObservable = interval(1000).subscribe(
      count =>  {
        console.log(count);
      }
    )
  }

  ngOnDestroy() {
    this.firstObservable.unsubscribe();
  }

}
