<template>
  <div class="relative flex items-center justify-center h-screen">
    <l-map
      class="z-0 bg-light-bg dark:bg-dark-bg"
      ref="map"
      :useGlobalLeaflet="false"
      :zoom="zoom"
      :min-zoom="5"
      :max-zoom="18"
      :center="center"
      @ready="onMapReady()"
    >
      <l-tile-layer
        class="z-0"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>

    <button
      aria-label="Get current location"
      class="absolute top-0 right-0 z-10 m-4 transition duration-200 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg active:scale-90 ease-out-expo"
      @click="getLocation()">
      <i class='px-4 py-1 text-2xl text-light-fg dark:text-dark-fg bx bx-current-location'></i>
    </button>
  </div>
  <SiteNavigation />
</template>

<script setup>
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import SiteNavigation from '../components/SiteNavigation.vue'

const map = ref(null)
const lat = ref(51.507351)
const long = ref(-0.127758)
const zoom = ref(3)
const center = ref([lat.value, long.value])

const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    }
}

const onMapReady = async () => {
  await getLocation()

  // Add default marker to the map
  L.marker([lat.value, long.value]).addTo(map.value.leafletObject)

  // TODO: Spawn markers for stations and scooters
}

const getLocation = async () => {
  if (navigator.geolocation) {
    const coords = await getCoords()
    lat.value = coords.lat
    long.value = coords.long
    zoom.value = 18
    center.value = [lat.value, long.value]

    map.value.leafletObject.setView([lat.value, long.value], zoom.value)
  }
}
</script>

<style scoped>
.leaflet-container {
  outline: 0;
}
</style>
