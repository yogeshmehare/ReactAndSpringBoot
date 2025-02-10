import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



// Configure S3 Client
const s3 = new S3Client({
  region: REGION,
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `uploads/${file.name}`, // Set file path in bucket
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/uploads/${file.name}`;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};
