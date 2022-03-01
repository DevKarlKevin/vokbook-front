import axios from '@axios'
import store from '@/store'

const vehicleModelStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchAllModels() {
      return new Promise((resolve, reject) => {
        axios
          .get('v1/models')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}

const vehicleModelStoreName = 'app-vehicle-model'

// store actions
const fetchAllModels = `${vehicleModelStoreName}/fetchAllModels`

const registerStore = () => {
  if (!store.hasModule(vehicleModelStoreName)) {
    store.registerModule(vehicleModelStoreName, vehicleModelStore)
  }
}

const unregisterStore = () => {
  if (store.hasModule(vehicleModelStoreName)) {
    store.unregisterModule(vehicleModelStoreName)
  }
}

export default {
  vehicleModelStore,
  vehicleModelStoreName,
  fetchAllModels,
  registerStore,
  unregisterStore,
}
