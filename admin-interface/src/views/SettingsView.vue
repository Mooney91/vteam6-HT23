<template>
    <div class="about">
        <div class="small-content">
            <h1>Settings</h1>

            <table class="database-table">
                <th>Cost Structures</th>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
                <template v-for="item in items" :key="item.CostID">
                    <tr>
                        <td>{{ item.CostID }}</td>
                        <td>{{ item.CostDesc }}</td>
                        <td>{{ item.CostAmount }}</td>
                        <td @click="toggleEditForm(item.CostID)">
                            <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                        </td>
                    </tr>
                    <tr v-if="editForms[item.CostID]">
                        <div style="display: none;">
                            {{ CostID = item.CostID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateCostStructure" class="edit-form">
                                <label for="CostDesc">Description:</label>
                                <input type="text" id="CostDesc" v-model="CostDesc" required>
                                <label for="CostAmount">Amount:</label>
                                <input type="number" id="CostAmount" v-model="CostAmount" required>
                                <button type="submit">Update Amount</button>
                            </form>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>

<script>
    import { getCurrentInstance } from 'vue';
    import { ref } from 'vue';
    import { RouterLink, RouterView } from 'vue-router'

    export default {
        name: 'SettingsView',
        props: {
            backend: String
        },
        data() {
            return {
                componentKey: 0,
                items: null,
                addForm: true,
                editForms: {},
                CostID: '',
                CostDesc: '',
                CostAmount: '',

                backend: this.backend
            };
        },
        methods: {
            async forceRerender() {
                this.componentKey += 1;
            },
            async fetchCostStructures() {
                try {
                    const response = await fetch(`${this.backend}/v1/cost-structure`);
                    const result = await response.json();

                    this.items = result;
                    
                    return result;
                } catch (error) {
                    console.error('Error fetching station data:', error);
                    throw error;
                }
            },
            async fetchCostStructures() {
                try {
                    const response = await fetch(`${this.backend}/v1/cost-structure`);
                    const result = await response.json();

                    // Initialize editForms with CostIDs as keys
                    this.editForms = result.reduce((acc, item) => {
                        acc[item.CostID] = false;
                        return acc;
                    }, {});

                    this.items = result;
                    console.log(this.items)
                    return result;
                } catch (error) {
                    console.error('Error fetching cost structure data:', error);
                    throw error;
                }
            },
            async updateCostStructure() {
                try {
                    const response = await fetch(`${this.backend}/v1/cost-structure/${this.CostID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            CostDesc: this.CostDesc,
                            CostAmount: this.CostAmount
                        }),
                        })
                    const result = await response.json();
                    
                    // Rerender the view!
                    const index = this.items.findIndex(item => item.CostID === this.CostID);
                    if (index !== -1) {
                        this.$set(this.items, index, result);
                    }

                    return result;
                } catch (error) {
                    console.error('Error creating cost structure:', error);
                    throw error;
                }
            },

            toggleEditForm(CostID) {
                this.editForms[CostID] = !this.editForms[CostID];
            },
        },
        async mounted() {
            try {
                await this.fetchCostStructures();
            } catch (error) {
            console.error('Error in created lifecycle hook:', error);
            }
        },
    };
</script>

<style>
</style>