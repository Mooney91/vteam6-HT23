<template>
  <div style="height:100vh; width:100%x">
    <l-map class="map" ref="map" v-model:zoom="zoom" :center="[57.5477, 14.0157]" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>>

      <template :key="item.CityID" v-for="item in items">
        <l-marker  :lat-lng="item.CityPosition.split(',')">
          <l-icon className='dummy' icon-anchor="[0, 0]" icon-size="[25, 25]">
            <img src="@/assets/city-solid.png" alt="Custom Marker Icon">
          </l-icon>
        </l-marker>
      </template>

    </l-map>
  </div>
</template>
  
<script>
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";;

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
    },
    props: {
        items: Object
    },
    data() {
      return {
        zoom: 6,
        coordinates: [55.50788, 13.23515],
      }
    },
  };
</script>
  
<style>
@import '../../node_modules/leaflet/dist/leaflet.css';

/* [62.173276, 14.942265] */

</style>