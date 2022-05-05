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

function mtinfo.export_items(export_data)
	local data = {}
	local has_moreblocks = minetest.get_modpath("moreblocks")
	local has_technic_cnc = minetest.get_modpath("technic_cnc")

	mtinfo.map_list(data, minetest.registered_items, item_mapped_keys, function(def)
		if def.groups and def.groups.not_in_creative_inventory then
			return false
		else
			return true
		end
	end, function(name, item, def)
		if has_moreblocks and circular_saw.known_nodes[name] then
			-- moreblocks enabled
			item.circular_saw = true
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
	export_data.items = data
end
