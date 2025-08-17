import { contentService } from '../../lib/content-service';

// src/pages/api/check-content.ts
export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const brand = url.searchParams.get('brand');
  const model = url.searchParams.get('model');
  const year = parseInt(url.searchParams.get('year') || '2025');

  if (!brand || !model) {
    return new Response(JSON.stringify({ error: 'Brand and model are required' }), {
      status: 400,
    });
  }

  try {
    const result = await contentService.checkContentExists(brand, model, year);

    return new Response(
      JSON.stringify({
        exists: result.exists,
        content: result.content,
        brand,
        model,
        year,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error checking content:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
