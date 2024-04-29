import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { config } from '../libs/config.js';
import { newsletterService } from '../services/Newsletter.service.js';

// const resend = new Resend(config.env.RESEND_API_KEY);

export const NewsletterController = {
  async getNewsletters(_: Request, res: Response) {
    try {
      const newsletters = await newsletterService.getNewsletters();
      res.json({ data: newsletters, message: 'Newsletters fetched successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch newsletters' });
    }
  },
  async getNewsletterById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const newsletter = await newsletterService.getNewsletterById({ id: req.params.id });

      if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });
      console.log(newsletter);

      res.json({ data: newsletter, message: 'Newsletter fetched successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch newsletter' });
    }
  },
  async createNewsletter(req: Request, res: Response) {
    try {
      const { name, description, emails } = req.body;
      if (!name || !description || !emails) return res.status(400).json({ error: 'Missing required fields' });

      const newsletter = await newsletterService.createNewsletter({ name, description, emails });

      res.json({ data: newsletter, message: 'Newsletter created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to create newsletter' });
    }
  },
  async subscribe(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const emails = req.body.emails;
      if (!emails || !Array.isArray(emails) || emails.length === 0)
        return res.status(400).json({ error: 'Emails are required' });

      const currentNewsletter = await newsletterService.getNewsletterById({ id });

      if (!currentNewsletter) return res.status(404).json({ error: 'Newsletter not found' });

      if (currentNewsletter.emails.length + emails.length > 50)
        return res.status(400).json({ error: 'Maximum 50 emails allowed' });

      const newsletter = await newsletterService.subscribe({ id, emails });

      res.json({ data: newsletter, message: 'Subscribed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to subscribe' });
    }
  },
  async unsubscribeById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const email = req.body.email;
      if (!email) return res.status(400).json({ error: 'Email is required' });

      const newsletter = await newsletterService.unsubscribeById({ id, email });

      if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

      res.json({ message: 'Unsubscribed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to unsubscribe from newsletter' });
    }
  },
  async unsubscribe(req: Request, res: Response) {
    try {
      const email = req.body.email;
      if (!email) return res.status(400).json({ error: 'Email is required' });

      await newsletterService.unsubscribe({ email });

      res.json({ message: 'Unsubscribed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to unsubscribe from newsletters' });
    }
  },
  async sendNewsletter(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const { html, subject } = req.body;

      const attachment = req.file;

      if (!attachment || !html) return res.status(400).json({ error: 'Missing required fields' });

      if (!attachment.mimetype.includes('image') && !attachment.mimetype.includes('pdf'))
        return res.status(400).json({ error: 'Invalid attachment type' });

      const newsletter = await newsletterService.getNewsletterById({ id });

      if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

      const { name, emails } = newsletter;

      const attachmentsData = [
        {
          filename: attachment.originalname,
          content: attachment.buffer
        }
      ];

      // Resend don't allow to send test emails to another email address
      // const resendemail = await resend.emails.send({
      //   from: 'onboarding@resend.dev',
      //   to: emails,
      //   subject: subject ?? `🎉 ${name} Newsletter 🎉`,
      //   attachments: attachmentsData,
      //   html
      // });

      const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: config.env.ETHEREAL_EMAIL,
          pass: config.env.ETHEREAL_PASSWORD
        }
      });

      await transport.sendMail({
        from: subject ?? `🎉 ${name} Newsletter 🎉`,
        to: emails.join(', '),
        subject: subject ?? `🎉 ${name} Newsletter 🎉`,
        html,
        attachments: attachmentsData
      });

      res.json({ message: 'Newsletter sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to send newsletter' });
    }
  },
  async updateNewsletter(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const { name, emails, description } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });

      const newsletter = await newsletterService.updateNewsletter({ id, name, description, emails });

      if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

      res.json({ data: newsletter, message: 'Newsletter updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update newsletter' });
    }
  },
  async deleteNewsletter(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'Newsletter ID is required' });

      const newsletter = await newsletterService.deleteNewsletter({ id });

      if (!newsletter) return res.status(404).json({ error: 'Newsletter not found' });

      res.json({ message: 'Newsletter deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete newsletter' });
    }
  }
};
