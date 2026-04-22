'use client';

import { useState, useEffect, useCallback } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const scrollTop = window.scrollY;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollProgress = Math.min(
      Math.max(
        (scrollTop - articleTop + windowHeight) / (articleHeight + windowHeight),
        0
      ),
      1
    );

    setProgress(Math.round(scrollProgress * 100));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  return progress;
}