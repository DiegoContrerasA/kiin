import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhook } from '@/types/webhook';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentWebhook = await request.json();
    
    console.log('Webhook received:', body);
    
    return NextResponse.json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
