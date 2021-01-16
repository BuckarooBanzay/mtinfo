
Vue.component("node-detail", {
	props: ["node"],
	created: function(){
		let abms = [];
		let abm_neighbors = [];

		if (mtinfo.abm_nodenames[this.name]){
			abms.push(mtinfo.abm_nodenames[this.name]);
		}
		if (mtinfo.abm_neighbors[this.name]){
			abm_neighbors.push(mtinfo.abm_neighbors[this.name]);
		}
		if (this.node.groups){
			Object.keys(this.node.groups).forEach(function(group){
				const name = "group:" + group;
				if (mtinfo.abm_nodenames[name]){
					abms.push(mtinfo.abm_nodenames[name]);
				}
				if (mtinfo.abm_neighbors[name]){
					abm_neighbors.push(mtinfo.abm_neighbors[name]);
				}
			});
		}

		this.abms = abms;
		this.abm_neighbors = abm_neighbors;

		//TODO: debug
		console.log("abms", this.abms);
		console.log("abm_neighbors", this.abm_neighbors);
	},
	template: /*html*/`
		<div>
			<h3>{{ node.description }} <small class="text-muted">{{ node.name }}</small></h3>
			<span v-if="node.buildable_to" class="badge badge-success">Buildable-to</span>
			<span v-if="node.diggable" class="badge badge-success">Diggable</span>
			<span v-if="node.pointable" class="badge badge-success">Pointable</span>
			<span v-if="node.airlike" class="badge badge-success">Airlike</span>
			<span v-if="node.walkable" class="badge badge-success">Walkable</span>
			<p>Stack-max: <span class="badge badge-primary">{{ node.stack_max }}</span></p>
			<p v-if="node.light_source">Light-source: <span class="badge badge-primary">{{ node.light_source }}</span></p>
			<p v-if="node.damage_per_second">Damage per second: <span class="badge badge-warning">{{ node.damage_per_second }}</span></p>
			<p>Groups</p>
			<ul v-if="node.groups">
				<li v-for="group in Object.keys(node.groups)">
					{{ group }} {{ node.groups[group] }}
				</li>
			</ul>
			<p>ABMS</p>
			<ul>
				<li v-for="abm in abms">
					<router-link :to="'/abms/' + abm.key">
						{{ abm.key }}
					</router-link>
				</li>
			</ul>
			<p>Neighbor ABMS</p>
			<ul>
				<li v-for="abm in abm_neighbors">
					<router-link :to="'/abms/' + abm.key">
						{{ abm.key }}
					</router-link>
				</li>
			</ul>
		</div>
	`
});
