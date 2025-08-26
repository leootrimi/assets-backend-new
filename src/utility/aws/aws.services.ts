import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AWSServices {
    private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET ?? ""
    private AWS_S3_REGION = process.env.AWS_S3_REGION ?? ""
    private s3Client = new S3Client({
        region: this.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
            secretAccessKey: process.env.AWS_SECRET_KEY ?? ""
        }
    })

  async uploadFiles(request: any, fileName: string, fileBuffer: Buffer): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.AWS_S3_BUCKET,
      Key: `${request.user.email}/${fileName}`,
      Body: fileBuffer,
    });

    await this.s3Client.send(command);
    return `https://${this.AWS_S3_BUCKET}.s3.${this.AWS_S3_REGION}.amazonaws.com/${request.user.email}/${fileName}`;
  }

async listUserFiles(request: any) {
  const email = request.user.email;
  console.log(email);

  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: `${email}/`,
  });

  const response = await this.s3Client.send(command);

  const files = (response.Contents || []).map(obj => ({
    Key: obj.Key,
    LastModified: obj.LastModified,
    Size: obj.Size
  }));

  return files; 
}

}
