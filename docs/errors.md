# Common Errors

## Error: cannot find module 
When encountering error such as:
> api-1          | utils/aws/s3.ts(6,10): error TS2307: Cannot find module '@aws-sdk/client-s3' or its corresponding type declarations.

You need to make sure you have the latest version of the `package.json` and the modules are installed.

please do the following:

* stop the compose: (ctrl+c) or `docker compose stop`

* kill the compose `docker compose down`

* clean the node modules `rm -rf node_modules/ && rm -f package-lock.json && npm cache clean --force`

* get latest of code `git pull` or `git pull origin main` to get latest from main if you are on side branch

* install modules `npm install`

* build the dockers without cache: `docker compose build --no-cache`

and in one script:
```bash
docker compose stop
docker compose down
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force
git pull
npm install
docker compose build --no-cache
docker rmi $(docker images -f "dangling=true" -q)
docker compose up
```
