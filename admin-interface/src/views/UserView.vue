<template>
    <div class="other">
        <h1>Users</h1>
        <h2>Manage all the users/customers in the system.</h2>

        <div v-if="addForm">
            <div @click="addForm = !addForm"><img alt="add icon" class="add" src="@/assets/circle-plus-solid.svg" width="30" height="30" />Add a new user</div>
        </div>
        <div v-else>
            <div @click="addForm = !addForm"><img alt="minus icon" class="add" src="@/assets/circle-minus-solid.svg" width="30" height="30" />Add a new user</div>
            <form @submit.prevent="createUser" class="add-form">
                <label for="UserID">Scooter ID:</label>
                <input type="number" id="UserID" v-model="UserID" required>
                <label for="FirstName">First Name:</label>
                <input type="text" id="FirstName" v-model="FirstName" required>
                <label for="LastName">Last Name:</label>
                <input type="text" id="LastName" v-model="LastName" required>
                <label for="Password">Password:</label>
                <input type="password" id="Password" v-model="Password" required>
                <label for="Email">Email:</label>
                <input type="text" id="Email" v-model="Email" required>
                <label for="AccountBalance">Account Balance:</label>
                <input type="number" id="AccountBalance" v-model="AccountBalance" required>
                <label for="PaymentType">Payment Type:</label>
                <input type="number" id="PaymentType" v-model="PaymentType" required>
                <button type="submit">Create User</button>
            </form>
        </div>

        <table class="database-table">
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Account Balance</th>
                <th>Payment Type</th>
                <th></th>
                <th></th>
            </tr>
            <template v-for="item in items" :key="item.UserID">
                <tr>
                <td>
                    <button>
                            <router-link
                                :to="{
                                    name: 'UserSingle',
                                    params: {
                                        id: item.UserID
                                    }
                                }">
                                {{ item.UserID }}
                            </router-link>
                    </button>    
                </td>
                <td>{{ item.FirstName }}</td>
                <td>{{ item.LastName }}</td>
                <td>{{ item.Password }}</td>
                <td>{{ item.Email }}</td>
                <td>{{ item.AccountBalance }}</td>
                <td>{{ item.PaymentType }}</td>
                <td @click="toggleEditForm(item.UserID)">
                    <img alt="edit icon" class="edit" src="@/assets/pen-to-square-solid.svg" width="15" height="15" />
                </td>
                <td @click="deleteUser(item.UserID)">
                    <img alt="delete icon" class="delete" src="@/assets/trash-can-solid.svg" width="15" height="15" />
                </td>
                </tr>
                <tr v-if="editForms[item.UserID]">
                        <div style="display: none;">
                            {{ UserID = item.UserID }}
                        </div>
                        <td colspan="5">
                            <form @submit.prevent="updateUser" class="edit-form">
                                <label for="UserID">Scooter ID:</label>
                                <input type="number" id="UserID" v-model="UserID" required>
                                <label for="FirstName">First Name:</label>
                                <input type="text" id="FirstName" v-model="FirstName" required>
                                <label for="LastName">Last Name:</label>
                                <input type="text" id="LastName" v-model="LastName" required>
                                <label for="Password">Password:</label>
                                <input type="password" id="Password" v-model="Password" required>
                                <label for="Email">Email:</label>
                                <input type="text" id="Email" v-model="Email" required>
                                <label for="AccountBalance">Account Balance:</label>
                                <input type="number" id="AccountBalance" v-model="AccountBalance" required>
                                <label for="PaymentType">Payment Type:</label>
                                <input type="number" id="PaymentType" v-model="PaymentType" required>
                                <button type="submit">Update User</button>
                            </form>
                        </td>
                </tr>
                
            </template>
            
        </table>
    </div>
</template>

<script>
    import { getCurrentInstance } from 'vue';

    export default {
        name: 'UserView',
        props: {
            backend: String
        },
        data() {
            return {
                componentKey: 0,
                items: null,
                addForm: true,
                editForms: {},
                UserID: '',
                FirstName: '',
                LastName: '',
                Password: '',
                Email: '',
                AccountBalance: 0,
                PaymentType: 0,
            };
        },
        methods: {
            forceRerender() {
                this.componentKey += 1;
            },
            async fetchUsers() {
                try {
                    const response = await fetch(`${this.backend}/v1/user`);
                    const result = await response.json();

                    // Initialize editForms with UserIDs as keys
                    this.editForms = result.reduce((acc, item) => {
                        acc[item.UserID] = false;
                        return acc;
                    }, {});

                    this.items = result;
                    console.log(this.items)
                    return result;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    throw error;
                }
            },
            async createUser() {
                try {
                    const time = new Date();
                    const response = await fetch(`${this.backend}/v1/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            UserID: this.UserID,
                            FirstName: this.FirstName,
                            LastName: this.LastName,
                            Password: this.Password,
                            Email: this.Email,
                            AccountBalance: this.AccountBalance,
                            PaymentType: this.PaymentType
                        }),
                        })
                    const result = await response.json();
                    return result;
                } catch (error) {
                    // console.error('Error creating user:', error);
                    throw error;
                }
            },
            async updateUser() {
                try {
                    const response = await fetch(`${this.backend}/v1/user/${this.UserID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            UserID: this.UserID,
                            FirstName: this.FirstName,
                            LastName: this.LastName,
                            Password: this.Password,
                            Email: this.Email,
                            AccountBalance: this.AccountBalance,
                            PaymentType: this.PaymentType
                        }),
                        })
                    const result = await response.json();
                
                    return result;
                } catch (error) {
                    console.error('Error updating user:', error);
                    throw error;
                }
            },
            toggleEditForm(UserID) {
                this.editForms[UserID] = !this.editForms[UserID];
            },
            async deleteUser(UserID) {
                try {
                    const response = await fetch(`${this.backend}/v1/user/${UserID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                    const result = await response.json();
                    
                    return result;
                } catch (error) {
                    console.error('Error deleting user:', error);
                    throw error;
                } finally {
                    this.forceRerender()
                }
            },
        },
        async mounted() {
            try {
                await this.fetchUsers();
            } catch (error) {
            console.error('Error in created lifecycle hook:', error);
            }
        },
    };
</script>

<style>
</style>