import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {
  // @Input()
  zoom = 30;
  center!: google.maps.LatLngLiteral;
  markers = [] as any;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 50,
    minZoom: 4,
  }
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
    this.addMarker();
  }
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
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }
}
