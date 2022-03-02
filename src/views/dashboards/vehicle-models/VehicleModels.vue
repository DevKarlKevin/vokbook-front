<template>
  <div>
    <v-row>
      <v-col
        cols="6"
      >
        <h1>Vehicle models</h1>
      </v-col>
      <v-col
        cols="6"
        class="text-end"
      >
        <v-btn
          color="success"
          dark
          @click="addNewModel()"
        >
          Add model
          <v-icon
            dark
            right
          >
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-for="model in models"
      :key="model"
      class="mb-4"
    >
      <v-col
        cols="12"
      >
        <v-card>
          <v-row class="px-4">
            <v-col cols="6">
              <h2>{{ model.name }}</h2>
              <span>{{ model.description }}</span>
            </v-col>
            <v-col
              cols="6"
              class="text-end align-self-center"
            >
              <v-btn
                color="info"
                dark
                @click="viewModel(model)"
              >
                View
                <v-icon
                  dark
                  right
                >
                  {{ mdiEye }}
                </v-icon>
              </v-btn>
              <v-btn
                color="warning"
                dark
                @click="editModel(model)"
                class="ml-3"
              >
                Edit
                <v-icon
                  dark
                  right
                >
                  {{ mdiFileEdit }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiPlus,
  mdiFileEdit,
  mdiEye,
} from '@mdi/js'
import axios from '@axios'
import router from '@/router'

export default {
  components: {},

  data() {
    const models = []

    return {
      mdiPlus,
      mdiFileEdit,
      mdiEye,
      models,
    }
  },

  mounted() {
    this.getModels()
  },

  methods: {
    async getModels() {
      await axios
        .get('models')
        .then(response => {
          this.models = response.data
        })
    },

    addNewModel() {
      router.push('/pages/vehicle-model/new')
    },

    viewModel(model) {
      router.push(`/pages/vehicle-model/${model.id}`)
    },

    editModel(model) {
      router.push(`/pages/vehicle-model/${model.id}/edit`)
    },
  },
}
</script>
