mtinfo = {
	basepath = minetest.get_worldpath() .. "/mtinfo"
}

local MP = minetest.get_modpath("mtinfo")

minetest.mkdir(mtinfo.basepath)

dofile(MP .. "/common.lua")
dofile(MP .. "/nodes.lua")
dofile(MP .. "/items.lua")
dofile(MP .. "/tools.lua")
dofile(MP .. "/abm.lua")
dofile(MP .. "/lbm.lua")
dofile(MP .. "/recipes.lua")
dofile(MP .. "/textures.lua")


minetest.register_on_mods_loaded(function()
	print("[mtinfo] Exporting mtinfo to: " .. mtinfo.basepath)
end)
