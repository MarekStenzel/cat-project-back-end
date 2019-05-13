import 'dotenv/config';

const URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

export const app = `http://localhost:${process.env.PORT}`;
export const database = URI;
