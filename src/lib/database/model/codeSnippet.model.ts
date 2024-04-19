import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';
import { Document } from 'mongoose';
class CodeSnippet {
  @prop({ unique: true })
  codeShortId!: string;

  @prop()
  content!: string;

  @prop({ default: 0 })
  views: number;

  @prop({ default: false })
  singleViewBurn: boolean;
}
export const CodeSnippetModel =
  mongoose.models?.CodeSnippet || getModelForClass(CodeSnippet);
  console.log(mongoose.models)
export type CodeSnippetDocument = Document & CodeSnippet;
