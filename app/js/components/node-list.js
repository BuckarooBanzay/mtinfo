Vue.component("node-list", {
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
			return Object.keys(mtinfo.nodes).map(nodename => {
				return mtinfo.nodes[nodename];
			});
		}
	},
  template: /*html*/`
    <div>
      <h4>Node list</h4>
      <paged-table v-bind:list="list" v-bind:page="page">
        <template v-slot:header>
          <th>Mod</th>
          <th>Image</th>
          <th>Nodename</th>
        </template>
        <template v-slot:row="{ item }">
          <td>{{ item.name.substring(0, item.name.indexOf(":")) }}</td>
          <td>
						<node-preview :node="item" size="64"/>
          </td>
          <td>
            <router-link :to="'/nodes/' + item.name">
              {{ item.name }}
            </router-link>
          </td>
        </template>
        <template v-slot:pager="{ pages }">
         <td colspan="3">
          <nav aria-label="Page navigation example">
           <ul class="pagination">
            <li v-bind:class="{ 'page-item': true, 'active': page.active }" v-for="page in pages">
             <router-link :to="'/nodes?page=' + page.number" class="page-link">
              {{ page.number }}
             </router-link>
            </li>
           </ul>
          </nav>
        </td>
       </template>
      </paged-table>
    </div>
  `
});
