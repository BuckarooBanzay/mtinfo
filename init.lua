local MP = minetest.get_modpath("mtinfo")

mtinfo = {
	basepath = minetest.get_worldpath() .. "/mtinfo"
}

minetest.mkdir(mtinfo.basepath .. "/data")

print("[mtinfo] Exporting mtinfo to: " .. mtinfo.basepath)

dofile(MP .. "/common.lua")
dofile(MP .. "/nodes.lua")
dofile(MP .. "/items.lua")
dofile(MP .. "/tools.lua")
dofile(MP .. "/abm.lua")
dofile(MP .. "/lbm.lua")
dofile(MP .. "/recipes.lua")
dofile(MP .. "/textures.lua")
