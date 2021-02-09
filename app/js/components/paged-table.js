
Vue.component("paged-table", {
	props: ["list"],
	template: /*html*/`
		<table class="table table-striped table-condensed">
			<thead>
				<slot name="header"></slot>
			</thead>
			<thead>
				<tr v-for="item in list">
					<slot v-bind:item="item" name="row">
					</slot>
				</tr>
			</thead>
		</table>
	`
});
