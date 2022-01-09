import { Component, OnInit, DoCheck} from '@angular/core';
import { Title } from '@angular/platform-browser';
import{ GlobalConstants } from '../common/global-constants';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  current_title = this.titleService.getTitle();
  back = this.current_title;
  subpage = false;

  visibilitySavedEventsCounter = GlobalConstants.visibilitySavedEventsCounter;
  savedEventsCounter = GlobalConstants.savedEventsCounter;


  constructor(private titleService: Title) {
  }

  
  

  setDocTitle(title: string, route: string) {
    document.getElementById('subpage')?.classList.add('subpage');
    this.current_title = title;
    this.titleService.setTitle(title);
    this.subpage = false;
    this.back = route;    

    document.getElementById('Explore')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Explore')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Map')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Map')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('MyEvents')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('MyEvents')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Profile')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Profile')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById(title.replace(/\s/g, ""))?.children[0].children[0].classList.remove('material-icons-outlined');
    document.getElementById(title.replace(/\s/g, ""))?.children[0].children[0].classList.add('active-mat-icon');
 }

  hideBackButton() {
    document.getElementById('subpage')?.classList.add('subpage');
  }

  ngOnInit(): void {
    this.current_title = 'Explore';
    this.titleService.setTitle('Explore');
    document.getElementById('Explore')?.children[0].children[0].classList.add('active-mat-icon');
    document.getElementById('Explore')?.children[0].children[0].classList.remove('material-icons-outlined');
  }

  ngDoCheck(): void {
    this.visibilitySavedEventsCounter = GlobalConstants.visibilitySavedEventsCounter;
    this.savedEventsCounter = GlobalConstants.savedEventsCounter;
  }
  
  
}
