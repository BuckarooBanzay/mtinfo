
const router = new VueRouter({
  routes: [{
    path: "/",
    component: { template: `<start-page/>` }
  },{
    path: "/nodes",
    component: { template: `<node-list/>` }
  },{
    path: "/nodes/:name",
    component: { template: `<node-info v-bind:name="$route.params.name"/>` }
  },{
    path: "/abms/:abm_key",
    component: { template: `<abm-info v-bind:abm_key="$route.params.abm_key"/>` }
  }]
});

new Vue({
  el: "#app",
  router: router
});
