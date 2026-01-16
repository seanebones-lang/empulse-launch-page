# Testimonial Collection Template

## Email Template for Collecting Testimonials

```
Subject: We'd Love to Feature Your EmPulse Experience!

Hi [Name],

Thanks for being part of the EmPulse beta! We're building something special, and your experience matters.

Would you be willing to share a quick testimonial? We'd love to feature it on our website to help others discover EmPulse.

Here's what we need:
1. A quote about your experience (1-2 sentences)
2. Your name and location (city, state)
3. Your role (e.g., "Independent Artist", "Music Lover", "Beta Tester")
4. Permission to use your quote on our website

Example:
"I've made $47 in my first month on EmPulse. That's more than Spotify paid me in 6 months with 10x the streams."
- Sarah Chen, Independent Artist, Chicago

Thanks for your support!
The EmPulse Team
```

---

## Testimonial Collection Form

**For Artists:**
- How much have you earned on EmPulse?
- How does it compare to other platforms?
- What do you like most about EmPulse?
- Would you recommend it to other artists?

**For Listeners:**
- How has mood-based discovery changed your music experience?
- What do you like about the wellness features?
- How does EmPulse compare to other streaming services?
- Would you recommend it to friends?

---

## Testimonial Format

```typescript
{
  quote: "Your testimonial quote here (1-2 sentences)",
  author: "First Last",
  role: "Independent Artist" | "Music Lover" | "Beta Tester",
  location: "City, State", // Optional
  type: "artist" | "listener",
  verified: true,
}
```

---

## Where to Add Testimonials

**File:** `components/Testimonials.tsx`

Replace the `defaultTestimonials` array with your real testimonials.

---

## Best Practices

1. **Get Permission:** Always ask before using someone's quote
2. **Be Specific:** Numbers and details make testimonials more credible
3. **Mix It Up:** Include both artists and listeners
4. **Keep It Real:** Authentic testimonials convert better than generic ones
5. **Update Regularly:** Add new testimonials as you grow

---

## Example Testimonials (Replace with Real Ones)

### Artist Testimonials
```
"I've made $47 in my first month on EmPulse. That's more than Spotify paid me in 6 months with 10x the streams."
- Sarah Chen, Independent Artist, Chicago

"Finally, a platform that treats artists like partners, not products. The real-time dashboard is a game-changer."
- The Midnight Echoes, Indie Band, Portland

"The transparency is incredible. I know exactly what I'm earning, when I'm getting paid, and I have full control over my catalog."
- DJ Nova, Electronic Producer, Los Angeles
```

### Listener Testimonials
```
"The mood slider changed how I discover music. I found three new favorite artists this week that I never would have found on Spotify."
- Marcus Johnson, Music Lover, Austin

"I love that I can track my mood and discover music that actually matches how I'm feeling. It's like therapy through music."
- Emma Rodriguez, Beta Tester, New York
```

---

**Action:** Send this template to 10-15 beta users and collect their testimonials!
