#!/bin/bash
curl --location 'http://localhost:3000/contact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "ido",
    "email": "ido@ido.com",
    "title": "hello",
    "message": "world"
}'