import logging
from pop_utils import db_connection, aws_connection
UPDATE_QUERY = """
UPDATE babysitters
SET image_string = %s
WHERE babysitter_id = %d
"""
VALIDATE_QUERY = """
SELECT image_string
FROM babysitters
WHERE babysitter_id = %d
"""

def get_images_names_from_s3(aws: aws_connection, bucket_name):
    db_images = []
    try:
        files = aws.list_files(bucket_name)
        if files:
            for file in files:
                db_images.append({
                    'key': file.Key,
                    'id': int(file.key.replace(".png","").replace("babysitter_","")),
                    'url': aws.create_presigned_url(bucket_name=bucket_name,
                                                    object_name=file.key,
                                                    expiration=604800)       
                })
    except Exception as e:
        logging.error("Got unexpected error on getting images: {}".format(str(e)))
    return db_images


def update_image_in_table(images: list, db=db_connection):
    try:
        for image in images:
            db.execute(UPDATE_QUERY, (image.url, image.id))
            db.commit()
            result = db.query(VALIDATE_QUERY, image.id)
            for row in result:
                print(row)
        return True
    except Exception as e:
        logging.error("unhandled error: {}".format(str(e)))
        return False


def main(bucket_name: str):
    aws = aws_connection()
    db = db_connection()
    images = get_images_names_from_s3(bucket_name, aws)
    if not images:
        logging.error("Didn't find any images!")
        exit(1)
    status = update_image_in_table(images, db)
    if status:
        logging.info("all images updated in db successfully")
    else:
        logging.error("Not all images updated.")