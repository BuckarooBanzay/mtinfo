Vue.component("node-info", {
  props: ["name"],
  template: /*html*/`
    <div>
      <h4>Node info: {{ name }}</h4>
      <pre>
        {{ JSON.stringify(mtinfo.nodes[name]) }}
      </pre>
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
            <th>Nodename</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nodename in Object.keys(mtinfo.nodes)">
            <td>?</td>
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
