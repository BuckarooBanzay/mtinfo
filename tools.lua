local tool_mapped_keys = {
	"name",
  "description",
  "groups",
  "inventory_image",
  "stack_max",
  "tool_capabilities",
  "range"
}

mtinfo.export_tools = function()
  local data = {}

  mtinfo.map_list(data, minetest.registered_tools, tool_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/data/tools.js", data, "mtinfo.tools")
end
