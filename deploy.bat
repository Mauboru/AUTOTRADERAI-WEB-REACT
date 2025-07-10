@echo off

ssh root@212.85.19.3 "cd .. && cd home && cd tecnomaub-autotraderai && cd htdocs && cd autotraderai.tecnomaub.site && git pull && npm install --force && npm run build"