export const config = {
  env: {
    MONGO_URI: process.env.MONGO_URI ?? 'mongodb://mongodb/storicard',
    RESEND_API_KEY: process.env.RESEND_API_KEY ?? 'RESEND_API',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL ?? '',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD ?? ''
  }
};
