'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  hardware: Number
});

export default mongoose.model('Thing', ThingSchema);
