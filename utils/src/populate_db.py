import logging
from pop_utils import db_connection, aws_connection
UPDATE_QUERY = """
UPDATE babysitters
SET image_string = %s
WHERE babysitter_id = %s
"""
VALIDATE_QUERY = """
SELECT image_string
FROM babysitters
WHERE babysitter_id = %s
"""
IMAGE_FORMATS = ["jpg", "jpeg", "pdf","bmp","svg","gif","png","tiff"]
def remove_image_prefix(image_name: str):
    for format in IMAGE_FORMATS:
        image_name = image_name.replace(f".{format}","")
    return image_name.replace("babysitter_","")


def get_images_names_from_s3(aws: aws_connection, bucket_name: str):
    db_images = []
    try:
        files = aws.list_files(bucket_name)
        if files:
            for file in files:
                logging.info("working on: {}".format(file))
                db_images.append({
                    'key': file.get('Key'),
                    'id': remove_image_prefix(file.get('Key'))
                })
    except Exception as e:
        logging.error("Got unexpected error on getting images: {}".format(str(e)))
    return db_images


def update_image_in_table(images: list, db=db_connection):
    try:
        for image in images:
            db.execute(UPDATE_QUERY, (image.get('key'), image.get('id')))
            db.commit()
            result = db.query(VALIDATE_QUERY, (image.get('id')))
            for row in result:
                logging.debug("found row: {}".format(row))
        return True
    except Exception as e:
        logging.error("unhandled error: {}".format(str(e)))
        return False


def main(bucket_name: str):
    aws = aws_connection()
    db = db_connection()
    images = get_images_names_from_s3(aws=aws, bucket_name=bucket_name)
    if not images:
        logging.error("Didn't find any images!")
        exit(1)
    status = update_image_in_table(images, db)
    if status:
        logging.info("all images updated in db successfully")
    else:
        logging.error("Not all images updated.")