
minetest.register_on_mods_loaded(function()
  local data = {}

  for name in pairs(minetest.registered_nodes) do
    data[name] = minetest.get_all_craft_recipes(name)
  end

  mtinfo.export_json(mtinfo.basepath.."/recipes.json", data)
end)
