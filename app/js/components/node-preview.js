
Vue.component("node-preview", {
  props: {
		node: { type: "string" },
		size: { type: "number", default: 300 }
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
			:size="size">
		</node-preview-inventoryimage>
		<node-preview-normal
			v-else-if="previewType == 'normal'"
			:node="node"
			:size="size">
		</node-preview-normal>
	</div>
  `
});



Vue.component("node-preview-inventoryimage", {
  props: ["node", "size"],
	computed: {
		imgsrc: function(){
			if (this.node.inventory_image)
				return `textures/${this.node.inventory_image}`;
			else
				return "pics/unknown_node.png";
		}
	},
  template: /*html*/`
		<img :src="imgsrc" :width="size" :height="size" style="image-rendering: crisp-edges;"/>
  `
});

Vue.component("node-preview-normal", {
  props: ["node", "size"],
  computed: {
		common_attributes: function(){
			return {
				"transform-origin": "0 0",
				"position": "absolute",
				"width": (this.size/3) + "px",
				"height": (this.size/3) + "px",
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
      	"transform": `rotate(0deg) skewY(30deg) scaleX(0.864) translate(${this.size*0.1033}px, ${this.size*0.23}px)`
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
        "transform": `rotate(-30deg) skewX(-30deg) translate(${this.size*0.433}px, ${this.size*0.5766}px) scaleY(0.864)`
      });
    },
    topStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles && this.node.tiles.length >= 1){
        texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[0]);
      }

			return Object.assign({}, this.common_attributes, {
        "background-image": "url('" + texture + "')",
      	"transform": `rotate(210deg) skew(-30deg) translate(-${this.size/3*2}px, -${this.size*0.2}px) scaleY(0.864)`
      });
    }
  },
  template: /*html*/`
    <div v-bind:style="{ overflow: 'hidden', width: size + 'px', height: size + 'px' }">
			<div v-bind:style="frontStyle"></div>
			<div v-bind:style="sideStyle"></div>
			<div v-bind:style="topStyle"></div>
    </div>
  `
});
