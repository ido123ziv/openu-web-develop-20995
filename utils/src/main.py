import argparse
from populate_bucket import main as upload_files
from populate_db import main as populate_db
import os
import logging


def main(args):
    bucket_name = os.environ.get('BUCKET_NAME')
    images_dir = os.environ.get('IMAGES_DIR')
    if args.action == "db":
        logging.info("updating images in db")
        populate_db(bucket_name)

    if args.action == "bucket":
        logging.info("creating and uploading files to bucket!")
        upload_files(bucket_name=bucket_name,images_path=images_dir)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--action', metavar='-a',dest="action",
                        help='which action to do? (what to populate db or bucket?)',
                        required=True,
                        choices=['db', 'bucket'])
    args = parser.parse_args()
    LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=LOGLEVEL)
    main(args)