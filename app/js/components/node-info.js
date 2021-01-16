
Vue.component("node-info", {
  props: ["name"],
	created: function(){
		//TODO: debug
		const nodename = this.name;
		const nodedef = mtinfo.nodes[this.name];
		console.log(nodedef);

		if (mtinfo.abm_nodenames[this.name]){
			console.log("abm nodename", mtinfo.abm_nodenames[this.name]);
		}
		if (mtinfo.abm_neighbors[this.name]){
			console.log("abm neighbor", mtinfo.abm_neighbors[this.name]);
		}
		if (nodedef.groups){
			Object.keys(nodedef.groups).forEach(function(group){
				const name = "group:" + group;
				if (mtinfo.abm_nodenames[name]){
					console.log("abm group nodename", mtinfo.abm_nodenames[name]);
				}
				if (mtinfo.abm_neighbors[name]){
					console.log("abm group neighbor", mtinfo.abm_neighbors[name]);
				}
			});
		}
	},
  computed: {
    previewImage: function(){
      return mtinfo.imageresolver(mtinfo.nodes[this.name]);
    }
  },
  template: /*html*/`
    <div>
      <div class="row">
        <div class="col-md-3">
          <!-- <img :src="previewImage" style="height: 64px; width: 64px;"/> -->
					<node-preview-inventoryimage v-if="mtinfo.nodes[name].inventory_image" :node="mtinfo.nodes[name]"></node-preview-inventoryimage>
					<node-preview-normal v-else-if="mtinfo.nodes[name].drawtype == 'normal'" :node="mtinfo.nodes[name]"></node-preview-normal>
          <node-preview-normal v-else-if="mtinfo.nodes[name].drawtype == 'glasslike'" :node="mtinfo.nodes[name]"></node-preview-normal>
					<node-preview-normal v-else-if="mtinfo.nodes[name].drawtype == 'allfaces_optional'" :node="mtinfo.nodes[name]"></node-preview-normal>
					<node-preview-normal v-else-if="mtinfo.nodes[name].drawtype == 'glasslike_framed_optional'" :node="mtinfo.nodes[name]"></node-preview-normal>
					<node-preview-inventoryimage v-else-if="mtinfo.nodes[name].drawtype == 'plantlike'" :node="mtinfo.nodes[name]"></node-preview-inventoryimage>
          <div v-else>
            No preview available
          </div>
        </div>
        <div class="col-md-9">
					<node-detail :node="mtinfo.nodes[name]"/>
        </div>
      </div>
    </div>
  `
});
