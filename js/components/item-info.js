
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
				<div v-for="recipe in recipes" class="col-md-2">
					<recipe-info :recipe="recipe"/>
				</div>
			</div>
			<div class="row">
				<pre class="col-md-12">
{{ JSON.stringify(item, null, '\t') }}
{{ JSON.stringify(recipes, null, '\t') }}
				</pre>
			</div>
    </div>
  `
});
