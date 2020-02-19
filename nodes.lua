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

  mtinfo.map_list(data, minetest.registered_nodes, node_mapped_keys, function(def)
		if def.groups and def.groups.not_in_creative_inventory then
			return false
		else
			return true
		end
	end)
  mtinfo.export_json(mtinfo.basepath.."/data/nodes.js", data, "mtinfo.nodes")
end)
