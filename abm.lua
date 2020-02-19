
local abm_mapped_keys = {
	"label",
	"nodenames",
	"neighbors",
	"interval",
	"chance",
	"catch_up"
}

minetest.register_on_mods_loaded(function()
  local data = {}

  mtinfo.map_list(data, minetest.registered_abms, abm_mapped_keys)
  mtinfo.export_json(mtinfo.basepath.."/data/abm.js", data, "mtinfo.abm")
end)
