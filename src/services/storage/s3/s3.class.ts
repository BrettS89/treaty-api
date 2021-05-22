import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { Application } from '../../../declarations';

export class S3 {
  app: Application;
  s3: AWS.S3;

  constructor (app: Application) {
    this.app = app;

    this.s3 = new AWS.S3({
      accessKeyId: this.app.get('aws.s3.public'),
      secretAccessKey: this.app.get('aws.s3.secret'),
    });
  }

  async create({ content_type }) {
    const bucket = this.app.get('aws.s3.bucket');
    const cloudfrontKey = this.app.get('aws.s3.cloudfrontKey');

    const id = uuid();

    const uploadUrl = await this.s3.getSignedUrl('putObject', {
      Bucket: bucket,
      Key: id,
      ContentType: content_type,
      Expires: 60 * 5,
    });

    return {
      meta: {
        id,
      },
      urls: {
        storage: `https://${bucket}.s3.amazonaws.com/${id}/`,
        delivery: `${cloudfrontKey}/${id}/`,
        upload: uploadUrl,
      },
    };
  }
}
