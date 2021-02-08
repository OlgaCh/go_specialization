#!/bin/bash

# Час, когда произошла ошибка в PyCharm
cat  /var/log/syslog | grep '.*pycharm-community.*error.*' | awk -F'[:| ]' '{print $4}' | uniq
