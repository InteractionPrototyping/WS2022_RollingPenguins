import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  current_title = this.titleService.getTitle();
  constructor(private titleService: Title) {
  }
  setDocTitle(title: string) {
    //document.getElementById('current-title')?.innerHTML 
    this.current_title = title;
    this.titleService.setTitle(title);

    // 

    document.getElementById('Explore')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Explore')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Map')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Map')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('MyEvents')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('MyEvents')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById('Personal')?.children[0].children[0].classList.remove('active-mat-icon');
    document.getElementById('Personal')?.children[0].children[0].classList.add('material-icons-outlined');

    document.getElementById(title.replace(/\s/g, ""))?.children[0].children[0].classList.remove('material-icons-outlined');
    document.getElementById(title.replace(/\s/g, ""))?.children[0].children[0].classList.add('active-mat-icon');
 }



  ngOnInit(): void {
    this.current_title = 'Explore';
    this.titleService.setTitle('Explore');
    document.getElementById('Explore')?.children[0].children[0].classList.add('active-mat-icon');
    document.getElementById('Explore')?.children[0].children[0].classList.remove('material-icons-outlined');
  }
  
}
