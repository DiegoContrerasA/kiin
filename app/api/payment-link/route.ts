import { NextRequest, NextResponse } from 'next/server';
import { PaymentLinkRequest, PaymentLinkSuccess } from '@/types/payment-link';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentLinkRequest = await request.json();
    
    console.log('Payment link request received:', body);
    
    const mockResponse: PaymentLinkSuccess = {
      msg: 'Payment link created successfully',
      url: `https://payment.example.com/pay/${Date.now()}`,
      code: 'PAYMENT_LINK_CREATED'
    };
    
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Payment link error:', error);
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
