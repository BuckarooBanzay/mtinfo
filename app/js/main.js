
const router = new VueRouter({
  routes: [{
    path: "/",
    component: { template: `<start-page/>` }
  },{
    path: "/node/:name",
    component: { template: `<node-info v-bind:name="$route.params.name"/>` }
  }]
});

new Vue({
  el: "#app",
  router: router
});

console.log("OK");
