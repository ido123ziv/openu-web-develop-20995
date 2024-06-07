# Utils
this is a sample python docker container to populate both bucket and db according to local files.
In order for this to work add the:

* `BUCKET_NAME` env var

* `IMAGES_DIR` env var

example `.env` file would be:

```txt
BUCKET_NAME="data"
IMAGES_DIR="assets"
```