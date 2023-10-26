import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservable: Subscription;
  private secondObservable: Subscription;

  constructor() { }

  ngOnInit() {
    //Observable provided by Angular
    /*this.firstObservable = interval(1000).subscribe(
      count =>  {
        console.log(count);
      }
    )*/

    //Custom Interval Observable
    const customObservable = new Observable (observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          // We are completing the observable
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'))
        }
        count++;
      }, 1000)
    })
    this.secondObservable = customObservable.subscribe(count => {
      console.log('Data', count);
    }, error => {
      //When showing an error the observable is cancelled and not completed so the log is not need of 'Observable is completed'
      alert(error.message)
    }, () => {
      //We can use it to clean up. No need to unsubscribe if we have completed the observable
      console.log('Observable is completed');
    })
  }

  ngOnDestroy() {
    // this.firstObservable.unsubscribe();
    this.secondObservable.unsubscribe();
  }

}
