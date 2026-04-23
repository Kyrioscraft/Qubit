import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Qubit';
  const type = searchParams.get('type') || 'article';

  const defaultOgImage = '/og/default.png';
  
  return NextResponse.redirect(new URL(defaultOgImage, request.url));
}