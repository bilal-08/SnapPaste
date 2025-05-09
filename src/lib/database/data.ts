import {default as code} from './model/codeSnippet.model';
type CodeSnippetDocument = Partial<InstanceType<typeof code>>;
import { connectDB } from '@/lib/database/mongo';
export async function getCodeSnippetById(
  codeId: string,
){
  await connectDB();
  const data = await code.findOne({ codeShortId: codeId });
  if (data) {
    await code.updateOne({ codeShortId: codeId }, { views: data.views + 1 });
    if (data.singleViewBurn && data.views >= 1) {
      await code.deleteOne({ codeShortId: codeId });
    }
  }
  return data;
}

export async function saveCodeSnippet({
  codeShortId,
  content,
  singleViewBurn,
}: CodeSnippetDocument) {
  await connectDB();

  const data = await code.create({ codeShortId, content, singleViewBurn });

  return data;
}

export async function getAllCodes() {
  await connectDB();
  const data = await code.find();
  return data;
}