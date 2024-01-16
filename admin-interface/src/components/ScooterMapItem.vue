<template>
  <div style="height:100vh; width:100%x">
    <l-map class="map" ref="map" v-model:zoom="zoom" :center="coordinates" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <template :key="item.ScooterID" v-for="item in items">
        <l-marker :icon="redDotIcon" :lat-lng="item.Location.split(',')">
          <l-popup>
            <div>
                <p><b>ID:      </b>{{ item.ScooterID }}</p>
                <p><b>Status:  </b>{{ item.Status}}</p>
                <p><b>Speed:   </b>{{ item.Speed }}</p>
                <p><b>Battery: </b>{{ item.Battery }}</p>

            </div>
          </l-popup>
        </l-marker>
      </template>

    </l-map>
  </div>
</template>
  
<script>
  import L from 'leaflet';
  // import leaflet from "leaflet/dist/leaflet-src.esm.js";
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker, LPopup} from "@vue-leaflet/vue-leaflet";;

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
    },
    props: {
        items: Object
    },
    data() {
      return {
        zoom: 6,
        coordinates: [57.5477, 14.0157],
        redDotIcon: L.divIcon({ // eslint-disable-line no-undef
            className: 'red-dot-icon',
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="14" fill="#FF0000" stroke="#742227" stroke-width="2" />
                        <circle cx="20" cy="20" r="4" fill="#742227" />
                </svg>`,
            iconSize: [2, 2],
            iconAnchor: [0, 0],
        }),
      }
    },
    methods: {
      zoomToScooter(item) {
        console.log(item)
        this.coordinates = item.Location.split(',');
        this.zoom = 20;
      },
    },
  };
</script>
  
<style>
@import '../../node_modules/leaflet/dist/leaflet.css';

</style>