#!/bin/sh

VOL_ID=$(docker volume create)
CONTAINER_NAME=mtinfo_tmp

docker run -it --name ${CONTAINER_NAME} \
	-u root:root \
	-v ${VOL_ID}:/root/.minetest/worlds/world/mtinfo \
	-v $(pwd)/:/root/.minetest/worlds/world/worldmods/mtinfo \
	registry.gitlab.com/minetest/minetest/server:5.2.0

rm mtinfo -rf
docker cp ${CONTAINER_NAME}:/root/.minetest/worlds/world/mtinfo mtinfo
docker rm ${CONTAINER_NAME}
docker volume rm ${VOL_ID}
