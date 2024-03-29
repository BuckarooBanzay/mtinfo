local item_mapped_keys = {
	"name",
	"type",
	"mod_origin",
	"short_description",
	"description",
	"groups",
	"inventory_image",
	"stack_max",
	"tool_capabilities",
	"range",
	"drawtype",
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
	"drop",
	"mtinfo"
}

local has_old_moreblocks = minetest.get_modpath("moreblocks") and minetest.global_exists("circular_saw")
local has_new_stairsplus = minetest.get_modpath("stairsplus") and stairsplus.api
local has_technic_cnc = minetest.get_modpath("technic_cnc")

function mtinfo.export_items()
	local data = {}

	mtinfo.map_list(data, minetest.registered_items, item_mapped_keys, function(def)
		if def.groups and def.groups.not_in_creative_inventory then
			return false
		else
			return true
		end
	end, function(name, item, def)
		if has_old_moreblocks and circular_saw.known_nodes[name] then
			-- moreblocks enabled
			item.circular_saw = true
		end
		if has_new_stairsplus and stairsplus.api.get_shapes_hash(name) then
			item.new_circular_saw = true
		end
		if has_technic_cnc and minetest.registered_items[name .. "_technic_cnc_slope"] then
			-- partial or full cnc support
			item.cnc = true
		end

		if def.mesecons then
			item.mesecons = true
		end

		if def.digiline or def.digilines then
			item.digiline = true
		end
	end)
	mtinfo.export_json(mtinfo.basepath.."/data/items.js", data, "mtinfo.items")
end
