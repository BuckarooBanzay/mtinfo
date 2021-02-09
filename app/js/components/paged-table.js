
Vue.component("paged-table", {
	computed: {
		items: function(){
			const start = (this.page-1) * 10;
			const end = start + 10;
			return this.list.slice(start, end);
		},
		pages: function(){
			const pages = Math.ceil(this.list.length / 10);
			return {
				pages: pages
			};
		}
	},
	props: ["list", "page"],
	template: /*html*/`
		<table class="table table-striped table-condensed">
			<thead>
				<tr>
					<slot name="header"></slot>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items">
					<slot v-bind:item="item" name="row"></slot>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<slot v-bind:pages="pages" name="pager"></slot>
				</tr>
			</tfoot>
		</table>
	`
});
