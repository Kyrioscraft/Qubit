import { NextRequest, NextResponse } from 'next/server';

// 确认订阅 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    if (!email || !token) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 模拟确认流程
    // 实际部署时：
    // 1. 验证 token 是否有效
    // 2. 更新订阅状态为已确认
    // 3. 发送欢迎邮件

    console.log(`[Subscribe Confirm] Email confirmed: ${email}`);

    return NextResponse.json({
      success: true,
      message: '订阅确认成功！',
    });
  } catch (error) {
    console.error('[Subscribe Confirm] Error:', error);
    return NextResponse.json(
      { error: '确认失败，请稍后重试' },
      { status: 500 }
    );
  }
}