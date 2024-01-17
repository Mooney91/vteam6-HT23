<template>
    <p><img src="@/assets/charging-station-solid.svg" class="charging" alt="Charging Icon" style="vertical-align: middle; padding: 5px;">Charging Station
    <img src="@/assets/square-parking-solid.svg" class="parking" alt="Parking Icon" style="vertical-align: middle; padding: 5px;">Parking
    <svg style="vertical-align: middle; padding: 5px;" xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
        <circle cx='20' cy='20' r='14' fill='#FF0000' stroke='#742227' stroke-width='2' />
        <circle cx='20' cy='20' r='4' fill='#742227' />
    </svg>Scooter  
    <button @click="zoomToCity('59.334591, 18.063240')" class="city-button">Stockholm</button>
    <button @click="zoomToCity('57.708870, 11.974560')" class="city-button">Gothenburg</button>
    <button @click="zoomToCity('55.60587, 13.00073')" class="city-button">Malmö</button>
    </p>
      <div class="map" style="height:80vh; width:100%">
      <l-map class="map" ref="map" v-model:zoom="zoom" v-model:center="coordinates" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
  
        <template :key="item.StationID" v-for="item in charging">
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
  
        <template :key="item.StationID" v-for="item in parking">
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
  
        <template :key="item.Location" v-for="item in scooters">
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
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker, LIcon, LPopup } from "@vue-leaflet/vue-leaflet";
  // import io from "socket.io-client";
  
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
          // socket: null,
          zoom: 6,
          coordinates: [57.5477, 14.0157],
          charging: [],
          parking: [],
          city: null,
          scooters: null,
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
          async forceRerender() {
              this.componentKey += 1;
          },
          async fetchStations() {
              try {
                  const response = await fetch(`${this.backend}/v1/station`, {
                    headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                  });
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
              } finally {
                    this.forceRerender()
                }
          },
          async fetchScooters() {
              try {
                  const response = await fetch(`${this.backend}/v1/scooter`, {
                    headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                  });
                  const result = await response.json();
  
                  this.scooters = result;
  
                  return result;
              } catch (error) {
                  console.error('Error fetching scooter data:', error);
                  throw error;
              } finally {
                    this.forceRerender()
                }
          },

          // async updateData() {
            // Check if socket is up and running
            // console.log(this.socket)
            // this.socket.on('connection', () => {
            //     console.log('Connected to socket server');
            // });

            // Update scooters with new data from socket
            // this.socket.on("scooter", (data) => {
            //     for (i in data) {
            //         for (scooter in this.scooters) {
            //             if (scooter.ScooterID === i.ScooterID) {
            //                 Object.assign(scooter, i);
            //             } else {
            //               this.scooters.push(i)
            //             }
            //         }
            //     }
            // })

          // },

          zoomToScooter(item) {
              console.log(item)
              this.coordinates = item.Location.split(',');
              this.zoom = 20;
          },
          zoomToCity(coordinates) {
              this.coordinates = coordinates.split(',')
              this.zoom = 15;
          },
      },
      async mounted() {
              try {
                //   await this.fetchCity();
                  
                  // this.socket = io(this.backend);
                  // console.log(this.socket)
                  await this.fetchScooters();
                  await this.fetchStations();

                  setInterval(async () => {
                    console.log("Fetching!")
                    await this.fetchStations();
                    await this.fetchScooters();
                    // Add more data fetching and map updating if needed
                    console.log('Data updated:', this.charging, this.parking, this.scooters);
                  }, 1000);

                  // await this.updateData()
              } catch (error) {
              console.error('Error in created lifecycle hook:', error);
              }
      },
  }
  
  </script>
  
  <style>
  @import '../../node_modules/leaflet/dist/leaflet.css';
  </style>