import multerS3 from "multer-s3-v2";
import aws from "aws-sdk";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
const buncketName = process.env.AWS_BUCKET_NAME;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${Date.now()}_${bcrypt.hashSync(file.originalname, 10)}${path.extname(
          file.originalname
        )}`
      );
    },
  }),
});
// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParmas = {
    key: fileKey,
    Bucket: buncketName,
  };
  return s3.getObject(downloadParmas).createReadStream();
}

export { upload, getFileStream };
