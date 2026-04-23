import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/content/search';
import type { SearchResult } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      { error: '搜索词至少需要2个字符' },
      { status: 400 }
    );
  }

  try {
    const results = search(query) as SearchResult[];
    
    return NextResponse.json({
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: '搜索失败，请稍后重试' },
      { status: 500 }
    );
  }
}