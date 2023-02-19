FROM mcr.microsoft.com/devcontainers/javascript-node:18

RUN apt update -y && apt install default-jre -y

# perserve bash history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"
