#!/usr/bin/env bash

# Set appropriate working directory
cd "$(npm root -g)/query-console"

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
    -c|--config)
    CONFIG_PATH="$2"
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

if [ -z "$CONFIG_PATH" ]
then
  echo
  echo "No config path present. Please use the -c flag to specify the path to the JSON config file."
  echo
  pwd
else
  # Run the API Server and Client Server in parallel processes

  # Start the API server on the port above the client
  echo "Starting API Server..."
  CONFIG_PATH="$CONFIG_PATH" npm run start:server -- -p $(( ${CLIENT_PORT:-3005} + 1)) & pid=$!
  PID_LIST+=" $pid";
  # Start the client server on the port specified
  echo "Starting Client Server..."
  npm run start:client -- -l ${CLIENT_PORT:-3005} & pid=$!
  PID_LIST+=" $pid";

  trap "kill $PID_LIST" SIGINT

  wait $PID_LIST

  echo
  echo "Query Console Exited.";
fi
