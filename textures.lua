local count = 0
local size = 0

function mtinfo.copy_texture_dir(src, target)
	minetest.mkdir(target)

	local file_list = minetest.get_dir_list(src, false)
	for _, filename in pairs(file_list) do
		count = count+1
		size = size + mtinfo.copyfile(src .. "/" .. filename, target .. "/" .. filename)
	end

	local dir_list = minetest.get_dir_list(src, true)
	for _, subdir in pairs(dir_list) do
		minetest.mkdir(target .. "/" .. subdir)
		-- Merge src subdir into target
		mtinfo.copy_texture_dir(src .. "/" .. subdir, target)
	end
end

function mtinfo.export_textures()
	for _, modname in ipairs(minetest.get_modnames()) do
		local modpath = minetest.get_modpath(modname)
		local destination_path = mtinfo.basepath .. "/textures"
		minetest.mkdir(destination_path)

		if modpath then
			local source_path = modpath .. "/textures"
			print("[mtinfo] exporting " .. source_path .. " into " .. destination_path)
			mtinfo.copy_texture_dir(source_path, destination_path)
		end
	end
	print("[mtinfo] exported " .. count .. " textures (" .. size .. " bytes)")
	local data = {
		count = count,
		size = size
	}
	mtinfo.export_json(mtinfo.basepath.."/data/textures.js", data, "mtinfo.textures")

end
