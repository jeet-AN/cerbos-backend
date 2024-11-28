#!/bin/bash
#docker stop cerbos
#docker rm cerbos
docker run --rm -t --name cerbos-compile -v $(pwd):/home/jeet/Projects/cerbos -p 3592:3592 ghcr.io/cerbos/cerbos:latest compile /home/jeet/Projects/cerbos/policies
