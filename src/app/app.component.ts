import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }
  
  ngOnInit() {
    this.router.events.subscribe( (event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        if(this.router.url !== '/')
          this.title = this.router.url.replace('/questionnaire/', '');
        else
          this.title = "Index Cards";
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
  }
}
