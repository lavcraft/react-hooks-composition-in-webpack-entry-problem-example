#!/bin/bash

WORK_DIR=$(dirname "$(realpath -s "$0")")
SESSION_NAME="company development env"
SESSION_NAME_UI="${SESSION_NAME}:1.1"
SESSION_NAME_SDK_BUILD="${SESSION_NAME}:1.2"
SESSION_NAME_SDK_SHARED_BUILD="${SESSION_NAME}:1.3"
echo -e "Init session with:\n"
echo -e "  Working dir     : ${WORK_DIR}"
echo -e "  UI              : ${SESSION_NAME_UI}"
echo -e "  SDK             : ${SESSION_NAME_SDK_BUILD}"
echo -e "  SDK build       : ${SESSION_NAME_SDK_SHARED_BUILD}"
echo ""

tmux kill-session -t "${SESSION_NAME}"
tmux new-session -d -s "${SESSION_NAME}"

tmux split-window -h -t "${SESSION_NAME_UI}"
tmux split-window -v -t "${SESSION_NAME_SDK_BUILD}"

# Prepare to good run
npm run sdk-shared:build
npm run sdk:build

tmux send-keys -t "${SESSION_NAME_SDK_SHARED_BUILD}" "cd $WORK_DIR && npm run sdk-shared:dev" Enter
tmux send-keys -t "${SESSION_NAME_SDK_BUILD}" "cd $WORK_DIR && npm run sdk:dev" Enter
tmux send-keys -t "${SESSION_NAME_UI}" "cd $WORK_DIR && npm run ui:dev" Enter

tmux attach-session -t "${SESSION_NAME}"
