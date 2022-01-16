import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import EventsJson from '../../assets/events/events.json';
import { IEvent } from '../common/IEvent';

interface IEventMarker {
  position: {
    lat: number;
    lng: number;
  },
  icon: {
    url: string,
    anchor: google.maps.Point,
    scaledSize: google.maps.Size,
  }, 
  assignedEvent: IEvent
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
 


export class MapComponent {

  EventList: IEvent[] = EventsJson;
  EventMarker: IEventMarker[] = Array(0);
  selected_event = this.EventList[0];

  searchText: any;
  
  // Currently placeholder for the users location
  center: google.maps.LatLngLiteral = {
    lat: 48.137154,
    lng: 11.576124,
  };

  locationMarker = {
    position: this.center,
    icon: {
      url: "./assets/img/current_location.png",
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(30, 30),
    }, 
  };

  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    gestureHandling: "greedy",
    zoom: 14,
    maxZoom: 50,
    minZoom: 4,
    mapId: "ee691f8617d29770",
    disableDefaultUI: true,
  } as google.maps.MapOptions;

  constructor(private titleService: Title) { 
    this.EventList.forEach(event => {
      var temp = {
        position: {
          lat: event.position.lat,
          lng: event.position.lng
        },
        icon: {
          url: "./assets/events/event_icons/" + event.category + ".png",
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30),
        }, 
        assignedEvent: event
      };
      this.EventMarker.push(temp)
      console.log(this.EventMarker);
    });

    this.titleService.setTitle("Map");
  }

  // Drag function
  yDragValue = 0;
  isDragging = false;
  draggable_card: any;
  arrow: any;
  lastY: any;
  isTop: boolean = false;

  // wait for the HTML to finish loading before assigning DOM objects to variables
  ngAfterViewChecked(): void {
    this.draggable_card = document.getElementById("draggable-card");
    this.arrow = document.getElementById("arrow");
  }

  showMapCard(event: IEvent): void {
    this.selected_event = event;
    this.draggable_card!.style.transform = `translateY(${-0.2*window.innerHeight}px)`;
    this.arrow.classList.add("open");
  }
  hideMapCard() {
    this.draggable_card!.style.transform = `translateY(${30}%)`;
  }

  // Dragging for touch devices
  startDraggingHandler(drag_event: any) {
    this.isDragging = true;
  }
  draggingHandler(drag_event: any) {
    if(!this.isDragging) return;
    const { clientY } = drag_event.touches[0];
    this.yDragValue = clientY - 0.8 * window.innerHeight;
    var currentY = drag_event.touches ? drag_event.touches[0].clientY : drag_event.clientY;

    if (currentY < this.lastY) {
      if(this.yDragValue < -0.4 * window.innerHeight) {
        this.yDragValue = this.setMaxHeight();
        this.isTop = true;
        this.arrow.classList.remove("open");
      } else {
        this.isTop = false;
      }
    }
    this.lastY = currentY;

    if (this.yDragValue > -0.1*window.innerHeight) {
      this.draggable_card!.style.transform = `translateY(${this.yDragValue + 0.3*window.innerHeight}px)`;
      return;
    }
    this.draggable_card!.style.transform = `translateY(${this.yDragValue}px)`;
  }
  stopDraggingHandler(drag_event: any) {
    if(!this.isDragging) return;
    // const { clientY } = drag_event.changedTouches[0];
    this.isDragging = false;
  }

  // Clicking for touch and desktop devices
  toggleView() {
    if (!this.isTop) {
      this.draggable_card!.style.transform = `translateY(${this.setMaxHeight()}px)`;
      this.isTop = true;
      this.arrow.classList.remove("open");
    } else {
      this.draggable_card!.style.transform = `translateY(${-0.2*window.innerHeight}px)`;
      this.isTop = false;
      this.arrow.classList.add("open");
    }
  }

  // Set highest position of card depending on size of the card and screen height
  setMaxHeight(): number {
    if (window.innerHeight - 64 - 80 - 16 - 24 < this.draggable_card!.clientHeight) {
      return (-0.8*window.innerHeight + 72);
    } else {
      
      return (0.2*window.innerHeight - 88 - 16 - this.draggable_card!.clientHeight);
    }
  }
}

