
import Preview from './preview/Preview.js';

export default {
  view(vnode){
    return [
      m("div", [
        "Noddef: " + JSON.stringify(mtinfo.nodes[vnode.attrs.nodename]),
        "Recipes: " + JSON.stringify(mtinfo.recipes[vnode.attrs.nodename])
      ]),
      m(Preview, {
        nodename: vnode.attrs.nodename
      })
    ];
  }
};
