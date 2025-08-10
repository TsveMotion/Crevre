import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }

    // Prepare sender email
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `Crevre <hello@${process.env.RESEND_DOMAIN}>` 
      : 'Crevre <onboarding@resend.dev>'

    // Send welcome email with the same template as subscription
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: '✨ Welcome to Crevre - Your Exclusive Access Awaits',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Crevre</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Helvetica', Arial, sans-serif; background-color: #f8f9fa; }
            .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #2c3e50; padding: 40px 20px; text-align: center; }
            .logo { color: #f39c12; font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .tagline { color: #ecf0f1; font-size: 14px; }
            .content { padding: 40px 30px; }
            .welcome-text { color: #2c3e50; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }
            .message { color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
            .cta-button { display: inline-block; background-color: #f39c12; color: #2c3e50; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { background-color: #ecf0f1; padding: 30px; text-align: center; color: #7f8c8d; font-size: 14px; }
            .social-links { margin: 20px 0; }
            .social-links a { color: #f39c12; text-decoration: none; margin: 0 10px; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">CREVRE</div>
              <div class="tagline">Complete management control</div>
            </div>
            
            <div class="content">
              <div class="welcome-text">Welcome to Crevre, {{first_name}}! 👋</div>
              
              <div class="message">
                Thanks for joining Crevre — you're officially on the list for exclusive drops,
                early access, and special offers.
              </div>
              
              <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 30px 0;">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Here's 10% off your first order</div>
                <div style="font-size: 14px; margin-bottom: 15px;">Use code WELCOME10 at checkout — valid for 14 days.</div>
              </div>
              
              <div class="message">
                We'll keep you updated on new arrivals, behind-the-scenes content, and
                exclusive member-only benefits.
              </div>
              
              <div style="text-align: center;">
                <a href="https://crevre.com" class="cta-button">Start Shopping</a>
              </div>
              
              <div class="message" style="margin-top: 30px; font-size: 14px; color: #7f8c8d;">
                London, UK<br>
                123 Fashion Street • Shoreditch • London E1 6QE<br><br>
                Questions? Just reply to this email or visit our <a href="https://crevre.com/help" style="color: #f39c12;">Help Centre</a>.
              </div>
            </div>
            
            <div class="footer">
              <div>© 2024 Crevre. All rights reserved.</div>
              <div class="social-links">
                <a href="https://instagram.com/crevre">Instagram</a>
                <a href="https://twitter.com/crevre">Twitter</a>
                <a href="https://crevre.com">Website</a>
              </div>
              <div style="margin-top: 20px; font-size: 12px;">
                You're receiving this email because you subscribed to updates from Crevre.<br>
                <a href="{{unsubscribe_url}}" style="color: #f39c12;">Unsubscribe</a> | 
                <a href="https://crevre.com/help" style="color: #f39c12;">Help</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Welcome email send error:', error)
      return NextResponse.json({ 
        error: 'Failed to send welcome email',
        details: error.message
      }, { status: 500 })
    }

    console.log('Welcome email sent successfully:', data)
    return NextResponse.json({
      message: 'Welcome email sent successfully',
      emailId: data?.id
    }, { status: 200 })

  } catch (error) {
    console.error('Welcome email API error:', error)
    return NextResponse.json({ 
      error: 'Failed to send welcome email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
