#!/usr/bin/env bash

if [ $# -lt 1 ]; then
    echo "syntax: docker-tag <tag-id>"
    exit 1
fi

docker tag $1 bennychen/mstoreui-testing:latest
if [ ! $? -eq 0 ]; then
    echo "docker tag failed"
    exit 1
fi

docker push bennychen/mstoreui-testing
if [ ! $? -eq 0 ]; then
    echo "docker push failed"
    exit 1
fi

echo "Pushed bennychen/mstoreui-testing image to docker hub..."

exit 0


