Vue.component("nav-bar", {
  template: /*html*/`
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">MT Info</router-link>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="fa fa-home"></i> Start
          </router-link>
        </li>
				<li class="nav-item">
          <router-link to="/mods" class="nav-link">
            <i class="fa fa-cubes"></i> Mods
          </router-link>
        </li>
				<li class="nav-item">
          <router-link to="/search" class="nav-link">
            <i class="fa fa-search"></i> Search
          </router-link>
        </li>
				<li class="nav-item">
          <router-link to="/moreblocks" class="nav-link">
            <i class="fa fa-th-large"></i> Moreblocks
          </router-link>
        </li>
				<li class="nav-item">
          <router-link to="/cnc" class="nav-link">
            <i class="fa fa-th"></i> Technic CNC
          </router-link>
        </li>
      </ul>
    </div>
</nav>
  `
});
