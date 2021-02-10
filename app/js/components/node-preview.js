
Vue.component("node-preview", {
  props: {
		node: { type: "string" },
		height: { type: "number", default: 300 },
		width: { type: "number", default: 300 },
	},
	computed: {
		previewType: function(){
			switch (this.node.drawtype){
				case "normal": return "normal";
				case "glasslike": return "normal";
				case "allfaces_optional": return "normal";
				case "glasslike_framed_optional": return "normal";
				case "plantlike": return "invimage";
				default: return "invimage";
			}
		}
	},
  template: /*html*/`
	<div>
		<node-preview-inventoryimage
			v-if="previewType == 'invimage'"
			:node="node"
			:height="height"
			:width="width">
		</node-preview-inventoryimage>
		<node-preview-normal
			v-else-if="previewType == 'normal'"
			:node="node"
			:height="height"
			:width="width">
		</node-preview-normal>
	</div>
  `
});



Vue.component("node-preview-inventoryimage", {
  props: ["node", "height", "width"],
	computed: {
		imgsrc: function(){
			if (this.node.inventory_image)
				return `textures/${this.node.inventory_image}`;
			else
				return "pics/unknown_node.png";
		}
	},
  template: /*html*/`
		<img :src="imgsrc" :width="width" :height="height" style="image-rendering: crisp-edges;"/>
  `
});

Vue.component("node-preview-normal", {
  props: ["node", "height", "width"],
  computed: {
		common_attributes: function(){
			return {
				"transform-origin": "0 0",
				"position": "absolute",
				"width": (this.width/3) + "px",
				"height": (this.height/3) + "px",
				"background-size": "cover",
				"image-rendering": "crisp-edges"
			};
		},
    frontStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles){
        if (this.node.tiles.length >= 3) {
          // x+
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[2]);
        } else {
          // last tile
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[this.node.tiles.length-1]);
        }
      }

      return Object.assign({}, this.common_attributes, {
        "background-image": "url('" + texture + "')",
      	"transform": "rotate(0deg) skewY(30deg) scaleX(0.864) translate(31px, 69px)" //TODO: scale
      });
    },
    sideStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles){
        if (this.node.tiles.length >= 5) {
          // z+
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[4]);
        } else {
          // last tile
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[this.node.tiles.length-1]);
        }
      }

			return Object.assign({}, this.common_attributes, {
        "background-image": "url('" + texture + "')",
        "transform": "rotate(-30deg) skewX(-30deg) translate(130px, 173px) scaleY(0.864)" //TODO: scale
      });
    },
    topStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles && this.node.tiles.length >= 1){
        texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[0]);
      }

			return Object.assign({}, this.common_attributes, {
        "background-image": "url('" + texture + "')",
      	"transform": "rotate(210deg) skew(-30deg) translate(-200px, -60px) scaleY(0.864)" //TODO: scale
      });
    }
  },
  template: /*html*/`
    <div v-bind:style="{ overflow: 'hidden', width: width + 'px', height: height + 'px' }">
			<div v-bind:style="frontStyle"></div>
			<div v-bind:style="sideStyle"></div>
			<div v-bind:style="topStyle"></div>
    </div>
  `
});