
#yarn run build
ng build --prod --build-optimizer --base-href=/wechatvote/
docker build -t registry.cn-qingdao.aliyuncs.com/bbkj/cyq-wechat-vote:latest .
docker push registry.cn-qingdao.aliyuncs.com/bbkj/cyq-wechat-vote:latest
