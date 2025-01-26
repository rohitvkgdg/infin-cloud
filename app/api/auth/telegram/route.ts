import { NextResponse } from 'next/server';
import type { TelegramUser } from '@/telegram';
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const userData: TelegramUser = await request.json();
    
    // Validate the data with Telegram's API
    const validationResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`
    );
    
    if (!validationResponse.ok) {
      throw new Error('Invalid Telegram bot token');
    }

    // Add your authentication logic here
    // Verify the hash signature, check auth_date, etc.

    return NextResponse.json({ 
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        name: `${userData.first_name} ${userData.last_name || ''}`.trim()
      }
    });
    
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}