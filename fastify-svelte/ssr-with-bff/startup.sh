#! /bin/sh 
nohup node build &
oauth2-proxy-v7.4.0.linux-amd64/oauth2-proxy --http-address 0.0.0.0:4180