'use server';

import { saveCodeSnippet, getCodeSnippetById } from '@/lib/database/data';

import { connectDB } from '@/lib/database/mongo';
connectDB();
export async function POST(req: Request) {
  const { codeId, content, singleViewBurn } = await req.json();
  const alreadyExists = await getCodeSnippetById(codeId);

  if (alreadyExists) {
    return new Response(
      'This path is not available, please try a different path',
      {
        status: 400,
      },
    );
  }

  saveCodeSnippet({ codeShortId: codeId, content: content, singleViewBurn });
  return new Response(codeId);
}
