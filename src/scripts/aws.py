
from setting import aws_secret_access_key, aws_Access_key
import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id=aws_Access_key,
    aws_secret_access_key=aws_secret_access_key
)

bucket_name = '315856484blog'


def print_buckets():
    response = s3.list_buckets()
    for bucket in response['Buckets']:
        print(f"Name: {bucket['Name']}")


def get_all_files():
    files_obj = []
    response = s3.list_objects_v2(Bucket=bucket_name)
    for obj in response['Contents']:
        print(obj['Key'])
        files_obj.append(obj)
    return files_obj


def upload_to_s3():
    file_path = ''
    file_name = 'example.txt'
    resp = s3.upload_file(file_path, bucket_name, file_name)


if __name__ == '__main__':
    print(print_buckets())
