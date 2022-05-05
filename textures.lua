
function export_base64(src)
	local infile = io.open(src, "r")
	local instr = infile:read("*a")
	infile:close()

	if not instr then
		return nil, 0
	end

	return minetest.encode_base64(instr), #instr
end

local function export_texture_dir(src, texture_data)

	local file_list = minetest.get_dir_list(src, false)
	for _, filename in pairs(file_list) do
		local base64_data, size = export_base64(src .. "/" .. filename)
		if size >= 0 then
			texture_data.count = texture_data.count + 1
			texture_data.size = texture_data.size + size
			texture_data.textures[filename] = base64_data
		end
	end

	local dir_list = minetest.get_dir_list(src, true)
	for _, subdir in pairs(dir_list) do
		-- Merge src subdir into target
		export_texture_dir(src .. "/" .. subdir, texture_data)
	end
end

function mtinfo.export_textures(export_data)
	local texture_data = {
		count = 0,
		size = 0,
		textures = {}
	}

	for _, modname in ipairs(minetest.get_modnames()) do
		local modpath = minetest.get_modpath(modname)

		if modpath then
			local source_path = modpath .. "/textures"
			print("[mtinfo] exporting " .. source_path)
			export_texture_dir(source_path, texture_data)
		end
	end
	print("[mtinfo] exported " .. texture_data.count .. " textures (" .. texture_data.size .. " bytes)")
	export_data.textures = texture_data
end
