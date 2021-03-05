#!/bin/sh
# copies the node_module dependencies to the application paths

cp node_modules/vue-router/dist/vue-router.min.js js/lib/
cp node_modules/vue/dist/vue.min.js js/lib/

cp node_modules/bootstrap/dist/css/bootstrap.min.css css/
cp node_modules/@fortawesome/fontawesome-free/css/all.min.css css/
cp node_modules/@fortawesome/fontawesome-free/webfonts/* webfonts/
