<template>
  <div class="about">
    <div class="small-content">
      <h2>{{ city.CityName }}</h2>
      <p>Information regarding Charging Stations, Parking, and Scooters in {{ city.CityName }}</p>
      <p>
        <img
          src="@/assets/charging-station-solid.svg"
          class="charging"
          alt="Charging Icon"
          style="vertical-align: middle; padding: 5px"
        />Charging Station
        <img
          src="@/assets/square-parking-solid.svg"
          class="parking"
          alt="Parking Icon"
          style="vertical-align: middle; padding: 5px"
        />Parking
        <svg
          style="vertical-align: middle; padding: 5px"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <circle cx="20" cy="20" r="14" fill="#FF0000" stroke="#742227" stroke-width="2" />
          <circle cx="20" cy="20" r="4" fill="#742227" /></svg>Scooter
      </p>

      <table class="database-table">
        <th>Charging Stations</th>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Occupancy</th>
          <th>Capacity</th>
          <th>Scooters</th>
        </tr>
        <template v-for="item in charging" :key="item.CityID">
          <tr @click="zoomToScooter(item)">
            <td>{{ item.StationID }}</td>
            <td>{{ item.StationName }}</td>
            <td>{{ item.ScooterOccupancy }}</td>
            <td>{{ item.ScooterCapacity }}</td>
            <td>{{ item.Scooters }}</td>
          </tr>
        </template>
      </table>

      <table class="database-table">
        <th>Parking</th>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Occupancy</th>
          <th>Capacity</th>
          <th>Scooters</th>
        </tr>
        <template v-for="item in parking" :key="item.CityID">
          <tr @click="zoomToScooter(item)">
            <td>{{ item.StationID }}</td>
            <td>{{ item.StationName }}</td>
            <td>{{ item.ScooterOccupancy }}</td>
            <td>{{ item.ScooterCapacity }}</td>
            <td>{{ item.Scooters }}</td>
          </tr>
        </template>
      </table>
    </div>
    <div class="map" style="height: 100vh; width: 100%">
      <l-map
        class="map"
        ref="map"
        v-model:zoom="zoom"
        :center="coordinates"
        :use-global-leaflet="false"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer
        >>

        <template :key="item.StationID" v-for="item in charging">
          <l-marker :lat-lng="item.Location.split(',')">
            <l-icon className="dummy" icon-anchor="[0, 0]" icon-size="[25, 25]">
              <img src="@/assets/charging-station-solid.svg" class="charging" alt="Charging Icon" />
            </l-icon>
            <l-popup>
              <div>
                <p>
                  <b>{{ item.StationName }}</b>
                </p>
                <p><i>Charging Station</i></p>
                <p>
                  Capacity: <b>{{ item.ScooterOccupancy }}/{{ item.ScooterCapacity }}</b>
                </p>
                <p>Scooters: {{ item.Scooters }}</p>
              </div>
            </l-popup>
          </l-marker>
        </template>

        <template :key="item.StationID" v-for="item in parking">
          <l-marker :lat-lng="item.Location.split(',')">
            <l-icon className="dummy" icon-anchor="[0, 0]" icon-size="[25, 25]">
              <img src="@/assets/square-parking-solid.svg" class="parking" alt="Parking Icon" />
            </l-icon>
            <l-popup>
              <div>
                <p>
                  <b>{{ item.StationName }}</b>
                </p>
                <p><i>Parking Station</i></p>
                <p>
                  Capacity: <b>{{ item.ScooterOccupancy }}/{{ item.ScooterCapacity }}</b>
                </p>
                <p>Scooters: {{ item.Scooters }}</p>
              </div>
            </l-popup>
          </l-marker>
        </template>

        <template :key="item.ScooterID" v-for="item in scooters">
          <l-marker :icon="redDotIcon" :lat-lng="item.Location.split(',')">
            <l-popup>
              <div>
                <p><b>ID: </b>{{ item.ScooterID }}</p>
                <p><b>Status: </b>{{ item.Status }}</p>
                <p><b>Speed: </b>{{ item.Speed }}</p>
                <p><b>Battery: </b>{{ item.Battery }}</p>
              </div>
            </l-popup>
          </l-marker>
        </template>
      </l-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'CitySingle',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
  },
  props: {
    id: String,
    backend: String
  },
  data() {
    return {
      zoom: 11,
      coordinates: null,
      charging: [],
      parking: [],
      city: null,
      scooters: null,
      redDotIcon: L.divIcon({
        // eslint-disable-line no-undef
        className: 'red-dot-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="14" fill="#FF0000" stroke="#742227" stroke-width="2" />
                        <circle cx="20" cy="20" r="4" fill="#742227" />
                </svg>`,
        iconSize: [2, 2],
        iconAnchor: [0, 0]
      })
    }
  },
  methods: {
    async forceRerender() {
      this.componentKey += 1
    },
    async fetchCity() {
      try {
        const response = await fetch(`${this.backend}/v1/city/${this.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s'
          }
        })
        const result = await response.json()

        this.city = result[0]
        console.log(this.city)
        this.coordinates = result[0].CityPosition.split(',')
        return result
      } catch (error) {
        console.error('Error fetching city data:', error)
        throw error
      }
    },
    async fetchStations() {
      try {
        const response = await fetch(`${this.backend}/v1/station`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s'
          }
        })
        const result = await response.json()

        for (let element of result) {
          if (element.CityID === this.city.CityID) {
            this.city.CityID
            console.log('Hello')

            element['Scooters'] = []

            for (let scooter of this.scooters)
              if (scooter.StationID === element.StationID) {
                element['Scooters'].push(scooter.ScooterID)
              }

            if (element.StationType === 1) {
              this.parking.push(element)
            } else if (element.StationType === 2) {
              this.charging.push(element)
            }
          }
        }

        return result
      } catch (error) {
        console.error('Error fetching station data:', error)
        throw error
      }
    },
    async fetchScooters() {
      try {
        const response = await fetch(`${this.backend}/v1/scooter`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s'
          }
        })
        const result = await response.json()

        this.scooters = result

        return result
      } catch (error) {
        console.error('Error fetching scooter data:', error)
        throw error
      }
    },
    zoomToScooter(item) {
      console.log(item)
      this.coordinates = item.Location.split(',')
      this.zoom = 20
    }
  },
  async beforeMount() {
    try {
      await this.fetchCity()
      await this.fetchScooters()
      await this.fetchStations()
    } catch (error) {
      console.error('Error in created lifecycle hook:', error)
    }
  }
}
</script>

<style>
@import '../../node_modules/leaflet/dist/leaflet.css';
</style>
