

Vue.component("recipe-info", {
  props: ["recipe"],
  template: /*html*/`
		<div>
			<recipe-info-normal v-if="recipe.type == 'normal'" :recipe="recipe"/>
		</div>
  `
});


Vue.component("recipe-info-normal", {
  props: ["recipe"],
	computed: {
		table: function(){
			const table = [
				[null, null, null],
				[null, null, null],
				[null, null, null]
			];

			if (this.recipe.width == 0 && this.recipe.items.length == 2) {
				// "shapeless" recipe
				table[0][0] = this.recipe.items[0];
				table[0][1] = this.recipe.items[1];
			}

			if (this.recipe.width == 1) {
				table[0][0] = this.recipe.items[0];
			}

			if (this.recipe.width == 3){
				let row = -1;
				let col = 0;
				for (let i=0; i<this.recipe.items.length; i++){
					if (i % 3 == 0){
						row++;
						col = 0;
					}
					table[row][col] = this.recipe.items[i];

					col++;
				}
			}

			return table;
		}
	},
  template: /*html*/`
		<table class="inventory-table">
			<tr>
				<td><item-preview v-if="table[0][0]" :item="mtinfo.items[table[0][0]]" size="64"/></td>
				<td><item-preview v-if="table[0][1]" :item="mtinfo.items[table[0][1]]" size="64"/></td>
				<td><item-preview v-if="table[0][2]" :item="mtinfo.items[table[0][2]]" size="64"/></td>
			</tr>
			<tr>
				<td><item-preview v-if="table[1][0]" :item="mtinfo.items[table[1][0]]" size="64"/></td>
				<td><item-preview v-if="table[1][1]" :item="mtinfo.items[table[1][1]]" size="64"/></td>
				<td><item-preview v-if="table[1][2]" :item="mtinfo.items[table[1][2]]" size="64"/></td>
			</tr>
			<tr>
				<td><item-preview v-if="table[2][0]" :item="mtinfo.items[table[2][0]]" size="64"/></td>
				<td><item-preview v-if="table[2][1]" :item="mtinfo.items[table[2][1]]" size="64"/></td>
				<td><item-preview v-if="table[2][2]" :item="mtinfo.items[table[2][2]]" size="64"/></td>
			</tr>
		</table>
  `
});
