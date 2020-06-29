import OrbitControls from './orbitcontrols.js';

export default {
  view: function(){
    return m("div", { style: `height: 200px; width: 200px;`});
  },
  oncreate: function(vnode) {
		const nodename = vnode.attrs.nodename;
    const nodedef = mtinfo.nodes[vnode.attrs.nodename];

    const camera = new THREE.PerspectiveCamera( 70, 2, 1, 1000 );
    camera.position.z = -10;
    camera.position.x = -10;
    camera.position.y = 10;

    const scene = new THREE.Scene();
		scene.background = new THREE.Color();

		vnode.state.scene = scene;
		vnode.state.active = true;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      precision: "lowp"
    });

		vnode.state.renderer = renderer;

    renderer.setPixelRatio( window.devicePixelRatio );
    vnode.dom.appendChild( renderer.domElement );

    const box = renderer.domElement.parentElement.getBoundingClientRect();
    renderer.setSize( box.width, box.height );

		const controls = new OrbitControls( camera, renderer.domElement, renderer.domElement );

    const loader = new THREE.CubeTextureLoader();
    loader.setPath('textures/');
    const textureCube = loader.load([
      "default_acacia_tree_top.png",
      "default_acacia_tree_top.png",
      "default_acacia_tree_top.png",
      "default_acacia_tree_top.png",
      "default_acacia_tree_top.png",
      "default_acacia_tree_top.png"
    ]);

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });
    const geometry = new THREE.BoxGeometry();
    var cube = new THREE.Mesh( geometry, material );
    scene.add(cube);
    //scene.background = textureCube;

		animate();

		controls.addEventListener('change', () => renderer.render( scene, camera ));
		renderer.render( scene, camera );

    function animate() {
			if (!vnode.state.active){
				return;
			}

    	controls.update();
			requestAnimationFrame( animate );
    }
  },
  onbeforeupdate: function() {
    return false;
  },
  onremove: function(vnode) {
		vnode.state.renderer.dispose();
		vnode.state.scene.dispose();
		vnode.state.active = false;
  }
};
