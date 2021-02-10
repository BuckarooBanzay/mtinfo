
local lbm_mapped_keys = {
	"label",
	"name",
	"nodenames",
	"run_at_every_load"
}

function mtinfo.export_lbms()
  local data = {}

  mtinfo.map_list(data, minetest.registered_lbms, lbm_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/data/lbm.js", data, "mtinfo.lbm")
end
