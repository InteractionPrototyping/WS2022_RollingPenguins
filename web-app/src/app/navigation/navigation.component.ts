import { Component, OnInit, DoCheck} from '@angular/core';
import { Title } from '@angular/platform-browser';
import{ GlobalConstants } from '../common/global-constants';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  current_title = this.titleService.getTitle();
  back = this.current_title;
  subpage = false;

  visibilitySavedEventsCounter!: boolean;
  savedEventsCounter!: number;


  constructor(
    private titleService: Title, 
    private authenticationService: AuthenticationService
    ) 
  {

  }

  
  

  setDocTitle(route: string) {
    document.getElementById('subpage')?.classList.add('subpage');
    this.current_title = this.titleService.getTitle();
    
    this.subpage = false;
    this.back = route;    

    this.setNavigation();
 }
 setNavigation() {
    document.getElementById('Explore')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Explore')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Map')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Map')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('MyEvents')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('MyEvents')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Profile')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Profile')?.children[0].children[0].classList.add('material-icons-outlined');
    document.getElementById(this.titleService.getTitle().replace(/\s/g, ""))?.children[0].children[0].classList.remove('material-icons-outlined');
    document.getElementById(this.titleService.getTitle().replace(/\s/g, ""))?.children[0].children[0].classList.add('active-mat-icon');
 }

  hideBackButton() {
    document.getElementById('subpage')?.classList.add('subpage');
  }

  ngOnInit(): void {  
    const currUserId = this.authenticationService.currentUserValue.user._id;
    this.authenticationService.getUserById(currUserId).subscribe(
      (data: any) => {
        GlobalConstants.savedEventsCounter = data.myEvents.length;
      },
      (error: any) => {}
    ); 
  }

  ngDoCheck(): void {
    this.current_title = this.titleService.getTitle();
    this.setNavigation();
    this.savedEventsCounter = GlobalConstants.savedEventsCounter;
    if (GlobalConstants.savedEventsCounter <= 0) {
      GlobalConstants.visibilitySavedEventsCounter = true;
    } else {
      GlobalConstants.visibilitySavedEventsCounter = false;
    }
    this.visibilitySavedEventsCounter = GlobalConstants.visibilitySavedEventsCounter;
  }
}
