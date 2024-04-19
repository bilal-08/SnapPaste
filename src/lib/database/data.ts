import {
  CodeSnippetModel as code,
  type CodeSnippetDocument as ICodeSnippet,
} from './model/codeSnippet.model';
type CodeSnippetDocument = Partial<InstanceType<typeof code>>;
import { connectDB } from '@/lib/database/mongo';
export async function getCodeSnippetById(
  codeId: string,
): Promise<ICodeSnippet> {
  await connectDB();
  const data = await code.findOne({ codeShortId: codeId });
  console.log(code.collection.name);
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
  console.log(code.collection.name);

  return data;
}

export async function getAllCodes() {
  await connectDB();
  const data = await code.find();
  console.log(code.collection.name);
  return data;
}