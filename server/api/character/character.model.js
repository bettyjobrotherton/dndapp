'use strict';

import mongoose from 'mongoose';

var CharacterSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Character', CharacterSchema);
