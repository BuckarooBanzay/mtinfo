
const router = new VueRouter({
  routes: [{
    path: "/",
    component: { template: `<start-page/>` }
  },{
    path: "/items",
    component: { template: `<item-list/>` }
	},{
		path: "/mods",
		component: { template: `<mod-list/>` }
	},{
		path: "/mods/:modname/items",
		component: { template: `<item-list :modname="$route.params.modname"/>` }
	},{
    path: "/items/:name",
    component: { template: `<item-info v-bind:name="$route.params.name"/>` }
  },{
    path: "/abms/:abm_key",
    component: { template: `<abm-info v-bind:abm_key="$route.params.abm_key"/>` }
  }]
});

new Vue({
  el: "#app",
  router: router
});
