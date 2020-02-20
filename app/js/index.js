
mtinfo.routes = {
	"/": mtinfo.components.Home,
	"/detail/:nodename": mtinfo.components.NodeDetail
};

m.route(document.getElementById("app"), "/", mtinfo.routes);
m.render(document.getElementById("nav"), m(mtinfo.components.Nav));
