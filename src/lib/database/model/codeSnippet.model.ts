import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const codeSnippetSchema = new Schema({
  codeShortId: { type: String, unique: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  singleViewBurn: { type: Boolean, default: false }
});

const CodeSnippetModel = mongoose.models.CodeSnippet || model('CodeSnippet', codeSnippetSchema);

export default CodeSnippetModel;
