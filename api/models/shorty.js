'use strict';

/**
 * api/models/shorty.js
 * 
 * Shorty schema definition (shortened URL).
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Set Mongoose Promise default implementation
mongoose.Promise = global.Promise;

// Define Shorty schema
const shortySchema = new Schema({
  uid: {
    type: String,
    required: true,
    index: {
      unique: true,
      expires: 60 * 60 * 24
    }
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(v);
      },
      message: 'Invalid URL!'
    },
    index: true
  }
}, {
  timestamps: true
});

// Create Shorty model
const Shorty = mongoose.model('Shorty', shortySchema);

module.exports = Shorty;