<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          outlined
          dark
          @click="toVehicleList()"
        >
          Back
        </v-btn>
      </v-col>

      <v-col
        cols="7"
        class="text-end"
      >
        <v-btn
          color="success"
          dark
          @click="isDialogVisible = true"
        >
          Create maintenance report
        </v-btn>
        <v-btn
          color="info ml-3"
          dark
          @click="isDialogVisible = true"
        >
          Create incident report
        </v-btn>
        <v-btn
          color="warning ml-3"
          dark
          @click="isDialogVisible = true"
        >
          Create ticket
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col
        cols="8"
      >
        <h1 class="mb-4">
          Vehicle 2105010
        </h1>
        <h3>b74fc15fede89c91</h3>
      </v-col>

      <v-col
        cols="2"
        class="text-start"
      >
        <h4>RFID</h4>
        <h4>ECU Branch</h4>
        <h4>ECU Commit</h4>
        <h4>CS Commit</h4>
      </v-col>

      <v-col
        cols="2"
        class="text-end"
      >
        <h4>0x2315f905</h4>
        <h4>master</h4>
        <h4>bf38af2</h4>
        <h4>cc92b65</h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <div>
          <v-tabs
            v-model="currentTab"
            icons-and-text
            grow
          >
            <v-tab>
              Maintenance reports
            </v-tab>

            <v-tab>
              Incident reports
            </v-tab>

            <v-tab>
              Tickets
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="currentTab">
            <v-tab-item
              :key="1"
            >
              <v-data-table
                :headers="tableColumn"
                :items="vehicles"
                :search="search"
                @click:row="handleClick"
              >
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              :key="2"
            >
              <v-card flat>
                <v-card-text>uugabuuga2</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              :key="3"
            >
              <v-card flat>
                <v-card-text>uugabuuga3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>

    </v-row>

    <v-row>
      <v-col>
        <!--        <v-card-text>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-text>-->
      </v-col>
    </v-row>
    <v-dialog
      v-model="isDialogVisible"
      max-width="25vw"
    >
      <v-card>
        <v-card-title
          class="mb-4"
        >
          Add new vehicle
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="vehicle.vokId"
            dense
            label="Vok ID"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.coModuleId"
            dense
            label="CoModule ID"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.identifier"
            dense
            label="Identifier"
          ></v-text-field>
          <v-select
            v-model="vehicle.fleet"
            :items="fleets"
            item-text="state"
            item-value="abbr"
            label="Fleet"
            return-object
          ></v-select>
          <v-select
            v-model="vehicle.model"
            :items="models"
            item-text="state"
            item-value="abbr"
            label="Model"
            return-object
          ></v-select>
          <v-select
            v-model="vehicle.status"
            :items="statuses"
            item-text="state"
            item-value="abbr"
            label="Status"
            return-object
          ></v-select>
          <v-text-field
            v-model="vehicle.repo"
            dense
            label="Repo"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.ecuBranch"
            dense
            label="ECU branch"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.ecuCommit"
            dense
            label="ECU commit"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.csCommit"
            dense
            label="CS commit"
          ></v-text-field>
          <v-text-field
            v-model="vehicle.rfid"
            dense
            label="RFID"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            dark
            outlined
            @click="isDialogVisible = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            dark
            @click="createVehicle(vehicle)"
          >
            Add Vehicle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  mdiPlus,
} from '@mdi/js'
import axios from '@axios'
import router from '@/router'

export default {
  components: {},

  data() {
    const tableColumn = [
      {
        text: 'CoModule ID',
        value: 'coModuleId',
        sortable: false,
      },
      {
        text: 'Identifier',
        value: 'identifier',
        sortable: true,
        align: 'center',
      },
      {
        text: 'Fleet',
        value: 'fleet',
        sortable: true,
        align: 'center',
      },
      {
        text: 'Model',
        value: 'model',
        sortable: true,
        align: 'center',
      },
      {
        text: 'Mileage',
        value: 'mileage',
        sortable: true,
        align: 'center',
      },
      {
        text: 'Status',
        value: 'status',
        sortable: true,
        align: 'center',
      },
    ]

    const search = ''
    const isDialogVisible = false
    const currentTab = null
    const statuses = ['ACTIVE', 'INACTIVE']
    const models = ['VOK1', 'VOK2', 'VOK3']
    const fleets = ['VOK_BIKES_TALLINN']
    const vehicle = {
      vokId: '', identifier: '', fleet: '', mileage: '', status: '', coModuleId: '', repo: '', ecuBranch: '', ecuCommit: '', csCommit: '', rfid: '',
    }

    return {
      mdiPlus,
      vehicle,
      tableColumn,
      search,
      isDialogVisible,
      currentTab,
      statuses,
      models,
      fleets,
    }
  },

  mounted() {
    this.getVehicles()
  },

  methods: {
    async getVehicles() {
      await axios
        .get('vehicles')
        .then(response => {
          response.data.forEach(vehicle => this.vehicles.push(vehicle))
        })
    },

    createVehicle(vehicle) {
      axios
        .post('vehicles', {
          vokId: vehicle.vokId,
          identifier: vehicle.identifier,
          fleet: vehicle.fleet,
          mileage: 0,
          status: vehicle.status,
          coModuleId: vehicle.coModuleId,
          repo: vehicle.repo,
          ecuBranch: vehicle.ecuBranch,
          ecuCommit: vehicle.ecuCommit,
          csCommit: vehicle.csCommit,
          rfid: vehicle.rfid,
        })
        .then(response => {
          const newVehicle = response.data
          this.vehicles.push(newVehicle)
          this.isDialogVisible = false
        })
    },

    handleClick(value) {
      console.log(value)

      /* router.push('/dashboards/vehicles') */
    },

    toVehicleList() {
      router.push('/dashboards/vehicles')
    },
  },
}
</script>
