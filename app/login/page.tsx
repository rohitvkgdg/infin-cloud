'use client'
import { TelegramLoginButton as DynamicTelegramLogin } from '../components/TelegramLoginButton';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export default function Home() {
  const handleTelegramAuth = (user: TelegramUser) => {
    // Handle authentication logic here
    console.log('Authenticated user:', user);
    // Send user data to your Cloudflare Worker/API
    fetch('/api/auth/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <div className="telegram-login-container">
      <h1>Login with Telegram</h1>
      <DynamicTelegramLogin 
        botName=""
        onAuth={handleTelegramAuth}
        buttonSize="large"
        radius={10}
        requestAccess="write"
      />
    </div>
  );
}