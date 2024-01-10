const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  file: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = {
  FileModel
}
