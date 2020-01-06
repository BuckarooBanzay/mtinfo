local node_mapped_keys = {
	"name",
	"description",
	"drawtype",
	"groups",
	"inventory_image",
	"stack_max",
	"tiles",
	"palette",
	"sunlight_propagates",
	"walkable",
	"pointable",
	"diggable",
	"climbable",
	"buildable_to",
	"floodable",
	"paramtype",
	"paramtype2",
	"liquidtype",
	"liquid_renewable",
	"liquid_range",
	"drowning",
	"light_source",
	"damage_per_second",
	"connects_to",
	"drop"
}

minetest.register_on_mods_loaded(function()
  local data = {}

  mtinfo.map_list(data, minetest.registered_nodes, node_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/nodes.json", data)
end)
