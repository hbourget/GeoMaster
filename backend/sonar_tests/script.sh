#!/bin/sh

sleep 30

cd /app/service_card

mvn clean verify sonar:sonar \
 -Dsonar.projectKey='service_card' \
 -Dsonar.projectName='service_card' \
 -Dsonar.host.url=http://sonarqube:9000 \
 -Dsonar.token=squ_8a88f7e444f0af2e691bbc9500edc5014ded1327

# cd /app/service_inventory

# mvn clean verify sonar:sonar \
#   -Dsonar.projectKey='service_inventory' \
#   -Dsonar.projectName='service_inventory' \
#   -Dsonar.host.url=http://sonarqube:9000 \
#   -Dsonar.token=squ_8a88f7e444f0af2e691bbc9500edc5014ded1327