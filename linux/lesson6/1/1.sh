#!/bin/bash

file=$1
out_file=1_out.txt

if [ -z $file ]
  then
    echo "Укажите путь к файлу"
    exit 1
else
  echo "Заменяем пустые строки в файле"
  sed '/^[[:space:]]*$/d' $file > $out_file

  echo "Заменяем строчные символы на заглавные"
  sed -i 's/\(.*\)/\U\1/g' $out_file
fi
