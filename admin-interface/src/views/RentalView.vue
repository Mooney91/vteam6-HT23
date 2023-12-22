<template>
    <div class="other">
        <h1>Rental Logs</h1>
        <h2>Manage all the rentals in the system.</h2>

        <div v-if="addForm">
            <div @click="addForm = !addForm"><img alt="add icon" class="add" src="@/assets/circle-plus-solid.svg" width="30" height="30" />Add a new rental</div>
        </div>
        <div v-else>
            <div @click="addForm = !addForm"><img alt="minus icon" class="add" src="@/assets/circle-minus-solid.svg" width="30" height="30" />Add a new rental</div>
            <form @submit.prevent="createRentalLog" class="add-form">
                <label for="ScooterID">Scooter ID:</label>
                <input type="number" id="ScooterID" v-model="ScooterID" required>
                <label for="UserID">User ID:</label>
                <input type="number" id="UserID" v-model="UserID" required>
                <label for="StartStation">Start Station:</label>
                <input type="number" id="StartStation" v-model="StartStation" required>
                <button type="submit">Create Rental</button>
            </form>
        </div>

        <table class="database-table">
            <tr>
                <th>ID</th>
                <th>Active</th>
                <th>Scooter ID</th>
                <th>User ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Start Station</th>
                <th>End Station</th>
                <th>Cost</th>
                <th>Paid</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <template v-for="item in items" :key="item.RentalLogID">
                <tr>
                <td>{{ item.RentalLogID }}</td>
                <td>{{ item.Active }}</td>
                <td>{{ item.ScooterID }}</td>
                <td>{{ item.UserID }}</td>
                <td>{{ item.StartTime }}</td>
                <td>{{ item.EndTime }}</td>
                <td>{{ item.StartStation }}</td>
                <td>{{ item.EndStation }}</td>
                <td>{{ item.Cost }}</td>
                <td>{{ item.Paid }}</td>
                <td @click="toggleEditForm(item.RentalLogID)">
                    <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                </td>
                <td @click="deleteRentalLog(item.RentalLogID)">
                    <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                </td>
                <td @click="stopRentalLog(item.RentalLogID, null)">
                    <button>Stop Rental</button>
                </td>
                </tr>
                <tr v-if="editForms[item.RentalLogID]">
                        <div style="display: none;">
                            {{ RentalLogID = item.RentalLogID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateRentalLog" class="edit-form">
                                <label for="Active">Active:</label>
                                <input type="checkbox" id="Active" v-model="Active" required>
                                <label for="ScooterID">Scooter ID:</label>
                                <input type="number" id="ScooterID" v-model="ScooterID" required>
                                <label for="UserID">User ID:</label>
                                <input type="number" id="UserID" v-model="UserID" required>
                                <label for="StartTime">Start Time:</label>
                                <input type="datetime-local" id="StartTime" v-model="StartTime" required>
                                <label for="EndTime">End Time:</label>
                                <input type="datetime-local" id="EndTime" v-model="EndTime" required>
                                <label for="StartStation">Start Station:</label>
                                <input type="number" id="StartStation" v-model="StartStation" required>
                                <label for="EndStation">End Station:</label>
                                <input type="number" id="StartStation" v-model="StartStation" required>
                                <label for="Cost">Cost:</label>
                                <input type="number" id="Cost" v-model="Cost" required>
                                <label for="Paid">Paid:</label>
                                <input type="checkbox" id="Paid" v-model="Paid" required>
                                <button type="submit">Update Rental</button>
                            </form>
                        </td>
                </tr>
                
            </template>
            
        </table>
    </div>
</template>

<script>
    // import { getCurrentInstance } from 'vue';

    export default {
        name: 'RentalView',
        props: {
            backend: String
        },
        data() {
            return {
                componentKey: 0,
                items: null,
                addForm: true,
                editForms: {}, // Object to track editForm state for each item
                RentalLogID: '',
                ScooterID: '',
                UserID: '',
                StartStation: ''
            };
        },
        methods: {
            forceRerender() {
                this.componentKey += 1;
            },
            async fetchRentalLog() {
                try {
                    const response = await fetch(`${this.backend}/v1/rental-log`);
                    const result = await response.json();

                    // Initialize editForms with RentalLogIDs as keys
                    this.editForms = result.reduce((acc, item) => {
                        acc[item.RentalLogID] = false;
                        return acc;
                    }, {});

                    this.items = result;
                    console.log(this.items)
                    return result;
                } catch (error) {
                    console.error('Error fetching rental log data:', error);
                    throw error;
                }
            },
            async createRentalLog() {
                try {
                    const response = await fetch(`${this.backend}/v1/rental-log`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ScooterID: this.ScooterID,
                            UserID: this.UserID,
                            StartStation: this.StartStation,
                        }),
                        })
                    const result = await response.json();
                    return result;
                } catch (error) {
                    console.error('Error creating rental:', error);
                    throw error;
                }
            },
            async updateRentalLog() {
                try {
                    const response = await fetch(`${this.backend}/v1/rental-log/${this.RentalLogID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Active: this.Active,
                            ScooterID: this.ScooterID,
                            UserID: this.UserID,
                            StartTime: this.StartTime,
                            EndTime: this.EndTime,
                            StartStation: this.StartStation,
                            EndStation: this.EndStation,
                            Cost: this.Cost,
                            Paid: this.Paid,
                        }),
                        })
                    const result = await response.json();
                
                    return result;
                } catch (error) {
                    console.error('Error updating rental log:', error);
                    throw error;
                }
            },
            toggleEditForm(RentalLogID) {
                this.editForms[RentalLogID] = !this.editForms[RentalLogID];
            },
            async deleteRentalLog(RentalLogID) {
                try {
                    const response = await fetch(`${this.backend}/v1/rental-log/${RentalLogID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                    const result = await response.json();
                    
                    return result;
                } catch (error) {
                    console.error('Error deleting rental log:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
            async stopRentalLog(RentalLogID, EndStation) {
                try {
                    const response = await fetch(`${this.backend}/v1/rental-log/${RentalLogID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            },
                        body: JSON.stringify({
                            EndStation: EndStation
                        }),
                        })
                    const result = await response.json();
                
                    return result;
                } catch (error) {
                    console.error('Error stopping rental log:', error);
                    throw error;
                }
            },
        },
        async mounted() {
            try {
                await this.fetchRentalLog();
            } catch (error) {
            console.error('Error in created lifecycle hook:', error);
            }
        },
    };
</script>

<style>
</style>