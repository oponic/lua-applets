#!/bin/sh
nohup node ./daemon.ks 0<&- &>/dev/null &
exit 0