// market/list-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'market/list';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    account_id: {
      type: Schema.Types.ObjectId,
      ref: 'security/account',
      required: true,
    },
    markets: [{
      account_id: {
        type: Schema.Types.ObjectId,
        ref: 'security/account',
        required: true,
      },
      contact_id: {
        type: Schema.Types.ObjectId,
        ref: 'market/contact',
      },
    }],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'security/user',
      required: true,
    },
    name: {
      type: String,
      default: 'New List'
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
