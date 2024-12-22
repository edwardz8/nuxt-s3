import { defineEventHandler } from 'h3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

export default defineEventHandler(async (event) => {
    return new Promise((resolve, reject) => {
        upload.single('file')(event.node.req, event.node.res, (err) => {
            if (err) {
                console.error("Error uploading file:", err);
                return reject({ error: "Upload failed" });
            }
            const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${event.node.req.file.key}`;
            resolve({ url });
        });
    });
});