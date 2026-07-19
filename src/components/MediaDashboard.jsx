import React, { useState } from 'react';
import { 
  Share2, Monitor, Filter, Settings, Users, Clock, 
  ChevronDown, Calendar, Search, ExternalLink, RefreshCw, ArrowLeft
} from 'lucide-react';

// Half Donut Chart Component
const HalfDonutChart = ({ data }) => {
  // data format: [{ label, value, color, percent }]
  let currentOffset = 0;
  const radius = 50;
  const circumference = Math.PI * radius; // 157.08 for semi-circle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '200px', height: '110px', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 120 70" style={{ width: '100%', height: '100%' }}>
          {/* Base gray background track */}
          <path 
            d="M 10 60 A 50 50 0 0 1 110 60" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="14" 
            strokeLinecap="butt" 
          />
          {data.map((item, index) => {
            const strokeLength = (item.percent / 100) * circumference;
            const strokeOffset = circumference - currentOffset;
            currentOffset += strokeLength;

            return (
              <path
                key={index}
                d="M 10 60 A 50 50 0 0 1 110 60"
                fill="none"
                stroke={item.color}
                strokeWidth="14"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px', fontSize: '11px' }}>
        {data.map((item, index) => (
          <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: item.color, borderRadius: '2px' }} />
            <span style={{ color: '#4b5563' }}>{item.label} — {item.value} ({item.percent}%)</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default function MediaDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('social'); // 'social' or 'news'

  // Social Media Data Mock
  const socialMetrics = [
    { title: 'Total Post', value: '4.432.197', color: '#2563eb' },
    { title: 'Total Engagement', value: '4.932.578', color: '#7c3aed' },
    { title: 'Total Akun', value: '927.218', color: '#0d9488' },
    { title: 'Impressi', value: '102.695B', color: '#16a34a' }
  ];

  const socialSentimentData = [
    { label: 'Negatif', value: '1.68M', color: '#dc2626', percent: 49.7 },
    { label: 'Netral', value: '1.12M', color: '#4b5563', percent: 33.2 },
    { label: 'Positif', value: '630K', color: '#2563eb', percent: 18.6 }
  ];

  const socialSentimentEngagementData = [
    { label: 'Negatif', value: '3.50M', color: '#dc2626', percent: 50.5 },
    { label: 'Netral', value: '2.75M', color: '#4b5563', percent: 39.7 },
    { label: 'Positif', value: '680K', color: '#2563eb', percent: 9.8 }
  ];

  // Online News Data Mock
  const newsMetrics = [
    { title: 'Total News', value: '19.081', color: '#2563eb' },
    { title: 'Sentimen Positif', value: '5.630', color: '#16a34a' },
    { title: 'Sentimen Netral', value: '9.890', color: '#4b5563' },
    { title: 'Sentimen Negatif', value: '1.000', color: '#dc2626' }
  ];

  const newsSentimentData = [
    { label: 'Positif', value: '5.63K', color: '#16a34a', percent: 29.5 },
    { label: 'Netral', value: '9.89K', color: '#4b5563', percent: 51.8 },
    { label: 'Negatif', value: '1.00K', color: '#dc2626', percent: 18.7 }
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '"Inter", sans-serif',
      color: '#0f172a',
      width: '100vw'
    }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: '64px',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        flexShrink: 0
      }}>
        {/* MI Blue Logo Icon */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '800',
          fontSize: '14px',
          marginBottom: '32px'
        }}>
          mi
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1, width: '100%', alignItems: 'center' }}>
          <button 
            onClick={() => setActiveTab('social')} 
            style={{ 
              background: activeTab === 'social' ? '#1e293b' : 'none', 
              border: 'none', 
              color: activeTab === 'social' ? '#3b82f6' : '#94a3b8', 
              cursor: 'pointer', 
              padding: '12px', 
              borderRadius: '8px',
              transition: 'all 0.2s'
            }} 
            title="Monitoring Social Media"
          >
            <Share2 size={22} />
          </button>
          
          <button 
            onClick={() => setActiveTab('news')} 
            style={{ 
              background: activeTab === 'news' ? '#1e293b' : 'none', 
              border: 'none', 
              color: activeTab === 'news' ? '#3b82f6' : '#94a3b8', 
              cursor: 'pointer', 
              padding: '12px', 
              borderRadius: '8px',
              transition: 'all 0.2s'
            }} 
            title="Monitoring Online News"
          >
            <Monitor size={22} />
          </button>
        </div>

        {/* Back Button & User Profile Avatar */}
        {onBack && (
          <button 
            onClick={onBack} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#94a3b8', 
              cursor: 'pointer', 
              padding: '10px', 
              marginBottom: '16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }} 
            title="Back"
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: '700'
        }}>
          DS
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, padding: '24px 32px' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>
              {activeTab === 'social' ? 'Social Media' : 'Online News'}
            </h1>
            <span style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              {activeTab === 'social' 
                ? 'Monitoring Media Sosial - Topik: Rupiah - 07-13 Jun 2026' 
                : 'Monitoring Berita Online - Topik: Rupiah - 07-13 Jun 2026'}
            </span>
          </div>

          {/* FILTER PILLS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: '500' }}>
              <span>T: Rupiah</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '6px 14px', fontSize: '12px' }}>
              <Calendar size={12} />
              <span>07 Jun - 13 Jun 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '6px 14px', fontSize: '12px' }}>
              <span>Account Not Found</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '6px 14px', fontSize: '12px' }}>
              <span>Platform {activeTab === 'social' ? '6' : '3'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '6px 14px', fontSize: '12px' }}>
              <span>Type Content 2</span>
            </div>
          </div>
        </header>

        {/* KPI CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {(activeTab === 'social' ? socialMetrics : newsMetrics).map(kpi => (
            <div key={kpi.title} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {kpi.title}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: kpi.color }}>
                {kpi.value}
              </div>
            </div>
          ))}
        </section>

        {/* SOCIAL MEDIA VIEW */}
        {activeTab === 'social' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Exposure & Impression */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Exposure & Impression
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Exposure Trend */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Exposure Trend</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Volume post per hari</span>
                  <div style={{ height: '180px', marginTop: '16px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      <path d="M 40 120 L 90 90 L 140 80 L 190 60 L 240 40 L 290 50 L 340 60" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                      {[120, 90, 80, 60, 40, 50, 60].map((y, i) => (
                        <circle key={i} cx={40 + i * 50} cy={y} r="4" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
                      ))}
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['2.0M', '2.5M', '3.0M', '3.5M', '4.0M', '4.5M'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Impression History */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Impression History</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Estimasi tayangan per hari</span>
                  <div style={{ height: '180px', marginTop: '16px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      <path d="M 40 130 L 90 110 L 140 90 L 190 60 L 240 40 L 290 55 L 340 70" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                      {[130, 110, 90, 60, 40, 55, 70].map((y, i) => (
                        <circle key={i} cx={40 + i * 50} cy={y} r="4" fill="#a78bfa" stroke="white" strokeWidth="1.5" />
                      ))}
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['8B', '12B', '16B', '20B', '24B', '28B'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sentiment Analysis
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px', marginBottom: '20px' }}>
                {/* Sentiment Trend */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Trend</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Trend sentimen 7 hari terakhir</span>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#dc2626' }}/> Negatif</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Netral</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}/> Positif</span>
                  </div>

                  <div style={{ height: '180px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      {/* Red/Neg line */}
                      <path d="M 40 90 L 90 85 L 140 75 L 190 70 L 240 65 L 290 60 L 340 70" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                      {/* Grey/Neu line */}
                      <path d="M 40 110 L 90 105 L 140 100 L 190 98 L 240 95 L 290 92 L 340 98" fill="none" stroke="#4b5563" strokeWidth="1.5" />
                      {/* Blue/Pos line */}
                      <path d="M 40 140 L 90 138 L 140 135 L 190 136 L 240 133 L 290 132 L 340 135" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['100', '180', '260', '340', '420', '500'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Sentiment Proportion */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Proportion</h3>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Distribusi persentase sentimen</span>
                  </div>
                  <div style={{ padding: '10px 0' }}>
                    <HalfDonutChart data={socialSentimentData} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>
                {/* Sentiment by Engagement */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment by Engagement</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Distribusi sentimen berdasarkan engagement harian</span>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#dc2626' }}/> Negatif</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Netral</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}/> Positif</span>
                  </div>

                  <div style={{ height: '180px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      {/* Red/Neg line */}
                      <path d="M 40 100 L 90 90 L 140 85 L 190 70 L 240 60 L 290 65 L 340 75" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                      {/* Grey/Neu line */}
                      <path d="M 40 120 L 90 115 L 140 110 L 190 108 L 240 102 L 290 105 L 340 110" fill="none" stroke="#4b5563" strokeWidth="1.5" />
                      {/* Blue/Pos line */}
                      <path d="M 40 142 L 90 140 L 140 138 L 190 135 L 240 134 L 290 135 L 340 137" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                      
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['0.5M', '1.0M', '1.5M', '2.0M', '2.5M', '3.0M'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Sentiment Proportion by Engagement */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Proportion by Engagement</h3>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Proporsi sentimen berdasarkan total engagement</span>
                  </div>
                  <div style={{ padding: '10px 0' }}>
                    <HalfDonutChart data={socialSentimentEngagementData} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ONLINE NEWS VIEW */}
        {activeTab === 'news' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Exposure Trend */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Exposure Trend
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Exposure Trend Bar Chart */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Exposure Trend</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Daily news volume</span>
                  <div style={{ height: '180px', marginTop: '16px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      {/* Bars */}
                      {[80, 100, 120, 140, 110, 95, 75].map((val, i) => (
                        <rect 
                          key={i} 
                          x={45 + i * 48} 
                          y={150 - val} 
                          width="24" 
                          height={val} 
                          fill="#2563eb" 
                          rx="2"
                        />
                      ))}
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={57 + i * 48} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['1K', '2K', '3K', '4K', '5K'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 - 15 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Sentiment Distribution */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Distribution</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Daily sentiment breakdown</span>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '8px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#dc2626' }}/> Negatif</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Netral</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#16a34a' }}/> Positif</span>
                  </div>

                  <div style={{ height: '180px' }}>
                    <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      {[0, 30, 60, 90, 120, 150].map(y => (
                        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                      ))}
                      <path d="M 40 100 L 90 92 L 140 85 L 190 70 L 240 75 L 290 85 L 340 90" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                      <path d="M 40 60 L 90 55 L 140 45 L 190 35 L 240 40 L 290 50 L 340 58" fill="none" stroke="#4b5563" strokeWidth="1.5" />
                      <path d="M 40 135 L 90 130 L 140 128 L 190 120 L 240 125 L 290 130 L 340 132" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                      
                      {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                        <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">{x}</text>
                      ))}
                      {['200', '400', '600', '800', '1K'].map((val, i) => (
                        <text key={i} x="20" y={150 - i * 30 - 15 + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sentiment Analysis
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '20px' }}>
                {/* Sentiment Proportion */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Proportion</h3>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Overall news sentiment proportion</span>
                  </div>
                  <div style={{ padding: '20px 0' }}>
                    <HalfDonutChart data={newsSentimentData} />
                  </div>
                </div>

                {/* Sentiment Target Stacked Bar Chart */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Sentiment Target</h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Sentiment towards key targets</span>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '16px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#dc2626' }}/> Negatif</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#4b5563' }}/> Netral</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#16a34a' }}/> Positif</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Pemerintah', pos: 50, neu: 35, neg: 15 },
                      { name: 'Indonesia', pos: 40, neu: 50, neg: 10 },
                      { name: 'Bank Indonesia', pos: 30, neu: 65, neg: 5 },
                      { name: 'Rupiah', pos: 25, neu: 55, neg: 20 }
                    ].map(target => (
                      <div key={target.name} style={{ display: 'flex', alignItems: 'center', fontSize: '11px' }}>
                        <div style={{ width: '100px', fontWeight: '500' }}>{target.name}</div>
                        <div style={{ flexGrow: 1, height: '16px', display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${target.pos}%`, backgroundColor: '#16a34a' }} title={`Positif: ${target.pos}%`} />
                          <div style={{ width: `${target.neu}%`, backgroundColor: '#4b5563' }} title={`Netral: ${target.neu}%`} />
                          <div style={{ width: `${target.neg}%`, backgroundColor: '#dc2626' }} title={`Negatif: ${target.neg}%`} />
                        </div>
                        <div style={{ width: '40px', textAlign: 'right', color: '#64748b', fontSize: '10px', marginLeft: '8px' }}>
                          {target.pos + target.neu + target.neg}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Person & Keywords */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Top Person & Keywords
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Top Person */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '600' }}>Top Person</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { name: 'Prabowo Subianto', count: '1.240 mentions' },
                      { name: 'Perry Warjiyo', count: '980 mentions' },
                      { name: 'Sri Mulyani', count: '850 mentions' },
                      { name: 'Joko Widodo', count: '620 mentions' },
                      { name: 'Gibran Rakabuming', count: '410 mentions' }
                    ].map((person, i) => (
                      <div key={person.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '6px', fontSize: '12px' }}>
                        <span style={{ fontWeight: '500' }}>{i + 1}. {person.name}</span>
                        <span style={{ color: '#2563eb', fontWeight: '600' }}>{person.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Keywords */}
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '600' }}>Top Keywords</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      'stabilitas ekonomi nasional', 'nilai tukar rupiah', 'inflasi terkendali', 
                      'suku bunga BI', 'pasar uang global', 'kebijakan moneter', 
                      'pertumbuhan ekonomi', 'cadangan devisa', 'investasi asing', 
                      'dolar AS', 'fiskal APBN', 'transaksi berjalan'
                    ].map(tag => (
                      <span 
                        key={tag} 
                        style={{ 
                          backgroundColor: '#f1f5f9', 
                          color: '#475569', 
                          border: '1px solid #e2e8f0',
                          padding: '6px 12px', 
                          borderRadius: '16px', 
                          fontSize: '11px', 
                          fontWeight: '500' 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
