#!/bin/bash

chmod +x database.sh
chmod +x backend.sh

for i in {1..3}; do
    sudo lxc launch ubuntu:focal mongo$i
done

sleep 10

ip_mongo1=$(sudo lxc list | grep mongo1 | awk '{print $6}')
ip_mongo2=$(sudo lxc list | grep mongo2 | awk '{print $6}')
ip_mongo3=$(sudo lxc list | grep mongo3 | awk '{print $6}')

for i in {1..3}; do
    sudo lxc file push database.sh mongo$i/tmp/
    sudo lxc exec mongo$i /tmp/database.sh
done

sleep 7

sudo lxc exec mongo1 -- mongo --eval "rs.initiate({_id: 'myReplicaSet', members: [{_id: 0, host: '$ip_mongo1:27017'},{_id: 1, host: '$ip_mongo2:27017'},{_id: 2, host: '$ip_mongo3:27017'}]})"

sleep 7

for i in {1..3}; do
    sudo lxc launch ubuntu:jammy back$i
    sleep 5
    sudo lxc file push backend.sh back$i/tmp/
    sudo lxc exec back$i /tmp/backend.sh $ip_mongo1 $ip_mongo2 $ip_mongo3
    sleep 5
done


