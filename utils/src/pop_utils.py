import psycopg2
import boto3
import os
import json
from botocore.exceptions import ClientError
import logging

class db_connection():
    def __init__(self) -> None:
        self._conn = psycopg2.connect(
            dbname=os.environ.get('DATABASE_NAME'),
            user=os.environ.get('DATABASE_USERNAME'),
            password=os.environ.get('DATABASE_PASSWORD'),
            host=os.environ.get('DATABASE_URL'),
            port=os.environ.get('DATABASE_PORT')
        )
        self._cursor = self._conn.cursor()
        logging.info("Created a db connection!")

    @property
    def connection(self):
        return self._conn

    @property
    def cursor(self):
        return self._cursor
    def commit(self):
        self.connection.commit()

    def close(self, commit=True):
        if commit:
            self.commit()
        self.connection.close()

    def execute(self, sql, params=None):
        self.cursor.execute(sql, params or ())

    def fetchall(self):
        return self.cursor.fetchall()

    def fetchone(self):
        return self.cursor.fetchone()

    def query(self, sql, params=None):
        self.cursor.execute(sql, params or ())
        return self.fetchall()
    
class aws_connection():
    def __init__(self) -> None:
        self._session = boto3.session.Session()
        self._s3_client = self._session.client(
            service_name='s3',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
            region_name=os.environ.get('AWS_DEFAULT_REGION'),
            endpoint_url=os.environ.get('AWS_ENDPOINT_URL')
        )
        logging.info("created a s3 client connection!")
    
    @property
    def session(self):
        return self._session
    
    @property
    def s3_client(self):
        return self._s3_client
    
    def upload_file(self, file_name, bucket_name, object_name=None):
        """Upload a file to an S3 bucket

        :param file_name: File to upload
        :param bucket: Bucket to upload to
        :param object_name: S3 object name. If not specified then file_name is used
        :return: True if file was uploaded, else False
        """

        # If S3 object_name was not specified, use file_name
        if object_name is None:
            object_name = os.path.basename(file_name)

        try:
            self._s3_client.upload_file(file_name, bucket_name, object_name)
        except ClientError as e:
            logging.error(str(e))
            return False
        return True

    def list_files(self, bucket_name):
        try:
            response = self._s3_client.list_objects_v2(
                Bucket=bucket_name
            )
            logging.debug("response: {}".format(response))
            if response:
                return response.get('Contents')
            return []
        except ClientError as e:
            logging.error(str(e))
            return None


    def __get_cors__(self):
        with open('cors.json', 'r') as cors_file:
            return json.load(cors_file)
        

    def create_bucket(self, bucket_name):
        try:
            response = self._s3_client.create_bucket(
                Bucket=bucket_name
            )
            if response:
                logging.info("Successfully created a bucket named: {}".format(bucket_name))
                logging.info(self.__get_cors__())
                self._s3_client.put_bucket_cors(Bucket=bucket_name,CORSConfiguration=self.__get_cors__())
                logging.info("Successfully put cors policy: {}".format(bucket_name))
                return True
            raise ValueError("didn't create bucket.")
        except ClientError as e:
            logging.error(str(e))
            return None
        except ValueError as e:
            logging.error(str(e))
            return False
    




    
    def create_presigned_url(self, bucket_name, object_name, expiration=3600):
        try:
            response = self._s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
        except ClientError as e:
            logging.error(str(e))
            return None

        return response