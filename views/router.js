import MainPage      from './main.vue'
import HomePage      from './home.vue'
import Services      from './services.vue'
import ServiceAdd    from './service_add.vue'
import ServiceDetail from './service_detail.vue'
import Tasks         from './tasks.vue'
import TaskGroups    from './taskgroups.vue'
import DeployView    from './deploy_view.vue'
import MonitorView    from './monitor_view.vue'

const routes = [
    { path: '/',
      component: MainPage,
      children: [
          { path: 'home', component: HomePage },
          { path: 'services/add', component: ServiceAdd},
          { path: 'services/:id', component: ServiceDetail},
          { path: 'services', component: Services },
          { path: 'tasks', component: Tasks },
          { path: 'taskgroups', component: TaskGroups },
          { path: 'deployview', component: DeployView },
          { path: 'monitorview', component: MonitorView },
      ],
      redirect: '/home',
    }
]

export default routes;
