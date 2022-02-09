<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          color="primary"
          outlined
          dark
          @click="toVehicle()"
        >
          Back
        </v-btn>
      </v-col>

      <v-col
        cols="7"
        class="text-end"
      >
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
              Service report
            </v-tab>

            <v-tab>
              Parts list
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="currentTab">
            <v-tab-item
              :key="1"
            >
              <v-card>
                <v-col>
                  <v-select
                    v-model="serviceReport.maintenanceType"
                    dense
                    label="Maintenance type"
                    :items="maintenanceTypes"
                    class="mt-4"
                  ></v-select>
                  <v-row>
                    <v-col
                      cols="6"
                      class="text-center"
                    >
                      <v-text-field
                        v-model="serviceReport.dateIn"
                        label="Date in"
                        color="primary"
                        class="mt-4"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="6"
                      class="text-center"
                    >
                      <v-text-field
                        v-model="serviceReport.dateOut"
                        label="Date out"
                        color="primary"
                        class="mt-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <h2>Electronics</h2>
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-checkbox
                        v-model="serviceReport.rfid"
                        dense
                        hide-details
                        :label="'RFID'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.wiper"
                        dense
                        hide-details
                        :label="'Wiper'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.headlight"
                        dense
                        hide-details
                        :label="'Headlight'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.dash"
                        dense
                        hide-details
                        :label="'Dash'"
                      ></v-checkbox>
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-checkbox
                        v-model="serviceReport.taillights"
                        dense
                        hide-details
                        :label="'Taillights'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.indicators"
                        dense
                        hide-details
                        :label="'Indicators'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.usbCharger"
                        dense
                        hide-details
                        :label="'USB charger'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.horn"
                        dense
                        hide-details
                        :label="'Horn'"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <h2>Mechanics</h2>
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-checkbox
                        v-model="serviceReport.tireTread"
                        dense
                        hide-details
                        :label="'Tire tread'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.tirePressure"
                        dense
                        hide-details
                        :label="'Tire pressure'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.brakePads"
                        dense
                        hide-details
                        :label="'Brake pads'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.brakePressure"
                        dense
                        hide-details
                        :label="'Brake pressure'"
                      ></v-checkbox>
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-checkbox
                        v-model="serviceReport.suspensionTight"
                        dense
                        hide-details
                        :label="'Suspension tight'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.steeringTight"
                        dense
                        hide-details
                        :label="'Steering tight'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.seatFunctions"
                        dense
                        hide-details
                        :label="'Seat functions'"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="serviceReport.alignment"
                        dense
                        hide-details
                        :label="'Alignment'"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-textarea
                        v-model="serviceReport.comments"
                        :label="'Comments'"
                        outlined
                        rows="4"
                      >
                      </v-textarea>
                      <v-select
                        :label="'Resolved tickets'"
                        multiple
                        :items="['ticket1', 'ticket2', 'ticket3']"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-card>
            </v-tab-item>
            <v-tab-item
              :key="2"
            >
              <v-card flat>
                <v-card-text>BOM</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-row
            class="mt-5"
          >
            <v-col
              cols="6"
              class="text-start"
            >
              <v-btn
                color="info"
                dark
              >
                Create ticket
              </v-btn>
            </v-col>
            <v-col
              cols="6"
              class="text-end"
            >
              <v-btn
                color="warning"
                dark
                class="ml-3"
              >
                Put on hold
              </v-btn>
              <v-btn
                color="success"
                dark
                class="ml-3"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
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
    const currentTab = null
    const vehicle = {
      vokId: '', identifier: '', fleet: '', mileage: '', status: '', coModuleId: '', repo: '', ecuBranch: '', ecuCommit: '', csCommit: '', rfid: '',
    }
    const maintenanceTypes = ['Regular checkup', 'Repair', 'Emergency']
    const serviceReport = {
      maintenanceType: '',
      dateIn: '',
      dateOut: '',
      mileage: '',
      doneBy: '',
      rfid: false,
      taillights: false,
      wiper: false,
      indicators: false,
      headlight: false,
      usbCharger: false,
      dash: false,
      horn: false,
      tireTread: false,
      suspensionTight: false,
      tirePressure: false,
      steeringTight: false,
      brakePads: false,
      seatFunctions: false,
      brakePressure: false,
      alignment: false,
      comments: '',
    }

    return {
      mdiPlus,
      vehicle,
      currentTab,
      serviceReport,
      maintenanceTypes,
    }
  },

  mounted() {
    this.getVehicle()
  },

  methods: {
    async getVehicle() {
      await axios
        .get(`vehicles/${this.$route.params.vehicleId}`)
        .then(response => {
          this.vehicle.vokId = response.data.vokId
          this.vehicle.coModuleId = response.data.coModuleId
          this.vehicle.rfid = response.data.rfid
          this.vehicle.ecuBranch = response.data.ecuBranch
          this.vehicle.ecuCommit = response.data.ecuCommit
          this.vehicle.csCommit = response.data.csCommit
        })
    },

    toVehicle() {
      router.push('/pages/vehicle/1')
    },
  },
}
</script>
