#!/bin/bash

dir=$1

if [ -z $dir ]
  then
    echo 'По умолчанию работает с текущей директорией, если не задана.'
    echo 'Использование: 3.sh [директория]'
fi

ls -l $dir | awk '{print $1}' | sort | uniq | grep -v 'total'
