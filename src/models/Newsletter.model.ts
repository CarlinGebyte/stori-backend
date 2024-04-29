import { model, Schema } from 'mongoose';

const NewsletterSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    emails: {
      type: [String],
      required: true,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
);

export default model('Newsletter', NewsletterSchema);
