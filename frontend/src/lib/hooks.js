import { useEffect, useState, useTransition } from 'react';

export function useAsyncData(loader, dependencies) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    startTransition(() => {
      setError('');
      loader()
        .then((result) => {
          if (!cancelled) {
            setData(result);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err.message || '加载失败');
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return {
    data,
    error,
    isPending,
  };
}
