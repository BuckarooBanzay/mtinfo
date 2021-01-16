
Vue.component("node-preview-inventoryimage", {
  props: ["node"],
	computed: {
		imgsrc: function(){
			return `textures/${this.node.inventory_image}`;
		}
	},
  template: /*html*/`
		<img :src="imgsrc" width="300" height="300" style="image-rendering: crisp-edges;"/>
  `
});
