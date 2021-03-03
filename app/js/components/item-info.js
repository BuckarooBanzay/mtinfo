
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
					<div class="card">
						<div class="card-header">
							Preview
						</div>
						<div class="card-body">
							<item-preview :item="item"/>
						</div>
					</div>
				</div>
				<div class="col-md-9">
					<div class="card">
						<div class="card-header">
							Details
						</div>
						<div class="card-body">
							<item-detail :item="item"/>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="card">
						<div class="card-header">
							Recipes
						</div>
						<div class="card-body">
							<div class="row">
								<div v-for="recipe in recipes" class="col-md-2">
									<recipe-info :recipe="recipe"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<pre class="col-md-12">
Debug
{{ JSON.stringify(item, null, '\t') }}
{{ JSON.stringify(recipes, null, '\t') }}
				</pre>
			</div>
    </div>
  `
});
