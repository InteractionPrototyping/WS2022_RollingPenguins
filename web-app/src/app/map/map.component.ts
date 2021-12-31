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
  // @Input()
  zoom = 20;
  center!: google.maps.LatLngLiteral;
  markers = [] as any;
  

  // Drag function
  event: any;
  yDragValue = 0;
  isDragging = false;
  initialDragClientY = 0;
  scroll_value = 0;

  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 50,
    minZoom: 4,
    mapId: "ee691f8617d29770",
    disableDefaultUI: true,
  } as google.maps.MapOptions;

  constructor() { 
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  ngAfterViewChecked(): void {
    //this.addMarker();
  }

  showMapCard(event: EVENT): void {
    this.selected_event = event;
  }

  startDraggingHandler(event: any) {
    console.log(event);
    this.isDragging = true;
    const { clientY } = event.touches[0];
    this.initialDragClientY = clientY;
  }
  draggingHandler(event: any) {
    if(!this.isDragging) return;
    const { clientY } = event.touches[0];
    this.yDragValue = clientY - this.initialDragClientY;
    document.getElementById("draggable-card")!.style.transform = `translateY(${this.yDragValue}px)`;
  }
  stopDraggingHandler(event: any) {
    if(!this.isDragging) return;
    const { clientY } = event.changedTouches[0];
    this.isDragging = false;
  }
  
  /*
  @Input() addMarker() {
    
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      //options: { animation: google.maps.Animation.DROP }, [options]="marker.options"
    }) [ngStyle]="{'transform': 'translateY(' + $scroll_value + 'px)'}
  }*/
}
