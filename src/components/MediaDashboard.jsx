import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, Monitor, Share2, 
  Settings, Users, ChevronDown, CheckCircle, Clock, Link2
} from 'lucide-react';

const DashboardCard = ({ title, subtitle, source, children, style, contentStyle }) => (
  <div style={{ 
    backgroundColor: '#ffffff', 
    border: '1px solid #e5e7eb', 
    borderRadius: '6px', 
    display: 'flex', 
    flexDirection: 'column', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    ...style 
  }}>
    <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', ...contentStyle }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111827' }}>{title}</h3>
      {subtitle && <p style={{ margin: '4px 0 16px 0', fontSize: '12px', color: '#6b7280' }}>{subtitle}</p>}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
    {source && (
      <div style={{ 
        padding: '10px 16px', 
        borderTop: '1px solid #e5e7eb', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        fontSize: '12px', 
        color: '#6b7280' 
      }}>
        <Link2 size={14} />
        Source: {source}
      </div>
    )}
  </div>
);

export default function MediaDashboard({ onBack }) {
  const [currentPage, setCurrentPage] = useState('news');
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  const newsSubTabs = ['Overview', 'Sentimen', 'Top Person', 'Top Organization', 'Top Media', 'Top Influencer', 'Top Keywords', 'Maps', 'Gallery', 'Source News', 'Compare Issue'];
  const socialSubTabs = ['Overview', 'Engagement', 'Top Contributors', 'Audience Insights', 'Sentiment Analysis', 'Emotion Trend', 'Monitoring Akun', 'Maps', 'Chronology', 'Compare Issue'];
  const subTabs = currentPage === 'news' ? newsSubTabs : socialSubTabs;

  return (
    <div className="modern-dashboard-theme" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6', // Light gray background
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      color: '#111827',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '64px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        flexShrink: 0,
        zIndex: 10
      }}>
        {/* MI Logo placeholder */}
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#3b82f6',
          borderRadius: '8px',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px'
        }}>
          mi
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, width: '100%', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '10px' }} title="Home"><Monitor size={20} /></button>
          
          {/* Active indicator logic for tabs */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            {currentPage === 'news' && <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '3px', backgroundColor: '#3b82f6', borderRadius: '0 4px 4px 0' }} />}
            <button 
              onClick={() => setCurrentPage('news')} 
              style={{ 
                background: currentPage === 'news' ? '#eff6ff' : 'none', 
                border: 'none', 
                color: currentPage === 'news' ? '#3b82f6' : '#6b7280', 
                cursor: 'pointer', 
                padding: '10px', 
                borderRadius: '8px' 
              }} 
            >
              <Monitor size={20} />
            </button>
          </div>

          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            {currentPage === 'social' && <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '3px', backgroundColor: '#3b82f6', borderRadius: '0 4px 4px 0' }} />}
            <button 
              onClick={() => setCurrentPage('social')} 
              style={{ 
                background: currentPage === 'social' ? '#eff6ff' : 'none', 
                border: 'none', 
                color: currentPage === 'social' ? '#3b82f6' : '#6b7280', 
                cursor: 'pointer', 
                padding: '10px', 
                borderRadius: '8px' 
              }} 
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Exit & Profile */}
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '10px', marginBottom: '16px' }} title="Back">
          <ArrowLeft size={20} />
        </button>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          SU
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        
        {/* TOP HEADER */}
        <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '20px 24px 0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700' }}>Overview</h1>
              <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', gap: '6px' }}>
                <span style={{ color: '#9ca3af' }}>{currentPage === 'news' ? 'News Media' : 'Social Media'}</span>
                <span>&gt;</span>
                <span style={{ color: '#374151' }}>Overview</span>
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <Search size={20} />
            </button>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '0' }}>
            {subTabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 0 12px 0',
                  fontSize: '14px',
                  fontWeight: activeSubTab === tab ? '600' : '400',
                  color: activeSubTab === tab ? '#2563eb' : '#4b5563',
                  borderBottom: activeSubTab === tab ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main style={{ padding: '24px', overflowY: 'auto', flexGrow: 1 }}>
          
          {/* FILTER BAR */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
              Filter <span style={{ backgroundColor: '#bfdbfe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{currentPage === 'news' ? '2' : '4'}</span> <ChevronDown size={14} />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', color: '#0369a1', cursor: 'pointer' }}>
              <Settings size={14} /> General <ChevronDown size={14} />
            </button>
            {currentPage === 'social' && (
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', color: '#0369a1', cursor: 'pointer' }}>
                <Users size={14} /> Account Not Found <ChevronDown size={14} />
              </button>
            )}
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', color: '#0369a1', cursor: 'pointer' }}>
              <Clock size={14} /> 18 Jul 26, 13:34 - 19 Jul 26, 13:34
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
              Platform <span style={{ backgroundColor: '#bfdbfe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{currentPage === 'news' ? '3' : '6'}</span>
            </button>
          </div>

          {/* PAGE 1: NEWS MEDIA (News IMA) */}
          {currentPage === 'news' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Exposure Trend */}
              <DashboardCard 
                title="Exposure Trend" 
                subtitle="Displays the trend in exposure, indicating the volume of news coverage published by mainstream media over time."
                source="Mainstream Media"
              >
                <div style={{ width: '100%', height: '220px', position: 'relative', marginTop: '20px' }}>
                  <svg viewBox="0 0 800 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                      <g key={y}>
                        <line x1="40" y1={y} x2="800" y2={y} stroke="#f3f4f6" />
                        <text x="30" y={200 - y + 4} fill="#9ca3af" fontSize="10" textAnchor="end">{y === 0 ? '0' : y === 200 ? '3K' : y === 150 ? '2,5K' : y === 100 ? '1,5K' : '1K'}</text>
                      </g>
                    ))}
                    
                    {/* Bars */}
                    {[300, 2200, 2300, 1900, 2100, 2000, 1600, 1800, 1600, 1100, 800, 200, 100, 400, 200, 300, 400, 700, 1000, 1200, 1100, 1300, 1400, 1300, 600].map((val, i) => {
                      const h = (val / 3000) * 200;
                      return (
                        <rect key={i} x={50 + i * 30} y={200 - h} width="12" height={h} fill="#1e3a8a" />
                      );
                    })}
                    {/* X axis labels */}
                    {['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00'].map((time, i) => (
                      <text key={i} x={56 + i * 30} y="220" fill="#9ca3af" fontSize="10" textAnchor="middle">{time}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Total News */}
              <DashboardCard style={{ padding: '0' }} contentStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Total News</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>34.212</div>
                </div>
                <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '4px', color: '#3b82f6' }}>
                  <TrendingUp size={16} />
                </div>
              </DashboardCard>

              {/* Sentiment Proportion & Distribution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <DashboardCard title="Sentiment Proportion" subtitle="Displays the proportion of positive, negative, and neutral" source="Mainstream Media">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', height: '180px' }}>
                    <div style={{ width: '160px', height: '160px', position: 'relative' }}>
                      <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#dc2626" strokeWidth="6" strokeDasharray="20 100" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#4b5563" strokeWidth="6" strokeDasharray="34 100" strokeDashoffset="-20" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#1d4ed8" strokeWidth="6" strokeDasharray="46 100" strokeDashoffset="-54" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#1d4ed8' }}></div> Positive (15,53K)</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#4b5563' }}></div> Neutral (11,78K)</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#dc2626' }}></div> Negative (6,91K)</div>
                    </div>
                  </div>
                </DashboardCard>
                
                <DashboardCard title="Sentiment Distribution" subtitle="Displays the trend in sentiment over time within mainstream media reporting." source="Mainstream Media">
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '10px', fontSize: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#dc2626' }}></div> Negative</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}></div> Neutral</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#1d4ed8' }}></div> Positive</span>
                  </div>
                  <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                    <svg viewBox="0 0 600 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 37.5, 75, 112.5, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="600" y2={y} stroke="#f3f4f6" />
                      ))}
                      {/* Lines & Points - Blue/Positive */}
                      <path d="M 40 120 L 70 40 L 100 20 L 130 50 L 160 40 L 190 100 L 220 60 L 250 70 L 280 110 L 310 130 L 340 140 L 370 120 L 400 130 L 430 130 L 460 110 L 490 80 L 520 90 L 550 40 L 580 60" fill="none" stroke="#1d4ed8" strokeWidth="2" />
                      {/* Grey/Neutral */}
                      <path d="M 40 130 L 70 70 L 100 70 L 130 90 L 160 70 L 190 70 L 220 80 L 250 90 L 280 120 L 310 140 L 340 130 L 370 140 L 400 120 L 430 140 L 460 120 L 490 70 L 520 60 L 550 80 L 580 100" fill="none" stroke="#4b5563" strokeWidth="2" />
                      {/* Red/Negative */}
                      <path d="M 40 140 L 70 80 L 100 90 L 130 90 L 160 80 L 190 90 L 220 80 L 250 110 L 280 110 L 310 145 L 340 140 L 370 145 L 400 140 L 430 130 L 460 110 L 490 120 L 520 120 L 550 120 L 580 140" fill="none" stroke="#dc2626" strokeWidth="2" />
                    </svg>
                  </div>
                </DashboardCard>
              </div>

              {/* Sentiment Target */}
              <DashboardCard title="Sentiment Target" subtitle="Displays sentiment target in mainstream media coverage." source="Mainstream Media">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px', fontSize: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#dc2626' }}></div> Negative</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#4b5563' }}></div> Neutral</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'10px', height:'10px', backgroundColor:'#1d4ed8' }}></div> Positive</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '160px', paddingBottom: '20px' }}>
                  {['Tni', 'Fifa', 'Prabowo', 'Donald Trump', 'Polri', 'Messi', 'Dpr', 'Epstein'].map((name, i) => {
                    const hBlue = [40, 20, 20, 15, 10, 5, 5, 2][i];
                    const hGrey = [40, 30, 20, 20, 15, 5, 5, 2][i];
                    const hRed  = [20, 10, 10, 5, 5, 2, 2, 1][i];
                    return (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px' }}>
                        <div style={{ width: '16px', height: `${hBlue}px`, backgroundColor: '#1d4ed8' }}></div>
                        <div style={{ width: '16px', height: `${hGrey}px`, backgroundColor: '#4b5563' }}></div>
                        <div style={{ width: '16px', height: `${hRed}px`, backgroundColor: '#dc2626' }}></div>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>{name}</div>
                      </div>
                    )
                  })}
                </div>
              </DashboardCard>

            </div>
          )}

          {/* PAGE 2: SOCIAL MEDIA (Social Media ISA) */}
          {currentPage === 'social' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* KPIs Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { title: 'Total Exposure', val: '7.480.507 Postingan', icon: <TrendingUp size={16}/> },
                  { title: 'Total Engagements', val: '329.583.736,21 Engagement', icon: <Users size={16}/> },
                  { title: 'Total Contributor', val: '3.645.929 Account', icon: <TrendingUp size={16}/> }
                ].map(kpi => (
                  <div key={kpi.title} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{kpi.title}</div>
                      <div style={{ fontSize: '16px', fontWeight: '700' }}>{kpi.val}</div>
                    </div>
                    <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '50%', color: '#3b82f6' }}>
                      {kpi.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend & Keywords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <DashboardCard title="Exposure Trend" subtitle="Shows the trend in the number of posts and comments over time across social media platforms, indicating shifts in activity." source="Social Media">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '10px', fontSize: '12px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}></div> Facebook</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#db2777' }}></div> Instagram</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#9ca3af' }}></div> Threads</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#111827' }}></div> Tiktok</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#06b6d4' }}></div> Twitter</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#dc2626' }}></div> Youtube</span>
                    </div>
                    <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        {[0, 50, 100, 150, 200].map(y => (
                          <line key={y} x1="40" y1={y} x2="500" y2={y} stroke="#f3f4f6" />
                        ))}
                        {/* Twitter Area */}
                        <path d="M 50 80 Q 150 50 250 70 T 350 20 T 450 30 T 480 120 L 480 200 L 50 200 Z" fill="rgba(6, 182, 212, 0.4)" stroke="#06b6d4" strokeWidth="2" />
                        {/* Facebook Area */}
                        <path d="M 50 140 Q 150 150 250 145 T 350 150 T 450 140 L 480 160 L 480 200 L 50 200 Z" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
                      </svg>
                    </div>
                  </DashboardCard>
                  
                  <DashboardCard title="Engagement History" subtitle="Shows engagement trends over a defined time period on social media platforms, including likes, shares, comments, and other." source="Media Sosial">
                    <div style={{ width: '100%', height: '200px' }}>
                      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        {[0, 40, 80, 120, 160, 200].map(y => (
                          <line key={y} x1="40" y1={y} x2="500" y2={y} stroke="#f3f4f6" />
                        ))}
                        <path d="M 50 60 L 120 80 L 190 70 L 260 20 L 330 60 L 400 130 L 470 180" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#dot)" markerMid="url(#dot)" markerStart="url(#dot)"/>
                        <defs>
                          <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                            <circle cx="5" cy="5" r="5" fill="#06b6d4" />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                  </DashboardCard>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <DashboardCard title="Top Keywords" subtitle="Displays the top-performing keywords based on the" source="Social Media" style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', flexGrow: 1, padding: '20px' }}>
                      <span style={{ fontSize: '24px', color: '#0369a1' }}>bank account</span>
                      <span style={{ fontSize: '20px', color: '#b45309' }}>world cup</span>
                      <span style={{ fontSize: '26px', color: '#15803d' }}>donald trump</span>
                      <span style={{ fontSize: '22px', color: '#0284c7' }}>direct message</span>
                      <span style={{ fontSize: '28px', color: '#be185d' }}>terima kasih</span>
                      <span style={{ fontSize: '20px', color: '#047857' }}>melipa t_t angan</span>
                      <span style={{ fontSize: '22px', color: '#0369a1' }}>united states</span>
                      <span style={{ fontSize: '18px', color: '#166534' }}>west bank</span>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Top Keywords by Engagement" subtitle="Displays the top-performing keywords based on the" source="Social Media" style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignContent: 'center', justifyContent: 'center', flexGrow: 1, padding: '20px' }}>
                      <span style={{ fontSize: '18px', color: '#0369a1' }}>terima kasih</span>
                      <span style={{ fontSize: '20px', color: '#15803d' }}>kejaksaan agung</span>
                      <span style={{ fontSize: '14px', color: '#b45309' }}>hidup gue</span>
                      <span style={{ fontSize: '16px', color: '#be185d' }}>menteri pu</span>
                      <span style={{ fontSize: '14px', color: '#047857' }}>melipat tangan</span>
                    </div>
                  </DashboardCard>
                </div>
              </div>
              
              {/* Hashtags Treemap (Row 10 equivalent) */}
              <DashboardCard title="Top Hashtags" subtitle="Displays the most frequently used hashtags across social media posts and comments related to monitored issues." source="Social Media">
                <div style={{ display: 'flex', height: '240px', gap: '2px', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                  <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ flex: 1.5, backgroundColor: '#f59e0b', padding: '12px' }}>NCT 127<br/>(15.560)</div>
                    <div style={{ flex: 1, backgroundColor: '#06b6d4', padding: '12px' }}>NCT 10TH<br/>ANNIVERSARY<br/>(15.397)</div>
                  </div>
                  <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ flex: 1, backgroundColor: '#34d399', padding: '12px' }}>127 INBALI<br/>(15.308)</div>
                    <div style={{ flex: 1, backgroundColor: '#6ee7b7', padding: '12px' }}>FYP<br/>(13.671)</div>
                  </div>
                  <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ flex: 1, backgroundColor: '#fcd34d', padding: '12px' }}>ZONAUANG<br/>(11.770)</div>
                    <div style={{ flex: 1, backgroundColor: '#fb7185', padding: '12px' }}>POLRIUNTUKMASYARAKAT<br/>(7.917)</div>
                    <div style={{ flex: 1, backgroundColor: '#f43f5e', padding: '12px' }}>VIRAL<br/>(7.787)</div>
                  </div>
                  <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ flex: 1, backgroundColor: '#c084fc', padding: '12px' }}>FIFAWORLDCUP<br/>(7.487)</div>
                    <div style={{ flex: 1, backgroundColor: '#a78bfa', padding: '12px' }}>KEMENTERIANDESAP<br/>DT<br/>(7.301)</div>
                  </div>
                </div>
              </DashboardCard>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
