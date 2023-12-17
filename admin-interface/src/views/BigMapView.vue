<template>
    <p><img src="@/assets/charging-station-solid.svg" class="charging" alt="Charging Icon" style="vertical-align: middle; padding: 5px;">Charging Station
    <img src="@/assets/square-parking-solid.svg" class="parking" alt="Parking Icon" style="vertical-align: middle; padding: 5px;">Parking
    <svg style="vertical-align: middle; padding: 5px;" xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
        <circle cx='20' cy='20' r='14' fill='#FF0000' stroke='#742227' stroke-width='2' />
        <circle cx='20' cy='20' r='4' fill='#742227' />
    </svg>Scooter  
    </p>
      <div class="map" style="height:80vh; width:100%">
      <l-map class="map" ref="map" v-model:zoom="zoom" :center="[57.5477, 14.0157]" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
  
        <template v-for="item in charging">
          <l-marker :lat-lng="item.Location.split(',')">
            <l-icon className='dummy' icon-anchor="[0, 0]" icon-size="[25, 25]">
              <img src="@/assets/charging-station-solid.svg" class="charging" alt="Charging Icon">
            </l-icon>
            <l-popup>
              <div>
                  <p><b>{{ item.StationName }}</b></p>
                  <p><i>Charging Station</i></p>
                  <p>Capacity: <b>{{ item.ScooterOccupancy }}/{{ item.ScooterCapacity }}</b></p>
                  <p>Scooters: {{ item.Scooters }}</p>
  
              </div>
            </l-popup>
          </l-marker>
        </template>
  
        <template v-for="item in parking">
          <l-marker :lat-lng="item.Location.split(',')">
            <l-icon className='dummy' icon-anchor="[0, 0]" icon-size='[25, 25]'>
              <img src="@/assets/square-parking-solid.svg" class="parking" alt="Parking Icon">
            </l-icon>
            <l-popup>
              <div>
                  <p><b>{{ item.StationName }}</b></p>
                  <p><i>Parking Station</i></p>
                  <p>Capacity: <b>{{ item.ScooterOccupancy }}/{{ item.ScooterCapacity }}</b></p>
                  <p>Scooters: {{ item.Scooters }}</p>
  
              </div>
            </l-popup>
          </l-marker>
        </template>
  
        <template v-for="item in scooters">
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
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker, LIcon, LPopup } from "@vue-leaflet/vue-leaflet";
  
  export default {
      name: 'BigMap',
      components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LPopup
      },
      props: {
          id: String,
          backend: String,
      },
      data() {
        return {
          zoom: 6,
          coordinates: null,
          charging: [],
          parking: [],
          city: null,
          scooters: null,
          redDotIcon: L.divIcon({
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
          async forceRerender() {
              this.componentKey += 1;
          },
          async fetchStations() {
              try {
                  const response = await fetch(`${this.backend}/v1/station`);
                  const result = await response.json();
  
                  for (let element of result) {
  
                    element["Scooters"] = [];

                    for (let scooter of this.scooters)
                        if (scooter.StationID === element.StationID) {
                            element["Scooters"].push(scooter.ScooterID)
                        }

                    if (element.StationType === 1) {
                        this.parking.push(element);
                    } else if (element.StationType === 2) {
                        this.charging.push(element)
                    }
                }
                  return result;
              } catch (error) {
                  console.error('Error fetching station data:', error);
                  throw error;
              }
          },
          async fetchScooters() {
              try {
                  const response = await fetch(`${this.backend}/v1/scooter`);
                  const result = await response.json();
  
                  this.scooters = result;
  
                  return result;
              } catch (error) {
                  console.error('Error fetching scooter data:', error);
                  throw error;
              }
          },
          zoomToScooter(item) {
              console.log(item)
              this.coordinates = item.Location.split(',');
              this.zoom = 20;
          },
      },
      async created() {
              try {
                //   await this.fetchCity();
                  await this.fetchScooters();
                  await this.fetchStations();
              } catch (error) {
              console.error('Error in created lifecycle hook:', error);
              }
      },
  }
  
  </script>
  
  <style>
  @import '../../node_modules/leaflet/dist/leaflet.css';
  </style>