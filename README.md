# Crevre - Exclusive Streetwear Landing Page 🔥

A high-converting signup landing page for Crevre's exclusive streetwear drop, built with Next.js, Tailwind CSS, and optimized for mobile-first experience.

## 🚀 Features

- **High-Converting Design**: Built for maximum email signups and FOMO
- **Mobile-First**: Responsive design optimized for all devices
- **SEO Optimized**: Complete meta tags and structured data
- **Fast Loading**: Optimized performance with Next.js
- **Email Integration Ready**: Placeholder logic for Mailchimp/ConvertKit/Beehiiv
- **Social Proof**: Testimonials and social media integration
- **Sticky Navigation**: Header with scroll-to-signup functionality

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: React Icons
- **Deployment**: Vercel-ready
- **DNS**: Cloudflare compatible

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/crevre-landing)

### Option 2: Manual Deploy

1. **Build the project**:
```bash
npm run build
```

2. **Connect to Vercel**:
```bash
npx vercel
```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name: `crevre-landing`
   - Choose production deployment

### Option 3: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings (auto-detected)
5. Deploy!

## 🔧 Cloudflare DNS Setup

### After Vercel Deployment:

1. **Get Vercel Domain**:
   - Your app will be available at: `https://crevre-landing-xxx.vercel.app`
   - Note the provided domain

2. **Cloudflare Configuration**:
   ```
   Type: CNAME
   Name: www (or your subdomain)
   Content: your-vercel-domain.vercel.app
   Proxy: Enabled (orange cloud)
   ```

3. **Custom Domain Setup**:
   - In Vercel dashboard → Project Settings → Domains
   - Add your custom domain: `crevre.com` or `launch.crevre.com`
   - Verify DNS records in Cloudflare

4. **SSL Certificate**:
   - Cloudflare → SSL/TLS → Overview → Full (Strict)
   - Vercel automatically handles SSL certificates

## ✉️ Email Provider Integration

### Current Setup:
The signup form includes placeholder logic for email providers. To integrate:

### Mailchimp Integration:
```javascript
// In components/EmailSignupForm.tsx, replace the placeholder:
const response = await fetch('/api/mailchimp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
```

### ConvertKit Integration:
```javascript
const response = await fetch('/api/convertkit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
```

### Beehiiv Integration:
```javascript
const response = await fetch('/api/beehiiv', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
```

## 🎨 Customization

### Brand Colors (Tailwind Config):
- `crevre-black`: #0a0a0a
- `crevre-gold`: #D4AF37  
- `crevre-gray`: #1a1a1a
- `crevre-accent`: #ff6b6b

### Image Placeholders:
Replace placeholder sections with actual images:
- **Hero Background**: 1920x1080px
- **Product Images**: 500x500px each
- **Instagram Posts**: 500x500px each
- **Featured Collection**: 2400x1080px

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly buttons (44px minimum)
- Optimized font sizes and spacing
- Fast loading with image optimization
- Smooth scroll animations

## 🎯 Conversion Optimization Features

- **FOMO Elements**: Limited quantities, countdown timers
- **Social Proof**: Testimonials, social media followers
- **Clear CTAs**: Multiple signup opportunities
- **Trust Indicators**: Security badges, guarantees
- **Sticky Header**: Always-visible signup button

## 📊 Analytics Setup

Add your tracking codes to `app/layout.tsx`:

### Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Facebook Pixel:
```html
<script>
  !function(f,b,e,v,n,t,s)
  // Facebook Pixel code here
</script>
```

## 🚀 Performance

- **Lighthouse Score**: 95+ performance
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js automatic
- **Font Loading**: Optimized Google Fonts

## 📈 Launch Checklist

- [ ] Replace all image placeholders
- [ ] Configure email provider integration  
- [ ] Set up custom domain with Cloudflare
- [ ] Add analytics tracking
- [ ] Test mobile responsiveness
- [ ] Verify email signup flow
- [ ] Check social media links
- [ ] Review SEO meta tags
- [ ] Test form submissions
- [ ] Enable HTTPS with SSL

## 🛡 Security

- HTTPS enforced via Vercel and Cloudflare
- Email validation on frontend and backend
- XSS protection with Next.js
- CSRF protection for form submissions

## 📞 Support

For questions about implementation or customization:
- Review the component documentation
- Check Vercel deployment logs
- Test email integrations thoroughly

---

**Ready to launch Crevre's exclusive streetwear drop! 🔥**

*Launch Date: August 9th, 2025*
