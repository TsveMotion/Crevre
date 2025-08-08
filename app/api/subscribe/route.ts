import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { EmailSubscriber, EmailSubscriberDoc, COLLECTIONS } from '@/lib/models'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
        // Send welcome email even for existing subscribers (useful for testing)
        console.log(`🔄 Starting email process for existing subscriber: ${email}`)
        try {
          console.log(`📤 About to call sendWelcomeEmail function for existing subscriber...`)
          await sendWelcomeEmail(email)
          console.log(`✅ Welcome email successfully sent to existing subscriber: ${email}`)
        } catch (emailError) {
          console.error(`❌ Failed to send welcome email to existing subscriber ${email}:`, emailError)
          console.error(`❌ Error details:`, {
            message: emailError?.message,
            stack: emailError?.stack,
            name: emailError?.name
          })
        }
        
        return NextResponse.json(
          { message: 'Email already subscribed! Welcome email sent again.' },
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
              lastUpdated: new Date(),
              source 
            } 
          }
        )
        
        // Send welcome email for reactivated user
        console.log(`🔄 Starting email process for reactivated user: ${email}`)
        try {
          console.log(`📤 About to call sendWelcomeEmail function for reactivated user...`)
          await sendWelcomeEmail(email)
          console.log(`✅ Welcome email successfully sent to reactivated user: ${email}`)
        } catch (emailError) {
          console.error(`❌ Failed to send welcome email to reactivated user ${email}:`, emailError)
          console.error(`❌ Error details:`, {
            message: emailError?.message,
            stack: emailError?.stack,
            name: emailError?.name
          })
        }
        
        return NextResponse.json(
          { message: 'Welcome back! Subscription reactivated and email sent.' },
          { status: 200 }
        )
      }
    }

    // Create new subscriber
    const newSubscriber: EmailSubscriberDoc = {
      email,
      subscribedAt: new Date(),
      lastUpdated: new Date(),
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
    console.log(`🔄 Starting email process for: ${email}`)
    try {
      console.log(`📤 About to call sendWelcomeEmail function...`)
      await sendWelcomeEmail(email)
      console.log(`✅ Welcome email successfully sent to: ${email}`)
    } catch (emailError) {
      console.error(`❌ Failed to send welcome email to ${email}:`, emailError)
      console.error(`❌ Error details:`, {
        message: emailError?.message,
        stack: emailError?.stack,
        name: emailError?.name
      })
      // Don't fail the entire subscription if email fails
      // The user is still subscribed to the database
    }

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

// Email sending function using Resend API
async function sendWelcomeEmail(email: string) {
  try {
    // Use custom domain if available, otherwise fall back to default Resend domain
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `Crevre <hello@${process.env.RESEND_DOMAIN}>` 
      : 'Crevre <onboarding@resend.dev>'
    
    console.log(`📧 Attempting to send email from: ${fromEmail} to: ${email}`)
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: '✨ Welcome to Crevre - Your Exclusive Access Awaits',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Crevre</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #fefefe; font-family: 'Inter', system-ui, -apple-system, sans-serif; line-height: 1.6; letter-spacing: -0.01em;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: #1a1a1a; padding: 24px; text-align: center; border-bottom: 2px solid #D4AF37;">
              <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #D4AF37; margin: 0; letter-spacing: 0.05em;">
                CREVRE
              </h1>
              <p style="color: #ffffff; font-size: 14px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 0.1em;">
                Premium Fashion Collection
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 32px;">
              <h2 style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: #1a1a1a; margin: 0 0 24px 0; text-align: center;">
                Welcome to Our Exclusive Community
              </h2>
              
              <p style="color: #4a4a4a; font-size: 16px; margin: 0 0 24px 0; text-align: center;">
                Thank you for subscribing! You're now part of a select group that gets first access to our luxury fashion collection launching <strong style="color: #D4AF37;">September 1st, 2025</strong>.
              </p>

              <!-- Benefits Section -->
              <div style="background-color: #f8f8f8; border-left: 4px solid #D4AF37; padding: 24px; margin: 32px 0;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px 0;">
                  Your Exclusive Benefits:
                </h3>
                <ul style="color: #4a4a4a; font-size: 15px; margin: 0; padding: 0 0 0 20px;">
                  <li style="margin-bottom: 8px;">🌟 <strong>48-hour early access</strong> to new collections</li>
                  <li style="margin-bottom: 8px;">💎 <strong>Member-only pricing</strong> and exclusive privileges</li>
                  <li style="margin-bottom: 8px;">📸 <strong>Behind-the-scenes content</strong> from our design process</li>
                  <li style="margin-bottom: 8px;">🔔 <strong>Launch notifications</strong> before anyone else</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="https://crevre.com" style="display: inline-block; background-color: #D4AF37; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; letter-spacing: 0.025em; text-transform: uppercase; transition: background-color 0.3s ease;">
                  Explore Crevre
                </a>
              </div>

              <!-- Social Links -->
              <div style="text-align: center; margin: 32px 0; padding-top: 32px; border-top: 1px solid #e5e5e5;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0;">
                  Follow us for the latest updates:
                </p>
                <a href="https://www.instagram.com/crevre_wear/" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 14px; margin: 0 8px;">
                  Instagram
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #1a1a1a; padding: 24px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                © 2025 Crevre. All rights reserved.
              </p>
              <p style="color: #6b7280; font-size: 11px; margin: 0;">
                You received this email because you subscribed to our launch list.
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend API error:', error)
      throw new Error('Failed to send welcome email')
    }

    console.log('Welcome email sent successfully:', data?.id)
    return data
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}
