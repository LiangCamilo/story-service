import { registerAs } from '@nestjs/config';

export default registerAs('view', () => ({
  viewBody: process.env.VIEW_BODY,
  viewUrl: process.env.VIEW_URL,
}));
