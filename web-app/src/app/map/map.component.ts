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
  zoom = 10;
  center!: google.maps.LatLngLiteral;
  markers = [] as any;
  

  // Drag function
  event: any;
  yDragValue = 0;
  isDragging = false;
  initialDragClientY = 0;
  position = 80;
  card: any;
  space: any;

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
    this.center = {
      lat: 48.137154,
      lng: 11.576124,
    }
    /*navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });*/

    
  }

  ngAfterViewChecked(): void {
    this.card = document.getElementById("draggable-card");
    this.addMarker();
  }

  svg = '<svg width="100%" height="100%" viewBox="0 0 900 900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">' +
  '<g id="ArtBoard1" transform="matrix(1,0,0,1,-62.2958,-124.737)">' + 
      '<rect x="62.296" y="124.737" width="899.263" height="899.263" style="fill:none;"/>' +
      '<clipPath id="_clip1">' +
          '<rect x="62.296" y="124.737" width="899.263" height="899.263"/>' +
      '</clipPath>' +
      '<g clip-path="url(#_clip1)">' +
          '<g transform="matrix(1,0,0,1,0.295751,0.736544)">' +
'<path d="M62.296,574.368C62.296,821.029 265.267,1024 511.927,1024C758.588,1024 961.559,821.029 961.559,574.368C961.559,327.708 758.588,124.737 511.927,124.737C265.267,124.737 62.296,327.708 62.296,574.368Z" style="fill:rgb(43,103,237);fill-opacity:0.34;fill-rule:nonzero;"/>' +
'</g>' +
          '<g transform="matrix(1,0,0,1,0.295751,0.736544)">' +
              '<path d="M250.706,574.352L250.706,574.384C250.706,717.686 368.626,835.606 511.927,835.606C655.229,835.606 773.149,717.686 773.149,574.384L773.149,574.352C773.149,431.05 655.229,313.131 511.927,313.131C368.626,313.131 250.706,431.05 250.706,574.352Z" style="fill:rgb(67,129,239);fill-rule:nonzero;"/>' +
          '</g>' +
          '<g transform="matrix(1,0,0,1,0.295751,0.736544)">' +
              '<path d="M511.927,835.735C368.705,835.735 250.851,717.881 250.851,574.658C250.851,431.436 368.705,313.582 511.927,313.582C655.15,313.582 773.004,431.436 773.004,574.658C773.004,717.881 655.15,835.735 511.927,835.735ZM511.927,342.59L511.927,342.59C384.619,342.59 279.859,447.35 279.859,574.658C279.859,701.967 384.619,806.726 511.927,806.726C639.236,806.726 743.995,701.967 743.995,574.658C743.996,574.465 743.996,574.272 743.996,574.078C743.996,446.769 639.237,342.01 511.928,342.01C511.928,342.01 511.928,342.01 511.927,342.01L511.927,342.59Z" style="fill:white;fill-rule:nonzero;"/>' +
          '</g>' +
      '</g>' +
  '</g>' +
'</svg>';

  svgMarker = {
    label: {
      text: "\e837", // codepoint from https://fonts.google.com/icons
      fontFamily: "Material Icons",
      color: "#ffffff",
      fontSize: "18px",
    },
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  
  @Input() addMarker() {
    
    this.markers.push({
      position: this.center,
      label: {
        text: "\e837", // codepoint from https://fonts.google.com/icons
        fontFamily: "Material Icons",
        color: "#ffffff",
        fontSize: "18px",
      },
    }) 
  }


  showMapCard(event: EVENT): void {
    this.selected_event = event;
    this.card!.style.transform = `translateY(${-0.2*window.innerHeight}px)`;
  }
  hideMapCard() {
    this.card!.style.transform = `translateY(${20}%)`;
  }
  startDraggingHandler(event: any) {
    this.isDragging = true;
    const { clientY } = event.touches[0]; 
    this.initialDragClientY = clientY;
  }
  draggingHandler(event: any) {
    if(!this.isDragging) return;
    const { clientY } = event.touches[0];
    this.yDragValue = clientY - 0.8 * window.innerHeight;
    
    
    if (this.yDragValue + 12 < -0.9 * this.card!.clientHeight) {
      return;
    }

    if (this.yDragValue > 20) {
      this.card!.style.transform = `translateY(${this.yDragValue + 0.2*window.innerHeight}px)`;
      return;
    }
    
    this.card!.style.transform = `translateY(${this.yDragValue}px)`;
  }
  stopDraggingHandler(event: any) {
    if(!this.isDragging) return;
    const { clientY } = event.changedTouches[0];
    if (this.space > 90) {
      this.card!.style.transform = `translateY(${this.initialDragClientY}px)`;
      var space = window.innerHeight - this.card!.getBoundingClientRect().bottom; 
    } 
    this.isDragging = false;
  }
  
  

}
