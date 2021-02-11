
Vue.component("item-info", {
  props: ["name"],
	computed: {
		item: function(){
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
					<item-preview :item="item"/>
        </div>
        <div class="col-md-9">
					<item-detail :item="item"/>
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
