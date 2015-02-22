'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SnippetSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  topicTags: {},
  languageTags: {},
  projectTags: {},
  snippet: { type: String, required:true },
  dateModified: { type: Date, required: true },
  createdBy: { type: String, required:true }
});

module.exports = mongoose.model('Snippet', SnippetSchema);