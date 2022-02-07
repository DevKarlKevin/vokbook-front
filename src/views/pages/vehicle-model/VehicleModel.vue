<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <h1>Vehicle models</h1>
          <v-btn
            outlined
            color="primary"
            @click="handleClick"
          >
            add part
          </v-btn>
          <v-btn
            outlined
            color="error"
            @click="createModel(model)"
          >
            create model
          </v-btn>
        </v-card>
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
    const model = {
      name: 'VOK1',
      description: 'uugabuuga',
      vehicleParts: [],
    }

    const vehiclePart = {
      partId: '123',
      rev: 'a.1',
      description: 'õõts',
      partLocation: 'FRONT_LEFT',
    }

    return {
      model,
      vehiclePart,
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
          console.log(response.data)
        })
    },

    createModel(model) {
      console.log(model)
      axios
        .post('models', {
          name: model.name,
          description: model.description,
          vehicleModelParts: model.vehicleParts,
        })
        .then(response => {
          console.log(response.data)
        })
    },

    handleClick() {
      this.model.vehicleParts.push(this.vehiclePart)
      console.log(this.model)

      /* router.push('/dashboards/vehicles') */
    },
  },
}
</script>
