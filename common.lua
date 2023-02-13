
function mtinfo.map_list(target, list, keys, filter, enhancefn)
	filter = filter or function()
		-- show all
		return true
	end

	-- no-op
	enhancefn = enhancefn or function() end

	for name, def in pairs(list) do
		if filter(def) then
			local item = {}
			for _, key in ipairs(keys) do
				if def[key] and def[key] ~= 0 then
					-- only export fields that are populated
					item[key] = def[key]
					if key == "description" or key == "short_description" then
						-- translate content
						item[key] = minetest.get_translated_string("", def[key])
					end
				end
			end
			enhancefn(name, item, def)
			target[name] = item
		end
	end
end

function mtinfo.copyfile(src, target)
	local infile = io.open(src, "rb")
	local instr = infile:read("*a")
	infile:close()

	if not instr then
		return 0
	end

	local outfile, err = io.open(target, "wb")
	if not outfile then
		error("File " .. target .. " could not be opened for writing! " .. err or "")
	end
	outfile:write(instr)
	outfile:close()

	return #instr
end

function mtinfo.copyrecursive(src, target)
	minetest.mkdir(target)

	local file_list = minetest.get_dir_list(src, false)
	for _, filename in pairs(file_list) do
		mtinfo.copyfile(src .. "/" .. filename, target .. "/" .. filename)
	end

	local dir_list = minetest.get_dir_list(src, true)
	for _, filename in pairs(dir_list) do
		minetest.mkdir(target .. "/" .. filename)
		mtinfo.copyrecursive(src .. "/" .. filename, target .. "/" .. filename)
	end
end

function mtinfo.export_json(fname, data, varname)
	local f = io.open(fname, "w")
	local data_string, err = minetest.write_json(data)
	if err or not f then
		error("error while opening " .. fname .. " " .. (err or ""))
	end
	f:write(varname .. "=")
	f:write(data_string)
	f:write(";")
	io.close(f)
end
