
local lbm_mapped_keys = {
	"label",
	"name",
	"nodenames",
	"run_at_every_load"
}

function mtinfo.export_lbms(export_data)
  local data = {}
  mtinfo.map_list(data, minetest.registered_lbms, lbm_mapped_keys)
  export_data.lbms = data
end
