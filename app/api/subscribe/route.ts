import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { EmailSubscriber, EmailSubscriberDoc, COLLECTIONS } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'landing-page' } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const subscribers = db.collection<EmailSubscriberDoc>(COLLECTIONS.SUBSCRIBERS)

    // Check if email already exists
    const existingSubscriber = await subscribers.findOne({ email })
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { message: 'Email already subscribed!' },
          { status: 200 }
        )
      } else {
        // Reactivate unsubscribed user
        await subscribers.updateOne(
          { email },
          { 
            $set: { 
              status: 'active', 
              subscribedAt: new Date(),
              source 
            } 
          }
        )
        return NextResponse.json(
          { message: 'Welcome back! Subscription reactivated.' },
          { status: 200 }
        )
      }
    }

    // Create new subscriber
    const newSubscriber: EmailSubscriberDoc = {
      email,
      subscribedAt: new Date(),
      source,
      status: 'active',
      preferences: {
        earlyAccess: true,
        memberUpdates: true,
        collectionLaunches: true
      }
    }

    const result = await subscribers.insertOne(newSubscriber)

    // Send welcome email (you can integrate with your preferred email service)
    await sendWelcomeEmail(email)

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        subscriberId: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// Email sending function - integrate with your preferred service
async function sendWelcomeEmail(email: string) {
  // Placeholder for email integration
  // You can integrate with:
  // - Resend
  // - SendGrid
  // - Mailgun
  // - NodeMailer with SMTP
  
  console.log(`Welcome email would be sent to: ${email}`)
  
  // Example with a simple fetch to external email service:
  /*
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'welcome@crevre.com',
        to: email,
        subject: '✨ Welcome to Crevre - Your Exclusive Access Awaits',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #D4AF37; text-align: center;">Welcome to Crevre</h1>
            <p>Thank you for joining our exclusive community! You're now part of a select group that gets:</p>
            <ul>
              <li>48-hour early access to new collections</li>
              <li>Member-only pricing and privileges</li>
              <li>Exclusive behind-the-scenes content</li>
            </ul>
            <p style="text-align: center;">
              <a href="https://crevre.com" style="background-color: #D4AF37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                Visit Crevre
              </a>
            </p>
          </div>
        `
      })
    })
  } catch (error) {
    console.error('Email sending failed:', error)
  }
  */
}
