import { mdiHomeOutline } from '@mdi/js'

export default [
  {
    title: 'Dashboards',
    icon: mdiHomeOutline,
    badge: '3',
    badgeColor: 'warning',
    children: [
      {
        title: 'Vehicles',
        to: 'dashboard-vehicles',
      },
      {
        title: 'Models',
        to: 'dashboard-models',
      },
/*      {
        title: 'CRM',
        to: 'dashboard-crm',
      },
      {
        title: 'Analytics',
        to: 'dashboard-analytics',
      },
      {
        title: 'eCommerce',
        to: 'dashboard-eCommerce',
      },*/
    ],
  },
]
