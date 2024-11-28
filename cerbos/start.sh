#!/bin/bash

docker run -t --name cerbos -d -v $(pwd):/home/jeet/Projects/cerbos -p 3592:3592 ghcr.io/cerbos/cerbos:latest server --config=/home/jeet/Projects/cerbos/cerbos-config.yaml 
#docker run --rm -t --name cerbos -v /home/jeet/Projects/cerbos -p 3592:3592 ghcr.io/cerbos/cerbos:latest server 
