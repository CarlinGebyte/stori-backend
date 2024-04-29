export const config = {
  env: {
    PORT: process.env.PORT ?? 3000,
    MONGO_URI: process.env.MONGO_URI ?? 'mongodb://mongodb/storicard',
    RESEND_API_KEY: process.env.RESEND_API_KEY ?? 'RESEND_API',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL ?? '',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD ?? ''
  }
};
