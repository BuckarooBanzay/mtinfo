
mtinfo.export_recipes = function()
  local data = {}

  for name in pairs(minetest.registered_nodes) do
    data[name] = minetest.get_all_craft_recipes(name)
  end

  mtinfo.export_json(mtinfo.basepath.."/data/recipes.js", data, "mtinfo.recipes")
end
