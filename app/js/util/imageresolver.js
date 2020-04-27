
function getTransformedImage(imageStr){
	if (imageStr.indexOf("^")){
		return imageStr.split("^")[0];
	} else {
		return imageStr;
	}
}

export default function(node){
	var imgSrc = "textures/unknown_node.png";
	if (node.inventory_image){
		imgSrc = "textures/" + node.inventory_image;
	} else if (node.tiles && node.tiles.length > 0) {
		var tile = node.tiles[0];
		if (node.tiles.length == 6){
			tile = node.tiles[5];
		}

		if (typeof(tile) == "string"){
			imgSrc = "textures/" + tile;
		} else if (typeof(tile) == "object" && tile.name) {
			imgSrc = "textures/" + tile.name;
		}
	}

	return getTransformedImage(imgSrc);
}
