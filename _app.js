import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICES = {
  single:  process.env.STRIPE_PRICE_SINGLE,
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  annual:  process.env.STRIPE_PRICE_ANNUAL,
  team:    process.env.STRIPE_PRICE_TEAM,
}

const MODES = {
  single:  'payment',
  monthly: 'subscription',
  annual:  'subscription',
  team:    'subscription',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'})

  const { plan, selectedState } = req.body
  if (!PRICES[plan]) return res.status(400).json({error: 'Invalid plan'})

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: MODES[plan],
      line_items: [{price: PRICES[plan], quantity: 1}],
      success_url: `${siteUrl}/tracker?access=paid&plan=${plan}${selectedState ? `&state=${selectedState}` : ''}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      metadata: { plan, selectedState: selectedState || '' },
      allow_promotion_codes: true,
    })
    res.status(200).json({url: session.url})
  } catch (e) {
    console.error('Stripe error:', e)
    res.status(500).json({error: 'Checkout failed'})
  }
}
