import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import { app, database } from './constants';
import { CreateCommentDTO } from '../src/comment/comment.dto';

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

describe('COMMENT', () => {
  const commentCat: CreateCommentDTO = {
    text: 'test cat comment',
    meme: false,
  };
  const commentMeme: CreateCommentDTO = {
    text: 'test meme comment',
    meme: true,
  };

  it('should list all comments', () => {
    return request(app)
      .get('/comments')
      .expect(200);
  });

  let catCommentId: string;
  let memeCommentId: string;

  it('should create cat comment', () => {
    return request(app)
      .post(`/comments/create/${catId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(commentCat)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        catCommentId = body._id;
        expect(body.text).toEqual(commentCat.text);
        expect(body.meme).toEqual(false);
        expect(body.catId).toEqual(catId);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should not create cat comment with valid, but non existing Mongo ID', () => {
    return request(app)
      .post(`/comments/create/5cdc2e28de9bb204e54004c0`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(commentCat)
      .expect(({body}) => {
        expect(body.message).toEqual('Cat not found');
      })
      .expect(404);
  });

  it('should create meme comment', () => {
    return request(app)
      .post(`/comments/create/${memeId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(commentMeme)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        memeCommentId = body._id;
        expect(body.text).toEqual(commentMeme.text);
        expect(body.meme).toEqual(true);
        expect(body.memeId).toEqual(memeId);
        expect(body.user.username).toEqual(user.username);
      });
  });

  it('should not create meme comment with valid, but non existing Mongo ID', () => {
    return request(app)
      .post(`/comments/create/5cdc2e28de9bb204e54004c0`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(commentMeme)
      .expect(({body}) => {
        expect(body.message).toEqual('Meme not found');
      })
      .expect(404);
  });

  it('should not create comment with invalid Mongo ID', () => {
    return request(app)
      .post(`/comments/create/123`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send(commentMeme)
      .expect(400);
  });

  it('should update comment', () => {
    return request(app)
      .put(`/comments/${catCommentId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .set('Accept', 'application/json')
      .send({
        text: 'updated cat comment',
      })
      .expect(({body}) => {
        expect(body.text).not.toEqual(commentCat.text);
        expect(body.meme).toEqual(false);
        expect(body.catId).toEqual(catId);
        expect(body.user.username).toEqual(user.username);
      })
      .expect(200);
  });

  it('should delete comment', async () => {
    await axios.delete(`${app}/comments/${catCommentId}`, {
      headers: { Authorization: `Bearer ${userToken}`},
    });

    return request(app)
      .get(`/cats/${catCommentId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
