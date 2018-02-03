#!/usr/bin/env bash

cd "${0%/*}"
java -jar ./mstoreui-testing-basic-*.jar $1
