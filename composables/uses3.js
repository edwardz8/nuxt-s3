import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const useS3 = () => {
  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const uploadFile = async (file) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Construct the public URL for the uploaded file
      const url = `https://${process.env.AWS_BUCKET}.s3.us-east-1.amazonaws.com/${file.name}`;
      console.log("File uploaded successfully", url);
      return url;

    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    }
  };

  return {
    uploadFile,
  };
};