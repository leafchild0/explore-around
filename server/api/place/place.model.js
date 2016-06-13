'use strict';

import mongoose from 'mongoose';

var PlaceSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  webSite: String,
  rating: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

export default mongoose.model('Place', PlaceSchema);
