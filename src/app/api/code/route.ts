'use server';

import { saveCodeSnippet, getCodeSnippetById } from '@/lib/database/data';

import { connectDB } from '@/lib/database/mongo';
export async function POST(req: Request) {
  const { codeId, content, singleViewBurn } = await req.json();

  try {

    
    const alreadyExists = await getCodeSnippetById(codeId);
    
    if (alreadyExists) {
      return new Response(
        'This path is not available, please try a different path',
        {
          status: 400,
        },
      );
    }
    
    await saveCodeSnippet({
      codeShortId: codeId,
      content: content,
      singleViewBurn,
    });
    return new Response(codeId, {
      status: 200,
    });
  } catch (error) {
    return new Response(error as string, {
      status: 500,
    });
  }
}