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
          :headers="tableColumn"
          :items="vehicles"
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

    </v-dialog>
  </div>
</template>

<script>
import {
  mdiPlus,
} from '@mdi/js'
import { ref } from '@vue/composition-api'
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
    const isDialogVisible = ref(false)
    const statuses = ['Active', 'Unassigned', 'Inactive']
    const models = ['VOK1', 'VOK2', 'VOK3']
    const fleets = ['Tallinn', 'London', 'Vilnius']

    return {
      mdiPlus,
      vehicles: [],
      tableColumn,
      search,
      isDialogVisible,
      statuses,
      models,
      fleets,
    }
  },

  methods: {
    async getVehicles() {
      await axios
        .get('vehicles')
        .then(response => {
          response.data.forEach(vehicle => this.vehicles.push(vehicle))
          console.log('on vä123', this.vehicles)
        })

      console.log('on vä', this.vehicles)
    },

    createVehicle() {
      axios
        .post('vehicles', {
          vokId: 'türa1',
          identifier: 'türa3',
          fleet: 'VOK_BIKES_TALLINN',
          mileage: 0,
          status: 'ACTIVE',
          coModuleId: 'türaküll',
          repo: 'türa7',
          ecuBranch: 'türa8',
          ecuCommit: 'türa9',
          csCommit: 'türa10',
          rfid: 'türa11türaküll',
        })
        .then(response => {
          const midaiganes = response.data

          console.log('tagasitüra', midaiganes)
        })
    },

    handleClick(value) {
      console.log(value.comoduleID)
      router.push('/dashboards/vehicles')
    },
  },

  mounted() {
    this.getVehicles()
  },
}
</script>
