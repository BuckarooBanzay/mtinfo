
import routes from './route.js';
import Nav from './components/Nav.js';

m.route(document.getElementById("app"), "/", routes);
m.render(document.getElementById("nav"), m(Nav));
