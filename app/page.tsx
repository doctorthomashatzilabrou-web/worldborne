'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Linkedin,
  ChevronRight,
  CheckCircle2,
  Mail,
  User,
  Building2,
  MessageSquare,
  Send,
  Star,
  Shield,
  Clock,
  TrendingUp,
  FileText,
  Search,
  Award,
  BookOpen,
  AlertCircle,
} from 'lucide-react'

// ─── LOGO ──────────────────────────────────────────────────────────────────────
function WorldborneLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Worldborne Medical logo"
    >
      <circle cx="20" cy="20" r="20" fill="#2563eb" />
      {/* Globe — longitude ellipse */}
      <ellipse cx="20" cy="20" rx="9.5" ry="17" stroke="white" strokeWidth="1.1" opacity="0.5" />
      {/* Globe — equator arc */}
      <path
        d="M3 20 Q11.5 15.5 20 20 Q28.5 24.5 37 20"
        stroke="white"
        strokeWidth="1.1"
        opacity="0.5"
      />
      {/* Globe — outer ring */}
      <circle cx="20" cy="20" r="16.5" stroke="white" strokeWidth="1.1" opacity="0.4" />
      {/* Medical cross */}
      <path
        d="M20 13.5v13M13.5 20h13"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── DATA ───────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    tier: 'Pilot',
    tagline: 'Start with confidence',
    description: '3-article physician review — the fastest way to see what clinical oversight does for your content.',
    price: '$900',
    unit: 'one-time',
    volume: '3 articles',
    features: ['3 articles reviewed', '48hr turnaround', 'MD annotation & corrections', 'Citation audit', 'Clinical accuracy certificate'],
    highlight: false,
    cta: 'Start Pilot',
  },
  {
    tier: 'Top 10',
    tagline: 'Protect your best performers',
    description: 'Your highest-traffic pages reviewed by a board-certified MD — upgrade the content Google scrutinises most.',
    price: '$3,000',
    unit: 'one-time',
    volume: '10 articles',
    features: ['10 articles reviewed', 'Priority queue', 'Full clinical report per article', 'SEO + E-E-A-T notes', 'Content strategy call'],
    highlight: false,
    cta: 'Get Top 10 Review',
  },
  {
    tier: 'Top 25',
    tagline: 'Most popular',
    description: 'Comprehensive site audit for publishers serious about YMYL authority. Includes a remediation roadmap.',
    price: '$7,500',
    unit: 'one-time',
    volume: '25 articles',
    features: ['25 articles reviewed', 'E-E-A-T scorecard per page', 'Remediation guide', 'Topical gap analysis', 'Dedicated strategy call', 'White-label ready'],
    highlight: true,
    cta: 'Get Top 25 Review',
  },
  {
    tier: 'Monthly Retainer',
    tagline: 'Ongoing editorial oversight',
    description: 'Embedded physician oversight for high-volume publishers and agencies. 50+ articles per month under a dedicated MD.',
    price: '$15,000',
    unit: '/month',
    volume: '50+ articles/mo',
    features: ['50+ articles/month', 'Dedicated MD reviewer', 'Monthly editorial report', 'Agency white-label', 'Slack channel access', 'Quarterly strategy session'],
    highlight: false,
    cta: 'Enquire About Retainer',
  },
]

const STATS = [
  { value: '500+', label: 'Articles Reviewed', icon: FileText },
  { value: '48hr', label: 'Avg. Turnaround', icon: Clock },
  { value: '100%', label: 'MD-Certified', icon: Shield },
  { value: '10+', label: 'Years in Practice', icon: Award },
]

const CREDENTIALS = [
  { icon: Award, label: 'Board-Certified MD' },
  { icon: Search, label: 'YMYL / E-E-A-T Specialist' },
  { icon: BookOpen, label: 'Health Publishing Expert' },
  { icon: TrendingUp, label: 'Medical SEO Strategist' },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-3 sm:p-4 md:p-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

        {/* ══════════════════════════════
            1. HEADER
        ══════════════════════════════ */}
        <header className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <WorldborneLogo size={38} />
            <div>
              <div className="text-slate-900 font-bold text-lg leading-tight tracking-tight">
                Worldborne Medical
              </div>
              <div className="text-slate-400 text-xs font-medium hidden sm:block">
                Physician-Led Clinical Content Review
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap"
          >
            Get Free Audit
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </header>

        {/* ══════════════════════════════
            2a. HERO LEFT — Value Prop
        ══════════════════════════════ */}
        <div className="bg-slate-900 rounded-2xl p-7 sm:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[400px]">
          <div>
            <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-6 h-px bg-blue-400 block" />
              What We Do
            </span>
            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight mb-5">
              Medical content
              <br />
              held to a genuine
              <br />
              <span className="text-blue-400">clinical standard.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Worldborne Medical embeds board-certified physician oversight into your content pipeline — protecting your audience, your authority, and your search rankings in YMYL verticals.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {['E-E-A-T', 'YMYL', 'MD-Reviewed', '48hr Turnaround', 'Board-Certified'].map(tag => (
              <span key={tag} className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            2b. HERO RIGHT — Profile
        ══════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center gap-5 text-center min-h-[340px]">
          {/* Profile photo placeholder — replace with <Image src="/photo.jpg" … /> */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 select-none">
              <span className="text-white font-bold text-4xl sm:text-5xl tracking-tight">TH</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 rounded-full p-1.5 shadow">
              <Shield className="w-4 h-4 text-amber-900" />
            </div>
          </div>
          <div>
            <p className="text-slate-900 font-bold text-xl tracking-tight">Dr. Thomas Hatzilabrou</p>
            <p className="text-blue-600 text-sm font-semibold mt-0.5">MD · Founder, Worldborne Medical</p>
            <p className="text-slate-500 text-xs mt-1">Board-Certified Physician</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2">
                <Icon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span className="text-slate-600 text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            3. STATS STRIP — Full Width
        ══════════════════════════════ */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x divide-slate-100">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1 px-2">
              <Icon className="w-5 h-5 text-blue-500 mb-1" />
              <span className="text-slate-900 font-bold text-2xl sm:text-3xl tracking-tight">{value}</span>
              <span className="text-slate-500 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════
            4a. PORTFOLIO LINK
        ══════════════════════════════ */}
        <a
          href="#"
          className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center group hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
        >
          <div className="flex-1">
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Work</p>
            <p className="text-slate-900 font-bold text-2xl sm:text-3xl tracking-tight group-hover:text-blue-600 transition-colors">
              Portfolio
            </p>
            <p className="text-slate-500 text-sm mt-1">Case studies &amp; published reviews</p>
          </div>
          <div className="w-11 h-11 bg-slate-900 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ml-4">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </a>

        {/* ══════════════════════════════
            4b. BIO
        ══════════════════════════════ */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-center gap-4">
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">About Dr. Hatzilabrou</p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Dr. Thomas Hatzilabrou is a board-certified physician with over a decade of clinical practice and a specialisation in health publishing, medical SEO, and YMYL content strategy. After observing the growing gap between what digital publishers produce and what clinical accuracy demands, he founded Worldborne Medical to give health, legal, and agency publishers direct access to credentialed physician oversight — the kind of genuine expertise Google's E-E-A-T guidelines were written to reward.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            His reviews combine current medical literature, evidence-based practice, and a clear understanding of how search quality raters evaluate YMYL content — delivering annotated deliverables that are both clinically correct and search-ready.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
            {[
              { icon: Shield, text: 'Board Certified' },
              { icon: TrendingUp, text: 'YMYL Authority' },
              { icon: Clock, text: '10+ Yrs Practice' },
              { icon: BookOpen, text: 'Health Publishing' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 text-slate-500 text-xs bg-white border border-slate-200 rounded-full px-3 py-1">
                <Icon className="w-3 h-3 text-blue-500" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            5a. LEAD GEN — Contact Form
        ══════════════════════════════ */}
        <div id="contact" className="bg-blue-600 rounded-2xl p-6 sm:p-8 flex flex-col scroll-mt-4">
          {/* Hook */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-900" />
              No Cost · No Obligation
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              Free Clinical
              <br />
              <span className="text-amber-300">Audit</span>
            </h2>
            <p className="text-blue-200 text-sm mt-2.5 leading-relaxed max-w-sm">
              Submit one article for a complimentary physician review. See exactly what board-certified clinical oversight looks like before you commit to a paid tier.
            </p>
          </div>

          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white/10 rounded-xl p-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-amber-300" />
              <div>
                <p className="text-white font-bold text-xl">Request Received</p>
                <p className="text-blue-200 text-sm mt-1">
                  Dr. Hatzilabrou's team will be in touch within one business day at{' '}
                  <span className="text-white font-medium">{formData.email}</span>.
                </p>
              </div>
              <a
                href="mailto:contact@worldborne.com"
                className="text-blue-200 hover:text-white text-xs underline underline-offset-2 transition-colors"
              >
                Or email contact@worldborne.com directly
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/15 text-white placeholder-blue-300/70 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="bg-white/15 text-white placeholder-blue-300/70 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" /> Company / Website
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="healthsite.com"
                  className="bg-white/15 text-white placeholder-blue-300/70 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                />
              </label>
              <label className="flex flex-col gap-1 flex-1">
                <span className="text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" /> Tell us about your content *
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your site, content type, and what you'd like reviewed…"
                  rows={4}
                  required
                  className="bg-white/15 text-white placeholder-blue-300/70 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all resize-none"
                />
              </label>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-200 text-xs bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  Something went wrong. Please email us at contact@worldborne.com directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-1 flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-amber-300 hover:text-amber-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-bold text-sm rounded-xl px-4 py-3 shadow-sm"
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Claim My Free Audit
                  </>
                )}
              </button>

              <p className="text-blue-300/70 text-xs text-center">
                Or email directly:{' '}
                <a href="mailto:contact@worldborne.com" className="text-blue-200 hover:text-white underline underline-offset-2 transition-colors">
                  contact@worldborne.com
                </a>
              </p>
            </form>
          )}
        </div>

        {/* ══════════════════════════════
            5b. SERVICES
        ══════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col">
          <div className="mb-5">
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Services &amp; Pricing</p>
            <h2 className="text-slate-900 text-2xl sm:text-3xl font-bold tracking-tight">Choose Your Tier</h2>
            <p className="text-slate-500 text-sm mt-1">All tiers include an MD signature, citation audit, and clinical accuracy certificate.</p>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {SERVICES.map((svc) => (
              <div
                key={svc.tier}
                className={`rounded-xl border transition-all ${
                  svc.highlight
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-bold text-base ${svc.highlight ? 'text-white' : 'text-slate-900'}`}>
                          {svc.tier}
                        </span>
                        {svc.highlight && (
                          <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                            Most Popular
                          </span>
                        )}
                        <span className={`text-xs font-medium ${svc.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                          {svc.volume}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 leading-snug ${svc.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                        {svc.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`font-bold text-xl ${svc.highlight ? 'text-amber-300' : 'text-blue-600'}`}>
                        {svc.price}
                      </span>
                      <p className={`text-xs ${svc.highlight ? 'text-blue-300' : 'text-slate-400'}`}>{svc.unit}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {svc.features.map(f => (
                      <span
                        key={f}
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          svc.highlight
                            ? 'bg-white/15 text-blue-100'
                            : 'bg-white border border-slate-200 text-slate-600'
                        }`}
                      >
                        <ChevronRight className="w-2.5 h-2.5 flex-shrink-0" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-4 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors font-semibold text-sm rounded-xl px-4 py-2.5"
          >
            Start with the Free Audit
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ══════════════════════════════
            6. FOOTER
        ══════════════════════════════ */}
        <footer className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <WorldborneLogo size={28} />
            <span className="text-slate-400 text-sm">
              © 2025 Worldborne Medical. All rights reserved.
            </span>
          </div>
          <a
            href="https://www.linkedin.com/company/worldborne/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Worldborne Medical on LinkedIn"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <span className="text-xs font-semibold group-hover:text-blue-600 transition-colors hidden sm:inline">
              Connect on LinkedIn
            </span>
            <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </a>
        </footer>

      </div>
    </main>
  )
}
