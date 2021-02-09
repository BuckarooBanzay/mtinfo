Vue.component("node-list", {
	computed: {
		list: function(){
			return Object.keys(mtinfo.nodes).map(nodename => {
				return mtinfo.nodes[nodename];
			});
		}
	},
  template: /*html*/`
    <div>
      <h4>Node list</h4>
      <paged-table v-bind:list="list">
        <template v-slot:header>
          <tr>
            <th>Mod</th>
            <th>Image</th>
            <th>Nodename</th>
          </tr>
        </template>
        <template v-slot:row="{ item }">
          <td>{{ item.name.substring(0, item.name.indexOf(":")) }}</td>
          <td>
            <img :src="mtinfo.imageresolver(item)"/>
          </td>
          <td>
            <router-link :to="'/nodes/' + item.name">
              {{ item.name }}
            </router-link>
          </td>
        </template>
      </paged-table>
    </div>
  `
});
