
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
  }]
});

new Vue({
  el: "#app",
  router: router
});

console.log("OK");
