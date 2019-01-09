set-window-option remain-on-exit on
send-keys 'git status' Enter

split-window -v #-d ng serve
send-keys 'ng serve' Enter
select-pane -U

split-window -h
send-keys 'npm run test' Enter
select-pane -L

new-window -c '#{pane_current_path}/src/app' vim +Ex
