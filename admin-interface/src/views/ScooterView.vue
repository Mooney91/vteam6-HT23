<template>
    <div class="about">
        <div class="small-content">
            <h1>Scooters</h1>
            <h2>Manage the scooters in the system.</h2>

            <div v-if="addForm">
                <div @click="addForm = !addForm"><img alt="add icon" class="add" src="@/assets/circle-plus-solid.svg" width="30" height="30" />Add a scooter</div>
            </div>
            <div v-else>
                <div @click="addForm = !addForm"><img alt="minus icon" class="add" src="@/assets/circle-minus-solid.svg" width="30" height="30" />Add a scooter</div>
                <form @submit.prevent="createScooter" class="add-form">
                    <label for="Status">Status:</label>
                    <input type="text" id="Status" v-model="Status" required>
                    <label for="Location">Location:</label>
                    <input type="text" id="Location" v-model="Location" required>
                    <label for="Speed">Speed:</label>
                    <input type="number" id="Speed" v-model="Speed" required>
                    <label for="Battery">Battery:</label>
                    <input type="number" id="Battery" v-model="Battery" required>
                    <label for="StationID">StationID:</label>
                    <input type="number" id="StationID" v-model="StationID" required>
                    <button type="submit">Create Scooter</button>
                </form>
            </div>

            <table class="database-table">
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Speed</th>
                    <th>Battery</th>
                    <th>StationID</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <template v-for="item in items" :key="item.ScooterID">
                    <tr @click="zoomToScooter(item)">
                        <td>{{ item.ScooterID }}</td>
                        <td>{{ item.Status }}</td>
                        <td>{{ item.Location }}</td>
                        <td>{{ item.Speed }}</td>
                        <td>{{ item.Battery }}</td>
                        <td>{{ item.StationID }}</td>
                        <td @click="toggleChargingEditForm(item.ScooterID)">
                            <img alt="charging icon" class="charging" src="@/assets/charging-station-solid.svg" width="15" height="15" />
                        </td>
                        <td @click="toggleParkingEditForm(item.ScooterID)">
                            <img alt="parking icon" class="parking" src="@/assets/square-parking-solid.svg" width="15" height="15" />
                        </td>
                        <td @click="toggleEditForm(item.ScooterID)">
                            <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                        </td>
                        <td @click="deleteScooter(item.ScooterID)">
                            <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                        </td>
                        <td @click="unparkScooter(item.ScooterID, item.StationID)">
                            <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                        </td>
                    </tr>
                    <tr v-if="editForms[item.ScooterID]">
                        <div style="display: none;">
                            {{ ScooterID = item.ScooterID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateScooter">
                                <label for="Status">Status:</label>
                                <input type="text" id="Status" v-model="Status" required>
                                <label for="Location">Location:</label>
                                <input type="text" id="Location" v-model="Location" required>
                                <label for="Speed">Speed:</label>
                                <input type="number" id="Speed" v-model="Speed" required>
                                <label for="Battery">Battery:</label>
                                <input type="number" id="Battery" v-model="Battery" required>
                                <button type="submit">Update Scooter</button>
                            </form>
                        </td>
                    </tr>
                    <tr v-if="chargingEditForms[item.ScooterID]">
                        <div style="display: none;">
                            {{ ScooterID = item.ScooterID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateChargingStation">
                                <label for="StationID">StationID:</label>
                                <select id="ChargingStationID" name="StationID" size="1" v-model="ChargingStationID" required>
                                    <template :key="item.StationID" v-for="item in charging" >
                                        <option :value="item.StationID">{{item.StationID}}</option>
                                    </template>
                                </select>
                                <button type="submit">Update Charging Station</button>
                            </form>
                        </td>
                    </tr>
                    <tr v-if="parkingEditForms[item.ScooterID]">
                        <div style="display: none;">
                            {{ ScooterID = item.ScooterID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateParkingStation">
                                <label for="StationID">StationID:</label>
                                <select id="ParkingStationID" name="StationID" size="1" v-model="ParkingStationID" required>
                                    <template :key="item.StationID" v-for="item in parking" >
                                        <option :value="item.StationID">{{item.StationID}}</option>
                                    </template>
                                </select>
                                <button type="submit">Update Parking Station</button>
                            </form>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        <ScooterMapItem ref="map" :items="items"/>
    </div>
</template>

<script>
    // import { getCurrentInstance } from 'vue';
    // import { ref } from 'vue';  // Import ref from Vue
    // import { RouterLink, RouterView } from 'vue-router'
    import ScooterMapItem from '../components/ScooterMapItem.vue'

    export default {
        name: 'ScooterView',
        components: {
            ScooterMapItem,
        },
        props: {
            backend: String
        },
        data() {
            return {
                componentKey: 0,
                items: null,
                addForm: true,
                editForms: {},
                chargingEditForms: {},
                parkingEditForms: {},
                ScooterID: '',
                Status: '',
                Location: '',
                Speed: '',
                Battery: '',
                StationID: '',
                ChargingStationID: '',
                ParkingStationID: '',
                charging: [],
                parking: [],
                // backend: this.backend
            };
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


                    // Initialize editForms with ScooterIDs as keys
                    this.editForms = result.reduce((acc, item) => {
                        acc[item.ScooterID] = false;
                        return acc;
                    }, {});

                    this.items = result;
                    console.log(this.items)
                    return result;
                } catch (error) {
                    console.error('Error fetching scooter data:', error);
                    throw error;
                }
            },
            async createScooter() {
                try {
                    console.log(this.Status);
                    console.log(this.Location)
                    const response = await fetch(`${this.backend}/v1/scooter`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Status: this.Status,
                            Location: this.Location,
                            Speed: this.Speed,
                            Battery: this.Battery,
                            StationID: null
                        }),
                        })
                    const result = await response.json();
                    this.componentKey += 1;
                    return result;
                } catch (error) {
                    console.error('Error creating scooter:', error);
                    throw error;
                }
            },
            async updateScooter() {
                try {
                    console.log(this.Status);
                    console.log(this.Location)
                    const response = await fetch(`${this.backend}/v1/scooter/${this.ScooterID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Status: this.Status,
                            Location: this.Location,
                            Speed: this.Speed,
                            Battery: this.Battery,
                            StationID: this.StationID
                        }),
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.ScooterID === this.ScooterID);
                    if (index !== -1) {
                        this.$set(this.items, index, result);
                    }

                    return result;
                } catch (error) {
                    console.error('Error creating scooter:', error);
                    throw error;
                }
            },

            async updateChargingStation() {
                try {
                    const response = await fetch(`${this.backend}/v1/scooter/${this.ScooterID}/park/${this.ChargingStationID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.ScooterID === this.ScooterID);
                    if (index !== -1) {
                        // Vue.set(this.items, index, result);
                    }

                    return result;
                } catch (error) {
                    console.error('Error updating scooter:', error);
                    throw error;
                }
            },

            async updateParkingStation() {
                try {
                    const response = await fetch(`${this.backend}/v1/scooter/${this.ScooterID}/park/${this.ParkingStationID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.ScooterID === this.ScooterID);
                    if (index !== -1) {
                        Vue.set(this.items, index, result); // eslint-disable-line no-undef
                    }

                    return result;
                } catch (error) {
                    console.error('Error updating scooter:', error);
                    throw error;
                }
            },

            toggleEditForm(ScooterID) {
                this.editForms[ScooterID] = !this.editForms[ScooterID];
            },

            toggleChargingEditForm(ScooterID) {
                this.chargingEditForms[ScooterID] = !this.chargingEditForms[ScooterID];
            },

            toggleParkingEditForm(ScooterID) {
                this.parkingEditForms[ScooterID] = !this.parkingEditForms[ScooterID];
            },

            async deleteScooter(ScooterID) {
                try {
                    const response = await fetch(`${this.backend}/v1/scooter/${ScooterID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    const result = await response.json();
                    this.items = this.items.filter(item => item.ScooterID !== ScooterID);
                    return result;
                } catch (error) {
                    console.error('Error deleting scooter:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
            zoomToScooter(item) {
                this.$refs.map.zoomToScooter(item);
            },

            async unparkScooter(ScooterID, StationID) {

                console.log(ScooterID)
                console.log(StationID)
                try {
                    const response = await fetch(`${this.backend}/v1/scooter/${ScooterID}/unpark/${StationID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.ScooterID === this.ScooterID);
                    if (index !== -1) {
                        Vue.set(this.items, index, result); // eslint-disable-line no-undef
                    }

                    return result;
                } catch (error) {
                    console.error('Error updating scooter:', error);
                    throw error;
                }
            },


        },
        async mounted() {
            try {
                await this.fetchScooters();
                await this.fetchStations();
            } catch (error) {
            console.error('Error in created lifecycle hook:', error);
            }
        },
    };
</script>

<style>
</style>