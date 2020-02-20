
mtinfo.components.Overview = {
  view(){

    var list = [];

    Object.keys(mtinfo.nodes)
    .map(name => mtinfo.nodes[name])
    .forEach(node => list.push(node));

    let rows = list
    .filter(node => !(node.groups && node.groups.not_in_creative_inventory == 1))
    .map(node => {
      return m("tr", [
        m("td", m("img", { src: mtinfo.imageresolver(node) })),
        m("td", node.name)
      ]);
    });

    // Only show the first few items
    //rows = rows.splice(0, 25);

    const table = m("table", [
      m("thead", [
        m("th", [
          m("td", "Image"),
          m("td", "Name")
        ])
      ]),
      m("tbody", rows)
    ]);

    return table;
  }
};
