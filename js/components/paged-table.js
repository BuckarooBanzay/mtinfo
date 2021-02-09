
Vue.component("paged-table", {
	data: function(){
		return {
			itemcount: 20
		};
	},
	computed: {
		items: function(){
			const start = (this.page-1) * this.itemcount;
			const end = start + this.itemcount;
			return this.list.slice(start, end);
		},
		pages: function(){
			const count = Math.ceil(this.list.length / this.itemcount);
			const pages = [];
			for (let i=1; i<=count; i++){
				pages.push({
					number: i,
					active: this.page == i
				});
			}
			return pages;
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
