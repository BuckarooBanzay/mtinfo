
Vue.component("item-preview", {
  props: {
		item: { type: "object" },
		link: { type: "boolean", default: true },
		size: { type: "number", default: 300 }
	},
	computed: {
		previewType: function(){
			if (this.item.inventory_image){
				return "invimage";
			}
			switch (this.item.drawtype){
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
	<router-link :to="'/items/' + item.name" :title="item.name">
		<item-preview-inventoryimage
			v-if="previewType == 'invimage'"
			:item="item"
			:size="size">
		</item-preview-inventoryimage>
		<item-preview-normal
			v-else-if="previewType == 'normal'"
			:item="item"
			:size="size">
		</item-preview-normal>
	</router-link>
  `
});



Vue.component("item-preview-inventoryimage", {
  props: ["item", "size"],
	computed: {
		imgsrc: function(){
			if (this.item.inventory_image)
				return `textures/${mtinfo.stripimagetransforms(this.item.inventory_image)}`;
			else
				return "pics/unknown_node.png";
		}
	},
  template: /*html*/`
		<img :src="imgsrc" :width="size" :height="size" style="image-rendering: crisp-edges;"/>
  `
});

Vue.component("cube-face", {
	props: ["rotateX", "rotateY", "translateZ", "img", "size"],
	computed: {
		style: function(){
			return {
				position: "absolute",
				width: this.size + "px",
				height: this.size + "px",
				"backface-visibility": "hidden",
				"image-rendering": ["crisp-edges", "-webkit-optimize-contrast"],
				"background-size": "cover",
				"transform": `rotateX(${this.rotateX}) rotateY(${this.rotateY}) translateZ(${this.translateZ})`,
				"background-image": `url(${this.img})`
			};
		}
	},
	template: /*html*/`
		<div v-bind:style="style"></div>
	`
});

Vue.component("item-preview-normal", {
  props: ["item", "size"],
	data: function() {
		return {
			front: [],
			back: [],
			left: [],
			right: [],
			top: [],
			bottom: []
		};
	},
	created: function() {
		let texture = "pics/unknown_node.png";
		if (typeof(this.item.tiles) == "string"){
			// one texture for all sides
			// TODO: parse and apply transformations
			texture = mtinfo.stripimagetransforms(this.item.tiles);
			this.front.push(texture);
			this.back.push(texture);
			this.left.push(texture);
			this.right.push(texture);
			this.top.push(texture);
			this.bottom.push(texture);

		} else {
			// +Y, -Y, +X, -X, +Z, -Z
			let tiles = this.item.tiles;

			// TODO: optimize!
			if (tiles.length == 1){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
			} else if (tiles.length == 2){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
			} else if (tiles.length == 3){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
			} else if (tiles.length == 4){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[3]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[3]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[3]));
			} else if (tiles.length == 5){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[3]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[4]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[4]));
			} else if (tiles.length == 6){
				this.top.push("textures/" + mtinfo.stripimagetransforms(tiles[0]));
				this.bottom.push("textures/" + mtinfo.stripimagetransforms(tiles[1]));
				this.front.push("textures/" + mtinfo.stripimagetransforms(tiles[2]));
				this.back.push("textures/" + mtinfo.stripimagetransforms(tiles[3]));
				this.right.push("textures/" + mtinfo.stripimagetransforms(tiles[4]));
				this.left.push("textures/" + mtinfo.stripimagetransforms(tiles[5]));
			}
		}
	},
  computed: {
		translateZ: function(){
			return (this.size/2) + "px";
		},
		scene_style: function(){
			return {
				height: this.size + "px",
				width: this.size + "px",
				perspective: (this.size * 3) + "px"
			};
		},
		cube_style: function(){
			return {
				width: "100%",
				height: "100%",
				position: "relative",
				"transform-style": "preserve-3d",
				"transform": `translateZ(-${this.size * 3}px) rotateX(-30deg) rotateY(45deg)`
				/*
				"animation-name": "spinner",
				"animation-timing-function": "linear",
				"animation-iteration-count": "infinite",
				"animation-duration": "6s"
				*/
			};
		}
	},
  template: /*html*/`
		<div v-bind:style="scene_style">
			<div v-bind:style="cube_style">
				<cube-face v-for="t in front" rotateY="0deg" rotateX="0deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
				<cube-face v-for="t in back" rotateY="180deg" rotateX="0deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
				<cube-face v-for="t in right" rotateY="90deg" rotateX="0deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
				<cube-face v-for="t in left" rotateY="-90deg" rotateX="0deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
				<cube-face v-for="t in top" rotateY="0deg" rotateX="90deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
				<cube-face v-for="t in bottom" rotateY="0deg" rotateX="-90deg" :size="size" :translateZ="translateZ" :img="t"></cube-face>
	    </div>
		</div>
  `
});
