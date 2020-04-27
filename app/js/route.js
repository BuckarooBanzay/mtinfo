
import Home from './components/Home.js';
import NodeDetail from './components/NodeDetail.js';

export default {
	"/": Home,
	"/detail/:nodename": NodeDetail
};
