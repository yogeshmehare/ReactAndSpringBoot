import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFile = async (file,accessParamsJson) => {

  const s3 = new S3Client({
    region: accessParamsJson.REGION,
    requestChecksumCalculation: "WHEN_REQUIRED",
    credentials: {
      accessKeyId: accessParamsJson.AWS_ACCESS_KEY,
      secretAccessKey: accessParamsJson.AWS_SECRET_KEY,
    },
  });

  const params = {
    Bucket: accessParamsJson.S3_BUCKET,
    Key: `uploads/${file.name}`, // Set file path in bucket
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://${accessParamsJson.S3_BUCKET}.s3.${accessParamsJson.REGION}.amazonaws.com/uploads/${file.name}`;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};
