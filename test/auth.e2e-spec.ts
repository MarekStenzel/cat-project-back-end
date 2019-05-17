import * as request from 'supertest';
import { LoginDTO, RegisterDTO } from '../src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { app, database } from './constants';

beforeAll(async () => {
  await mongoose.connect(database, { useNewUrlParser: true });
  await mongoose.connection.db.dropDatabase();
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  const user: RegisterDTO | LoginDTO = {
    username: 'username',
    password: 'password',
  };

  it('should register user', () => {

    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({body}) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {

    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({body}) => {
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login', () => {

    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({body}) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
