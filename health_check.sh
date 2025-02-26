#!/bin/bash

SERVICE_NAME="express"
LOG_FILE="/var/log/server_health_check.log"

if ! systemctl is-active --quiet $SERVICE_NAME; then
    echo "$(date): $SERVICE_NAME is down. Restarting..." >> $LOG_FILE
    sudo systemctl restart $SERVICE_NAME
else
    echo "$(date): $SERVICE_NAME is running." >> $LOG_FILE
fi