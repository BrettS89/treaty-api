// insurance/deal-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '@/declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'insurance/deal';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    account_id: {
      type: Schema.Types.ObjectId,
      ref: 'security/account',
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'security/user',
      required: true,
    },
    title: {
      type: String,
    },
    executive_summary: {
      type: String,
    },
    location: [{
      type: String,
    }],
    gross_written_premium: {
      type: Number,
    },
    projected_loss_ratio: {
      type: String,
    },
    limit: {
      type: Number,
    },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
