import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    if (!email) {
      return NextResponse.json(
        { error: '请提供邮箱地址' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '已成功取消订阅。',
    });
  } catch {
    return NextResponse.json(
      { error: '取消订阅失败，请稍后重试' },
      { status: 500 }
    );
  }
}