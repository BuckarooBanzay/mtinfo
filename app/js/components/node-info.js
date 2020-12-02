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
