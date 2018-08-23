#!/usr/bin/env bash

echo "  _____                    _____                 _      "
echo " |     |_ _ ___ ___ _ _   |     |___ ___ ___ ___| |___  "
echo " |  |  | | | -_|  _| | |  |   --| . |   |_ -| . | | -_| "
echo " |__  _|___|___|_| |_  |  |_____|___|_|_|___|___|_|___| "
echo "    |__|           |___|                                "

echo "Starting Query Console..."

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -p|--port)
    CLIENT_PORT="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters



# Run the API Server and Client Server in parallel processes

# Start the API server on the port above the client
npm run start:server -- -p $(( ${CLIENT_PORT:-3005} + 1)) & pid=$!
PID_LIST+=" $pid";
# Start the client server on the port specified
npm run start:client -- -l ${CLIENT_PORT:-3005} & pid=$!
PID_LIST+=" $pid";

trap "kill $PID_LIST" SIGINT

wait $PID_LIST

echo
echo "Query Console Exited.";
