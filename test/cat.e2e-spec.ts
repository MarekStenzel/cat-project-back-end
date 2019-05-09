import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDTO } from '../src/auth/auth.dto';
import { CreateCatDTO } from '../src/cat/cat.dto';
import * as request from 'supertest';
import { app } from './constants';

let userToken: string;
const user: RegisterDTO = {
  username: 'username',
  password: 'password',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();

  const { data: { token } } = await axios.post('http://localhost:3000/auth/register', {
    username: 'username',
    password: 'password',
  });
  userToken = token;
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe('CAT', () => {
  const cat: CreateCatDTO = {
    name: 'test cat',
  };

  let catId: string;

  it('should list all cats', () => {
    return request(app)
      .get('/cats')
      .expect(200);
  });

  it('should create cat', () => {
    return request(app)
      .post('/cats')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(cat)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        catId = body._id;
        expect(body.name).toEqual(cat.name);
        expect(body.lonely).toEqual(false);
        expect(body.popularity).toEqual(0);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should update cat', () => {
    return request(app)
      .put(`/cats/${catId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send({
        name: 'new name',
      })
      .expect(({body}) => {
        expect(body.name).not.toEqual(cat.name);
        expect(body.lonely).toEqual(false);
        expect(body.popularity).toEqual(0);
        expect(body.user.username).toEqual(user.username);
      })
      .expect(200);
  });

  it('should delete cat', async () => {
    await axios.delete(`${app}/cats/${catId}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    return request(app)
      .get(`/cats/${catId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
