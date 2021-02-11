Vue.component("start-page", {
  template: /*html*/`
    <div>
      <h4>MTInfo</h4>
			<router-link to="/items" class="btn btn-sm btn-primary">
				<i class="fa fa-question"></i> Items
			</router-link>
			<stats/>
    </div>
  `
});
