
Vue.component("stats", {
	template: /*html*/`
		<table class="table table-striped table-condensed">
			<tr>
				<td>Number of nodes</td>
				<td>{{ Object.keys(mtinfo.nodes).length }}</td>
			</tr>
			<tr>
				<td>Number of ABM's</td>
				<td>{{ mtinfo.abm.length }}</td>
			</tr>
			<tr>
				<td>Number of LBM's</td>
				<td>{{ mtinfo.lbm.length }}</td>
			</tr>
		</table>
	`
});
