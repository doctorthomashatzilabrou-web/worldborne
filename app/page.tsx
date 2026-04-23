'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Linkedin,
  Stethoscope,
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
} from 'lucide-react'

const SERVICES = [
  {
    tier: 'Pilot',
    description: 'Single article or page review',
    price: '$XXX',
    features: ['1 article', '48hr turnaround', 'MD annotation', 'Citation check'],
  },
  {
    tier: 'Top 10',
    description: 'Review your top-performing pages',
    price: '$X,XXX',
    features: ['10 articles', 'Priority queue', 'Full clinical report', 'SEO notes'],
  },
  {
    tier: 'Top 25',
    description: 'Comprehensive site content audit',
    price: '$X,XXX',
    features: ['25 articles', 'Content strategy call', 'E-E-A-T scorecard', 'Remediation guide'],
    highlight: true,
  },
  {
    tier: 'Retainer',
    description: 'Ongoing physician editorial oversight',
    price: 'Custom',
    features: ['Unlimited reviews', 'Dedicated MD', 'Monthly reporting', 'Agency white-label'],
  },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-slate-100 p-3 sm:p-4 md:p-5">
      {/* ─── BENTO GRID ─── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

        {/* ══ 1. HEADER ══ */}
        <header className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-slate-900 font-semibold text-lg tracking-tight">Worldborne Medical</span>
              <span className="hidden sm:inline text-slate-400 text-sm ml-3 font-normal">Physician-Led Clinical Review</span>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-xl"
          >
            Get Free Audit
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </header>

        {/* ══ 2a. HERO LEFT — Value Prop ══ */}
        <div className="bg-slate-900 rounded-2xl p-7 sm:p-9 flex flex-col justify-between min-h-[300px] md:min-h-[380px]">
          <div>
            <span className="inline-block text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
              What We Do
            </span>
            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-5">
              Clinical oversight
              <br />
              for the content
              <br />
              <span className="text-blue-400">you publish.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Board-certified physician review embedded into your content pipeline — protecting your audience, your authority, and your search rankings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8">
            {['E-E-A-T', 'YMYL', 'MD-Reviewed', '48hr Turnaround'].map(tag => (
              <span key={tag} className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ══ 2b. HERO RIGHT — Profile Image ══ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
          {/* Square image placeholder */}
          <div className="flex-1 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 min-h-[200px] md:min-h-[280px] aspect-square max-w-full mx-auto w-full">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-400 text-sm font-medium text-center px-4">Profile Photo</p>
            <p className="text-slate-300 text-xs text-center px-6">Add your headshot here</p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-900 font-semibold text-base">Dr. [Name]</p>
            <p className="text-slate-500 text-sm mt-0.5">Board-Certified Physician · Founder</p>
          </div>
        </div>

        {/* ══ 3a. NAV — Portfolio Link ══ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center group cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
          <div className="flex-1">
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1.5">Work</p>
            <p className="text-slate-900 font-bold text-2xl tracking-tight group-hover:text-blue-600 transition-colors">
              Portfolio
            </p>
            <p className="text-slate-500 text-sm mt-1">Case studies & published reviews</p>
          </div>
          <div className="w-10 h-10 bg-slate-900 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ml-4">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* ══ 3b. BIO ══ */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center">
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">Bio</p>
          <p className="text-slate-700 text-base leading-relaxed">
            A practicing clinician with deep roots in health publishing and SEO. Worldborne Medical was founded to give digital publishers direct access to the clinical expertise that Google now demands — and that readers deserve.
          </p>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              Board Certified
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              Health SEO Expert
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              10+ Years Practice
            </div>
          </div>
        </div>

        {/* ══ 4a. LEAD GEN — Contact Form ══ */}
        <div id="contact" className="bg-blue-600 rounded-2xl p-6 sm:p-8 flex flex-col">
          {/* Free Clinical Audit hook */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              <Star className="w-3.5 h-3.5" />
              No Cost · No Obligation
            </div>
            <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">
              Free Clinical
              <br />
              <span className="text-amber-300">Audit</span>
            </h2>
            <p className="text-blue-200 text-sm mt-2 leading-relaxed">
              Submit one article for a complimentary clinical accuracy review. See exactly what physician oversight looks like before you commit.
            </p>
          </div>

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-white/10 rounded-xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-amber-300" />
              <p className="text-white font-semibold text-lg">Request Received</p>
              <p className="text-blue-200 text-sm">We'll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/15 text-white placeholder-blue-300 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="bg-white/15 text-white placeholder-blue-300 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-colors"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" /> Company / Website
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="healthsite.com"
                  className="bg-white/15 text-white placeholder-blue-300 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1 flex-1">
                <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" /> Tell us about your content
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your site, content volume, and what you need reviewed…"
                  rows={4}
                  className="bg-white/15 text-white placeholder-blue-300 text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-colors resize-none flex-1"
                />
              </label>
              <button
                type="submit"
                className="mt-1 flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-amber-300 hover:text-amber-900 transition-colors font-semibold text-sm rounded-xl px-4 py-3"
              >
                <Send className="w-4 h-4" />
                Claim My Free Audit
              </button>
            </form>
          )}
        </div>

        {/* ══ 4b. SERVICES ══ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col">
          <div className="mb-5">
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">Services</p>
            <h2 className="text-slate-900 text-2xl font-bold tracking-tight">Choose Your Tier</h2>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {SERVICES.map((svc) => (
              <div
                key={svc.tier}
                className={`rounded-xl p-4 border transition-all cursor-default ${
                  svc.highlight
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-base ${svc.highlight ? 'text-white' : 'text-slate-900'}`}>
                        {svc.tier}
                      </span>
                      {svc.highlight && (
                        <span className="bg-amber-300 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${svc.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                      {svc.description}
                    </p>
                  </div>
                  <span className={`font-bold text-lg flex-shrink-0 ${svc.highlight ? 'text-amber-300' : 'text-blue-600'}`}>
                    {svc.price}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
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
            ))}
          </div>

          <p className="text-slate-400 text-xs text-center mt-5 pt-4 border-t border-slate-100">
            All tiers include a board-certified physician signature &amp; citation audit.
          </p>
        </div>

        {/* ══ 5. FOOTER ══ */}
        <footer className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 px-6 py-4 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            © 2025 Worldborne Medical. All rights reserved.
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Worldborne Medical on LinkedIn"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <span className="text-xs font-medium group-hover:text-blue-600 transition-colors hidden sm:inline">
              Connect on LinkedIn
            </span>
            <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            </div>
          </a>
        </footer>

      </div>
    </main>
  )
}
