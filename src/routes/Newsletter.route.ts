import { Router } from 'express';
import multer from 'multer';
import { NewsletterController } from '../controllers/Newsletter.controller.js';

const NewsletterRouter = Router();

NewsletterRouter.get('/', NewsletterController.getNewsletters);

NewsletterRouter.get('/:id', NewsletterController.getNewsletterById);

NewsletterRouter.post('/', NewsletterController.createNewsletter);

NewsletterRouter.post('/subscribe/:id', NewsletterController.subscribe);

NewsletterRouter.post('/send/:id', multer().single('newsletter'), NewsletterController.sendNewsletter);

NewsletterRouter.post('/unsubscribe/:id', NewsletterController.unsubscribeById);

NewsletterRouter.post('/unsubscribe', NewsletterController.unsubscribe);

NewsletterRouter.put('/:id', NewsletterController.updateNewsletter);

NewsletterRouter.delete('/:id', NewsletterController.deleteNewsletter);

export default NewsletterRouter;
