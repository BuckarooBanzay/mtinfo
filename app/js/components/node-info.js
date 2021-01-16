
Vue.component("node-info", {
  props: ["name"],
	created: function(){
		const nodedef = mtinfo.nodes[this.name];

		//TODO: debug
		console.log(nodedef);
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
