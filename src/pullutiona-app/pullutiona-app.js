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

    for (let i = 0; i < devices.length; i++) {
      var marker = new google.maps.Marker({
        position: {lat: devices[i].lat, lng: devices[i].lng},
        map: this.map,
        title: devices[i].label
      });
      this.markers.push(marker);
    }

    console.debug(PullutionaApp.is, this.markers);
  }


}

window.customElements.define(PullutionaApp.is, PullutionaApp);