#!/usr/bin/env bash

echo "  _____                    _____                 _      "
echo " |     |_ _ ___ ___ _ _   |     |___ ___ ___ ___| |___  "
echo " |  |  | | | -_|  _| | |  |   --| . |   |_ -| . | | -_| "
echo " |__  _|___|___|_| |_  |  |_____|___|_|_|___|___|_|___| "
echo "    |__|           |___|                                "

echo "Starting Query Console..."

# Run the API Server and Client Server in parallel processes
npm run start:client & pid=$!
PID_LIST+=" $pid";

npm run start:server & pid=$!
PID_LIST+=" $pid";

trap "kill $PID_LIST" SIGINT

wait $PID_LIST

echo
echo "Query Console Exited.";
