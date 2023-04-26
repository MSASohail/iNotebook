const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
   /*
   In summary, the user field in the NotesSchema is used to associate a note with a specific user in the users collection, allowing the app to keep track of who created each note and enabling features like filtering notes by user.
   */
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true,

   },
   tag: {
      type: String,
      default: "General"
   },
   date: {
      type: Date,
      default: Date.now
   },
});
module.exports = mongoose.model('notes', NotesSchema)