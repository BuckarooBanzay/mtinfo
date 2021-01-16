
const common_attributes = {
	"transform-origin": "0 0",
	"position": "absolute",
	"width": "100px",
	"height": "100px",
	"background-size": "cover",
	"image-rendering": "crisp-edges"
};

Vue.component("node-preview-normal", {
  props: ["node"],
  computed: {
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

      return Object.assign({}, common_attributes, {
        "background-image": "url('" + texture + "')",
      	"transform": "rotate(0deg) skewY(30deg) scaleX(0.864) translate(31px, 69px)"
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

			return Object.assign({}, common_attributes, {
        "background-image": "url('" + texture + "')",
        "transform": "rotate(-30deg) skewX(-30deg) translate(130px, 173px) scaleY(0.864)"
      });
    },
    topStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles && this.node.tiles.length >= 1){
        texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[0]);
      }

			return Object.assign({}, common_attributes, {
        "background-image": "url('" + texture + "')",
      	"transform": "rotate(210deg) skew(-30deg) translate(-200px, -60px) scaleY(0.864)"
      });
    }
  },
  template: /*html*/`
    <div style="width: 300px; height: 300px; overflow: hidden;">
			<div v-bind:style="frontStyle"></div>
			<div v-bind:style="sideStyle"></div>
			<div v-bind:style="topStyle"></div>
    </div>
  `
});
