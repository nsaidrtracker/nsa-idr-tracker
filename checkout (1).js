import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const baseData = {
  AL:{name:"Alabama",status:"federal"},AK:{name:"Alaska",status:"federal"},
  AZ:{name:"Arizona",status:"federal"},AR:{name:"Arkansas",status:"federal"},
  CA:{name:"California",status:"state"},CO:{name:"Colorado",status:"bifurcated"},
  CT:{name:"Connecticut",status:"state"},DE:{name:"Delaware",status:"federal"},
  FL:{name:"Florida",status:"bifurcated"},GA:{name:"Georgia",status:"federal"},
  HI:{name:"Hawaii",status:"bifurcated"},ID:{name:"Idaho",status:"federal"},
  IL:{name:"Illinois",status:"bifurcated"},IN:{name:"Indiana",status:"federal"},
  IA:{name:"Iowa",status:"federal"},KS:{name:"Kansas",status:"federal"},
  KY:{name:"Kentucky",status:"federal"},LA:{name:"Louisiana",status:"federal"},
  ME:{name:"Maine",status:"bifurcated"},MD:{name:"Maryland",status:"state"},
  MA:{name:"Massachusetts",status:"state"},MI:{name:"Michigan",status:"federal"},
  MN:{name:"Minnesota",status:"bifurcated"},MS:{name:"Mississippi",status:"federal"},
  MO:{name:"Missouri",status:"federal"},MT:{name:"Montana",status:"federal"},
  NE:{name:"Nebraska",status:"federal"},NV:{name:"Nevada",status:"bifurcated"},
  NH:{name:"New Hampshire",status:"bifurcated"},NJ:{name:"New Jersey",status:"state"},
  NM:{name:"New Mexico",status:"bifurcated"},NY:{name:"New York",status:"state"},
  NC:{name:"North Carolina",status:"federal"},ND:{name:"North Dakota",status:"federal"},
  OH:{name:"Ohio",status:"federal"},OK:{name:"Oklahoma",status:"federal"},
  OR:{name:"Oregon",status:"bifurcated"},PA:{name:"Pennsylvania",status:"federal"},
  RI:{name:"Rhode Island",status:"bifurcated"},SC:{name:"South Carolina",status:"federal"},
  SD:{name:"South Dakota",status:"federal"},TN:{name:"Tennessee",status:"federal"},
  TX:{name:"Texas",status:"bifurcated"},UT:{name:"Utah",status:"federal"},
  VT:{name:"Vermont",status:"bifurcated"},VA:{name:"Virginia",status:"bifurcated"},
  WA:{name:"Washington",status:"state"},WV:{name:"West Virginia",status:"federal"},
  WI:{name:"Wisconsin",status:"federal"},WY:{name:"Wyoming",status:"federal"}
}

const statusColors = {federal:"#378ADD",state:"#1D9E75",bifurcated:"#EF9F27",pending:"#888780"}
const fipsToAbbr = {"01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI","45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV","55":"WI","56":"WY"}

export default function Tracker() {
  const router = useRouter()
  const { access, plan, state: lockedState } = router.query
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cache, setCache] = useState({})
  const [usedSingleLookup, setUsedSingleLookup] = useState(false)

  const isSingle = plan === 'single'
  const isPaid = access === 'paid' || access === 'trial'
  const hasAccess = isPaid

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Load D3 and TopoJSON dynamically
    const loadScripts = async () => {
      if (!window.d3) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js')
      }
      if (!window.topojson) {
        await loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js')
      }
      drawMap()
    }
    loadScripts()
  }, [mapLoaded])

  function loadScript(src) {
    return new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      document.head.appendChild(s)
    })
  }

  async function drawMap() {
    if (!mapRef.current || !window.d3 || !window.topojson) return
    try {
      const res = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      const us = await res.json()
      const states = window.topojson.feature(us, us.objects.states)
      const width = 960, height = 600
      const projection = window.d3.geoAlbersUsa().scale(1280).translate([width/2, height/2])
      const path = window.d3.geoPath().projection(projection)
      const svg = window.d3.select(mapRef.current).append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('width','100%').style('height','auto')

      svg.selectAll('path')
        .data(states.features)
        .enter().append('path')
        .attr('d', path)
        .attr('fill', d => {
          const abbr = fipsToAbbr[String(d.id).padStart(2,'0')]
          return baseData[abbr] ? statusColors[baseData[abbr].status] : statusColors.pending
        })
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.6)
        .style('cursor','pointer')
        .style('transition','opacity 0.15s')
        .on('mouseover', function() { window.d3.select(this).style('opacity', 0.8) })
        .on('mouseout', function() { window.d3.select(this).style('opacity', 1) })
        .on('click', function(event, d) {
          const abbr = fipsToAbbr[String(d.id).padStart(2,'0')]
          if (!abbr) return
          svg.selectAll('path').attr('stroke','#fff').attr('stroke-width',0.6)
          window.d3.select(this).attr('stroke','#0F172A').attr('stroke-width',2)
          handleStateClick(abbr)
        })
        .append('title')
        .text(d => {
          const abbr = fipsToAbbr[String(d.id).padStart(2,'0')]
          return abbr && baseData[abbr] ? baseData[abbr].name : ''
        })

      states.features.forEach(d => {
        const abbr = fipsToAbbr[String(d.id).padStart(2,'0')]
        if (!abbr) return
        const centroid = path.centroid(d)
        if (!centroid || isNaN(centroid[0])) return
        svg.append('text')
          .attr('x', centroid[0]).attr('y', centroid[1]+4)
          .attr('text-anchor','middle').attr('font-size','8')
          .attr('font-family','sans-serif').attr('font-weight','600')
          .attr('fill','white').attr('pointer-events','none')
          .text(abbr)
      })

      setMapLoaded(true)
    } catch(e) {
      console.error('Map load failed', e)
    }
  }

  async function handleStateClick(abbr) {
    if (!hasAccess) {
      router.push('/#pricing')
      return
    }
    if (isSingle && usedSingleLookup && selected !== abbr) {
      alert('Your single-state lookup has been used. Please upgrade for full access.')
      return
    }
    if (isSingle && lockedState && abbr !== lockedState) {
      alert(`Your single-state lookup is locked to ${baseData[lockedState]?.name || lockedState}.`)
      return
    }
    setSelected(abbr)
    if (cache[abbr]) {
      setDetail({data: cache[abbr], fromCache: true, abbr})
      return
    }
    await fetchStateInfo(abbr)
  }

  async function fetchStateInfo(abbr, forceRefresh) {
    if (isSingle && usedSingleLookup && !forceRefresh) return
    setLoading(true)
    setDetail(null)
    try {
      const res = await fetch('/api/lookup', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({abbr, stateName: baseData[abbr]?.name})
      })
      const parsed = await res.json()
      setCache(prev => ({...prev, [abbr]: parsed}))
      setDetail({data: parsed, fromCache: false, abbr})
      if (isSingle) setUsedSingleLookup(true)
    } catch(e) {
      setDetail({error: true, abbr})
    } finally {
      setLoading(false)
    }
  }

  const statusLabel = s => ({federal:'Federal law',state:'State law',bifurcated:'Bifurcated',pending:'Pending'}[s] || s)
  const badgeStyle = s => {
    const styles = {
      federal:{background:'#DBEAFE',color:'#1D4ED8'},
      state:{background:'#D1FAE5',color:'#065F46'},
      bifurcated:{background:'#FEF3C7',color:'#92400E'},
      pending:{background:'#F1F5F9',color:'#475569'}
    }
    return styles[s] || styles.pending
  }

  return (
    <>
      <Head>
        <title>NSA/IDR State Law Tracker</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{minHeight:'100vh',background:'#F8FAFC',fontFamily:'Inter, sans-serif'}}>

        {/* Top bar */}
        <div style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:30,height:30,background:'#1B4FD8',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <i className="ti ti-map-2" style={{color:'#fff',fontSize:16}}></i>
            </div>
            <span style={{fontWeight:700,fontSize:15,color:'#0F172A'}}>NSA/IDR Tracker</span>
          </Link>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            {isSingle && (
              <span style={{fontSize:12,background:'#FEF3C7',color:'#92400E',padding:'4px 10px',borderRadius:6,fontWeight:500}}>
                Single lookup {usedSingleLookup ? '· Used' : '· 1 remaining'}
              </span>
            )}
            {!hasAccess && (
              <Link href="/#pricing" style={{background:'#1B4FD8',color:'#fff',padding:'7px 16px',borderRadius:7,fontSize:13,fontWeight:600}}>
                Upgrade for full access
              </Link>
            )}
          </div>
        </div>

        <div style={{maxWidth:1100,margin:'0 auto',padding:'20px 20px'}}>

          {/* Legend + title */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:14}}>
            <div>
              <h1 style={{fontSize:20,fontWeight:700,color:'#0F172A',marginBottom:2}}>NSA / IDR State Law Tracker</h1>
              <p style={{fontSize:13,color:'#64748B'}}>
                {hasAccess ? 'Click any state for a live AI-powered law summary.' : 'Click a state to see its law type. Upgrade for full AI details.'}
              </p>
            </div>
            <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
              {[
                {color:'#378ADD',label:'Federal law'},
                {color:'#1D9E75',label:'State law'},
                {color:'#EF9F27',label:'Bifurcated'},
              ].map(l=>(
                <div key={l.label} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#64748B'}}>
                  <div style={{width:10,height:10,borderRadius:'50%',background:l.color}}></div>
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:12,padding:'8px',marginBottom:16}}>
            <div ref={mapRef}></div>
          </div>

          {/* Detail panel */}
          <div style={{background:'#fff',border:'1px solid #E2E8F0',borderRadius:12,padding:'20px',minHeight:90}}>
            {!selected && !loading && (
              <div style={{textAlign:'center',color:'#94A3B8',fontSize:14,padding:'16px 0'}}>
                <i className="ti ti-hand-click" style={{fontSize:24,display:'block',marginBottom:8}}></i>
                Click any state on the map to view its NSA/IDR law details
              </div>
            )}

            {loading && (
              <div style={{textAlign:'center',padding:'24px 0'}}>
                <div style={{width:24,height:24,border:'2px solid #E2E8F0',borderTopColor:'#1B4FD8',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px'}}></div>
                <div style={{fontSize:14,color:'#64748B'}}>Looking up current NSA/IDR law for <strong>{baseData[selected]?.name}</strong>…</div>
                <div style={{fontSize:12,color:'#94A3B8',marginTop:4}}>Searching CMS, state DOI, and recent legal updates</div>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            )}

            {detail?.error && (
              <div>
                <div style={{fontSize:14,color:'#DC2626',marginBottom:10}}>
                  <i className="ti ti-alert-circle"></i> Could not load live data. Check your connection and try again.
                </div>
                <button onClick={()=>fetchStateInfo(detail.abbr, true)}
                  style={{fontSize:13,padding:'7px 14px',borderRadius:7,border:'1px solid #E2E8F0',background:'#F8FAFC',cursor:'pointer'}}>
                  <i className="ti ti-refresh"></i> Retry
                </button>
              </div>
            )}

            {detail?.data && !loading && (() => {
              const d = detail.data
              const abbr = detail.abbr
              const status = d.status || baseData[abbr]?.status
              const bs = badgeStyle(status)
              const now = new Date().toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})
              return (
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:14}}>
                    <span style={{fontSize:18,fontWeight:700,color:'#0F172A'}}>{baseData[abbr]?.name}</span>
                    <span style={{...bs,fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:20}}>{statusLabel(status)}</span>
                    {detail.fromCache
                      ? <><span style={{fontSize:11,background:'#FEF3C7',color:'#92400E',padding:'3px 8px',borderRadius:20,display:'inline-flex',alignItems:'center',gap:4}}>
                          <i className="ti ti-clock" style={{fontSize:11}}></i> Cached
                        </span>
                        <button onClick={()=>{setCache(p=>({...p,[abbr]:undefined}));fetchStateInfo(abbr,true)}}
                          style={{fontSize:12,padding:'3px 8px',border:'1px solid #E2E8F0',borderRadius:6,background:'none',cursor:'pointer',color:'#64748B'}}>
                          <i className="ti ti-refresh" style={{fontSize:11}}></i> Refresh
                        </button></>
                      : <span style={{fontSize:11,background:'#D1FAE5',color:'#065F46',padding:'3px 8px',borderRadius:20,display:'inline-flex',alignItems:'center',gap:4}}>
                          <i className="ti ti-antenna-bars-5" style={{fontSize:11}}></i> Live
                        </span>
                    }
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                    <div>
                      <div style={{fontSize:11,color:'#94A3B8',marginBottom:2,textTransform:'uppercase',letterSpacing:'0.04em'}}>Effective date</div>
                      <div style={{fontSize:14,fontWeight:600,color:'#0F172A'}}>{d.effectiveDate || 'See source'}</div>
                    </div>
                    <div>
                      <div style={{fontSize:11,color:'#94A3B8',marginBottom:2,textTransform:'uppercase',letterSpacing:'0.04em'}}>Law type</div>
                      <div style={{fontSize:14,fontWeight:600,color:'#0F172A'}}>{statusLabel(status)}</div>
                    </div>
                  </div>

                  {d.summary && (
                    <div style={{borderTop:'1px solid #F1F5F9',paddingTop:12,marginBottom:12}}>
                      <div style={{fontSize:12,fontWeight:600,color:'#0F172A',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em'}}>Current status</div>
                      <div style={{fontSize:13,color:'#475569',lineHeight:1.7}}>{d.summary}</div>
                    </div>
                  )}

                  {d.keyRules?.length > 0 && (
                    <div style={{borderTop:'1px solid #F1F5F9',paddingTop:12,marginBottom:12}}>
                      <div style={{fontSize:12,fontWeight:600,color:'#0F172A',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.04em'}}>Key rules</div>
                      <ul style={{paddingLeft:18,margin:0,display:'flex',flexDirection:'column',gap:6}}>
                        {d.keyRules.map((r,i)=>(
                          <li key={i} style={{fontSize:13,color:'#475569',lineHeight:1.6}}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {d.recentChanges && (
                    <div style={{borderTop:'1px solid #F1F5F9',paddingTop:12,marginBottom:12}}>
                      <div style={{fontSize:12,fontWeight:600,color:'#0F172A',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em'}}>Recent changes</div>
                      <div style={{fontSize:13,color:'#475569',lineHeight:1.7}}>{d.recentChanges}</div>
                    </div>
                  )}

                  {d.whoItAffects && (
                    <div style={{borderTop:'1px solid #F1F5F9',paddingTop:12,marginBottom:12}}>
                      <div style={{fontSize:12,fontWeight:600,color:'#0F172A',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.04em'}}>Who it affects</div>
                      <div style={{fontSize:13,color:'#475569',lineHeight:1.7}}>{d.whoItAffects}</div>
                    </div>
                  )}

                  {d.sourceUrl && (
                    <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer"
                      style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:12,color:'#1B4FD8',marginTop:4}}>
                      <i className="ti ti-external-link" style={{fontSize:13}}></i> View official source
                    </a>
                  )}
                  <div style={{fontSize:11,color:'#CBD5E1',marginTop:10}}>{detail.fromCache?'Cached':'Live AI lookup'} · {now}</div>
                </div>
              )
            })()}
          </div>

          {/* Upgrade prompt for free users */}
          {!hasAccess && selected && (
            <div style={{marginTop:16,background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:10,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
              <div>
                <div style={{fontWeight:600,fontSize:14,color:'#1D4ED8',marginBottom:2}}>Unlock the full AI analysis</div>
                <div style={{fontSize:13,color:'#3B82F6'}}>Get key rules, recent changes, effective dates, and official source links.</div>
              </div>
              <Link href="/#pricing" style={{background:'#1B4FD8',color:'#fff',padding:'9px 18px',borderRadius:8,fontSize:13,fontWeight:600,whiteSpace:'nowrap'}}>
                See plans from $9.99
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
