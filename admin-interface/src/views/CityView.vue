<template>
    <div class="about">
        <div class="small-content">
            <h1>Cities</h1>
            <h2>Manage the cities in the system.</h2>

            <div v-if="addForm">
                <div @click="addForm = !addForm"><img alt="add icon" class="add" src="@/assets/circle-plus-solid.svg" width="30" height="30" />Add a city</div>
            </div>
            <div v-else>
                <div @click="addForm = !addForm"><img alt="minus icon" class="add" src="@/assets/circle-minus-solid.svg" width="30" height="30" />Add a city</div>
                <form @submit.prevent="createCity"  class="add-form">
                    <label for="CityName">City Name:</label>
                    <input type="text" id="CityName" v-model="CityName" required>
                    <label for="CityPosition">City Position:</label>
                    <input type="text" id="CityPosition" v-model="CityPosition" required>
                    <button type="submit">Create City</button>
                </form>
            </div>

            <table class="database-table">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th></th>
                    <th></th>
                </tr>
                <template v-for="item in items" :key="item.CityID">
                    <tr>
                        <td>
                            <button>
                                <router-link
                                :to="{
                                    name: 'CitySingle',
                                    params: {
                                        id: item.CityID
                                    }
                                }">
                                {{ item.CityID }}
                                </router-link>
                            </button>    
                        </td>
                        <td>{{ item.CityName }}</td>
                        <td>{{ item.CityPosition }}</td>


                        <td @click="toggleEditForm(item.CityID)">
                            <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                        </td>
                        <td @click="deleteCity(item.CityID)">
                            <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                        </td>
                    </tr>
                    <tr v-if="editForms[item.CityID]">
                        <div style="display: none;">
                            {{ CityID = item.CityID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateCity"  class="edit-form">
                                <input type="hidden" id="CityID" v-model="CityID" readonly>
                                <label for="CityName">City Name:</label>
                                <input type="text" id="CityName" v-model="CityName" required>
                                <label for="CityPosition">City Position:</label>
                                <input type="text" id="CityPosition" v-model="CityPosition" required>
                                <button type="submit">Update City</button>
                            </form>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        <MapItem :items="items"/>
    </div>
</template>

<script>
    // import { getCurrentInstance } from 'vue';
    // import { ref } from 'vue';  // Import ref from Vue
    import { RouterLink } from 'vue-router'
    import MapItem from '../components/MapItem.vue'

    export default {
        name: 'CityView',
        components: {
            MapItem,
            RouterLink
        },
        props: {
            backend: String
        },
        data() {
            return {
                componentKey: 0,
                items: null,
                addForm: true,
                editForms: {}, // Object to track editForm state for each item
                CityID: '',
                CityName: '',
                CityPosition: '',
                // backend: this.backend
            };
        },
        methods: {
            async forceRerender() {
                this.componentKey += 1;
            },
            async fetchCity() {
                try {
                    const response = await fetch(`${this.backend}/v1/city`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                    });
                    const result = await response.json();

                    // Initialize editForms with CityIDs as keys
                    this.editForms = result.reduce((acc, item) => {
                        acc[item.CityID] = false;
                        return acc;
                    }, {});

                    this.items = result;
                    console.log(this.items)
                    return result;
                } catch (error) {
                    console.error('Error fetching city data:', error);
                    throw error;
                }
            },
            async createCity() {
                try {
                    console.log(this.CityName);
                    console.log(this.CityPosition)
                    const response = await fetch(`${this.backend}/v1/city`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        body: JSON.stringify({
                            CityName: this.CityName,
                            CityPosition: this.CityPosition,
                        }),
                        })
                    const result = await response.json();
                    this.componentKey += 1;
                    return result;
                } catch (error) {
                    console.error('Error creating city:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
            async updateCity() {
                try {
                    console.log(this.CityName);
                    console.log(this.CityPosition)
                    const response = await fetch(`${this.backend}/v1/city/${this.CityID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        body: JSON.stringify({
                            CityName: this.CityName,
                            CityPosition: this.CityPosition,
                        }),
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.CityID === this.CityID);
                    if (index !== -1) {
                        this.$set(this.items, index, result);
                    }

                    return result;
                } catch (error) {
                    console.error('Error creating city:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
            toggleEditForm(CityID) {
                this.editForms[CityID] = !this.editForms[CityID];
            },
            async deleteCity(CityID) {
                try {
                    const response = await fetch(`${this.backend}/v1/city/${CityID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s',
                        },
                        })

                    const result = await response.json();
                    this.items = this.items.filter(item => item.CityID !== CityID);
                    return result;
                } catch (error) {
                    console.error('Error deleting city:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },

        },
        async mounted() {
            try {
                await this.fetchCity();
            } catch (error) {
            console.error('Error in created lifecycle hook:', error);
            }
        },
    };
</script>

<style>
</style>