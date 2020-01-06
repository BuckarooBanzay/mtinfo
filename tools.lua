local tool_mapped_keys = {
	"name",
  "description",
  "groups",
  "inventory_image",
  "stack_max",
  "tool_capabilities",
  "range"
}

minetest.register_on_mods_loaded(function()
  local data = {}

  mtinfo.map_list(data, minetest.registered_tools, tool_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/tools.json", data)
end)
