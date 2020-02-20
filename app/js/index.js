
mtinfo.routes = {
	"/": mtinfo.components.Home
};

m.route(document.getElementById("app"), "/", mtinfo.routes);
m.render(document.getElementById("nav"), m(mtinfo.components.Nav));
