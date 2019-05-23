import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import axios from 'axios';
import { RegisterDTO } from '../src/auth/auth.dto';
import { app, database } from './constants';
import * as path from 'path';

let userToken: string;
let catId: string;
let memeId: string;

const user: RegisterDTO = {
  username: 'username',
  password: 'password',
};

beforeAll(async () => {
  await mongoose.connect(database, { useNewUrlParser: true });
  await mongoose.connection.db.dropDatabase();

  const { data: { token } } = await axios.post('http://localhost:3000/auth/register', {
    username: 'username',
    password: 'password',
  });
  userToken = token;

  const { data: { _id } } = await axios.post('http://localhost:3000/cats', {
    name: 'grumpy cat',
    lonely: false,
  }, {
    headers: { Authorization: `Bearer ${userToken}`},
  });

  catId = _id;

  const { data } = await axios.post('http://localhost:3000/memes', {
    name: 'funny meme',
  }, {
    headers: { Authorization: `Bearer ${userToken}`},
  });

  memeId = data._id;
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe('PHOTO', () => {
  let catFileName;
  let memeFileName;

  it('should list all photos', () => {
    return request(app)
      .get('/photos')
      .expect(200);
  });

  it('should upload photo to cat profile', () => {
    const file = 'test/testimage/testcat.jpg';
    const fileSize = fs.statSync(file).size.toString();
    const fileName = path.basename(file);

    return request(app)
      .post(`/photos/create/cat/${catId}`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${userToken}`)
      .attach('image', file)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        expect(body.catId).toEqual(catId);
        expect(body.name).toEqual(fileName);
        expect(body.size).toEqual(fileSize);
        expect(body.filename).toBeDefined();
        catFileName = body.filename;
        expect(body.path).toBe(`uploads/${body.filename}`);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should upload photo to meme profile', () => {
    const file = 'test/testimage/testmeme.jpg';
    const fileSize = fs.statSync(file).size.toString();
    const fileName = path.basename(file);

    return request(app)
      .post(`/photos/create/meme/${memeId}`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${userToken}`)
      .attach('image', file)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        expect(body.memeId).toEqual(memeId);
        expect(body.name).toEqual(fileName);
        expect(body.size).toEqual(fileSize);
        expect(body.filename).toBeDefined();
        memeFileName = body.filename;
        expect(body.path).toBe(`uploads/${body.filename}`);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should list photo profile with cat', () => {

    return request(app)
      .get(`/photos/cat/${catId}`)
      .expect(({body}) => {
        expect(body[0]._id).toBeDefined();
        expect(body[0].catId).toEqual(catId);
        expect(body[0].name).toBeDefined();
        expect(body[0].size).toBeDefined();
        expect(body[0].filename).toBeDefined();
        expect(body[0].path).toBe(`uploads/${body[0].filename}`);
        expect(body[0].user.username).toEqual(user.username);
      });
  });

  it('should list photo profile with meme', () => {

    return request(app)
      .get(`/photos/meme/${memeId}`)
      .expect(({body}) => {
        expect(body[0]._id).toBeDefined();
        expect(body[0].memeId).toEqual(memeId);
        expect(body[0].name).toBeDefined();
        expect(body[0].size).toBeDefined();
        expect(body[0].filename).toBeDefined();
        expect(body[0].path).toBe(`uploads/${body[0].filename}`);
        expect(body[0].user.username).toEqual(user.username);
      });
  });

  it('should delete photos', async () => {

    await axios.delete(`${app}/photos/uploads/${catFileName}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    await axios.delete(`${app}/photos/uploads/${memeFileName}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    return request(app)
      .get(`/photos`)
      .expect(({body}) => {
        expect(body).toEqual([]);
      });
  });
});
