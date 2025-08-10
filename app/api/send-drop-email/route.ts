import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { emails, subject, htmlContent } = await request.json()

    // Validate input
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'Email list is required' }, { status: 400 })
    }

    if (!subject || !htmlContent) {
      return NextResponse.json({ error: 'Subject and HTML content are required' }, { status: 400 })
    }

    // Prepare sender email
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `Crevre <hello@${process.env.RESEND_DOMAIN}>` 
      : 'Crevre <onboarding@resend.dev>'

    const results = []
    
    // Send emails in batches to avoid rate limits
    for (const email of emails) {
      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: subject,
          html: htmlContent
        })

        if (error) {
          console.error(`Failed to send to ${email}:`, error)
          results.push({ email, status: 'failed', error: error.message })
        } else {
          console.log(`Email sent successfully to ${email}:`, data)
          results.push({ email, status: 'sent', messageId: data?.id })
        }
      } catch (emailError) {
        console.error(`Error sending to ${email}:`, emailError)
        results.push({ email, status: 'failed', error: 'Send failed' })
      }

      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const successCount = results.filter(r => r.status === 'sent').length
    const failureCount = results.filter(r => r.status === 'failed').length

    return NextResponse.json({
      message: `Drop email campaign completed`,
      results: {
        total: emails.length,
        sent: successCount,
        failed: failureCount
      },
      details: results
    }, { status: 200 })

  } catch (error) {
    console.error('Drop email API error:', error)
    return NextResponse.json({ 
      error: 'Failed to send drop email campaign',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
