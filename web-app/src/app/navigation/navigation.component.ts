import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  current_title = this.titleService.getTitle();
  back = this.current_title;
  constructor(private titleService: Title) {
  }

  hidden = true;
  subpage = false;
  count = 0;

  setDocTitle(title: string) {
    document.getElementById('subpage')?.classList.add('subpage');
    this.current_title = title;
    this.titleService.setTitle(title);
    this.subpage = false;
    this.back = this.current_title;

    if (title == "MyEvents") {
      this.count = 0;
      this.hidden = true;
    }
    

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
  
}
