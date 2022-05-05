
local abm_mapped_keys = {
	"label",
	"nodenames",
	"neighbors",
	"interval",
	"chance",
	"catch_up"
}

function mtinfo.export_abms(export_data)
  local data = {}
  mtinfo.map_list(data, minetest.registered_abms, abm_mapped_keys)
  export_data.abms = data
end
