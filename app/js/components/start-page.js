Vue.component("start-page", {
  template: /*html*/`
    <div>
      <h3>MTInfo</h3>
			<router-link to="/mods" class="btn btn-sm btn-primary">
				<i class="fa fa-question"></i> Mods
			</router-link>
			<stats/>
    </div>
  `
});
