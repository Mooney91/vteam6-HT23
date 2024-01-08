<template>
    <div class="about">
      <div class="small-content">
      <h1>Charging Stations</h1>
      <h2>Manage the Charging Stations in the system.</h2>
      <p><img src="@/assets/charging-station-solid.svg" class="charging" alt="Charging Icon" style="vertical-align: middle; padding: 5px;">Charging Stations</p>
      <div v-if="addForm">
                <div @click="addForm = !addForm"><img alt="add icon" class="add" src="@/assets/circle-plus-solid.svg" width="30" height="30" />Add a Charging Station</div>
            </div>
            <div v-else>
                <div @click="addForm = !addForm"><img alt="minus icon" class="add" src="@/assets/circle-minus-solid.svg" width="30" height="30" />Add a Charging Station</div>
                <form @submit.prevent="createStation" class="add-form">
                    <label for="StationName">Name:</label>
                    <input type="text" id="StationName" v-model="StationName" required>
                    <label for="Location">Location:</label>
                    <input type="text" id="Location" v-model="Location" required>
                    <label for="ScooterCapacity">Capacity:</label>
                    <input type="number" id="ScooterCapacity" v-model="ScooterCapacity" required>
                    <label for="CityID">City ID:</label>
                    <input type="number" id="CityID" v-model="CityID" required>
                    <button type="submit">Create Charging Station</button>
                </form>
            </div>
      <table class="database-table">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Occupancy</th>
                <th>Capacity</th>
                <th>Scooters</th>
                <th>City</th>
                <th></th>
                <th></th>
            </tr>
            <template v-for="item in charging" :key="item.StationID">
                <tr @click="zoomToScooter(item)">
                    <td>{{ item.StationID }}</td>
                    <td>{{ item.StationName }}</td>
                    <td>{{ item.ScooterOccupancy }}</td>
                    <td>{{ item.ScooterCapacity }}</td>
                    <td>{{ item.Scooters }}</td>
                    <td>{{ item.CityID }}</td>
                    <td @click="toggleEditForm(item.StationID)">
                            <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                        </td>
                    <td @click="deleteStation(item.StationID)">
                        <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                    </td>
                </tr>
                <tr v-if="editForms[item.StationID]">
                        <div style="display: none;">
                            {{ StationID = item.StationID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateStation"  class="edit-form">
                                <label for="StationName">Name:</label>
                                <input type="text" id="StationName" v-model="StationName" required>
                                <label for="Location">Location:</label>
                                <input type="text" id="Location" v-model="Location" required>
                                <label for="ScooterCapacity">Capacity:</label>
                                <input type="number" id="ScooterCapacity" v-model="ScooterCapacity" required>
                                <label for="ScooterOccupancy">Occupancy:</label>
                                <input type="number" id="ScooterOccupancy" v-model="ScooterOccupancy" required>
                                <label for="StationType">Station Type:</label>
                                <input type="number" id="StationType" v-model="StationType" required>
                                <label for="CityID">City ID:</label>
                                <input type="number" id="CityID" v-model="CityID" required>
                                <button type="submit">Update Charging Station</button>
                            </form>
                        </td>
                    </tr>
            </template>
        </table>

      </div>
      <div class="map" style="height:100vh; width:100%">
      <l-map class="map" ref="map" v-model:zoom="zoom" :center="coordinates" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>>
  
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
      </l-map>
    </div>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import {LMap, LTileLayer, LMarker, LIcon, LPopup } from "@vue-leaflet/vue-leaflet";
  
  export default {
      name: 'ChargingView',
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
          addForm: true,
          editForms: {},
          coordinates: [57.5477, 14.0157],
          charging: [],
          parking: [],
          StationID: '',
          StationName: '',
            Location: '',
            ScooterCapacity: '',
            ScooterOccupancy: '',
            StationType: '',
            CityID: '',
          city: null,
          scooters: null,
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

                  this.editForms = result.reduce((acc, item) => {
                        acc[item.StationID] = false;
                        return acc;
                    }, {});


                  return result;
              } catch (error) {
                  console.error('Error fetching station data:', error);
                  throw error;
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
            }
        },
        async deleteStation(StationID) {
                try {
                    const response = await fetch(`${this.backend}/v1/station/${StationID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        })

                    const result = await response.json();
                    this.charging = this.charging.filter(item => item.StationID !== StationID);
                    return result;
                } catch (error) {
                    console.error('Error deleting station:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
            async createStation() {
                try {
                    const response = await fetch(`${this.backend}/v1/station`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        body: JSON.stringify({
                            StationName: this.StationName,
                            Location: this.location,
                            ScooterCapacity: this.ScooterCapacity,
                            ScooterOccupancy: 0,
                            StationType: 2,
                            CityID: this.CityID
                        }),
                        })
                    const result = await response.json();
                    this.componentKey += 1;
                    return result;
                } catch (error) {
                    console.error('Error creating station:', error);
                    throw error;
                }
            },
            async updateStation() {
                try {
                    const response = await fetch(`${this.backend}/v1/station/${this.StationID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        body: JSON.stringify({
                            StationName: this.StationName,
                            Location: this.location,
                            ScooterCapacity: this.ScooterCapacity,
                            ScooterOccupancy: this.ScooterOccupancy,
                            StationType: this.StationType,
                            CityID: this.CityID
                        }),
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.charging.findIndex(item => item.StationID === this.StationID);
                    if (index !== -1) {
                        this.$set(this.items, index, result);
                    }

                    return result;
                } catch (error) {
                    console.error('Error updating station:', error);
                    throw error;
                }
            },
            toggleEditForm(StationID) {
                this.editForms[StationID] = !this.editForms[StationID];
            },
          zoomToScooter(item) {
              console.log(item)
              this.coordinates = item.Location.split(',');
              this.zoom = 20;
          },
      },

      async created() {
              try {
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