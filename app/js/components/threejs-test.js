
Vue.component("threejs-test", {
	mounted: function(){
		console.log("mounted");
		requestAnimationFrame(() => this.animate());
		this.$el.appendChild(this.renderer.domElement);
	},
	beforeDestroy: function(){
		this.active = false;
		this.renderer.dispose();
	},
	data: function(){
		const width = 200;
		const height = 100;

		const scene = new THREE.Scene();

		const geometry = new THREE.BoxGeometry();
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);

		return {
			active: true,
			scene: scene,
			camera: camera,
			renderer: renderer,
			cube: cube
		};
	},
	methods: {
		animate: function(){
			console.log("render");
			this.renderer.render(this.scene, this.camera);
			this.cube.rotation.x += 0.01;
			this.cube.rotation.y += 0.01;

			if (this.active){
				requestAnimationFrame(() => this.animate());
			}
		}
	},
	template: /*html*/`
		<div>
			Threejs
		</div>
	`
});
