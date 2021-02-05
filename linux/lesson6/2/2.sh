#!/bin/bash

for idx in ./{2010..2017}/{01..12}/{001..003}; do
  mkdir -p "$(dirname $idx)" && echo "Файл $(echo $idx | cut -d '/' -f 4)" > "$idx.txt"
done
