<template>
  <div>
    <v-row>
      <v-col
        cols="6"
      >
        <h1>
          Vehicles
        </h1>
      </v-col>

      <v-col
        cols="6"
        class="text-end"
      >
        <v-btn
          color="success"
          dark
          @click="isDialogVisible = true"
        >
          Add vehicle
          <v-icon
            dark
            right
          >
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-text>

        <v-data-table
          :headers="vehicleTable"
          :items="vehiclesFromState"
          :search="search"
          @click:row="handleClick"
        >
        </v-data-table>
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
          <v-select
            v-model="vehicle.model"
            :items="models"
            item-text="name"
            item-value="id"
            label="Model"
            return-object
          ></v-select>
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
import { mdiPlus } from '@mdi/js'
import { onUnmounted } from '@vue/composition-api/dist/vue-composition-api'
import axios from '@axios'
import store from '@/store'
import router from '@/router'
import vehicleStoreModule from '@/vehicle/store/vehicleStoreModule'
import vehicleModelStoreModule from '@/vehicle/store/vehicleModelStoreModule'
import vehicleTable from '@/vehicle/vehicle-table'
import vehicleConst from '@/vehicle/vehicle-const'

export default {
  components: {},

  setup() {
    // Register module
    vehicleStoreModule.registerStore()
    vehicleModelStoreModule.registerStore()

    // UnRegister on leave
    onUnmounted(() => {
      vehicleStoreModule.unregisterStore()
      vehicleModelStoreModule.unregisterStore()
    })
  },

  data() {
    const search = ''
    const isDialogVisible = false
    const vehicle = {
      vokId: '', identifier: '', fleet: '', mileage: '', status: '', coModuleId: '', model: '', repo: '', ecuBranch: '', ecuCommit: '', csCommit: '', rfid: '',
    }

    return {
      mdiPlus,
      vehicles: [],
      vehicle,
      vehicleTable,
      search,
      isDialogVisible,
      statuses: vehicleConst.statuses,
      models: [],
      fleets: vehicleConst.fleets,
    }
  },

  computed: {
    vehiclesFromState() {
      return vehicleStoreModule.vehicleStore.state.vehicles
    },
  },

  mounted() {
    this.getVehicles()
    this.getModels()
  },

  methods: {
    getVehicles() {
      store.dispatch(vehicleStoreModule.fetchAllVehicles)
    },

    getModels() {
      store.dispatch(vehicleModelStoreModule.fetchAllModels).then(response => {
        response.data.forEach(model => this.models.push(model))
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
          model: vehicle.model.id,
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
      router.push(`/pages/vehicle/${value.id}`)
    },
  },
}
</script>
