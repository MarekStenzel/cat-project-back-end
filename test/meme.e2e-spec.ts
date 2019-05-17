import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import { app, database } from './constants';
import { CreateMemeDTO } from '../src/meme/meme.dto';

let userToken: string;
const user: RegisterDTO = {
  username: 'usernameMeme',
  password: 'password',
};

beforeAll(async () => {
  await mongoose.connect(database, { useNewUrlParser: true });
  await mongoose.connection.db.dropDatabase();

  const { data: { token } } = await axios.post('http://localhost:3000/auth/register', {
    username: 'usernameMeme',
    password: 'password',
  });
  userToken = token;
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe('MEME', () => {
  const meme: CreateMemeDTO = {
    name: 'test meme',
  };

  let memeId: string;

  it('should list all memes', () => {
    return request(app)
      .get('/memes')
      .expect(200);
  });

  it('should create meme', () => {
    return request(app)
      .post('/memes')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(meme)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        memeId = body._id;
        expect(body.name).toEqual(meme.name);
        expect(body.popularity).toEqual(0);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should update meme', () => {
    return request(app)
      .put(`/memes/${memeId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send({
        name: 'new name',
      })
      .expect(({body}) => {
        expect(body.name).not.toEqual(meme.name);
        expect(body.popularity).toEqual(0);
        expect(body.user.username).toEqual(user.username);
      })
      .expect(200);
  });

  it('should delete meme', async () => {
    await axios.delete(`${app}/memes/${memeId}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    return request(app)
      .get(`/memes/${memeId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
