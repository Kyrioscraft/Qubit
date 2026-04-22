'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch (err) {
      setStatus('error');
      setMessage('订阅失败，请稍后重试');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          邮箱地址
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-subtle)]"
          required
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={status === 'loading'}
        disabled={status === 'loading' || status === 'success'}
      >
        订阅
      </Button>

      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
          {message}
        </p>
      )}

      <p className="text-xs text-[var(--color-text-muted)]">
        订阅后，每当有新文章发布，你将收到邮件通知。你可以随时取消订阅。
      </p>
    </form>
  );
}