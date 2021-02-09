Vue.component("start-page", {
  template: /*html*/`
    <div>
      <h4>MTInfo</h4>
			<router-link to="/nodes" class="btn btn-sm btn-primary">
				<i class="fa fa-question"></i> Nodes
			</router-link>
			<stats/>
    </div>
  `
});
