import {
  CodeSnippetModel as code,
  type CodeSnippetDocument as ICodeSnippet,
} from './model/codeSnippet.model';
type CodeSnippetDocument = Partial<InstanceType<typeof code>>;
import { connectDB } from '@/lib/database/mongo';
connectDB();
export async function getCodeSnippetById(
  codeId: string,
): Promise<ICodeSnippet> {
  console.log(codeId, 'codeId before finding');
  const data = await code.findOne({ codeShortId: codeId });
  console.log(data, 'data in data.ts');
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
  const data = await code.create({ codeShortId, content, singleViewBurn });
  return data;
}
