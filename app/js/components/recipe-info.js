

Vue.component("recipe-info", {
  props: ["recipe"],
  template: /*html*/`
		<div>
			<recipe-info-normal v-if="recipe.type == 'normal'" :recipe="recipe"/>
			<div v-else>{{ JSON.stringify(recipe) }}</div>
		</div>
  `
});


Vue.component("recipe-info-normal", {
  props: ["recipe"],
  template: /*html*/`
		<div>Normal recipe: {{ JSON.stringify(recipe) }}</div>
  `
});
