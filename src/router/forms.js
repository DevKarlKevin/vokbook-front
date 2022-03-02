const forms = [
  {
    path: '/pages/vehicle/:vehicleId/service-report',
    name: 'service-report',
    component: () => import('@/views/forms/vehicle-forms/ServiceReport.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default forms
