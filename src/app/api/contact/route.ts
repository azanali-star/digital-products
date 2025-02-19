import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Store message in database
    await db.collection('contact_messages').insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      status: 'new'
    });

    // In a real application, you might want to:
    // 1. Send an email notification to admin
    // 2. Send a confirmation email to the user
    // 3. Integrate with a CRM system

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
