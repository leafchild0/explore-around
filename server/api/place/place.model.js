'use strict';

import mongoose from 'mongoose';

var PlaceSchema = new mongoose.Schema({
  place_id: String,
  name: String,
  address: String,
  phone: String,
  website: String,
  rating: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

export default mongoose.model('Place', PlaceSchema);
