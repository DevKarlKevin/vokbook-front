import axios from '@axios'
import store from '@/store'

const vehicleStoreName = 'app-vehicle'

const vehicleStore = {
  namespaced: true,
  state: {
    vehicles: [],
  },
  getters: {},
  mutations: {
    addVehicles(state, payload) {
      state.vehicles = payload
    },
  },
  actions: {
    fetchAllVehicles() {
      return new Promise((resolve, reject) => {
        axios
          .get('v1/vehicles')
          .then(response => store.commit(`${vehicleStoreName}/addVehicles`, response.data))
          .catch(error => reject(error))
      })
    },
  },
}

// store actions
const fetchAllVehicles = `${vehicleStoreName}/fetchAllVehicles`

const registerStore = () => {
  if (!store.hasModule(vehicleStoreName)) {
    store.registerModule(vehicleStoreName, vehicleStore)
  }
}

const unregisterStore = () => {
  if (store.hasModule(vehicleStoreName)) {
    store.unregisterModule(vehicleStoreName)
  }
}

export default {
  vehicleStore,
  vehicleStoreName,
  fetchAllVehicles,
  registerStore,
  unregisterStore,
}
