/**
 * @customElement
 * @polymer
 */
class PullutionaApp extends Polymer.Element {
  static get is() { return 'pullutiona-app'; }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'pullutiona-app'
      },
      devices: {
        type: Array,
        value: [
          {
            lat: 2.921545,
            lng: 101.663735,
            label: 'Site A'
          },
          {
            lat: 2.9179073,
            lng: 101.6621664,
            label: 'Site B'
          },
          {
            lat: 2.9163751,
            lng: 101.6399484,
            label: 'Site C'
          }
        ]
      },
      markers: {
        type: Array,
        value: []
      },
      map: {
        type: Object,
        value: null
      },

    };
  }

  connectedCallback() {
    super.connectedCallback();
    console.debug(PullutionaApp.is, this.devices);

    this.$.gmap.addEventListener('google-map-ready', e => {this._mapAPIReady(e);});
  }

  _mapAPIReady(e) {
    console.debug(PullutionaApp.is, e);
    console.debug(PullutionaApp.is, 'mapAPIReady');
    console.debug(PullutionaApp.is, this.devices);

    this._addMarkers(this.devices);
  }

  _addMarkers(devices) {
    console.debug(PullutionaApp.is, devices);

    var markerClick = function(marker, infoWindow) {
      return function() {
        infoWindow.open(this.map, marker);
      };
    };

    for (let i = 0; i < devices.length; i++) {

      var infoWindow = new google.maps.InfoWindow({
        content: devices[i].label
      });

      var marker = new google.maps.Marker({
        position: {lat: devices[i].lat, lng: devices[i].lng},
        map: this.map,
        title: devices[i].label,
        clickEvents: true,
        icon: {url: 'assets/mapicon_36x36.png'},
      });

      marker.addListener('click', (markerClick)(marker, infoWindow));

      /*google.maps.event.addListener(marker, 'click', function() {
        var marker_map = this.getMap();
        this.info.open(marker_map);
      });*/

      //this.$.gmap.addEventListener('google-map-marker-click', m => {this._markerClicked(m);});

      this.markers.push(marker);
    }

    console.debug(PullutionaApp.is, this.markers);
  }

   _markerClicked() {
     console.debug(PullutionaApp.is, 'marker clicked: ', this);

     var marker_map = this.getMap();
     this.info.open(marker_map);
  }


}

window.customElements.define(PullutionaApp.is, PullutionaApp);