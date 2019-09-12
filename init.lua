
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

local item_mapped_keys = {
	"name",
	"description",
	"groups",
	"inventory_image",
	"stack_max",
	"tool_capabilities",
	"range"
}

local tool_mapped_keys = {
	"name",
        "description",
        "groups",
        "inventory_image",
        "stack_max",
        "tool_capabilities",
        "range"
}

local abm_mapped_keys = {
	"label",
	"nodenames",
	"neighbors",
	"interval",
	"chance",
	"catch_up"
}

local lbm_mapped_keys = {
	"label",
	"name",
	"nodenames",
	"run_at_every_load"
}

local map_list = function(target, list, keys)
	for name, def in pairs(list) do
		local item = {}
		for _, key in ipairs(keys) do
			item[key] = def[key]
		end
		target[name] = item
	end
end

minetest.register_on_mods_loaded(function()

	local fname = minetest.get_worldpath().."/mtinfo.json"
	print("[mtinfo] Exporting mtinfo to: " .. fname)

	local data = {
		nodes = {},
		abms = {},
		lbms = {},
		recipes = {},
		items = {},
		tools = {}
	}

	data.mods = minetest.get_modnames()

	map_list(data.nodes, minetest.registered_nodes, node_mapped_keys)
	map_list(data.items, minetest.registered_items, item_mapped_keys)
	map_list(data.tools, minetest.registered_tools, tool_mapped_keys)
	map_list(data.abms, minetest.registered_abms, abm_mapped_keys)
	map_list(data.lbms, minetest.registered_lbms, lbm_mapped_keys)

	for name, def in pairs(minetest.registered_nodes) do
		data.recipes[name] = minetest.get_all_craft_recipes(name)
	end

	local f = io.open(fname, "w")
	local data_string, err = minetest.write_json(data)
	if err then
		error(err)
	end
	f:write(data_string)
	io.close(f)

	print("[mtinfo] exported " .. string.len(data_string) .. " bytes")

end)
