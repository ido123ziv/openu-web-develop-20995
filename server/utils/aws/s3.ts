import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command 
  } from "@aws-sdk/client-s3";
  import sharp from "sharp";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import db from "../db/db";
  
  const bucket =  process.env.BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION as string,
    endpoint: process.env.AWS_ENDPOINT_URL as string,
    forcePathStyle: true
  });
  
  export const putImage = async (file: Express.Multer.File, id: number) => {
    const buffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
  
    const imageName = `babysitter_${id}`;
  
    const params = {
      Bucket: bucket as string,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
  
    const command = new PutObjectCommand(params);
    await s3.send(command);
  
    return await db.query(`
            UPDATE babysitters
            SET image_string = ($1)
            WHERE babysitter_id = ($2)`, [imageName,id,        
    ]);
  };
  
  export const getImage = async (babysitterId: number) => {
    const imageName = (
      await db.query(`
            SELECT image_string
            FROM babysitters
            WHERE babysitter_id = ($1)`, [babysitterId])
    ).rows[0].image;
  
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageName,
    };
  
    const command = new GetObjectCommand(getObjectParams);
    return await getSignedUrl(s3, command);
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