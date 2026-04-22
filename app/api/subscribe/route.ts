import { NextRequest, NextResponse } from 'next/server';

// 简化的订阅 API - 实际部署时需要连接邮件服务（如 Resend）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 模拟订阅流程
    // 实际部署时：
    // 1. 检查邮箱是否已订阅
    // 2. 发送确认邮件（含确认链接）
    // 3. 存储到数据库（待确认状态）

    console.log(`[Subscribe] New subscription request: ${email}`);

    return NextResponse.json({
      success: true,
      message: '订阅请求已发送，请检查邮箱确认订阅',
    });
  } catch (error) {
    console.error('[Subscribe] Error:', error);
    return NextResponse.json(
      { error: '订阅失败，请稍后重试' },
      { status: 500 }
    );
  }
}