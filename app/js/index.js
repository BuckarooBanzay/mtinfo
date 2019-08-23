

function getTransformedImage(imageStr){
	if (imageStr.indexOf("^")){
		return imageStr.split("^")[0];
	} else {
		return imageStr;
	}
}

function getImage(node){
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

	return m("img", { src: getTransformedImage(imgSrc) });
}

m.request("./mtinfo.json")
.then(info => {
	console.log(info);

	const list = [];

	Object.keys(info.nodes)
	.map(name => info.nodes[name])
	.forEach(node => list.push(node))

	Object.keys(info.items)
	.filter(name => !info.nodes[name])
	.map(name => info.items[name])
	.forEach(item => list.push(item))


	const rows = list
	.filter(node => !(node.groups && node.groups.not_in_creative_inventory == 1))
	.map(node => {
		return m("tr", [
			m("td", getImage(node)),
			m("td", node.name)
		]);
	});

	const table = m("table", [
		m("thead", [
			m("th", [
				m("td", "Image"),
				m("td", "Name")
			])
		]),
		m("tbody", rows)
	]);

	m.render(document.getElementById("app"), table);
})