<template>
  <div>
    <v-row>
      <v-col
        cols="6"
      >
        <h1>New Model</h1>
      </v-col>
      <v-col
        cols="6"
        class="text-end"
      >
        <v-btn
          v-if="isEditable()"
          color="success"
          dark
          @click="saveModel()"
        >
          Save
        </v-btn>
        <v-btn
          class="ml-3"
          color="error"
          dark
          @click="toVehicleModelList()"
        >
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-col>
            <v-text-field
              v-model="model.name"
              dense
              label="Model name"
              class="mt-4"
              :disabled="!isEditable()"
            ></v-text-field>
            <v-text-field
              v-model="model.description"
              dense
              label="Description"
              class="mt-4"
              :disabled="!isEditable()"
            ></v-text-field>
            <h2>Parts</h2>
            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="item in locations"
                :key="item"
              >
                <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      cols="12"
                      class="text-end"
                    >
                      <v-btn
                        v-if="isEditable()"
                        color="success"
                        icon
                        @click="addNewPart(item.value)"
                      >
                        <v-icon>
                          {{ mdiPlus }}
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="part in getPartsByLocation(item.value)"
                    :key="part"
                  >
                    <v-text-field
                      v-model="part.partId"
                      dense
                      label="Part ID"
                      class="mx-3"
                      :disabled="!isEditable()"
                    ></v-text-field>
                    <v-text-field
                      v-model="part.rev"
                      dense
                      label="Part revision"
                      class="mx-3"
                      :disabled="!isEditable()"
                    ></v-text-field>
                    <v-text-field
                      v-model="part.description"
                      dense
                      label="Part description"
                      class="mx-3"
                      :disabled="!isEditable()"
                    ></v-text-field>
                    <v-btn
                      v-if="isEditable()"
                      color="error"
                      icon
                      @click="removePart(part)"
                    >
                      <v-icon>
                        {{ mdiMinus }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiPlus,
  mdiMinus,
} from '@mdi/js'
import axios from '@axios'
import router from '@/router'

export default {
  components: {},

  data() {
    const model = {
      id: '',
      name: '',
      description: '',
      vehicleParts: [],
    }

    const locations = [
      {
        name: 'Front left',
        value: 'FRONT_LEFT',
      },
      {
        name: 'Front right',
        value: 'FRONT_RIGHT',
      },
      {
        name: 'Rear left',
        value: 'REAR_LEFT',
      },
      {
        name: 'Rear right',
        value: 'REAR_RIGHT',
      },
      {
        name: 'Steering system',
        value: 'STEERING_SYSTEM',
      },
      {
        name: 'Frame',
        value: 'FRAME',
      },
      {
        name: 'Bodywork',
        value: 'BODYWORK',
      },
      {
        name: 'Seat',
        value: 'SEAT',
      },
      {
        name: 'Cargo box',
        value: 'CARGO_BOX',
      },
      {
        name: 'Generator',
        value: 'GENERATOR',
      },
      {
        name: 'Electronics',
        value: 'ELECTRONICS',
      },
      {
        name: 'Wiring',
        value: 'WIRING',
      }]

    return {
      mdiMinus,
      mdiPlus,
      model,
      locations,
    }
  },

  mounted() {
    this.isEditable()
    if (this.$route.params.modelId) {
      this.getModel()
    }
  },

  methods: {
    async getModel() {
      await axios
        .get(`models/${this.$route.params.modelId}`)
        .then(response => {
          this.model.id = response.data.id
          this.model.name = response.data.name
          this.model.description = response.data.description
          this.model.vehicleParts = response.data.vehicleModelParts
          console.log(this.model)
        })
    },

    toVehicleModelList() {
      router.push('/dashboards/models')
    },

    saveModel() {
      if (this.model.id) {
        axios
          .put(`models/${this.model.id}`, {
            name: this.model.name,
            description: this.model.description,
            vehicleModelParts: this.model.vehicleParts,
          })
      } else {
        axios
          .post('models/', {
            name: this.model.name,
            description: this.model.description,
            vehicleModelParts: this.model.vehicleParts,
          })
      }

      this.toVehicleModelList()
    },

    getPartsByLocation(location) {
      return this.model.vehicleParts.filter(part => part.partLocation === location)
    },

    addNewPart(location) {
      this.model.vehicleParts.push({
        rev: '', partId: '', partLocation: location, description: '',
      })
    },

    removePart(part) {
      const index = this.model.vehicleParts.indexOf(part)
      if (index > -1) {
        this.model.vehicleParts.splice(index, 1)
      }
    },

    isEditable() {
      return this.$route.name !== 'vehicle-model-view'
    },
  },
}
</script>
