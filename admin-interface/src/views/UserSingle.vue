<template>
    <div class="about">
      <div class="small-content">
      <h2>{{user.UserID }}. {{user.FirstName}} {{user.LastName}}</h2>
      <p>All rental logs for {{user.FirstName}} {{user.LastName}}.</p>
      <p><b>Current Account Balance:</b> {{ user.AccountBalance }} SEK</p>
  
      <table class="database-table">
            <tr>
                <th>ID</th>
                <th>Active</th>
                <th>Scooter ID</th>
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
            <template v-for="item in items" :key="item.UserID">
                <tr>
                <td>{{ item.RentalLogID }}</td>
                <td>{{ item.Active }}</td>
                <td>{{ item.ScooterID }}</td>
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
    </div>
  </template>
  
  <script>
  
  export default {
      name: 'UserSingle',
      props: {
          id: String,
          backend: String,
      },
      data() {
        return {
          user: null,
          editForms: {},
          items: [],
        }
      },
      methods: {
          async forceRerender() {
              this.componentKey += 1;
          },
          async fetchUser() {
                  try {
                      const response = await fetch(`${this.backend}/v1/user/${this.id}`);
                      const result = await response.json();
  
                      this.user = result[0];
                      console.log(this.user)
                      return result;
                  } catch (error) {
                      console.error('Error fetching user data:', error);
                      throw error;
                  }
              },
          async fetchRentalLogs() {
              try {
                  const response = await fetch(`${this.backend}/v1/rental-log`);
                  const result = await response.json();
  
                  for (let element of result) {
                      if (element.UserID === this.user.UserID) {
                        console.log("Hello")
                        this.items.push(element);
                    }
                    }
        
                  return result;
              } catch (error) {
                  console.error('Error fetching user data:', error);
                  throw error;
              }
          },
          toggleEditForm(RentalLogID) {
                this.editForms[RentalLogID] = !this.editForms[RentalLogID];
            },
      },
      async created() {
              try {
                  await this.fetchUser();
                  await this.fetchRentalLogs();
              } catch (error) {
              console.error('Error in created lifecycle hook:', error);
              }
      },
  }
  
  </script>
  
  <style>
  </style>