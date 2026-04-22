import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Qubit';
  const description = searchParams.get('description') || '个人知识分享平台';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f8f8',
          padding: '60px',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '20px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#666666',
              maxWidth: '80%',
            }}
          >
            {description}
          </p>
          <div
            style={{
              display: 'flex',
              marginTop: '40px',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#5566ff',
              }}
            >
              qubit.pages.dev
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}