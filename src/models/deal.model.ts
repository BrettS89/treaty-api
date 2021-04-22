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
    treaty_type: {
      type: [String],
      required: true,
    },
    insurance_type: {
      type: [String],
      required: true,
    },
    business_covered: {
      type: String,
    },
    effective_date: {
      type: String,
      required: true,
    },
    contract_term: {
      type: String,
      required: true,
    },
    reinsurance_coverage: {
      type: String,
      required: true,
    },
    excess_treaty: {
      type: Boolean,
      required: true,
    },
    admitted: {
      type: [String],
      required: true,
    },
    program_business: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'New Treaty'
    },
    insurance_company: {
      type: String,
    },
    detail_ids: [{
      type: Schema.Types.ObjectId,
      ref: 'insurance/detail',
      default: [],
    }],
    executive_summary: {
      type: String,
    },
    additional_details: {
      type: String,
    },
    territories: [{
      type: String,
      default: [],
    }],
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
