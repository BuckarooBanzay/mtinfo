local MP = minetest.get_modpath("mtinfo")

local mtinfo_worlddir = minetest.get_worldpath() .. "/mtinfo"
minetest.mkdir(mtinfo_worlddir)

mtinfo = {
	export_file = mtinfo_worlddir .. "/mtinfo.json",
	-- export version
	version = 1,
	settings = {
		enabled = minetest.settings:get_bool("mtinfo.enabled"),
		autoshutdown = minetest.settings:get_bool("mtinfo.autoshutdown")
	}
}

if not mtinfo.settings.enabled then
	-- skip everything
	return
end

dofile(MP .. "/common.lua")
dofile(MP .. "/items.lua")
dofile(MP .. "/abm.lua")
dofile(MP .. "/lbm.lua")
dofile(MP .. "/recipes.lua")
dofile(MP .. "/textures.lua")

minetest.register_on_mods_loaded(function()

	-- workaround for empty translations, defer a globalstep until everything is initialized
	-- deferred by 1 second until technic.recipes is populated
	minetest.after(1, function()
		print("[mtinfo] Exporting mtinfo to: " .. mtinfo.export_file)
		local start = minetest.get_us_time()
		local export_data = {
			version = mtinfo.version
		}

		-- export data
		mtinfo.export_lbms(export_data)
		mtinfo.export_abms(export_data)
		mtinfo.export_items(export_data)
		mtinfo.export_recipes(export_data)

		-- export textures
		mtinfo.export_textures(export_data)

		-- write export_data to json file
		mtinfo.export_json(mtinfo.export_file, export_data)

		local diff = minetest.get_us_time() - start
		print("[mtinfo] export took " .. diff .. " us")

		if mtinfo.settings.autoshutdown then
			minetest.request_shutdown("autoshutdown")
		end
	end)
end)
