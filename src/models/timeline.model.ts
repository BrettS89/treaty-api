// insurance/timeline-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'insurance/timeline';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    deal_id: {
      type: Schema.Types.ObjectId,
      ref: 'insurance/deal',
      required: true,
      unique: true,
    },
    broker: {
      row_1: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
      row_2: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
    },
    insurer: {
      row_1: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
      row_2: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
    },
    reinsurer: {
      row_1: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
      row_2: [{
        name: {
          type: String,
        },
        status: {
          type: String,
        },
        weeks: {
          type: Number,
          required: true,
        },
        is_blank: Boolean,
      }],
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
