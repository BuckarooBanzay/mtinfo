
function getImage(node){
	if (node.inventory_image){
		return m("img", { src: "textures/" + node.inventory_image });
	}
	if (node.tiles && node.tiles.length) {
		return m("img", { src: "textures/" + node.tiles[0] });
	}
}

m.request("./mtinfo.json")
.then(info => {
	console.log(info);

	const rows = Object.keys(info.nodes)
	.map(nodename => info.nodes[nodename])
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