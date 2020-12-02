Vue.component("node-info", {
  props: ["name"],
  computed: {
    previewImage: function(){
      console.log(this.name);
      return mtinfo.imageresolver(mtinfo.nodes[this.name]);
    }
  },
  template: /*html*/`
    <div>
      <h4>Node info: {{ name }}</h4>
      <pre>
        {{ JSON.stringify(mtinfo.nodes[name]) }}
      </pre>
      <div class="row">
        <div class="col-md-6">
          <img :src="previewImage" style="height: 64px; width: 64px;"/>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
  `
});

Vue.component("node-list", {
  template: /*html*/`
    <div>
      <h4>Node list</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Mod</th>
            <th>Image</th>
            <th>Nodename</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nodename in Object.keys(mtinfo.nodes)">
            <td>{{ nodename.substring(0, nodename.indexOf(":")) }}</td>
            <td>
              <img :src="mtinfo.imageresolver(mtinfo.nodes[nodename])"/>
            </td>
            <td>
              <router-link :to="'/nodes/' + nodename">
                {{ nodename }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});
