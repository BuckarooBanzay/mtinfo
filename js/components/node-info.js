
Vue.component("node-info", {
  props: ["name"],
	created: function(){
		const nodedef = mtinfo.nodes[this.name];

		//TODO: debug
		console.log("nodedef", nodedef);
		console.log("recipes", mtinfo.recipes[this.name]);
	},
  template: /*html*/`
    <div>
      <div class="row">
        <div class="col-md-3">
					<node-preview :node="mtinfo.nodes[name]"/>
        </div>
        <div class="col-md-9">
					<node-detail :node="mtinfo.nodes[name]"/>
        </div>
      </div>
    </div>
  `
});
