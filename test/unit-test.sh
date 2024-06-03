#!/bin/bash

# post contact request
curl --location 'http://localhost:3000/contact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "ido",
    "email": "ido@ido.com",
    "title": "hello",
    "message": "world"
}'

# edit contact request status
curl --location --request PUT 'http://localhost:3000/api/moderator/editContactRequestStatus/1' \
--header 'Content-Type: application/json' \
--data '{
    "status": "done"
}'

# update babysitter
curl --location --request PUT 'http://localhost:3000/api/profile/babysitter/update/2' \
--header 'Content-Type: application/json' \
--data '{
    "city": "Haifa"
}'

# update parent
curl --location --request PUT 'http://localhost:3000/api/profile/parent/update/5' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Ivgeny11"
}'

# delete babysitter
curl --location --request PUT 'http://localhost:3000/api/delete/babysitter/3'

# delete parent
curl --location --request PUT 'http://localhost:3000/api/delete/parent/3'
