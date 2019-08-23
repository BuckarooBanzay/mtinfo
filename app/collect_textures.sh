#!/bin/sh

test -z "$1" &&{
	echo "$0 <dir to search>"
	exit 1
}

mkdir -p textures

find $1 -type f | grep -i png$ | xargs -i cp -v {} textures/

