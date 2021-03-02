
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
				return `textures/${this.item.inventory_image}`;
			else
				return "pics/unknown_node.png";
		}
	},
  template: /*html*/`
		<img :src="imgsrc" :width="size" :height="size" style="image-rendering: crisp-edges;"/>
  `
});

Vue.component("item-preview-normal", {
  props: ["item", "size"],
  computed: {
		face_images: function(){
			let texture = "pics/unknown_node.png";
			let textures = [texture, texture, texture, texture, texture, texture];
			if (typeof(this.item.tiles) == "string"){
				// one texture for all sides
				// TODO: parse and apply transformations
				texture = mtinfo.stripimagetransforms(this.item.tiles);
				for (let i=0; i<6; i++)
					textures[i] = textures;

			} else {
				// +Y, -Y, +X, -X, +Z, -Z
				for (let i=0; i<this.item.tiles.length; i++){
					textures[i] = "textures/" + mtinfo.stripimagetransforms(this.item.tiles[i]);
				}
				for (let i=this.item.tiles.length-1; i<6; i++){
					textures[i] = "textures/" + mtinfo.stripimagetransforms(this.item.tiles[this.item.tiles.length-1]);
				}
      }
			return textures;
		},
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
		},
		face_style: function(){
			return {
				position: "absolute",
				width: this.size + "px",
				height: this.size + "px",
				"background-image": 'url("textures/default_stone.png")',
				"backface-visibility": "hidden",
				"image-rendering": ["crisp-edges", "-webkit-optimize-contrast"],
				"background-size": "cover"
			};
		},
		front_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateY(0deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[2]})`
			});
		},
		back_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateY(180deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[3]})`
			});
		},
		right_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateY(90deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[4]})`
			});
		},
		left_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateY(-90deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[5]})`
			});
		},
		top_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateX(90deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[0]})`
			});
		},
		bottom_style: function(){
			return Object.assign({}, this.face_style, {
				transform: `rotateX(-90deg) translateZ(${this.translateZ})`,
				"background-image": `url(${this.face_images[1]})`
			});
		}
	},
  template: /*html*/`
		<div v-bind:style="scene_style">
	    <div v-bind:style="cube_style">
				<div v-bind:style="front_style"></div>
				<div v-bind:style="back_style"></div>
				<div v-bind:style="right_style"></div>
				<div v-bind:style="left_style"></div>
				<div v-bind:style="top_style"></div>
				<div v-bind:style="bottom_style"></div>
	    </div>
		</div>
  `
});
