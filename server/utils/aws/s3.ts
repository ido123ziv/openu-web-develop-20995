import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command 
  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from "sharp";

  
  const bucket =  process.env.BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION as string,
    endpoint: process.env.AWS_ENDPOINT_URL as string,
    forcePathStyle: true
  });
  
  export const s3Uri = () => {
    if ("AWS_ENDPOINT_URL" in process.env) // if working locally with localstack
      return "localhost:4566";
    return "s3.amazonaws.com";
  };
  export const putImage = async (file: Express.Multer.File, imageName: string) => {
    const buffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
    
    const params = {
      Bucket: bucket as string,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
  
    const command = new PutObjectCommand(params);
    await s3.send(command);
  };
  
  export const getImageUrl = async (imageName: string) => {
    const params = {
      Bucket: bucket,
      Key: imageName
    }

    const command = new GetObjectCommand(params);
    const seconds = 60
    const url = await getSignedUrl(s3, command, { expiresIn: seconds });

    return url
  };

  export const deleteImage = async (imageName: string) => {
    const deleteParams = {
      Bucket: bucket,
      Key: imageName,
    }
  
    return s3.send(new DeleteObjectCommand(deleteParams));
  };

  export const listBucket = async () => {
    const input = {
      Bucket: bucket
    };
    const command = new ListObjectsV2Command(input);
    const response = await s3.send(command);
    console.log(response.Contents);
    return response;

  }