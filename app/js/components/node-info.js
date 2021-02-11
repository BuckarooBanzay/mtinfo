
Vue.component("node-info", {
  props: ["name"],
	computed: {
		node: function(){
			return mtinfo.items[this.name];
		},
		recipes: function(){
			return mtinfo.recipes[this.name];
		}
	},
  template: /*html*/`
    <div>
      <div class="row">
        <div class="col-md-3">
					<node-preview :node="node"/>
        </div>
        <div class="col-md-9">
					<node-detail :node="node"/>
        </div>
      </div>
			<div class="row">
				<div v-for="recipe in recipes">
					<recipe-info :recipe="recipe"/>
				</div>
			</div>
    </div>
  `
});
