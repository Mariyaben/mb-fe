'use client'

/**
 * PHOTOS — copy these files to /public/images/ before deploying:
 *   dreamvestor.jpg  — team holding giant check at DreamVestor finale
 *   bar-talk.jpg     — Mariya speaking at Trivandrum Bar Association
 *   vanchiyoor.jpg   — with law students at Vanchiyoor Court
 *   lejit-team.jpg   — Lejit team promo photo
 *   governor.jpg     — meeting with Adv. Sreedharan Pillai
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import {
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiR, SiGnubash,
  SiReact, SiNextdotjs, SiPytorch, SiTensorflow, SiHuggingface, SiScikitlearn,
  SiDjango, SiFastapi, SiNodedotjs, SiGraphql, SiFigma,
  SiPostgresql, SiMysql, SiMongodb, SiGithubactions, SiDocker, SiLinux,
  SiGit, SiJira, SiPostman, SiLatex,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa'
import {
  FaDiagramProject, FaMagnifyingGlass, FaTerminal, FaPlug, FaSitemap,
  FaClipboardCheck, FaCodeBranch, FaShieldHalved, FaWaveSquare, FaCircleNodes,
  FaSliders, FaEye, FaLanguage, FaRightLeft, FaCube, FaDatabase, FaLayerGroup,
  FaInfinity, FaArrowsRotate, FaBook, FaPenRuler,
  FaGithub, FaArrowUpRightFromSquare, FaFilePdf,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'

// ─── Hooks ────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true) },
      { threshold }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

// ─── AnimatedNumber ───────────────────────────────────────

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const dur = 1300
    const start = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [started, value])
  return <span ref={ref}>{display}{suffix}</span>
}

// ─── CollageTile (Lejit photo collage) ───────────────────

function CollageTile({
  src, alt, caption, className = '', featured = false, badge,
}: {
  src: string; alt: string; caption: string; className?: string; featured?: boolean; badge?: string
}) {
  const [errored, setErrored] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  // Catch images that 404'd before React hydrated and attached onError
  useEffect(() => {
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth === 0) setErrored(true)
  }, [])
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-stone-100 ring-1 ring-stone-200/70 hover:ring-2 hover:ring-pink-300 transition-all duration-300 ${className}`}>
      {errored ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gradient-to-br from-stone-100 to-stone-200/80">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-300">Photo</span>
          <span className="text-[11px] text-stone-400 italic leading-snug">{caption}</span>
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          {badge && (
            <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide bg-pink-500 text-white px-2.5 py-1 rounded-full shadow-sm">
              {badge}
            </span>
          )}
          <p className={`absolute inset-x-0 bottom-0 px-3 pb-3 md:px-4 md:pb-4 text-white leading-snug ${featured ? 'text-sm font-medium' : 'text-[11px]'}`}>
            {caption}
          </p>
        </>
      )}
    </div>
  )
}

// ─── FadeIn wrapper ───────────────────────────────────────

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView(0.06)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

// ─── Scroll progress bar ─────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ─── Section label ────────────────────────────────────────

function Label({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-pink-600 mb-3">
      {children}
    </p>
  )
}

// ─── Pink paint splash ────────────────────────────────────

function PinkSplash({ gradId = 'splashGrad', showDroplets = true }: { gradId?: string; showDroplets?: boolean }) {
  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="95 30 415 425"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBB8DD" />
            <stop offset="100%" stopColor="#F18BC4" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradId})`}
          d="M471.8 211.3 Q505 240 476.4 270.6 Q447.8 301.2 457 353.7 Q466.2 406.2 411.8 392.4 Q357.4 378.6 328.7 414.3 Q300 450 268.45 421.2 Q236.9 392.4 183.6 401.05 Q130.3 409.7 145.85 353.55 Q161.4 297.4 130.7 268.7 Q100 240 126.1 209.4 Q152.2 178.8 146.55 129.85 Q140.9 80.9 191.75 91.15 Q242.6 101.4 271.3 68.2 Q300 35 330.6 63.6 Q361.2 92.2 417.2 79.5 Q473.2 66.8 455.9 124.7 Q438.6 182.6 471.8 211.3 Z"
        />
      </svg>
      {/* flung droplets */}
      {showDroplets && (
        <>
          <span className="absolute" style={{ top: '-7%', right: '8%', width: 34, height: 30, background: '#F49ACB', borderRadius: '60% 40% 55% 45%' }} />
          <span className="absolute" style={{ top: '36%', right: '-5%', width: 18, height: 18, background: '#F49ACB', borderRadius: '50%' }} />
          <span className="absolute" style={{ bottom: '12%', right: '14%', width: 11, height: 11, background: '#F49ACB', borderRadius: '50%' }} />
          <span className="absolute" style={{ bottom: '-8%', left: '16%', width: 40, height: 34, background: '#F49ACB', borderRadius: '55% 45% 50% 50%' }} />
          <span className="absolute" style={{ top: '58%', left: '-5%', width: 22, height: 22, background: '#F49ACB', borderRadius: '50%' }} />
          <span className="absolute" style={{ top: '4%', left: '26%', width: 13, height: 13, background: '#F49ACB', borderRadius: '50%' }} />
        </>
      )}
    </>
  )
}

// ══════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════

const NAV_SECTIONS = ['story', 'lejit', 'projects', 'skills', 'achievements', 'contact']

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(['hero', ...NAV_SECTIONS])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="min-h-screen bg-[#f9f8f5] text-[#1a1917] selection:bg-pink-100 selection:text-pink-900">

      {/* ── SCROLL PROGRESS BAR ──────────── */}
      <ScrollProgress />

      {/* ── NAV ─────────────────────────── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f9f8f5]/96 backdrop-blur-sm border-b border-stone-200' : ''}`}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#hero" className="text-sm font-semibold tracking-wide">Mariya Benny</a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_SECTIONS.filter(s => s !== 'achievements').map(s => (
              <a
                key={s}
                href={`#${s}`}
                className={`text-sm capitalize transition-colors ${active === s ? 'text-[#1a1917] font-medium' : 'text-stone-500 hover:text-stone-800'}`}
              >
                {s === 'lejit' ? 'Lejit' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
           <a href="https://drive.google.com/file/d/1P803HWCnDCo9oK40cf0K4YVSzLcLanwc/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-1.5 border border-stone-300 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 transition-colors"> 
           Resume ↗
           </a>
          </div>
          <button className="md:hidden text-stone-600 text-lg leading-none" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? '✕' : '≡'}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#f9f8f5] border-t border-stone-200 px-6 py-5 flex flex-col gap-4">
            {NAV_SECTIONS.map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)} className="text-sm capitalize text-stone-600 hover:text-stone-900">
                {s === 'lejit' ? 'Lejit' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1P803HWCnDCo9oK40cf0K4YVSzLcLanwc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-sm w-fit px-3 py-1.5 border border-stone-300 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 transition-colors"
            >
              Resume ↗
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────── */}
      <section id="hero" className="px-6 pt-28 md:pt-36 pb-16 overflow-x-clip">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col-reverse md:flex-row md:items-center gap-10 md:gap-14">

            {/* Left — text with pink shape behind (desktop only) */}
            <div className="relative md:w-[55%]">
              {/* Pink paint splash behind text — desktop only */}
              <div
                aria-hidden
                className="absolute hidden md:block z-0 pointer-events-none"
                style={{ top: '-3rem', bottom: '-3rem', left: '-16%', right: '4%' }}
              >
                <PinkSplash />
              </div>

              <div className="relative" style={{ zIndex: 1 }}>
                <Label>AI Engineer · Full-Stack Developer</Label>
                <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.07] tracking-tight mb-6">
                  Hello, my name<br />is Mariya Benny
                </h1>
                <p className="text-stone-700 leading-relaxed mb-9 max-w-[400px]">
                  Building AI systems that work in production, not just demos.
                  Led a 13-member tech team at a LegalTech startup from zero to 300+ users.
                  MSc AI &amp; Data Science, CUSAT ·France Excellence Charpak Scholar 2025 - 2026.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="px-6 py-2.5 bg-[#1a1917] text-white text-sm font-medium hover:bg-stone-700 transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="https://linkedin.com/in/mariyabenny123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 border border-[#1a1917] text-sm font-medium hover:bg-white/50 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right — framed photo (pink splash behind it on mobile) */}
            <div className="relative md:w-[45%] md:flex-shrink-0">
              {/* Pink paint splash behind photo — mobile only */}
              <div
                aria-hidden
                className="absolute md:hidden z-0 pointer-events-none inset-y-[-2.5rem] inset-x-[-12%]"
              >
                <PinkSplash gradId="splashGradMobile" showDroplets={false} />
              </div>
              <div className="relative z-10 w-[230px] h-[230px] mx-auto md:w-auto md:h-auto md:max-w-none overflow-hidden rounded-full md:rounded-[1.5rem] ring-[6px] ring-white md:ring-0 shadow-xl shadow-pink-900/10 md:shadow-2xl md:shadow-stone-300/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile.jpg"
                  alt="Mariya Benny"
                  className="w-full h-full object-cover object-top md:h-[480px]"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-stone-200">
            {([
              { v: 300, s: '+', label: 'Active users, month 1', animated: true },
              { v: 13, s: '', label: 'Member team led at Lejit', animated: true },
              { v: '9.14', s: '/10', label: 'CGPA at CUSAT (top 1%)', animated: false },
              { v: 5, s: '+', label: 'Industry roles & research', animated: true },
            ] as const).map(({ v, s, label, animated }) => (
              <div key={label} className="border-l-2 border-pink-400 pl-4">
                <div className="text-3xl font-bold text-[#1a1917] tabular-nums">
                  {animated ? <AnimatedNumber value={v as number} suffix={s} /> : <>{v}{s}</>}
                </div>
                <div className="text-xs text-stone-500 mt-1 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-200" />

      {/* ── STORY ───────────────────────── */}
      <section id="story" className="py-20">
        <StorySection />
      </section>

      <div className="border-t border-stone-200" />

      {/* ── LEJIT ───────────────────────── */}
      <section id="lejit" className="py-20">
        <LejitSection />
      </section>

      <div className="border-t border-stone-200" />

      {/* ── PROJECTS ────────────────────── */}
      <section id="projects" className="py-20">
        <ProjectsSection />
      </section>

      <div className="border-t border-stone-200" />

      {/* ── SKILLS ──────────────────────── */}
      <section id="skills" className="py-20">
        <SkillsSection />
      </section>

      <div className="border-t border-stone-200" />

      {/* ── ACHIEVEMENTS ────────────────── */}
      <section id="achievements" className="py-20">
        <AchievementsSection />
      </section>

      {/* ── CONTACT ─────────────────────── */}
      <section id="contact">
        <ContactSection />
      </section>

      <footer className="bg-[#1a1917] border-t border-stone-800 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-sm text-stone-500">© 2026 Mariya Benny</p>
          <p className="text-xs text-stone-600">Designed & built by Mariya · Next.js + Tailwind</p>
        </div>
      </footer>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  STORY SECTION
// ══════════════════════════════════════════════════════════

const CHAPTERS = [
  {
    id: 'lejit',
    period: 'Aug 2024 – Aug 2025',
    tag: 'Startup Leadership',
    title: 'Lejit AI — Architecting a LegalTech Platform from Zero',
    body: `Taking ownership of a blank canvas at the start of the final academic year, scaled and led a 13-member cross-functional engineering team through full Agile/Scrum lifecycles. Architected the core multi-agent AI ecosystems, production RAG pipelines, and AWS/CI-CD infrastructure. Beyond the code, translated this technical work into real-world impact—winning the Dreamvestor 2025 championship and presenting deployment strategies directly to senior state lawyers and the Chief Registrar at the High Court of Kerala.`,
    aside: [
      'Led 13 engineers from initial MVP design to a live production release with 300+ active users.',
      'Engineered multi-agent orchestration, tool use, and context management across Indian legal corpora.',
      'Won Dreamvestor 2025 (Kerala Startup Mission) out of 400+ contenders, securing a Rs. 1 Lakh cash prize.',
      'Conducted field research and presented deployment strategies to the Chief Registrar & Kerala IT Cell.'
    ],
   
    cta: { label: 'Read the full Lejit story', href: '#lejit' },
  },
  {
    id: 'cusat',
    period: '2021 – 2026',
    tag: 'University & Leadership',
    title: 'MSc AI & Data Science, CUSAT',
    body: `Graduating in the top 1% of the cohort with a 9.14/10 CGPA anchored a strong technical foundation, but the defining university chapters happened completely outside the classroom. Dove headfirst into driving CUSAT\'s campus tech ecosystem—guiding young engineers as Vice Chair of IEEE Women in Engineering, orchestrating massive operational logistics as the Hosting Lead for IEDC, and organizing Make-A-Ton 7.0, one of Kerala\'s premier national hackathons. Whether designing scalable code or anchoring the stage as the official MC for TEDx CUSAT 2024, treated campus leadership as a core engineering discipline.`,
    aside: [
      'Organizer for Make-A-Ton 7.0, driving logistics, coordination, and execution for the national hackathon.',
      'Official Master of Ceremonies for TEDx CUSAT 2024, managing the main stage and live event flow.',
      'Vice Chair of IEEE Women in Engineering, spearheading technical workshops and community mentorship.',
      'Operations Hosting Lead for IEDC CUSAT, managing campus innovation and startup incubation initiatives.',
      'University 1st Prize Winner in English Short Story Writing (2024) and English Poem Writing (2022).'
    ],
   
    cta: null,
  },
  {
    id: 'france',
    period: 'Sept 2025 – Feb 2026',
    tag: 'International Exchange',
    title: 'Charpak Scholar, ENSSAT Rennes (France)',
    body: `Awarded the prestigious France Excellence Charpak Scholarship by the French Government for academic and technical merit. Spent an exchange semester pursuing advanced graduate-level computer science coursework at ENSSAT, University of Rennes, finishing with a 9.29/10 CGPA. Living, studying, and collaborating completely in a new international environment was an invaluable, clarifying chapter that sharpened a global perspective and independent adaptability.`,
    aside: [
      'Selected for the highly competitive, merit-based France Excellence Charpak Scholarship.',
      'Achieved a 9.29/10 CGPA in advanced European AI and computer science modules.',
      'Navigated complex international academic environments and cross-cultural engineering workflows.'
    ],
   
    cta: null,
  },
  {
    id: 'firstwork',
    period: '2023 – 2024',
    tag: 'Early Career & Research',
    title: 'Research Internships and a Streak of Wins',
    body: `A hyper-focused period balancing industry software engineering with deep learning research. Accelerated from an early industry role at KPIT to a collaborative internship with IBM—shipping LegalGPT on WatsonX and presenting it live at the IBM International GenAI Conclave. Concurrently, contributed to generative AI research at NIT Surathkal, building custom PyTorch diffusion restoration frameworks for hyperspectral anomaly detection, while maintaining a high-performance streak at national hackathons.`,
    aside: [
      'Presented LegalGPT live on stage at the IBM International GenAI Conclave in Kochi.',
      'Applied ML Research Intern at NIT Surathkal, developing custom image-conditioned diffusion models.',
      'IIT Delhi Fin-A-Thon: Placed as a Top 15 National Finalist out of more than 600 competing teams.',
      'HackAthena \'24: Earned the Theme Prize for Road Safety alongside a Rs. 10,000 cash award.',
      'AnitaB.org Community Volunteer, actively supporting inclusion and diversity initiatives in tech.'
    ],
   
    cta: null,
  },
  {
    id: 'geojit',
    period: 'Aug 2024 – Aug 2025',
    tag: 'Industry Experience',
    title: 'AI Developer Intern, Geojit Technologies',
    body: `Parallel to leading the tech team at Lejit AI, stepped into the financial services domain at Geojit Technologies to develop secure, enterprise AI systems. Focused on bridging advanced machine learning models with production infrastructure, dealing directly with strict data isolation, environment management, and financial security protocols. This chapter proved a capacity to manage high-velocity corporate development pipelines alongside startup growth and intensive university leadership commitments.`,
    aside: [
      'Engineered domain-specific AI models and automated backend workflows for financial tech services.',
      'Gained deep experience in secrets management, environment isolation, and network hardening.',
      'Successfully balanced enterprise engineering timelines alongside final-year tracks and startup deployment.'
    ],
   
    cta: null,
  }
]

function playPageTurn() {
  try {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const sr = ctx.sampleRate
    const duration = 0.13

    // Two short noise bursts — the "flick" and the "settle"
    const offsets = [0, 0.06]
    offsets.forEach((startAt, idx) => {
      const len = Math.floor(sr * (idx === 0 ? 0.07 : 0.05))
      const buf = ctx.createBuffer(1, len, sr)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) {
        const t = i / len
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.8) * (idx === 0 ? 0.18 : 0.10)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = idx === 0 ? 5500 : 3500
      bpf.Q.value = 0.6
      const gain = ctx.createGain()
      gain.gain.value = 0.9
      src.connect(bpf)
      bpf.connect(gain)
      gain.connect(ctx.destination)
      src.start(ctx.currentTime + startAt)
    })

    setTimeout(() => ctx.close(), Math.floor(duration * 1000) + 200)
  } catch {
    // silently ignore if Web Audio not available
  }
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

// Each leaf must forward its ref so react-pageflip can attach to it
type LeafProps =
  | { kind: 'divider'; chapter: typeof CHAPTERS[number]; index: number; folio: number }
  | { kind: 'content'; chapter: typeof CHAPTERS[number]; folio: number }

const BookLeaf = React.forwardRef<HTMLDivElement, LeafProps>((props, ref) => {
  if (props.kind === 'divider') {
    const { chapter, index, folio } = props
    return (
      <div ref={ref} className="book-leaf">
        <div className="book-leaf__inner items-center justify-center text-center">
          <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-pink-500 mb-5">Chapter {ROMAN[index]}</p>
          <h3 className="text-[1.6rem] font-bold tracking-tight leading-snug mb-5 px-1">{chapter.title}</h3>
          <div className="mx-auto book-rule mb-5" />
          <p className="font-mono text-[11px] tracking-[0.16em] text-stone-500">{chapter.period}</p>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">{chapter.tag}</p>
        </div>
        <div className="book-pageno">{folio}</div>
      </div>
    )
  }
  const { chapter, folio } = props
  return (
    <div ref={ref} className="book-leaf">
      <div className="book-leaf__inner">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 mb-6">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-pink-500">{chapter.tag}</span>
          <span className="font-mono text-[10px] text-stone-400">{chapter.period}</span>
        </div>
        <p className="book-dropcap text-[13.5px] leading-[1.75] text-stone-700">{chapter.body}</p>
        {chapter.aside && chapter.aside.length > 0 && (
          <ul className="mt-5 space-y-1.5 text-[12px] leading-relaxed text-stone-500 border-l-2 border-pink-300 pl-3.5">
            {chapter.aside.map((line, i) => (
              <li key={i} className="relative pl-3.5 before:absolute before:left-0 before:text-pink-400 before:content-['▸']">
                {line}
              </li>
            ))}
          </ul>
        )}
        {chapter.cta && (
          <a
            href={chapter.cta.href}
            className="inline-flex items-center gap-1.5 mt-6 text-[12.5px] font-semibold text-pink-600 hover:gap-2.5 transition-all"
          >
            {chapter.cta.label} <span>→</span>
          </a>
        )}
      </div>
      <div className="book-pageno">{folio}</div>
    </div>
  )
})
BookLeaf.displayName = 'BookLeaf'

function StorySection() {
  const bookRef = useRef<{ pageFlip: () => { flipNext: (c: string) => void; flipPrev: (c: string) => void; flip: (n: number, c: string) => void } }>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const leaves = [
    ...CHAPTERS.flatMap((ch, i) => [
      <BookLeaf key={`${ch.id}-d`} kind="divider" chapter={ch} index={i} folio={2 * i + 1} />,
      <BookLeaf key={`${ch.id}-c`} kind="content" chapter={ch} folio={2 * i + 2} />,
    ]),
  ]
  const LAST = leaves.length - 1

  const flipNext = useCallback(() => bookRef.current?.pageFlip().flipNext('bottom'), [])
  const flipPrev = useCallback(() => bookRef.current?.pageFlip().flipPrev('bottom'), [])
  const goToChapter = useCallback((i: number) => bookRef.current?.pageFlip().flip(i * 2, 'bottom'), [])

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
    playPageTurn()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') flipNext()
      if (e.key === 'ArrowLeft')  flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipNext, flipPrev])

  const activeChapter = Math.min(Math.floor(currentPage / 2), CHAPTERS.length - 1)

  const counter = `Ch. ${String(activeChapter + 1).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`

  return (
    <FadeIn className="max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-10">
        <Label>The Story</Label>
        <p className="font-mono text-sm text-stone-400">{counter}</p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-8">
        {CHAPTERS.map((ch, i) => {
          const done = activeChapter > i
          const current = activeChapter === i
          return (
            <div key={ch.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => goToChapter(i)}
                className="group flex flex-col items-center gap-1.5 flex-shrink-0"
                aria-label={`Go to ${ch.tag}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  current ? 'bg-pink-500 border-pink-500 scale-125'
                    : done ? 'bg-pink-300 border-pink-300'
                      : 'bg-transparent border-stone-300 group-hover:border-stone-500'
                }`} />
                <span className={`text-[10px] font-mono hidden md:block transition-colors ${
                  current ? 'text-pink-600 font-semibold' : 'text-stone-400'
                }`}>{ch.tag}</span>
              </button>
              {i < CHAPTERS.length - 1 && (
                <div className="flex-1 h-px mx-2 relative overflow-hidden bg-stone-200">
                  <div
                    className="absolute inset-y-0 left-0 bg-pink-300 transition-all duration-500 ease-out"
                    style={{ width: done ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Classic two-page book */}
      <div className="book-desk -mx-6 px-6 py-12 md:py-16">
        <div className="mx-auto" style={{ maxWidth: 960 }}>
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={540}
            size="stretch"
            minWidth={300}
            maxWidth={480}
            minHeight={420}
            maxHeight={680}
            maxShadowOpacity={0.45}
            showCover={false}
            flippingTime={800}
            drawShadow={true}
            usePortrait={true}
            startPage={0}
            autoSize={true}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            showPageCorners={true}
            disableFlipByClick={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={18}
            startZIndex={0}
            style={{}}
            className="mx-auto"
          >
            {leaves}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-stone-200">
        <button
          onClick={flipPrev}
          disabled={currentPage === 0}
          className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Previous</span>
        </button>
        <span className="text-xs text-stone-300 hidden md:block select-none">drag the corner · or use arrow keys</span>
        <button
          onClick={flipNext}
          disabled={currentPage === LAST}
          className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <span>Next</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </FadeIn>
  )
}

// ══════════════════════════════════════════════════════════
//  LEJIT SECTION
// ══════════════════════════════════════════════════════════

const LEJIT_PHASES = [
  {
    num: '01',
    title: 'Built from nothing',
    desc: 'Joined at the founding stage — no codebase, no users, everything still to define. Led the engineering direction and designed the core workflows and system architecture (Django backend, React/Next.js frontend, PostgreSQL with pgvector, AWS) that the team built on.',
  },
  {
    num: '02',
    title: '300+ users in month one',
    desc: 'Led a 13-member cross-functional team through scrums, standups, 1:1s, sprint planning, and production releases — all during the final year of university. The 300+ users reached in month one were earned by every engineer on that team.',
  },
  {
    num: '03',
    title: 'Agentic AI in production',
    desc: 'Designed the multi-step AI pipelines — conversational legal assistance, autonomous document drafting, and case research with planner/sub-agent patterns — which the team then built and hardened for real production load.',
  },
  {
    num: '04',
    title: 'RAG over Indian legal corpora',
    desc: 'Architected the production RAG over BNS and lower-court petitions: vector DB design, embedding-based retrieval, chunking, reranking, context compression, and citation integrity — implemented and refined together with the team.',
  },
  {
    num: '05',
    title: 'Quality as an engineering problem',
    desc: 'Set quality as a first-class discipline: instrumented prompt pipelines, A/B tested retrieval and prompting changes, tracked hallucination and failure rates, and drove continuous iteration on eval harnesses with the team.',
  },
  {
    num: '06',
    title: 'Courts, lawyers, and a ₹1L prize',
    desc: 'Led user research at the High Court of Kerala and presented to the Chief Registrar and Kerala IT Cell, plus a session on AI in the Legal Sector at Vanchiyoor Court for senior state lawyers. Together, the team won Dreamvestor 2025 from 400+ contenders.',
  },
]

function LejitSection() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <FadeIn>
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-6 items-start mb-12">
          <div className="md:col-span-5">
            <Label>Aug 2024 – Aug 2025 · Project Manager & Tech Lead</Label>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-none mb-3">Lejit AI</h2>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-6">AI-Powered Legal Management Platform</p>
            <div className="flex flex-wrap gap-2">
              {['Django', 'React / Next.js', 'PostgreSQL + pgvector', 'AWS', 'Multi-agent AI', 'RAG', 'GitHub Actions CI/CD'].map(t => (
                <span key={t} className="text-xs px-2.5 py-1 bg-white border border-stone-200 text-stone-600 hover:border-pink-300 hover:text-pink-700 hover:bg-pink-50 transition-colors">{t}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 md:pt-1">
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed border-l-2 border-pink-400 pl-5">
              Came in as Project Manager and Tech Lead — which, in startup terms, meant architecting
              the system, leading a 13-person team, shipping to production, and sitting across from lawyers
              at the High Court of Kerala, often in the same week.
            </p>
            <p className="mt-5 text-base text-stone-500 leading-relaxed pl-5">
              Zero to 300+ users in the first month — an empty repo turned into something real lawyers
              relied on every day.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Photo collage */}
      <FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[150px] md:auto-rows-[185px] mb-14">
          <CollageTile
            className="col-span-2 row-span-2"
            featured
            badge="Winner · Dreamvestor 2025"
            src="/images/dreamvestor.jpg"
            alt="Team Lejit wins Dreamvestor 2025"
            caption="Dreamvestor 2025 — Top 10 startups in Kerala, from 400+ contenders"
          />
          <CollageTile
            className="col-span-2"
            src="/images/bar-talk.jpg"
            alt="AI in Legal Sector session at Trivandrum Bar Association"
            caption="Speaking on AI in the Legal Sector — Trivandrum Bar Association, June 2025"
          />
          <CollageTile
            className="col-span-1"
            src="/images/governor.jpg"
            alt="Meeting with Adv. Sreedharan Pillai"
            caption="With Adv. Sreedharan Pillai, former Governor of Goa"
          />
          <CollageTile
            className="col-span-1"
            src="/images/vanchiyoor.jpg"
            alt="With law students at Vanchiyoor Court"
            caption="Law students at Vanchiyoor Court, Thiruvananthapuram"
          />
        </div>
      </FadeIn>

      {/* What we built grid */}
      <FadeIn>
        <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-6">What we built</h3>
        <div className="border border-stone-200 divide-y divide-stone-200 mb-12">
          {Array.from({ length: Math.ceil(LEJIT_PHASES.length / 2) }, (_, row) => (
            <div key={row} className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
              {LEJIT_PHASES.slice(row * 2, row * 2 + 2).map(phase => (
                <div key={phase.num} className="p-6 hover:bg-stone-50 transition-colors group/phase">
                  <div className="text-4xl font-bold text-stone-100 font-mono mb-3 leading-none group-hover/phase:text-pink-200 transition-colors">{phase.num}</div>
                  <h4 className="font-semibold mb-2">{phase.title}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Impact bar */}
      <FadeIn>
        <div className="bg-stone-900 text-white grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-700">
          {[
            { v: 300, s: '+', label: 'Active users, month 1' },
            { v: 13, s: '', label: 'Team members led' },
            { v: 400, s: '+', label: 'Startups beaten at Dreamvestor' },
            { v: 1, s: 'L', label: 'Prize money won (₹)' },
          ].map(({ v, s, label }) => (
            <div key={label} className="p-6">
              <div className="text-3xl font-bold tabular-nums"><AnimatedNumber value={v} suffix={s} /></div>
              <div className="text-xs text-stone-400 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  PROJECTS SECTION
// ══════════════════════════════════════════════════════════

type ProjectLink = { kind: 'live' | 'code' | 'paper'; url: string }
type Project = { name: string; badge: string; tags: string[]; desc: string; links: ProjectLink[] }

const PROJECTS: Project[] = [
  {
    name: 'LegalGPT',
    badge: 'IBM WatsonX · Live',
    tags: ['RAG', 'LLMs', 'IBM WatsonX'],
    desc: 'LLM and RAG-powered legal document processing platform. Presented at IBM International GenAI Conclave, Kochi (July 2024).',
    links: [{ kind: 'live', url: 'https://cusat-team.onrender.com/' }],
  },
  {
    name: 'Hyperspectral Anomaly Detection',
    badge: "Master's Thesis",
    tags: ['PyTorch', 'Diffusion Models', 'Research'],
    desc: 'Custom diffusion framework adapting image-conditioned restoration to hyperspectral data; anomaly detection via spectral harmonization and pseudo-healthy reconstruction. NIT Surathkal.',
    links: [
      { kind: 'paper', url: 'https://drive.google.com/file/d/1Zn3-neCDXuzwEphacUpcegl7XXshf9tA/view?usp=sharing' },
      { kind: 'code', url: 'https://github.com/Mariyaben/hyperspectral-diffusion-anomaly-detection' },
    ],
  },
  {
    name: 'AI-Sherlock-Holmes',
    badge: 'LLM · RAG',
    tags: ['Fine-tuning', 'RAG', 'Long-context'],
    desc: 'Conversational AI fine-tuned on the complete Sherlock Holmes corpus with RAG for multi-stage deductive reasoning. Explores retrieval-grounded inference and long-context coherence.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/AI-Sherlock-Holmes' }],
  },
  {
    name: 'Hyperpersonalized Banking Engine',
    badge: 'IIT Delhi · Top 15',
    tags: ['Recommendation Systems', 'ML', 'FinTech'],
    desc: 'Behavior-driven personalized loan and financial plan recommendations. Top 15 nationally at IIT Delhi Fin-A-Thon from 600+ teams.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/HPAI_Banking_Assist' }],
  },
  {
    name: 'LearnDrive.AI',
    badge: 'Hackathon Winner',
    tags: ['YOLO', 'Computer Vision', 'gTTS'],
    desc: 'Real-time object detection driver assistance system using YOLO. HackAthena \'24 Theme Prize Winner (Road Safety), Rs. 10,000.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/Hackathena_2024-LearnDrive.AI-' }],
  },
  {
    name: 'Fusion Drug-Target Affinity Prediction',
    badge: 'Deep Learning',
    tags: ['GNN', 'Cross-attention', 'Deep Learning'],
    desc: 'Drug–target affinity prediction using multi-modal sequence–structure fusion with GNNs and cross-attention mechanisms.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/Fusion-Enhanced-Drug-Target-Affinity-Prediction' }],
  },
  {
    name: 'Marine Pollution Detection',
    badge: 'Published · NCMPE-24',
    tags: ['Computer Vision', 'Deep Learning'],
    desc: 'Underwater imagery model for automated marine plastic pollution detection. Presented at NCMPE-24.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/Mitigating-Marine-Pollution-NCMPE' }],
  },
  {
    name: 'OfficeFlow',
    badge: 'Hackathon Winner',
    tags: ['NLP', 'Django', 'Automation'],
    desc: 'Automated office management: AI-powered resume screening, HR-GPT assistant, and project allocation automation.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/OfficeFlow' }],
  },
  {
    name: 'Malayalam Text Classifier',
    badge: 'Live Demo',
    tags: ['NLP', 'Naive Bayes', 'mlmorph'],
    desc: 'Probabilistic Malayalam text classifier using Naive Bayes with unigram and bigram models, plus morphological tokenization (mlmorph) for linguistic accuracy.',
    links: [
      { kind: 'live', url: 'https://malayalam-text-classifiergit-6m8tbuwkvkiqwnpcfouux2.streamlit.app' },
      { kind: 'code', url: 'https://github.com/Mariyaben/malayalam-text-classifier' },
    ],
  },
  {
    name: 'Vitae — Healthcare Platform',
    badge: 'HealthTech',
    tags: ['TensorFlow', 'scikit-learn', 'HealthTech'],
    desc: 'Healthcare platform for personalized diagnosis and recommendations, built with TensorFlow and scikit-learn.',
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/Hackify' }],
  },
  {
    name: 'Personalized Hand Gesture Interpreter',
    badge: 'Computer Vision',
    tags: ['Computer Vision', 'ML', 'Real-time'],
    desc: "Personalized sign-language interpreter that learns a user's unique hand-activity patterns with ML and computer vision, translating them to text or speech in real time.",
    links: [{ kind: 'code', url: 'https://github.com/Mariyaben/personalized_sign_language_interpreter' }],
  },
  {
    name: 'Yocto Project on Raspberry Pi',
    badge: 'Embedded Linux',
    tags: ['Yocto', 'Linux', 'Embedded'],
    desc: 'Built a custom Linux distribution for the Raspberry Pi embedded system using the Yocto Project.',
    links: [],
  },
]

const LINK_META = {
  live: { Icon: FaArrowUpRightFromSquare, label: 'Live demo' },
  code: { Icon: FaGithub, label: 'Code' },
  paper: { Icon: FaFilePdf, label: 'Paper' },
} as const

function ProjectsSection() {
  return (
    <FadeIn className="max-w-5xl mx-auto px-6">
      <div className="mb-10">
        <Label>Selected Work</Label>
        <h2 className="text-3xl lg:text-4xl font-bold">Projects</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            className="group relative flex flex-col overflow-hidden border border-stone-200 bg-white p-6 pt-7 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/40 hover:-translate-y-1 transition-all duration-300"
          >
            {/* animated top accent */}
            <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-pink-400 to-pink-600 transition-transform duration-300 group-hover:scale-x-100" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono text-xs text-stone-300 group-hover:text-pink-400 transition-colors">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full group-hover:text-pink-600 group-hover:border-pink-200 group-hover:bg-pink-50 transition-colors">
                {p.badge}
              </span>
            </div>

            <h3 className="font-semibold text-lg leading-snug mb-2 group-hover:text-pink-700 transition-colors">{p.name}</h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-1">{p.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map(t => (
                <span key={t} className="text-[11px] px-2 py-0.5 bg-stone-50 border border-stone-100 text-stone-500 group-hover:border-pink-100 group-hover:text-pink-600 group-hover:bg-pink-50/50 transition-colors">{t}</span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-stone-100">
              {p.links.length === 0 ? (
                <span className="text-[11px] text-stone-300 italic">Repo not public</span>
              ) : (
                p.links.map(({ kind, url }) => {
                  const { Icon, label } = LINK_META[kind]
                  return (
                    <a
                      key={kind}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-pink-600 transition-colors"
                    >
                      <Icon size={13} className="transition-transform group-hover/link:-translate-y-0.5" />
                      {label}
                    </a>
                  )
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}

// ══════════════════════════════════════════════════════════
//  SKILLS SECTION
// ══════════════════════════════════════════════════════════

// name → icon + brand color (omit color for concepts: they inherit text color) + official/canonical link
const SKILL_META: Record<string, { Icon: IconType; color?: string; url?: string }> = {
  // Languages
  'Python': { Icon: SiPython, color: '#3776AB', url: 'https://www.python.org' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6', url: 'https://www.typescriptlang.org' },
  'JavaScript': { Icon: SiJavascript, color: '#E8B400', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  'C++': { Icon: SiCplusplus, color: '#00599C', url: 'https://isocpp.org' },
  'Java': { Icon: FaJava, color: '#E76F00', url: 'https://www.java.com' },
  'R': { Icon: SiR, color: '#276DC3', url: 'https://www.r-project.org' },
  'Bash/Shell': { Icon: SiGnubash, color: '#4EAA25', url: 'https://www.gnu.org/software/bash/' },
  // Agentic AI & LLMs
  'Multi-agent orchestration': { Icon: FaDiagramProject, url: 'https://en.wikipedia.org/wiki/Multi-agent_system' },
  'RAG pipelines': { Icon: FaMagnifyingGlass, url: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation' },
  'Prompt engineering': { Icon: FaTerminal, url: 'https://en.wikipedia.org/wiki/Prompt_engineering' },
  'Tool use / MCP': { Icon: FaPlug, url: 'https://modelcontextprotocol.io' },
  'Planner/sub-agent patterns': { Icon: FaSitemap, url: 'https://en.wikipedia.org/wiki/Intelligent_agent' },
  'Eval harnesses': { Icon: FaClipboardCheck },
  'A/B prompt testing': { Icon: FaCodeBranch, url: 'https://en.wikipedia.org/wiki/A/B_testing' },
  'Hallucination mitigation': { Icon: FaShieldHalved, url: 'https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)' },
  // ML & Deep Learning
  'PyTorch': { Icon: SiPytorch, color: '#EE4C2C', url: 'https://pytorch.org' },
  'TensorFlow': { Icon: SiTensorflow, color: '#FF6F00', url: 'https://www.tensorflow.org' },
  'Hugging Face': { Icon: SiHuggingface, color: '#F59E0B', url: 'https://huggingface.co' },
  'scikit-learn': { Icon: SiScikitlearn, color: '#F7931E', url: 'https://scikit-learn.org' },
  'Diffusion Models': { Icon: FaWaveSquare, url: 'https://en.wikipedia.org/wiki/Diffusion_model' },
  'GNNs': { Icon: FaCircleNodes, url: 'https://en.wikipedia.org/wiki/Graph_neural_network' },
  'Fine-tuning': { Icon: FaSliders, url: 'https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning)' },
  'Computer Vision': { Icon: FaEye, url: 'https://en.wikipedia.org/wiki/Computer_vision' },
  'NLP': { Icon: FaLanguage, url: 'https://en.wikipedia.org/wiki/Natural_language_processing' },
  // Backend & APIs
  'Django': { Icon: SiDjango, color: '#0C4B33', url: 'https://www.djangoproject.com' },
  'FastAPI': { Icon: SiFastapi, color: '#009688', url: 'https://fastapi.tiangolo.com' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933', url: 'https://nodejs.org' },
  'RESTful APIs': { Icon: FaRightLeft, url: 'https://en.wikipedia.org/wiki/REST' },
  'GraphQL': { Icon: SiGraphql, color: '#E10098', url: 'https://graphql.org' },
  'SDK design': { Icon: FaCube, url: 'https://en.wikipedia.org/wiki/Software_development_kit' },
  // Frontend
  'React': { Icon: SiReact, color: '#0EA5C4', url: 'https://react.dev' },
  'Next.js': { Icon: SiNextdotjs, color: '#1a1917', url: 'https://nextjs.org' },
  'Figma': { Icon: SiFigma, color: '#F24E1E', url: 'https://www.figma.com' },
  'UI/UX Design': { Icon: FaPenRuler, url: 'https://en.wikipedia.org/wiki/User_experience_design' },
  // Cloud & DevOps
  'AWS (EC2, S3, RDS, Lambda)': { Icon: FaAws, color: '#FF9900', url: 'https://aws.amazon.com' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF', url: 'https://github.com/features/actions' },
  'CI/CD': { Icon: FaInfinity, url: 'https://en.wikipedia.org/wiki/CI/CD' },
  'Docker': { Icon: SiDocker, color: '#2496ED', url: 'https://www.docker.com' },
  'Linux': { Icon: SiLinux, color: '#222222', url: 'https://www.linux.org' },
  // Databases
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1', url: 'https://www.postgresql.org' },
  'pgvector': { Icon: FaLayerGroup, url: 'https://github.com/pgvector/pgvector' },
  'MySQL': { Icon: SiMysql, color: '#4479A1', url: 'https://www.mysql.com' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248', url: 'https://www.mongodb.com' },
  'Vector DBs': { Icon: FaDatabase, url: 'https://en.wikipedia.org/wiki/Vector_database' },
  // Process & Tools
  'Agile / Scrum': { Icon: FaArrowsRotate, url: 'https://en.wikipedia.org/wiki/Scrum_(software_development)' },
  'Jira': { Icon: SiJira, color: '#0052CC', url: 'https://www.atlassian.com/software/jira' },
  'Git': { Icon: SiGit, color: '#F05032', url: 'https://git-scm.com' },
  'Postman': { Icon: SiPostman, color: '#FF6C37', url: 'https://www.postman.com' },
  'LaTeX': { Icon: SiLatex, color: '#008080', url: 'https://www.latex-project.org' },
  'Technical Documentation': { Icon: FaBook, url: 'https://en.wikipedia.org/wiki/Software_documentation' },
}

const SKILL_GROUPS = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'R', 'Bash/Shell'] },
  { group: 'Agentic AI & LLMs', items: ['Multi-agent orchestration', 'RAG pipelines', 'Prompt engineering', 'Tool use / MCP', 'Planner/sub-agent patterns', 'Eval harnesses', 'A/B prompt testing', 'Hallucination mitigation'] },
  { group: 'ML & Deep Learning', items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'scikit-learn', 'Diffusion Models', 'GNNs', 'Fine-tuning', 'Computer Vision', 'NLP'] },
  { group: 'Backend & APIs', items: ['Django', 'FastAPI', 'Node.js', 'RESTful APIs', 'GraphQL', 'SDK design'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Figma', 'UI/UX Design'] },
  { group: 'Cloud & DevOps', items: ['AWS (EC2, S3, RDS, Lambda)', 'GitHub Actions', 'CI/CD', 'Docker', 'Linux'] },
  { group: 'Databases', items: ['PostgreSQL', 'pgvector', 'MySQL', 'MongoDB', 'Vector DBs'] },
  { group: 'Process & Tools', items: ['Agile / Scrum', 'Jira', 'Git', 'Postman', 'LaTeX', 'Technical Documentation'] },
]

function SkillsSection() {
  return (
    <FadeIn className="max-w-5xl mx-auto px-6">
      <div className="mb-10">
        <Label>Technical</Label>
        <h2 className="text-3xl lg:text-4xl font-bold">Skills & Expertise</h2>
      </div>

      {/* Categorized icon chips (click → official / canonical site) */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {SKILL_GROUPS.map(({ group, items }) => (
          <div key={group}>
            <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-stone-400 mb-3">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(item => <SkillChip key={item} name={item} />)}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}

function SkillChip({ name }: { name: string }) {
  const meta = SKILL_META[name]
  const Icon = meta?.Icon
  const cls = 'group inline-flex items-center gap-2 text-[13px] px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:border-pink-300 hover:text-pink-700 hover:bg-pink-50 hover:-translate-y-0.5 transition-all duration-200'
  const inner = (
    <>
      {Icon && <Icon size={14} color={meta?.color} className="shrink-0 opacity-85 group-hover:opacity-100 transition-opacity" />}
      <span>{name}</span>
    </>
  )
  return meta?.url ? (
    <a href={meta.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <span className={`${cls} cursor-default`}>{inner}</span>
  )
}

// ══════════════════════════════════════════════════════════
//  ACHIEVEMENTS SECTION
// ══════════════════════════════════════════════════════════

const ACHIEVEMENTS = [
  { year: '2025–26', title: 'France Excellence Charpak Scholar', desc: 'Awarded by the French Government for academic and technical merit. Studied at ENSSAT, University of Rennes.' },
  { year: '2025', title: 'Dreamvestor Winner — Top 10 Startups in Kerala', desc: 'Kerala Startup Mission. Selected from 400+ contenders. Rs. 1 Lakh cash prize for Lejit AI.' },
  { year: '2024', title: 'IIT Delhi Fin-A-Thon — Top 15 nationally', desc: 'From 600+ teams. Hyperpersonalized Banking Engine project.' },
  { year: '2024', title: 'HackAthena \'24 — Theme Prize Winner', desc: 'Road Safety theme prize, Rs. 10,000. LearnDrive.AI.' },
  { year: '2024', title: 'Tink-Her-Hack 2.0 — Top 100', desc: 'From 1,000+ participants in Kerala.' },
]

function AchievementsSection() {
  return (
    <FadeIn className="max-w-5xl mx-auto px-6">
      <div className="mb-10">
        <Label>Recognition</Label>
        <h2 className="text-3xl lg:text-4xl font-bold">Achievements</h2>
      </div>
      <div className="relative">
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-stone-200 hidden md:block" />
        {ACHIEVEMENTS.map(({ year, title, desc }, i) => (
          <div key={title} className="flex gap-6 md:gap-8 group py-5 relative">
            <div className="font-mono text-xs text-stone-400 w-14 flex-shrink-0 pt-1 text-right">{year}</div>
            <div className="hidden md:block absolute left-[3.05rem] top-[1.35rem] w-2 h-2 rounded-full border-2 border-pink-400 bg-[#f9f8f5] z-10 group-hover:bg-pink-400 transition-colors" />
            <div className="flex-1 group-hover:translate-x-1 transition-transform duration-200">
              <h3 className="font-semibold mb-1 leading-snug">{title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}

// ══════════════════════════════════════════════════════════
//  CONTACT SECTION
// ══════════════════════════════════════════════════════════

function ContactSection() {
  return (
    <FadeIn>
      <div className="bg-[#1a1917] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-pink-400 mb-3">Say hello</p>
            <h2 className="text-3xl lg:text-5xl font-bold mb-5 leading-tight">Let&apos;s build<br />something real.</h2>
            <p className="text-stone-400 leading-relaxed mb-10 max-w-lg">
              Open to full-time roles in AI engineering, full-stack development, or anything at
              the intersection. If you&apos;re building something meaningful, let&apos;s talk.
            </p>
            <a
              href="mailto:mariyaben02@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3 bg-pink-500 text-white font-semibold text-sm hover:bg-pink-400 transition-colors mb-12"
            >
              Get in touch <span>→</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-8 pt-8 border-t border-stone-700/50">
            {[
              { label: 'Email', href: 'mailto:mariyaben02@gmail.com', text: 'mariyaben02@gmail.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/mariyabenny123', text: 'linkedin.com/in/mariyabenny123' },
              { label: 'GitHub', href: 'https://github.com/Mariyaben', text: 'github.com/Mariyaben' },
            ].map(({ label, href, text }) => (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="group">
                <span className="block text-[10px] font-medium tracking-widest uppercase text-stone-500 mb-1">{label}</span>
                <span className="text-sm text-stone-300 group-hover:text-pink-400 transition-colors">{text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
