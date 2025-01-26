'use client';

import { useEffect, useRef, useState } from 'react';
import type { TelegramLoginButtonProps } from '@/telegram';

export const TelegramLoginButton = ({
  botName,
  onAuth,
  buttonSize = 'large',
  radius = 10,
  requestAccess = 'write',
}: TelegramLoginButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    
    script.dataset.telegramLogin = botName;
    script.dataset.size = buttonSize;
    script.dataset.radius = radius.toString();
    script.dataset.onauth = "onTelegramAuth(user)";
    script.dataset.requestAccess = requestAccess;

    window.onTelegramAuth = (user) => {
      onAuth(user);
      delete window.onTelegramAuth;
    };

    containerRef.current.appendChild(script);

    return () => {
      if (script.parentNode === containerRef.current) {
        containerRef.current?.removeChild(script);
      }
      delete window.onTelegramAuth;
    };
  }, [mounted, botName, buttonSize, radius, requestAccess, onAuth]);

  if (!mounted) return null;

  return <div ref={containerRef} />;
};