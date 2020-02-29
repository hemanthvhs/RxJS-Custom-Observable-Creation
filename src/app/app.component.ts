import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
 
 ngOnInit() {

   const http$ = Observable.create(observer => {
      fetch('https://reqres.in/api/users')
      .then(response => { 
        return response.json()
      })
      .then(body => {
        observer.next(body);
        observer.complete();

        /* observer.next(1) */   // Here you can' do this because as per RxJS observable contract once we make the observable complete, we should not emit the data again. As it vioaltes the observable contract.
      })
      .catch(err => {
        observer.error(err)
      })
   })

   http$.subscribe(users => {
     console.log(users)
   },
   () => {},
   () => { console.log('completed')}
   )

 }

/* 
  while subscribing to the http$ observable , we are sure that it's not gonna errored out therefore we have used () => {} . Also we can usee noop.
 */

  
}
