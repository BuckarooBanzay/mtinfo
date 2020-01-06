#!/bin/sh

#rm -rf /tmp/mtinfo
mkdir -p /tmp/mtinfo
chmod 777 -R /tmp/mtinfo
rm ./mtinfo -rf

docker run --rm -it \
	-v /tmp/mtinfo/:/var/lib/minetest/.minetest \
	-v $(pwd)/:/var/lib/minetest/.minetest/worlds/world/worldmods/mtinfo \
	registry.gitlab.com/minetest/minetest/server:5.1.0

cp -R /tmp/mtinfo/worlds/world/mtinfo .
