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
      <v-card>
        <v-card-title
          class="mb-4"
        >
          Add new vehicle
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="comoduleID"
            dense
            label="CoModule ID"
          ></v-text-field>
          <v-text-field
            v-model="identifier"
            dense
            label="Identifier"
          ></v-text-field>
          <v-select
            v-model="fleet"
            :items="fleets"
            item-text="state"
            item-value="abbr"
            label="Fleet"
            return-object
          ></v-select>
          <v-select
            v-model="model"
            :items="models"
            item-text="state"
            item-value="abbr"
            label="Model"
            return-object
          ></v-select>
          <v-select
            v-model="status"
            :items="statuses"
            item-text="state"
            item-value="abbr"
            label="Status"
            return-object
          ></v-select>
          <v-text-field
            v-model="repo"
            dense
            label="Repo"
          ></v-text-field>
          <v-text-field
            v-model="ecuBranch"
            dense
            label="ECU branch"
          ></v-text-field>
          <v-text-field
            v-model="ecuCommit"
            dense
            label="ECU commit"
          ></v-text-field>
          <v-text-field
            v-model="csCommit"
            dense
            label="CS commit"
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
            @click="isDialogTwoShow = !isDialogTwoShow"
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
import { ref } from '@vue/composition-api'
import router from '@/router'

export default {
  components: {},
  setup() {
    function handleClick(value) {
      console.log(value.comoduleID)
      router.push('/dashboards/vehicles')
    }

    const search = ref('')
    const isDialogVisible = ref(false)
    const statuses = ['Active', 'Unassigned', 'Inactive']
    const models = ['VOK1', 'VOK2', 'VOK3']
    const fleets = ['Tallinn', 'London', 'Vilnius']
    const tableColumn = [
      {
        text: 'CoModule ID',
        value: 'comoduleID',
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
    const vehicles = [
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 158,
        fleet: 'tallinn',
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
      {
        comoduleID: 'Frozen Yogurt',
        identifier: 159,
        fleet: 6,
        model: 24,
        mileage: 4,
        status: 4,
        repo: 4,
        ecuBranch: 4,
        ecuCommit: 4,
        csCommit: 4,
      },
    ]

    return {
      vehicles,
      mdiPlus,
      tableColumn,
      search,
      isDialogVisible,
      statuses,
      models,
      fleets,
      handleClick,
    }
  },
}
</script>
