/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/characters              ->  index
 * POST    /api/characters              ->  create
 * GET     /api/characters/:id          ->  show
 * PUT     /api/characters/:id          ->  upsert
 * PATCH   /api/characters/:id          ->  patch
 * DELETE  /api/characters/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Character from './character.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Characters
export function index(req, res) {
  return Character.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Character from the DB
export function show(req, res) {
  return Character.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Character in the DB
export function create(req, res) {
  const newCharacter = Object.assign({}, req.body, {creator: req.user._id}); //add current user to new character
  return Character.create(newCharacter)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Character in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Character.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Character in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Character.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Character from the DB
export function destroy(req, res) {
  return Character.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
