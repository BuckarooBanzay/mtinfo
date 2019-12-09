

import imageresolver from './util/imageresolver.js';



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
			m("td", m("img", { src: imageresolver(node) })),
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
