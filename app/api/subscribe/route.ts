import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: '请提供有效的邮箱地址' },
        { status: 400 }
      );
    }

    const token = Buffer.from(email).toString('base64').slice(0, 8);
    
    return NextResponse.json({
      success: true,
      message: '订阅成功！请检查您的邮箱确认订阅。',
      token,
    });
  } catch {
    return NextResponse.json(
      { error: '订阅失败，请稍后重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: '订阅API',
    methods: ['POST'],
  });
}