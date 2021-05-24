import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { Application } from '../../../declarations';

export class S3 {
  app: Application;
  s3: AWS.S3;
  aws: Record<string, any>;

  constructor (app: Application) {
    this.app = app;
    this.aws = app.get('aws');

    this.s3 = new AWS.S3({
      accessKeyId: this.aws.s3.public,
      secretAccessKey: this.aws.s3.secret,
    });
  }

  async create({ content_type }) {
    const { s3 } = this.aws;
    const bucket = s3.bucket
    const cloudfrontKey = s3.cloudfrontKey

    const id = uuid();

    const uploadUrl = await this.s3.getSignedUrl('putObject', {
      Bucket: bucket,
      Key: 'deal-files/' + id,
      ContentType: content_type,
      Expires: 60 * 5,
      ACL: 'public-read',
    });

    return {
      meta: {
        id,
      },
      urls: {
        storage: `https://${bucket}.s3.amazonaws.com/deal-files/${id}`,
        delivery: `${cloudfrontKey}/${id}`,
        upload: uploadUrl,
      },
    };
  }
}
