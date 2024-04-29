import NewsletterModel from '../models/Newsletter.model.js';

export const newsletterService = {
  async getNewsletters() {
    return await NewsletterModel.find();
  },
  async getNewsletterById({ id }: { id: string }) {
    return (await NewsletterModel.findById(id))?.toObject();
  },
  async createNewsletter({ name, description, emails }: { name: string; description: string; emails: string[] }) {
    return (await NewsletterModel.create({ name, description, emails })).toObject();
  },
  async subscribe({ id, emails }: { id: string; emails: string[] }) {
    const newsletter = await NewsletterModel.findOneAndUpdate({ _id: id }, { $addToSet: { emails } }, { new: true });
    return newsletter?.toObject();
  },
  async unsubscribeById({ id, email }: { id: string; email: string }) {
    return (
      await NewsletterModel.findOneAndUpdate({ _id: id }, { $pull: { emails: email } }, { new: true })
    )?.toObject();
  },
  async unsubscribe({ email }: { email: string }) {
    return await NewsletterModel.updateMany({ $pull: { emails: email } });
  },
  async updateNewsletter({
    id,
    name,
    description,
    emails
  }: {
    id: string;
    name: string;
    description: string;
    emails: string[];
  }) {
    return (
      await NewsletterModel.findOneAndUpdate({ _id: id }, { name, description, emails }, { new: true })
    )?.toObject();
  },
  async deleteNewsletter({ id }: { id: string }) {
    return await NewsletterModel.findByIdAndDelete(id);
  }
};
