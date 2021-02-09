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
            <img :src="mtinfo.imageresolver(item)"/>
          </td>
          <td>
            <router-link :to="'/nodes/' + item.name">
              {{ item.name }}
            </router-link>
          </td>
        </template>
				<template v-slot:pager="{ pages }">
					Footer {{ JSON.stringify(pages) }}
				</template
      </paged-table>
    </div>
  `
});
