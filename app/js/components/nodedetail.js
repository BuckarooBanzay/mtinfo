
mtinfo.components.NodeDetail = {
  view(vnode){
    return m("div", [
      "Noddef: " + JSON.stringify(mtinfo.nodes[vnode.attrs.nodename]),
      "Recipes: " + JSON.stringify(mtinfo.recipes[vnode.attrs.nodename])
    ]);
  }
};
