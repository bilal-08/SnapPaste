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
  // console.log(codeId, 'codeId before finding');
  // console.log(await code.find(),"getting all data")
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
  // const data = await new code({ codeShortId, content, singleViewBurn }).save();
  console.log("DATA IS SAVED TO DATABASE!")
  return data;
}
