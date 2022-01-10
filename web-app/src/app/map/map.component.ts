import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import EventsJson from '../../assets/events/events.json';


interface EVENT {
  id: number;
  name: string;
  saved: boolean;
  description: string;
  date: string;
  picture: string;
  position: {
    lat: number;
    lng: number;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {

  EventList: EVENT[] = EventsJson;
  selected_event = this.EventList[0];

  // Google Maps Settings
  zoom = 10;
  center: google.maps.LatLngLiteral = {
    lat: 48.137154,
    lng: 11.576124,
  };
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    gestureHandling: "greedy",
    maxZoom: 50,
    minZoom: 4,
    mapId: "ee691f8617d29770",
    disableDefaultUI: true,
  } as google.maps.MapOptions;
  locationMarker = {
    position: this.center,
    icon: {
      url: "./assets/img/current_location.png",
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(30, 30),
    }, 
  };
  
  // Drag function
  yDragValue = 0;
  isDragging = false;
  draggable_card: any;
  arrow: any;
  lastY: any;
  isTop: boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
    /*navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });*/
    window.scrollTo(0,1);
  }

  ngAfterViewChecked(): void {
    this.draggable_card = document.getElementById("draggable-card");
    this.arrow = document.getElementById("arrow");
    window.scrollTo(0,1);
    // this.addMarker();
  }
  /*
  @Input() addMarker() {
    //this.markers.push() 
  }*/


  showMapCard(event: EVENT): void {
    this.selected_event = event;
    this.draggable_card!.style.transform = `translateY(${-0.2*window.innerHeight}px)`;
    this.arrow.classList.add("open");
  }
  hideMapCard() {
    this.draggable_card!.style.transform = `translateY(${20}%)`;
  }
  startDraggingHandler(drag_event: any) {
    this.isDragging = true;
  }
  draggingHandler(drag_event: any) {
    if(!this.isDragging) return;
    const { clientY } = getEventType(drag_event);
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
    
    //this.draggable_card!.style.transform = `translateY(${this.yDragValue}px)`
  }
  setMaxHeight(): number {
    if (window.innerHeight - 64 - 80 - 24 < this.draggable_card!.clientHeight) {
      return (-0.8*window.innerHeight + 72);
    } else {
      
      return (0.2*window.innerHeight - 88 - this.draggable_card!.clientHeight);
    }
  }
}
function getEventType(drag_event: any): { clientY: any; } {
  if (drag_event.type == "touchmove" || drag_event.type == "touchstart") {
    // console.log(drag_event.touches[0]);
    return drag_event.touches[0];
  } else {
    // console.log(drag_event);
    return drag_event;
  }
}

