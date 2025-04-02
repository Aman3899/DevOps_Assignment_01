#!/bin/bash
curl -sL https://run.linkerd.io/install | sh
linkerd install | kubectl apply -f -
linkerd check