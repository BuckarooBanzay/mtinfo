local MP = minetest.get_modpath("mtinfo")

mtinfo = {
	basepath = minetest.get_worldpath() .. "/mtinfo"
}

print("[mtinfo] Exporting mtinfo to: " .. mtinfo.basepath)
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
		local start = minetest.get_us_time()

		-- copy static assets
		minetest.mkdir(mtinfo.basepath)
		minetest.mkdir(mtinfo.basepath .. "/data")

		-- export data
		mtinfo.export_lbms()
		mtinfo.export_abms()
		mtinfo.export_items()
		mtinfo.export_recipes()

		-- export textures
		mtinfo.export_textures()

		mtinfo.copyrecursive(MP .. "/app/pics", mtinfo.basepath .. "/pics")
		mtinfo.copyrecursive(MP .. "/app/js", mtinfo.basepath .. "/js")
		mtinfo.copyrecursive(MP .. "/app/css", mtinfo.basepath .. "/css")
		mtinfo.copyrecursive(MP .. "/app/webfonts", mtinfo.basepath .. "/webfonts")
		mtinfo.copyfile(MP .. "/app/index.html", mtinfo.basepath .. "/index.html")

		local diff = minetest.get_us_time() - start
		print("[mtinfo] export took " .. diff .. " us")

		if minetest.settings:get_bool("mtinfo.autoshutdown") then
			minetest.request_shutdown("autoshutdown")
		end
	end)
end)
