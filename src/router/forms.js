const forms = [
  {
    path: '/pages/vehicle/:vehicleId/maintenance-report',
    name: 'maintenance-report',
    component: () => import('@/views/forms/vehicle-forms/MaintenanceReport.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/vehicle/:vehicleId/incident-report',
    name: 'incident-report',
    component: () => import('@/views/forms/vehicle-forms/IncidentReport.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/vehicle/:vehicleId/ticket',
    name: 'ticket',
    component: () => import('@/views/forms/vehicle-forms/TicketForm.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default forms
