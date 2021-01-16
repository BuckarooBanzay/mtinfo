/*
pre-compute abm name/group maps
mtinfo.abm = [];

mtinfo.abm_nodenames[nodename_or_group] = abm
mtinfo.abm_neighbors[nodename_or_group] = abm
*/

mtinfo.abm_nodenames = {};
mtinfo.abm_neighbors = {};

mtinfo.abm.forEach(function(abm){
	abm.nodenames.forEach(function(nodename){
		mtinfo.abm_nodenames[nodename] = abm;
	});
	if (abm.neighbors){
		if (typeof(abm.neighbors) == "string"){
			mtinfo.abm_neighbors[abm.neighbors] = abm;
		} else {
			abm.neighbors.forEach(function(nodename){
				mtinfo.abm_neighbors[nodename] = abm;
			});
		}
	}
});
