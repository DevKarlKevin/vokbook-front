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
          @click="createReport('service-report')"
        >
          Create service report
        </v-btn>
        <v-btn
          color="info"
          class="ml-3"
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
          Vehicle {{ vehicle.vokId }}
        </h1>
        <h3>{{ vehicle.coModuleId }}</h3>
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
        <h4>{{ vehicle.rfid }}</h4>
        <h4>{{ vehicle.ecuBranch }}</h4>
        <h4>{{ vehicle.ecuCommit }}</h4>
        <h4>{{ vehicle.csCommit }}</h4>

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
              Service reports
            </v-tab>

            <v-tab>
              Parts list(BOM)
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
                @click:row="handleClick"
              >
              </v-data-table>
            </v-tab-item>
            <v-tab-item
              :key="2"
            >
              <v-card flat>
                <v-card-text>Parts list (BOM)</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              :key="3"
            >
              <v-card flat>
                <v-card-text>List of tickets</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
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
          Create ticket
        </v-card-title>
        <v-card-text>
          ticket form incoming
        </v-card-text>
        <v-card-actions>
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
        text: 'Vok ID',
        value: 'vokId',
        sortable: false,
      },
      {
        text: 'Maintenance type',
        value: 'maintenanceType',
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

    const isDialogVisible = false
    const currentTab = null
    const vehicle = {
      vokId: '', identifier: '', fleet: '', mileage: '', status: '', coModuleId: '', repo: '', ecuBranch: '', ecuCommit: '', csCommit: '', rfid: '',
    }

    return {
      mdiPlus,
      vehicle,
      tableColumn,
      isDialogVisible,
      currentTab,
    }
  },

  mounted() {
    this.getVehicle()
  },

  methods: {
    async getVehicle() {
      await axios
        .get(`v1/vehicles/${this.$route.params.vehicleId}`)
        .then(response => {
          this.vehicle.id = response.data.id
          this.vehicle.vokId = response.data.vokId
          this.vehicle.coModuleId = response.data.coModuleId
          this.vehicle.rfid = response.data.rfid
          this.vehicle.ecuBranch = response.data.ecuBranch
          this.vehicle.ecuCommit = response.data.ecuCommit
          this.vehicle.csCommit = response.data.csCommit
        })
    },

    toVehicleList() {
      router.push('/dashboards/vehicles')
    },

    createReport(formType) {
      router.push(`/pages/vehicle/${this.vehicle.id}/${formType}`)
    },

    handleClick(value) {
      console.log(value)
    },
  },
}
</script>
