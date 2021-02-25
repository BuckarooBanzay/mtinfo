Vue.component("item-list", {
	props: ["modname"],
	data: function(){
		return {
			page: +this.$route.query.page || 1
		};
	},
	watch: {
		$route: function(){
			this.page = +this.$route.query.page || 1;
		}
	},
	computed: {
		list: function(){
			return Object.keys(mtinfo.items)
				.filter(nodename => {
					const parts = nodename.split(":");
					if (this.modname){
						return this.modname === parts[0];
					}

					return true;
				})
				.map(nodename => {
					return mtinfo.items[nodename];
				});
		}
	},
  template: /*html*/`
    <div>
      <h4>Item list</h4>
      <paged-table v-bind:list="list" v-bind:page="page">
        <template v-slot:header>
          <th>Mod</th>
					<th>Type</th>
          <th>Image</th>
          <th>Nodename</th>
        </template>
        <template v-slot:row="{ item }">
          <td>{{ item.name.substring(0, item.name.indexOf(":")) }}</td>
					<td>
						<span class="badge badge-secondary">{{ item.type }}</span>
					</td>
          <td>
            <item-preview :item="item" size="32"/>
          </td>
          <td>
            <router-link :to="'/items/' + item.name">
              {{ item.name }}
            </router-link>
          </td>
        </template>
      </paged-table>
    </div>
  `
});
