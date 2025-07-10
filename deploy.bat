@echo off

ssh root@212.85.19.3 "cd .. && cd home && cd tecnomaub-autotrainerai && cd htdocs && cd autotrainerai.tecnomaub.site && git pull && npm install --force && npm run build"