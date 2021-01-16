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
