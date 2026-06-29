import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [billing, setBilling] = useState('monthly')

  return (
    <>
      <Head>
        <title>NSA/IDR State Law Tracker — Live AI-Powered Compliance Tool</title>
        <meta name="description" content="Instant, AI-powered lookup of No Surprises Act and IDR law status for all 50 states. Know whether federal, state, or bifurcated law applies — in seconds." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
      </Head>

      <nav style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 24px',position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:60}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:32,height:32,background:'#1B4FD8',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <i className="ti ti-map-2" style={{color:'#fff',fontSize:18}}></i>
            </div>
            <span style={{fontWeight:700,fontSize:16,color:'#0F172A'}}>NSA/IDR Tracker</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <a href="#pricing" style={{fontSize:14,color:'#475569',fontWeight:500}}>Pricing</a>
            <Link href="/tracker" style={{background:'#1B4FD8',color:'#fff',padding:'8px 18px',borderRadius:8,fontSize:14,fontWeight:600}}>
              Try free lookup
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{background:'linear-gradient(135deg, #0A1628 0%, #112240 100%)',padding:'80px 24px 72px',textAlign:'center'}}>
        <div style={{maxWidth:760,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(59,130,246,0.15)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:20,padding:'6px 14px',marginBottom:28}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#4ADE80',display:'inline-block'}}></span>
            <span style={{fontSize:13,color:'#93C5FD',fontWeight:500}}>Live AI-powered · Updated in real time</span>
          </div>
          <h1 style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:700,color:'#fff',lineHeight:1.15,marginBottom:20}}>
            Know every state's NSA/IDR law<br/>
            <span style={{color:'#60A5FA'}}>in seconds, not hours</span>
          </h1>
          <p style={{fontSize:18,color:'#94A3B8',marginBottom:36,lineHeight:1.7}}>
            The only tool that gives providers, payers, and billing teams instant AI-powered clarity on whether federal law, state law, or bifurcated rules apply — for all 50 states.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/tracker" style={{background:'#1B4FD8',color:'#fff',padding:'14px 28px',borderRadius:10,fontSize:16,fontWeight:600,display:'inline-flex',alignItems:'center',gap:8}}>
              <i className="ti ti-map-2"></i> Open the tracker
            </Link>
            <a href="#pricing" style={{background:'rgba(255,255,255,0.08)',color:'#fff',padding:'14px 28px',borderRadius:10,fontSize:16,fontWeight:500,border:'1px solid rgba(255,255,255,0.15)'}}>
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'24px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:24,textAlign:'center'}}>
          {[
            {num:'50',label:'States covered'},
            {num:'3',label:'Law types tracked'},
            {num:'Live',label:'AI-powered lookups'},
            {num:'<10s',label:'Average lookup time'},
          ].map(s=>(
            <div key={s.num}>
              <div style={{fontSize:28,fontWeight:700,color:'#1B4FD8'}}>{s.num}</div>
              <div style={{fontSize:13,color:'#64748B'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section style={{padding:'72px 24px',background:'#F8FAFC'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontSize:32,fontWeight:700,textAlign:'center',marginBottom:12}}>Built for healthcare compliance professionals</h2>
          <p style={{textAlign:'center',color:'#64748B',marginBottom:48,fontSize:16}}>Anyone who needs to know which IDR rules apply — fast.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20}}>
            {[
              {icon:'ti-stethoscope',title:'Providers & hospitals',desc:'Know exactly which IDR process to file under before submitting a dispute.'},
              {icon:'ti-building-bank',title:'Health plans & TPAs',desc:'Stay compliant across all markets. Know which states require state-level IDR.'},
              {icon:'ti-receipt',title:'Billing companies',desc:'Advise clients accurately on dispute rights across every state they operate in.'},
              {icon:'ti-scale',title:'Healthcare attorneys',desc:'Reference current law status instantly without hours of research.'},
            ].map(c=>(
              <div key={c.title} style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:12,padding:'24px 20px'}}>
                <div style={{width:44,height:44,background:'#EFF6FF',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>
                  <i className={`ti ${c.icon}`} style={{fontSize:22,color:'#1B4FD8'}}></i>
                </div>
                <div style={{fontWeight:600,fontSize:15,marginBottom:6}}>{c.title}</div>
                <div style={{fontSize:13,color:'#64748B',lineHeight:1.6}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding:'72px 24px',background:'#fff'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontSize:32,fontWeight:700,textAlign:'center',marginBottom:48}}>What you get with every lookup</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:32}}>
            {[
              {icon:'ti-antenna-bars-5',color:'#059669',bg:'#ECFDF5',title:'Live AI web search',desc:'Every lookup searches CMS, state DOI sites, and recent legal updates in real time. Never stale data.'},
              {icon:'ti-map-2',color:'#1B4FD8',bg:'#EFF6FF',title:'All 50 states',desc:'Federal, state, or bifurcated — instantly color-coded on an interactive US map.'},
              {icon:'ti-list-check',color:'#7C3AED',bg:'#F5F3FF',title:'Key rules & requirements',desc:'Plain-English breakdown of what the law requires, who it affects, and what\'s changed recently.'},
              {icon:'ti-external-link',color:'#D97706',bg:'#FFFBEB',title:'Official source links',desc:'Every result links directly to the CMS page, state DOI, or official statute — cite your source.'},
              {icon:'ti-bell',color:'#DC2626',bg:'#FEF2F2',title:'Recent changes flagged',desc:'AI highlights any notable law changes in the past 1–2 years so you\'re never caught off guard.'},
              {icon:'ti-refresh',color:'#0891B2',bg:'#ECFEFF',title:'On-demand refresh',desc:'Results are cached for speed, but you can force a fresh lookup anytime with one click.'},
            ].map(f=>(
              <div key={f.title} style={{display:'flex',gap:16}}>
                <div style={{width:42,height:42,background:f.bg,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <i className={`ti ${f.icon}`} style={{fontSize:20,color:f.color}}></i>
                </div>
                <div>
                  <div style={{fontWeight:600,fontSize:15,marginBottom:4}}>{f.title}</div>
                  <div style={{fontSize:13,color:'#64748B',lineHeight:1.6}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{padding:'72px 24px',background:'#F8FAFC'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <h2 style={{fontSize:32,fontWeight:700,textAlign:'center',marginBottom:8}}>Simple, transparent pricing</h2>
          <p style={{textAlign:'center',color:'#64748B',marginBottom:32,fontSize:16}}>Less than one hour of a billing consultant's time. No contracts, cancel anytime.</p>

          <div style={{display:'flex',justifyContent:'center',marginBottom:36}}>
            <div style={{background:'#E2E8F0',borderRadius:8,padding:4,display:'inline-flex',gap:4}}>
              {['monthly','annual'].map(b=>(
                <button key={b} onClick={()=>setBilling(b)}
                  style={{padding:'8px 20px',borderRadius:6,fontSize:14,fontWeight:500,
                    background:billing===b?'#fff':'transparent',
                    color:billing===b?'#0F172A':'#64748B',
                    border:'none',cursor:'pointer',
                    boxShadow:billing===b?'0 1px 3px rgba(0,0,0,0.1)':'none'}}>
                  {b==='monthly'?'Monthly':'Annual (save 20%)'}
                </button>
              ))}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20,alignItems:'start'}}>

            {/* Single Use */}
            <div style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:14,padding:'28px 24px'}}>
              <div style={{fontSize:13,fontWeight:600,color:'#64748B',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Single lookup</div>
              <div style={{fontSize:40,fontWeight:700,color:'#0F172A',marginBottom:4}}>$9.99</div>
              <div style={{fontSize:13,color:'#94A3B8',marginBottom:20}}>one time · one state</div>
              <Link href="/checkout?plan=single" style={{display:'block',textAlign:'center',background:'#F1F5F9',color:'#0F172A',padding:'12px',borderRadius:8,fontWeight:600,fontSize:14,marginBottom:20}}>
                Get started
              </Link>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {['1 state lookup','Full AI analysis','Key rules & dates','Official source link','Session expires after use'].map(f=>(
                  <li key={f} style={{fontSize:13,color:'#475569',display:'flex',alignItems:'center',gap:8}}>
                    <i className="ti ti-check" style={{color:'#059669',fontSize:15}}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Monthly */}
            <div style={{background:'#0A1628',border:'2px solid #1B4FD8',borderRadius:14,padding:'28px 24px',position:'relative'}}>
              <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#1B4FD8',color:'#fff',fontSize:12,fontWeight:600,padding:'4px 14px',borderRadius:20}}>Most popular</div>
              <div style={{fontSize:13,fontWeight:600,color:'#60A5FA',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Monthly</div>
              <div style={{fontSize:40,fontWeight:700,color:'#fff',marginBottom:4}}>$79</div>
              <div style={{fontSize:13,color:'#94A3B8',marginBottom:20}}>per month · all 50 states</div>
              <Link href="/checkout?plan=monthly" style={{display:'block',textAlign:'center',background:'#1B4FD8',color:'#fff',padding:'12px',borderRadius:8,fontWeight:600,fontSize:14,marginBottom:20}}>
                Start free trial
              </Link>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {['All 50 states','Unlimited lookups','Live AI + web search','Recent changes alerts','On-demand refresh','Cancel anytime'].map(f=>(
                  <li key={f} style={{fontSize:13,color:'#CBD5E1',display:'flex',alignItems:'center',gap:8}}>
                    <i className="ti ti-check" style={{color:'#4ADE80',fontSize:15}}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Annual */}
            <div style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:14,padding:'28px 24px'}}>
              <div style={{fontSize:13,fontWeight:600,color:'#64748B',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Annual</div>
              <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:4}}>
                <span style={{fontSize:40,fontWeight:700,color:'#0F172A'}}>{billing==='annual'?'$749':'$749'}</span>
              </div>
              <div style={{fontSize:13,color:'#94A3B8',marginBottom:20}}>per year · saves $199</div>
              <Link href="/checkout?plan=annual" style={{display:'block',textAlign:'center',background:'#F1F5F9',color:'#0F172A',padding:'12px',borderRadius:8,fontWeight:600,fontSize:14,marginBottom:20}}>
                Get started
              </Link>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {['Everything in monthly','2 months free','Priority support','Early access to new features'].map(f=>(
                  <li key={f} style={{fontSize:13,color:'#475569',display:'flex',alignItems:'center',gap:8}}>
                    <i className="ti ti-check" style={{color:'#059669',fontSize:15}}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Team */}
            <div style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:14,padding:'28px 24px'}}>
              <div style={{fontSize:13,fontWeight:600,color:'#64748B',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Team</div>
              <div style={{fontSize:40,fontWeight:700,color:'#0F172A',marginBottom:4}}>$299</div>
              <div style={{fontSize:13,color:'#94A3B8',marginBottom:20}}>per month · up to 10 users</div>
              <Link href="/checkout?plan=team" style={{display:'block',textAlign:'center',background:'#F1F5F9',color:'#0F172A',padding:'12px',borderRadius:8,fontWeight:600,fontSize:14,marginBottom:20}}>
                Contact us
              </Link>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
                {['Up to 10 team members','Shared lookup history','Admin dashboard','Priority support','Custom onboarding'].map(f=>(
                  <li key={f} style={{fontSize:13,color:'#475569',display:'flex',alignItems:'center',gap:8}}>
                    <i className="ti ti-check" style={{color:'#059669',fontSize:15}}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:'#0A1628',padding:'40px 24px',textAlign:'center'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:12}}>
          <div style={{width:28,height:28,background:'#1B4FD8',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <i className="ti ti-map-2" style={{color:'#fff',fontSize:15}}></i>
          </div>
          <span style={{fontWeight:700,fontSize:15,color:'#fff'}}>NSA/IDR Tracker</span>
        </div>
        <p style={{fontSize:12,color:'#475569',maxWidth:500,margin:'0 auto'}}>
          For informational purposes only. Not legal advice. Always verify with official sources and qualified counsel for compliance decisions.
        </p>
      </footer>
    </>
  )
}
