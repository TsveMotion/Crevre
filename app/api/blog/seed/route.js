import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

// Default blog posts data with full content for seeding - Fun, engaging, and SEO-optimized
const defaultBlogPosts = [
  {
    id: 'fashion-mistakes-everyone-makes',
    title: '7 Fashion Mistakes Everyone Makes (And How to Fix Them Right Now)',
    excerpt: 'From ill-fitting jeans to wearing the wrong bra size, discover the common fashion mistakes that are secretly sabotaging your style – and the simple fixes that will transform your wardrobe overnight.',
    content: `
      <h2>We've All Been There: The Fashion Fail Hall of Fame</h2>
      <p>Let's be honest – we've all had those moments. You know, when you catch your reflection and think, "What was I thinking?" The truth is, even the most stylish people make these mistakes. The difference? They learn from them and bounce back stronger (and more fashionable).</p>
      
      <h3>Mistake #1: The "One Size Fits All" Bra Mentality</h3>
      <p>Here's a shocking stat: 80% of women are wearing the wrong bra size. Yes, 80%! Your bra is literally the foundation of every outfit, yet most of us are walking around in ill-fitting undergarments that make even the most expensive designer dress look frumpy.</p>
      <p><strong>The Fix:</strong> Get professionally fitted. It's life-changing, trust me. When your bra fits perfectly, suddenly every shirt, dress, and blazer looks like it was tailored just for you.</p>
      
      <h3>Mistake #2: Ignoring Your Body's Unique Proportions</h3>
      <p>Instagram fashion is amazing, but here's the thing – just because that influencer looks incredible in wide-leg pants doesn't mean they'll work the same magic on your body type. And that's totally okay!</p>
      <p><strong>The Fix:</strong> Learn your body's unique proportions and dress to highlight your best features. It's not about hiding anything – it's about creating visual harmony that makes you feel confident and look amazing.</p>
      
      <h3>Mistake #3: The "Matching Everything" Trap</h3>
      <p>Remember when matching your bag to your shoes to your belt was the golden rule? Well, that rule is officially retired. Modern style is about creating interesting contrasts and playing with unexpected combinations.</p>
      <p><strong>The Fix:</strong> Try the "one statement piece" rule. Pick one standout item – maybe bold shoes or a colorful bag – and keep everything else neutral. You'll look effortlessly chic instead of overly coordinated.</p>
      
      <h3>Mistake #4: Buying Clothes for Your "Someday" Body</h3>
      <p>You know what I'm talking about. Those jeans that are "almost" the right size, or that dress you'll wear "when you lose 10 pounds." Here's the truth bomb: your current body deserves to look amazing right now.</p>
      <p><strong>The Fix:</strong> Buy clothes that fit and flatter your body today. When you feel comfortable and confident in your clothes, you naturally carry yourself better, and that confidence is the best accessory you can wear.</p>
      
      <h3>Mistake #5: Neglecting the Power of Tailoring</h3>
      <p>This is the secret weapon of every well-dressed person: a good tailor. Even affordable clothes can look expensive when they fit perfectly, and expensive clothes can look cheap when they don't fit well.</p>
      <p><strong>The Fix:</strong> Find a reliable tailor and use them! Hem those pants, take in that waist, adjust those sleeves. Your clothes should work for you, not against you.</p>
      
      <h3>The Bottom Line: Style is Personal</h3>
      <p>The biggest mistake of all? Forgetting that fashion should be fun! Trends come and go, but your personal style should make you feel like the best version of yourself. Don't be afraid to experiment, make mistakes, and find what truly works for you.</p>
      
      <p>Remember, even the most stylish people had to learn these lessons. The key is being open to growth and having fun with the process. After all, getting dressed should be one of the highlights of your day, not a source of stress!</p>
    `,
    image: 'https://picsum.photos/800/600?random=10',
    date: '2024-08-10',
    readTime: '6 min read',
    category: 'Style Tips',
    slug: 'fashion-mistakes-everyone-makes',
    author: 'CREVRE Style Team',
    tags: ['fashion mistakes', 'style tips', 'wardrobe basics', 'fashion advice', 'style guide'],
    seo: {
      title: '7 Fashion Mistakes Everyone Makes (And How to Fix Them) | CREVRE Style Guide',
      description: 'Discover the common fashion mistakes sabotaging your style and learn simple fixes to transform your wardrobe. Expert tips from CREVRE.',
      keywords: ['fashion mistakes', 'style mistakes', 'wardrobe tips', 'fashion advice', 'style guide', 'how to dress better']
    }
  },
  {
    id: 'small-closet-big-style',
    title: 'Small Closet, Big Style: How I Created 30 Outfits from 15 Pieces',
    excerpt: 'Living in a tiny apartment taught me the art of maximizing style with minimal pieces. Discover my foolproof system for creating endless outfit combinations that will make you rethink everything about building a wardrobe.',
    content: `
      <h2>The Great Closet Challenge: When Less Became More</h2>
      <p>Two years ago, I moved into a studio apartment with a closet the size of a phone booth. Dramatic? Maybe. But it forced me to completely rethink my approach to fashion – and honestly, it was the best thing that ever happened to my style.</p>
      
      <p>Here's what I discovered: having fewer clothes doesn't mean having less style. In fact, it's quite the opposite. When you're forced to be strategic about every single piece, you end up with a wardrobe that actually works together.</p>
      
      <h3>The Magic Formula: The 5-4-3-3 Rule</h3>
      <p>After months of trial and error (and a few fashion disasters), I cracked the code:</p>
      <ul>
        <li><strong>5 tops</strong> (mix of basic and statement pieces)</li>
        <li><strong>4 bottoms</strong> (2 pants, 1 skirt, 1 dress that works as a base)</li>
        <li><strong>3 layers</strong> (blazer, cardigan, jacket)</li>
        <li><strong>3 pairs of shoes</strong> (comfortable flats, heels, sneakers)</li>
      </ul>
      
      <p>That's it. Fifteen pieces. But here's where the magic happens – these aren't just any 15 pieces. Every single item had to earn its place by working with at least 3 other pieces in the collection.</p>
      
      <h3>The Color Psychology Game-Changer</h3>
      <p>I built everything around three colors: black, white, and one accent color (mine was burgundy, but yours could be navy, olive, or whatever makes you feel amazing). This wasn't about being boring – it was about being smart.</p>
      
      <p>When everything coordinates, getting dressed becomes effortless. No more standing in front of your closet wondering if your top matches your pants. Everything works with everything else.</p>
      
      <h3>The Outfit Matrix: 30 Looks from 15 Pieces</h3>
      <p>Here's how the math works beautifully:</p>
      <p><strong>Week 1:</strong> Focus on your basics – simple combinations that form your everyday foundation.</p>
      <p><strong>Week 2:</strong> Add your layers – suddenly every basic outfit has a completely different vibe.</p>
      <p><strong>Week 3:</strong> Play with accessories and different styling tricks – tuck, untuck, knot, layer.</p>
      <p><strong>Week 4:</strong> Mix and match in unexpected ways – that dress becomes a skirt with a sweater over it.</p>
      
      <h3>The Unexpected Benefits</h3>
      <p>Beyond just looking put-together, this system changed everything:</p>
      <p>✨ <strong>Decision fatigue disappeared</strong> – I actually started enjoying getting dressed again</p>
      <p>✨ <strong>My style became more consistent</strong> – people started complimenting my "signature look"</p>
      <p>✨ <strong>Shopping became strategic</strong> – no more impulse buys that don't work with anything</p>
      <p>✨ <strong>Quality over quantity</strong> – I could invest in better pieces because I needed fewer</p>
      
      <h3>The Real Secret: It's Not About the Clothes</h3>
      <p>The biggest revelation? Confidence doesn't come from having endless options – it comes from knowing that whatever you put on, you're going to look and feel great. When you're not worried about whether your outfit works, you can focus on actually living your life.</p>
      
      <p>And here's the best part: this system scales. Whether you have 15 pieces or 50, the principles remain the same. Start with a strong foundation of coordinating basics, then add personality pieces that work with your core wardrobe.</p>
      
      <h3>Your Turn: The Challenge</h3>
      <p>I dare you to try this for just one week. Pick 10-15 pieces from your current closet (ones that work well together), and see how many different outfits you can create. I bet you'll surprise yourself – and maybe, like me, you'll discover that less really can be more.</p>
    `,
    image: 'https://picsum.photos/800/600?random=11',
    date: '2024-08-12',
    readTime: '8 min read',
    category: 'Wardrobe Hacks',
    slug: 'small-closet-big-style',
    author: 'CREVRE Style Team',
    tags: ['capsule wardrobe', 'small closet', 'minimalist fashion', 'outfit ideas', 'wardrobe planning'],
    seo: {
      title: 'Small Closet, Big Style: 30 Outfits from 15 Pieces | CREVRE',
      description: 'Learn how to maximize your style with minimal pieces. Create 30 outfits from just 15 pieces with this proven system.',
      keywords: ['small closet style', 'capsule wardrobe', 'minimalist wardrobe', 'outfit ideas', 'wardrobe planning', 'fashion tips']
    }
  },
  {
    id: 'thrift-shopping-secrets',
    title: 'I Found Designer Pieces for $5: My Secret Thrift Shopping Strategy',
    excerpt: 'After years of thrift shopping, I\'ve cracked the code on finding incredible designer pieces for pocket change. From Chanel jackets to vintage Hermès, here\'s my step-by-step guide to thrifting like a pro.',
    content: `
      <h2>The $5 Chanel Jacket That Changed Everything</h2>
      <p>It was a rainy Tuesday morning, and I was running late for work. I almost didn't stop at the little thrift store I'd driven past hundreds of times. But something made me pull over – and I'm so glad I did. Buried between a polyester blazer and a moth-eaten sweater was a genuine Chanel jacket. Price tag: $5.</p>
      
      <p>That jacket didn't just upgrade my wardrobe – it opened my eyes to the incredible world of thrift shopping. Since then, I've found Hermès scarves, vintage Dior, and countless other treasures. And today, I'm sharing every single secret I've learned.</p>
      
      <h3>Timing is Everything: The Thrifter's Schedule</h3>
      <p><strong>Monday mornings are golden.</strong> Most people donate over the weekend, so Monday is when fresh inventory hits the floor. I've found some of my best pieces on Monday mornings when I'm competing with fewer shoppers.</p>
      
      <p><strong>End of season = major scores.</strong> January and August are prime time. People clean out closets after holidays and before school starts. The selection is incredible during these months.</p>
      
      <p><strong>Rainy days are your friend.</strong> Fewer shoppers means more choices for you. Some of my best finds happened on days when I was the only customer in the store.</p>
      
      <h3>The Geography Hack: Location, Location, Location</h3>
      <p>Here's what took me years to figure out: not all thrift stores are created equal. The best finds are in:</p>
      
      <p>🏡 <strong>Affluent neighborhoods:</strong> Wealthy areas have the best donations. It's simple math – people with expensive tastes donate expensive clothes.</p>
      
      <p>🏫 <strong>Near colleges:</strong> Students (especially from well-off families) constantly cycle through clothes. You'll find trendy pieces and sometimes unworn items with tags still on.</p>
      
      <p>⛪ <strong>Church-affiliated stores:</strong> These often get the most generous donations from community members who really care about the cause.</p>
      
      <h3>The Touch Test: Quality Detection in 30 Seconds</h3>
      <p>When you're sorting through hundreds of items, you need a quick way to spot quality. Here's my system:</p>
      
      <p><strong>Feel the fabric first.</strong> Good quality fabric has weight and substance. If it feels thin or scratchy, keep moving.</p>
      
      <p><strong>Check the seams.</strong> Quality pieces have straight, reinforced seams. If the stitching looks wonky, it won't last.</p>
      
      <p><strong>Look at the buttons.</strong> Real designers use substantial buttons that feel heavy and smooth. Cheap buttons are often the giveaway on knock-offs.</p>
      
      <p><strong>Examine the lining.</strong> Quality pieces are fully lined with nice fabric. Cheap clothes often have minimal or scratchy linings.</p>
      
      <h3>The Designer Detective: Spotting Authentic Pieces</h3>
      <p>After finding that Chanel jacket, I became obsessed with authentication. Here's what I learned:</p>
      
      <p><strong>Know your labels.</strong> I keep a mental list of brands worth investigating: Chanel, Hermès, Dior, Saint Laurent, Prada, Gucci, and quality contemporary brands like Theory, Eileen Fisher, and Equipment.</p>
      
      <p><strong>Check the tags.</strong> Authentic designer pieces have specific label details. Do your homework – there are great online resources for authentication guides.</p>
      
      <p><strong>Look for craftsmanship details.</strong> Hand-finished edges, French seams, covered buttons – these details separate the real deals from the wannabes.</p>
      
      <h3>Beyond Designer: Finding Your Personal Goldmine</h3>
      <p>Not every great find has a famous label. Some of my favorite pieces are from brands I'd never heard of but turned out to be incredible:</p>
      
      <p>• <strong>Vintage pieces from the 70s-90s:</strong> The construction is often superior to modern fast fashion</p>
      <p>• <strong>Natural fiber basics:</strong> 100% wool, silk, cashmere, and linen pieces are always worth checking out</p>
      <p>• <strong>Unique vintage accessories:</strong> Belts, scarves, and jewelry that add personality to modern outfits</p>
      
      <h3>The Styling Secret: Making Thrifted Look Intentional</h3>
      <p>The key to looking chic in thrifted pieces? Confidence and styling. Here's how I do it:</p>
      
      <p><strong>Mix high and low.</strong> Pair that vintage designer blazer with modern jeans and fresh white sneakers.</p>
      
      <p><strong>Tailor everything.</strong> A $3 dress that fits perfectly looks more expensive than a $300 dress that doesn't.</p>
      
      <p><strong>Stick to your color palette.</strong> Just because it's a great find doesn't mean it needs to work with your wardrobe. Be selective.</p>
      
      <h3>The Mindset Shift That Changes Everything</h3>
      <p>The biggest secret to successful thrifting isn't about technique – it's about mindset. Go in with specific things in mind (like "I need a black blazer" or "I'm looking for vintage denim"), but stay open to unexpected treasures.</p>
      
      <p>And remember: thrifting is treasure hunting. You won't find something amazing every time, but when you do, it's absolutely magical. That $5 Chanel jacket taught me that the best things in fashion – like in life – often come from the most unexpected places.</p>
      
      <p>So grab your reusable shopping bag and your detective skills. Your wardrobe (and your wallet) will thank you!</p>
    `,
    image: 'https://picsum.photos/800/600?random=12',
    date: '2024-08-08',
    readTime: '10 min read',
    category: 'Shopping Secrets',
    slug: 'thrift-shopping-secrets',
    author: 'CREVRE Style Team',
    tags: ['thrift shopping', 'designer finds', 'vintage fashion', 'budget fashion', 'sustainable fashion'],
    seo: {
      title: 'Thrift Shopping Secrets: Finding Designer Pieces for $5 | CREVRE',
      description: 'Learn professional thrift shopping strategies to find designer pieces for pocket change. Expert tips for scoring luxury fashion deals.',
      keywords: ['thrift shopping tips', 'designer thrift finds', 'vintage shopping', 'budget fashion', 'sustainable shopping', 'fashion deals']
    }
  },
  {
    id: 'fashion-trends-2024',
    title: 'Fashion Trends 2024: What\'s Defining Contemporary Elegance',
    excerpt: 'Explore the fashion trends that are shaping 2024, from sustainable luxury to minimalist streetwear aesthetics.',
    content: `
      <h2>The Evolution of Contemporary Fashion</h2>
      <p>2024 marks a pivotal year in fashion, where sustainability meets luxury and minimalism embraces boldness. As we navigate through this transformative period, several key trends are emerging that define contemporary elegance.</p>
      
      <h3>Sustainable Luxury</h3>
      <p>The fashion industry is witnessing an unprecedented shift towards sustainable practices without compromising on luxury. Brands are embracing eco-friendly materials, ethical production processes, and circular fashion principles. This trend reflects a growing consciousness among consumers who demand both style and responsibility.</p>
      
      <h3>Minimalist Streetwear</h3>
      <p>Street style is evolving into a more refined, minimalist aesthetic. Clean lines, neutral palettes, and understated silhouettes are becoming the hallmarks of contemporary streetwear. This trend bridges the gap between casual and sophisticated, creating versatile pieces that transition seamlessly from day to night.</p>
      
      <h3>Color Psychology in Fashion</h3>
      <p>2024 sees a deeper understanding of how colors influence mood and perception. Fashion enthusiasts are becoming more intentional with their color choices, using hues to express personality and create psychological impact. Earth tones, muted pastels, and bold accent colors are dominating the palette.</p>
      
      <h3>The Future of Fashion</h3>
      <p>As we move forward, fashion continues to evolve as a form of self-expression that balances personal style with global consciousness. The trends of 2024 reflect a mature understanding of fashion's impact on both individual identity and the world at large.</p>
    `,
    image: 'https://picsum.photos/800/600?random=1',
    date: '2024-08-01',
    readTime: '5 min read',
    category: 'Trends',
    slug: 'fashion-trends-2024',
    author: 'CREVRE Team',
    tags: ['fashion', 'trends', '2024', 'contemporary', 'elegance'],
    seo: {
      title: 'Fashion Trends 2024: Contemporary Elegance Guide',
      description: 'Discover the top fashion trends shaping 2024, from sustainable luxury to minimalist streetwear.',
      keywords: ['fashion trends 2024', 'contemporary fashion', 'luxury fashion', 'minimalist style']
    }
  },
  {
    id: 'luxury-fashion-guide',
    title: 'The Ultimate Guide to Luxury Fashion Investment Pieces',
    excerpt: 'Learn how to build a timeless wardrobe with premium pieces that stand the test of time and elevate your style.',
    content: `
      <h2>Building a Timeless Wardrobe</h2>
      <p>Investment pieces form the foundation of a sophisticated wardrobe. These are items that transcend seasonal trends, offering enduring style and exceptional quality that justifies their premium price point.</p>
      
      <h3>Essential Investment Pieces</h3>
      <p><strong>The Perfect Blazer:</strong> A well-tailored blazer is perhaps the most versatile investment piece. Choose a classic silhouette in a neutral color that complements your skin tone.</p>
      
      <p><strong>Quality Footwear:</strong> Invest in shoes that are both comfortable and stylish. Leather loafers, classic pumps, and versatile boots are excellent starting points.</p>
      
      <p><strong>The Little Black Dress:</strong> A timeless silhouette that can be dressed up or down for various occasions. Look for quality fabrics and impeccable construction.</p>
      
      <h3>Quality Over Quantity</h3>
      <p>When building your investment wardrobe, focus on acquiring fewer, higher-quality pieces rather than filling your closet with trendy items. Each piece should serve multiple purposes and coordinate well with other items in your wardrobe.</p>
      
      <h3>Care and Maintenance</h3>
      <p>Proper care ensures your investment pieces last for years. Learn about fabric care, find a trusted tailor for alterations, and store your pieces properly to maintain their shape and quality.</p>
    `,
    image: 'https://picsum.photos/800/600?random=2',
    date: '2024-07-28',
    readTime: '8 min read',
    category: 'Guide',
    slug: 'luxury-fashion-guide',
    author: 'CREVRE Team',
    tags: ['luxury', 'investment', 'wardrobe', 'premium', 'timeless'],
    seo: {
      title: 'Ultimate Luxury Fashion Investment Guide - CREVRE',
      description: 'Build a timeless wardrobe with our guide to luxury fashion investment pieces.',
      keywords: ['luxury fashion', 'investment pieces', 'premium wardrobe', 'timeless fashion']
    }
  },
  {
    id: 'sustainable-fashion',
    title: 'Sustainable Fashion: The Future of Premium Clothing',
    excerpt: 'Discover how luxury brands are embracing sustainability without compromising on quality and style.',
    content: `
      <h2>The Sustainable Revolution</h2>
      <p>The fashion industry is undergoing a fundamental transformation as luxury brands embrace sustainable practices. This shift represents not just a trend, but a necessary evolution towards responsible fashion consumption.</p>
      
      <h3>Eco-Friendly Materials</h3>
      <p>Innovation in sustainable materials is driving change across the industry. From organic cotton and Tencel to recycled polyester and lab-grown leather, brands are finding creative ways to reduce their environmental impact while maintaining quality and aesthetic appeal.</p>
      
      <h3>Ethical Production</h3>
      <p>Sustainable fashion goes beyond materials to encompass fair labor practices, safe working conditions, and transparent supply chains. Luxury brands are increasingly accountable to consumers who demand ethical production methods.</p>
      
      <h3>Circular Fashion</h3>
      <p>The concept of circular fashion promotes designing for longevity, repairability, and recyclability. This approach challenges the traditional linear model of make-use-dispose, creating a more sustainable lifecycle for fashion products.</p>
      
      <h3>Consumer Responsibility</h3>
      <p>Sustainable fashion is a collaborative effort between brands and consumers. Making informed choices, caring for garments properly, and supporting brands with sustainable practices all contribute to a more responsible fashion ecosystem.</p>
    `,
    image: 'https://picsum.photos/800/600?random=3',
    date: '2024-07-25',
    readTime: '6 min read',
    category: 'Sustainability',
    slug: 'sustainable-fashion',
    author: 'CREVRE Team',
    tags: ['sustainable', 'eco-friendly', 'luxury', 'premium', 'future'],
    seo: {
      title: 'Sustainable Fashion: The Future of Premium Clothing',
      description: 'Learn how luxury brands embrace sustainability while maintaining quality and style.',
      keywords: ['sustainable fashion', 'eco-friendly clothing', 'premium sustainability', 'luxury fashion']
    }
  },
  {
    id: 'minimalist-fashion-guide',
    title: 'The Art of Minimalist Fashion: Building a Timeless Wardrobe',
    excerpt: 'Master the art of minimalist fashion with our comprehensive guide to building a curated wardrobe with versatile pieces.',
    content: `
      <h2>Embracing Minimalist Fashion</h2>
      <p>Minimalist fashion is about intentionality, quality, and timeless style. It's a philosophy that values carefully curated pieces over excessive consumption, creating a wardrobe that is both functional and aesthetically pleasing.</p>
      
      <h3>The Capsule Wardrobe</h3>
      <p>A capsule wardrobe consists of a limited number of essential items that work harmoniously together. Each piece serves multiple purposes and can be mixed and matched to create various looks for different occasions.</p>
      
      <h3>Key Principles</h3>
      <p><strong>Quality Over Quantity:</strong> Invest in well-made pieces that will last for years rather than trendy items that quickly go out of style.</p>
      
      <p><strong>Versatility:</strong> Choose pieces that can be dressed up or down and work for multiple occasions.</p>
      
      <p><strong>Neutral Palette:</strong> Build your wardrobe around a cohesive color scheme that allows for easy mixing and matching.</p>
      
      <h3>Building Your Minimalist Wardrobe</h3>
      <p>Start by assessing your lifestyle and identifying your core needs. Focus on acquiring classic pieces like a well-fitted pair of jeans, a crisp white shirt, a quality blazer, and comfortable yet stylish shoes.</p>
      
      <h3>Maintenance and Care</h3>
      <p>Proper care is essential for maintaining a minimalist wardrobe. Learn to care for different fabrics, invest in quality hangers, and establish routines that keep your pieces in excellent condition.</p>
    `,
    image: 'https://picsum.photos/800/600?random=4',
    date: '2024-08-05',
    readTime: '7 min read',
    category: 'Style Guide',
    slug: 'minimalist-fashion-guide',
    author: 'CREVRE Team',
    tags: ['minimalist', 'timeless', 'wardrobe', 'versatile', 'style'],
    seo: {
      title: 'Minimalist Fashion Guide: Build a Timeless Wardrobe',
      description: 'Master minimalist fashion with our guide to building a curated, versatile wardrobe.',
      keywords: ['minimalist fashion', 'timeless wardrobe', 'capsule wardrobe', 'minimal style']
    }
  }
]

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    
    // Check if blog posts already exist
    const existingCount = await db.collection('blogPosts').countDocuments()
    
    if (existingCount > 0) {
      return NextResponse.json({
        success: false,
        message: 'Blog posts already exist. Use DELETE first if you want to reseed.',
        existingCount
      })
    }
    
    // Prepare posts for insertion
    const postsToInsert = defaultBlogPosts.map(post => ({
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
      relatedPosts: []
    }))
    
    // Insert all blog posts
    const result = await db.collection('blogPosts').insertMany(postsToInsert)
    
    // Now update related posts for each blog post
    for (const post of postsToInsert) {
      // Find related posts based on similar tags and category
      const relatedPosts = await db.collection('blogPosts').find({
        $and: [
          { slug: { $ne: post.slug } },
          {
            $or: [
              { category: post.category },
              { tags: { $in: post.tags } }
            ]
          }
        ]
      }).limit(3).toArray()
      
      const relatedSlugs = relatedPosts.map(p => p.slug)
      
      // Update the post with related post slugs
      await db.collection('blogPosts').updateOne(
        { slug: post.slug },
        { $set: { relatedPosts: relatedSlugs } }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog posts seeded successfully',
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds
    })
    
  } catch (error) {
    console.error('Failed to seed blog posts:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to seed blog posts',
      details: error.message
    }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    
    // Delete all blog posts
    const result = await db.collection('blogPosts').deleteMany({})
    
    return NextResponse.json({
      success: true,
      message: 'All blog posts deleted successfully',
      deletedCount: result.deletedCount
    })
    
  } catch (error) {
    console.error('Failed to delete blog posts:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete blog posts'
    }, { status: 500 })
  }
}
