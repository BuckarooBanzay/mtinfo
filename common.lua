
function mtinfo.map_list(target, list, keys)
	for name, def in pairs(list) do
		local item = {}
		for _, key in ipairs(keys) do
			item[key] = def[key]
		end
		target[name] = item
	end
end

function mtinfo.copyfile(src, target)
	local infile = io.open(src, "r")
	local instr = infile:read("*a")
	infile:close()

	local outfile = io.open(target, "w")
	if not outfile then
		error("File " .. target .. " could not be opened for reading!")
	end
	outfile:write(instr)
	outfile:close()
end

function mtinfo.export_json(fname, data)
	local f = io.open(fname, "w")
	local data_string, err = minetest.write_json(data)
	if err then
		error(err)
	end
	f:write(data_string)
	io.close(f)
end
