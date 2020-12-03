local MP = minetest.get_modpath("mtinfo")

mtinfo = {
	basepath = minetest.get_worldpath() .. "/mtinfo"
}

print("[mtinfo] Exporting mtinfo to: " .. mtinfo.basepath)
dofile(MP .. "/common.lua")
dofile(MP .. "/nodes.lua")
dofile(MP .. "/items.lua")
dofile(MP .. "/tools.lua")
dofile(MP .. "/abm.lua")
dofile(MP .. "/lbm.lua")
dofile(MP .. "/recipes.lua")
dofile(MP .. "/textures.lua")

-- copy static assets
minetest.mkdir(mtinfo.basepath .. "/data")
mtinfo.copyrecursive(MP .. "/app/pics", mtinfo.basepath .. "/pics")
mtinfo.copyrecursive(MP .. "/app/js", mtinfo.basepath .. "/js")
mtinfo.copyrecursive(MP .. "/app/css", mtinfo.basepath .. "/css")
mtinfo.copyfile(MP .. "/app/index.html", mtinfo.basepath .. "/index.html")
