import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDTO } from '../src/auth/auth.dto';
import { CreateFoundationDTO } from '../src/foundation/foundation.dto';
import * as request from 'supertest';
import { app, database } from './constants';

let userToken: string;
const user: RegisterDTO = {
  username: 'usernameF',
  password: 'password',
};

beforeAll(async () => {
  await mongoose.connect(database, { useNewUrlParser: true });
  await mongoose.connection.db.dropDatabase();

  const { data: { token } } = await axios.post('http://localhost:3000/auth/register', {
    username: 'usernameF',
    password: 'password',
  });
  userToken = token;
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe('FOUNDATION',  () => {

  const foundation: CreateFoundationDTO = {
    name: 'test foundation',
    email: 'test email',
    crypto: 'test crypto address',
    address: {
      addr1: 'test addr1',
      addr2: 'test addr2',
      city: 'test city',
      state: 'test state',
      country: 'test country',
      zip: 99999,
    },
  };

  let foundationId: string;

  it('should list all foundations', () => {
    return request(app)
      .get('/foundations')
      .expect(200);
  });

  it('should create foundation', () => {
    return request(app)
      .post('/foundations')
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(foundation)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        foundationId = body._id;
        expect(body.name).toEqual(foundation.name);
        expect(body.email).toEqual(foundation.email);
        expect(body.crypto).toEqual(foundation.crypto);
        expect(body.address).toEqual(foundation.address);
      });
  });

  it('should update foundation', () => {
    return request(app)
      .put(`/foundations/${foundationId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send({
        name: 'new name',
        address: {
          addr1: 'new addr1',
        },
      })
      .expect(({body}) => {
        expect(body.name).not.toEqual(foundation.name);
        expect(body.email).toEqual(foundation.email);
        expect(body.crypto).toEqual(foundation.crypto);
        expect(body.address).not.toEqual(foundation.address);
      })
      .expect(200);
  });

  it('should delete foundation', async () => {
    await axios.delete(`${app}/foundations/${foundationId}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    return request(app)
      .get(`/foundations/${foundationId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
