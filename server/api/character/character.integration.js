'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCharacter;

describe('Character API:', function() {
  describe('GET /api/characters', function() {
    var characters;

    beforeEach(function(done) {
      request(app)
        .get('/api/characters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          characters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(characters).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/characters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/characters')
        .send({
          name: 'New Character',
          info: 'This is the brand new character!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCharacter = res.body;
          done();
        });
    });

    it('should respond with the newly created character', function() {
      expect(newCharacter.name).to.equal('New Character');
      expect(newCharacter.info).to.equal('This is the brand new character!!!');
    });
  });

  describe('GET /api/characters/:id', function() {
    var character;

    beforeEach(function(done) {
      request(app)
        .get(`/api/characters/${newCharacter._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          character = res.body;
          done();
        });
    });

    afterEach(function() {
      character = {};
    });

    it('should respond with the requested character', function() {
      expect(character.name).to.equal('New Character');
      expect(character.info).to.equal('This is the brand new character!!!');
    });
  });

  describe('PUT /api/characters/:id', function() {
    var updatedCharacter;

    beforeEach(function(done) {
      request(app)
        .put(`/api/characters/${newCharacter._id}`)
        .send({
          name: 'Updated Character',
          info: 'This is the updated character!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCharacter = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCharacter = {};
    });

    it('should respond with the updated character', function() {
      expect(updatedCharacter.name).to.equal('Updated Character');
      expect(updatedCharacter.info).to.equal('This is the updated character!!!');
    });

    it('should respond with the updated character on a subsequent GET', function(done) {
      request(app)
        .get(`/api/characters/${newCharacter._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let character = res.body;

          expect(character.name).to.equal('Updated Character');
          expect(character.info).to.equal('This is the updated character!!!');

          done();
        });
    });
  });

  describe('PATCH /api/characters/:id', function() {
    var patchedCharacter;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/characters/${newCharacter._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Character' },
          { op: 'replace', path: '/info', value: 'This is the patched character!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCharacter = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCharacter = {};
    });

    it('should respond with the patched character', function() {
      expect(patchedCharacter.name).to.equal('Patched Character');
      expect(patchedCharacter.info).to.equal('This is the patched character!!!');
    });
  });

  describe('DELETE /api/characters/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/characters/${newCharacter._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when character does not exist', function(done) {
      request(app)
        .delete(`/api/characters/${newCharacter._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
