
mtinfo.components.NodeDetail = {
  view(vnode){
    return m("div", JSON.stringify(mtinfo.nodes[vnode.attrs.nodename]) );
  }
};
