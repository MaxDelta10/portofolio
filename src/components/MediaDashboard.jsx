import React, { useState } from 'react';
import { 
  Share2, Monitor, Filter, Settings, Users, Clock, 
  ChevronDown, Calendar, Search, ExternalLink, RefreshCw, ArrowLeft,
  TrendingUp, BarChart2, MessageSquare, ThumbsUp, Eye, Heart
} from 'lucide-react';

// Reusable SVG Donut Chart Component
const DonutChart = ({ data }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius; // 219.91
  let currentOffset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '130px', height: '130px', position: 'relative' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          {data.map((item, idx) => {
            const strokeLength = (item.percent / 100) * circumference;
            const strokeOffset = circumference - currentOffset;
            currentOffset += strokeLength;
            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', minWidth: '130px' }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: item.color, borderRadius: '50%' }} />
            <span style={{ color: '#4b5563', fontWeight: '500' }}>
              {item.label} <strong style={{ color: '#0f172a' }}>({item.value})</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, subtitle, source, children, style, contentStyle }) => (
  <div style={{ 
    backgroundColor: '#ffffff', 
    border: '1px solid #e2e8f0', 
    borderRadius: '8px', 
    display: 'flex', 
    flexDirection: 'column', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    ...style 
  }}>
    <div style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column', ...contentStyle }}>
      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{title}</h3>
      {subtitle && <p style={{ margin: '4px 0 16px 0', fontSize: '11px', color: '#64748b' }}>{subtitle}</p>}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
    {source && (
      <div style={{ 
        padding: '10px 18px', 
        borderTop: '1px solid #f1f5f9', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        fontSize: '11px', 
        color: '#94a3b8' 
      }}>
        <ExternalLink size={12} />
        Source: {source}
      </div>
    )}
  </div>
);

export default function MediaDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('social'); // 'social' or 'news'

  // Social Media Data (Copied directly from Ebdesk screenshots)
  const socialMetrics = [
    { title: 'Total Exposure', value: '17.132 Postingan', color: '#0f172a', icon: <TrendingUp size={16} /> },
    { title: 'Total Engagements', value: '118.314,91 Engagement', color: '#0f172a', icon: <Users size={16} /> },
    { title: 'Total Contributor', value: '12.047 Account', color: '#0f172a', icon: <TrendingUp size={16} /> }
  ];

  // Donut data for Social Media
  const socialSentimentProportion = [
    { label: 'Negative', value: '10,59K', color: '#b91c1c', percent: 61.84 },
    { label: 'Neutral', value: '4,06K', color: '#4b5563', percent: 23.69 },
    { label: 'Positive', value: '2,48K', color: '#2563eb', percent: 14.47 }
  ];

  const socialSentimentEngagement = [
    { label: 'Negative', value: '64,03K', color: '#b91c1c', percent: 54.12 },
    { label: 'Neutral', value: '16,08K', color: '#4b5563', percent: 13.59 },
    { label: 'Positive', value: '38,2K', color: '#2563eb', percent: 32.29 }
  ];

  const socialEmotionDistribution = [
    { label: 'Disgust', value: '2,85K', color: '#8b5cf6', percent: 33.27 },
    { label: 'Anticipation', value: '1,96K', color: '#f59e0b', percent: 22.83 },
    { label: 'Trust', value: '1,22K', color: '#84cc16', percent: 14.19 },
    { label: 'Sadness', value: '886', color: '#1d4ed8', percent: 10.33 },
    { label: 'Anger', value: '745', color: '#dc2626', percent: 8.68 },
    { label: 'Surprise', value: '476', color: '#06b6d4', percent: 5.55 },
    { label: 'Joy', value: '266', color: '#eab308', percent: 3.08 },
    { label: 'Fear', value: '176', color: '#10b981', percent: 2.05 }
  ];

  const socialEmotionEngagement = [
    { label: 'Anticipation', value: '28,28K', color: '#f59e0b', percent: 49.7 },
    { label: 'Trust', value: '13,37K', color: '#84cc16', percent: 23.5 },
    { label: 'Surprise', value: '6,02K', color: '#06b6d4', percent: 10.58 },
    { label: 'Joy', value: '4,63K', color: '#eab308', percent: 8.13 },
    { label: 'Anger', value: '2,17K', color: '#dc2626', percent: 3.81 },
    { label: 'Disgust', value: '1,31K', color: '#8b5cf6', percent: 2.3 },
    { label: 'Sadness', value: '738', color: '#1d4ed8', percent: 1.22 },
    { label: 'Fear', value: '387', color: '#10b981', percent: 0.7 }
  ];

  // News Metrics
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
                ? 'Monitoring Media Sosial - Topik: Presiden Prabowo' 
                : 'Monitoring Berita Online - Topik: Presiden Prabowo'}
            </span>
          </div>

          {/* FILTER PILLS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#334155' }}>
              Filter <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>4</span> <ChevronDown size={12} />
            </button>
            
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8', fontWeight: '600' }}>
              <Users size={12} /> Presiden Prabowo <ChevronDown size={12} />
            </button>

            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8' }}>
              Account Not Found <ChevronDown size={12} />
            </button>

            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8' }}>
              <Clock size={12} /> 18 Jul 26, 14:04 - 19 Jul 26, 14:04
            </button>

            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#334155' }}>
              Platform <span style={{ backgroundColor: '#cbd5e1', color: '#0f172a', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>6</span>
            </button>

            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#334155' }}>
              Type Content <span style={{ backgroundColor: '#cbd5e1', color: '#0f172a', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>2</span>
            </button>
          </div>
        </header>

        {/* SOCIAL MEDIA VIEW */}
        {activeTab === 'social' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* KPI CARDS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {socialMetrics.map(kpi => (
                <div key={kpi.title} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                      {kpi.title}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: kpi.color }}>
                      {kpi.value}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '6px', color: '#3b82f6' }}>
                    {kpi.icon}
                  </div>
                </div>
              ))}
            </section>

            {/* Exposure Trend & Top Keywords */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Exposure Trend */}
              <DashboardCard 
                title="Exposure Trend" 
                subtitle="Shows the trend in the number of posts and comments over time across social media platforms, indicating shifts in activity and..."
                source="Social Media"
              >
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', fontSize: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#3b82f6' }}/> Facebook</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#ec4899' }}/> Instagram</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#94a3b8' }}/> Threads</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#0f172a' }}/> Tiktok</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#06b6d4' }}/> Twitter</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#ef4444' }}/> Youtube</span>
                </div>
                <div style={{ height: '200px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Twitter curve - main line */}
                    <path d="M 40 100 Q 90 90 140 85 T 240 40 T 340 90 L 380 40" fill="none" stroke="#06b6d4" strokeWidth="2" />
                    {/* Other flat lines near bottom */}
                    <path d="M 40 140 L 380 142" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    <path d="M 40 145 L 380 146" fill="none" stroke="#ec4899" strokeWidth="1.5" />
                    {/* Points for Twitter */}
                    {[100, 90, 85, 60, 40, 90, 40].map((y, i) => (
                      <circle key={i} cx={40 + i * 56} cy={y} r="3" fill="#06b6d4" stroke="white" strokeWidth="1" />
                    ))}
                    {['14:00', '18:00', '22:00', '02:00', '06:00', '10:00', '14:00'].map((x, i) => (
                      <text key={i} x={40 + i * 56} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '200', '400', '600', '800', '1K'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Top Keywords */}
              <DashboardCard 
                title="Top Keywords" 
                subtitle="Displays the top-performing keywords based on the..."
                source="Social Media"
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignContent: 'center', justifyContent: 'center', padding: '10px' }}>
                  <span style={{ fontSize: '18px', color: '#d97706', fontWeight: 'bold' }}>wacana kapolri</span>
                  <span style={{ fontSize: '24px', color: '#047857', fontWeight: 'bold' }}>prabowo dengar</span>
                  <span style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: 'bold' }}>wkwkw udha</span>
                  <span style={{ fontSize: '28px', color: '#0369a1', fontWeight: '800' }}>nonton vtuber</span>
                  <span style={{ fontSize: '20px', color: '#b45309', fontWeight: 'bold' }}>komjen karyoto</span>
                  <span style={{ fontSize: '22px', color: '#be185d', fontWeight: 'bold' }}>prabowo kecewa</span>
                  <span style={{ fontSize: '25px', color: '#c2410c', fontWeight: 'bold' }}>prabowo subianto</span>
                  <span style={{ fontSize: '14px', color: '#0d9488' }}>selamat malam</span>
                  <span style={{ fontSize: '14px', color: '#e11d48' }}>prabowo marah</span>
                </div>
              </DashboardCard>

            </div>

            {/* Engagement History & Top Keywords by Engagement */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Engagement History */}
              <DashboardCard 
                title="Engagement History" 
                subtitle="Shows engagement trends over a defined time period on social media platforms, including likes, shares, comments, and other..."
                source="Media Sosial"
              >
                <div style={{ height: '200px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Engagement curve */}
                    <path d="M 40 50 Q 80 90 120 70 T 200 20 T 280 120 L 320 140 L 380 145" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                    {[50, 90, 70, 20, 120, 140, 145].map((y, i) => (
                      <circle key={i} cx={40 + i * 56} cy={y} r="4" fill="#06b6d4" stroke="white" strokeWidth="1.5" />
                    ))}
                    {['14:00', '18:00', '22:00', '02:00', '06:00', '10:00', '14:00'].map((x, i) => (
                      <text key={i} x={40 + i * 56} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '5K', '10K', '15K', '20K', '25K', '30K'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 25 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Top Keywords by Engagement */}
              <DashboardCard 
                title="Top Keywords by Engagement" 
                subtitle="Displays the top-performing keywords based on the..."
                source="Social Media"
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', padding: '10px' }}>
                  <span style={{ fontSize: '16px', color: '#b45309' }}>pemerintah prabowo</span>
                  <span style={{ fontSize: '18px', color: '#0f766e' }}>megawati soekarnoputri</span>
                  <span style={{ fontSize: '20px', color: '#ea580c' }}>vtuber nya bekasus</span>
                  <span style={{ fontSize: '22px', color: '#dc2626' }}>gada nya</span>
                  <span style={{ fontSize: '16px', color: '#1d4ed8' }}>nonton vtuber</span>
                  <span style={{ fontSize: '15px', color: '#ca8a04' }}>presidennya prabowo</span>
                  <span style={{ fontSize: '26px', color: '#b91c1c', fontWeight: 'bold' }}>jawa timur</span>
                  <span style={{ fontSize: '18px', color: '#2563eb' }}>prabowo subianto</span>
                  <span style={{ fontSize: '14px', color: '#0d9488' }}>orang tua</span>
                  <span style={{ fontSize: '15px', color: '#ea580c' }}>orang prabowo</span>
                  <span style={{ fontSize: '17px', color: '#16a34a' }}>wakilnya gibran</span>
                </div>
              </DashboardCard>

            </div>

            {/* Total Posts & Total Engagement Platform tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Total Posts Table */}
              <DashboardCard title="Total Posts" subtitle="Displays the total number of social media posts per platform related to ongoing issues." source="Social Media">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#4b5563' }}>
                      <th style={{ padding: '8px' }}>Social Media</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Expose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { platform: 'Twitter', count: '14.748' },
                      { platform: 'Tiktok', count: '1.067' },
                      { platform: 'Threads', count: '717' },
                      { platform: 'Facebook', count: '238' },
                      { platform: 'Instagram', count: '214' },
                      { platform: 'Youtube', count: '148' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600' }}>{row.platform}</span>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DashboardCard>

              {/* Total Engagement Platform Table */}
              <DashboardCard title="Total Engagement Platform" subtitle="Displays the total engagements from each monitored social media platform." source="Social Media">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#4b5563' }}>
                      <th style={{ padding: '8px' }}>Social Media</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { platform: 'Tiktok', val: '76.235,20' },
                      { platform: 'Instagram', val: '25.831,20' },
                      { platform: 'Twitter', val: '12.035,30' },
                      { platform: 'Youtube', val: '3.391,91' },
                      { platform: 'Facebook', val: '821,30' },
                      { platform: 'Threads', val: '0,00' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600' }}>{row.platform}</span>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DashboardCard>

            </div>

            {/* Top Contributors, Top Locations by Engagement & User Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '20px' }}>
              
              {/* Top Contributors */}
              <DashboardCard title="Top Contributors" subtitle="Highlights the most active accounts contributing posts an..." source="Social Media">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  {[
                    { handle: 'Eddy4S464S', name: 'langit solo', expose: 27 },
                    { handle: 'Hendral02096030', name: 'Hendra Irawan', expose: 26 },
                    { handle: 'irwan_ramali', name: 'Irwan Ramali', expose: 26 },
                    { handle: 'BaldaMochammad', name: 'MochammadBalda', expose: 23 },
                    { handle: 'Gerakbaldatun', name: 'GerakanBaldatun', expose: 23 },
                    { handle: 'zarec3855', name: 'MUHAMMAD NASHRULLAH', expose: 22 },
                    { handle: 'Xi_Pheng_HuTang', name: 'Xi Pheng Hoe Tang', expose: 21 }
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{row.handle}</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{row.name}</div>
                      </div>
                      <div style={{ fontWeight: '700', color: '#2563eb' }}>{row.expose}</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                    <span>12.047 Total Data</span>
                    <span>1 / 2 &gt;</span>
                  </div>
                </div>
              </DashboardCard>

              {/* Top Locations by Engagement */}
              <DashboardCard title="Top Locations by Engagement" subtitle="Displays the most mentioned locations associated with th..." source="Social Media">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                  {[
                    { name: 'Jawa Timur', val: '9.415,31' },
                    { name: 'Dki Jakarta', val: '9.167,87' },
                    { name: 'Lampung', val: '2.080,40' },
                    { name: 'Sumatera Selatan', val: '2.053,15' },
                    { name: 'Jawa Tengah', val: '1.548,20' },
                    { name: 'Kalimantan Barat', val: '1.103,20' },
                    { name: 'Jawa Barat', val: '610,30' }
                  ].map((row, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontWeight: '500' }}>
                        <span>{row.name}</span>
                        <span>{row.val}</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: '#1d4ed8', width: idx === 0 ? '100%' : idx === 1 ? '98%' : idx === 2 ? '22%' : '15%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* User Location Donut Chart */}
              <DashboardCard title="User Location (City Level)" subtitle="Displays the most active user locations (city/regency leve..." source="Social Media">
                <DonutChart data={[
                  { label: 'Kab. Banjarmasin', value: '21.38%', color: '#1d4ed8', percent: 21.38 },
                  { label: 'Kab. Nagan', value: '16.67%', color: '#3b82f6', percent: 16.67 },
                  { label: 'Kab. Karo', value: '9.78%', color: '#10b981', percent: 9.78 },
                  { label: 'Kota Pekanbaru', value: '7.25%', color: '#ef4444', percent: 7.25 },
                  { label: 'Kota Semarang', value: '5.07%', color: '#f59e0b', percent: 5.07 },
                  { label: 'Others', value: '39.85%', color: '#94a3b8', percent: 39.85 }
                ]} />
              </DashboardCard>

            </div>

            {/* Sentiment Trend & Sentiment Proportion */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Sentiment Trend */}
              <DashboardCard title="Sentiment Trend" subtitle="Displays changes in sentiment (positive, neutral, negative) over time in social media content." source="Social Media">
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '8px' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#b91c1c' }}/> Negative</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Neutral</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}/> Positive</span>
                </div>
                <div style={{ height: '180px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Red line */}
                    <path d="M 40 70 L 90 50 L 140 30 L 190 20 L 240 40 L 290 85 L 340 120" fill="none" stroke="#b91c1c" strokeWidth="2" />
                    {/* Grey line */}
                    <path d="M 40 90 L 90 85 L 140 92 L 190 90 L 240 100 L 290 115 L 340 135" fill="none" stroke="#4b5563" strokeWidth="2" />
                    {/* Blue line */}
                    <path d="M 40 110 L 90 108 L 140 115 L 190 110 L 240 120 L 290 130 L 340 142" fill="none" stroke="#2563eb" strokeWidth="2" />
                    
                    {['07 Jun', '08 Jun', '09 Jun', '10 Jun', '11 Jun', '12 Jun', '13 Jun'].map((x, i) => (
                      <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '200', '400', '600'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 40 - 10 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Sentiment Proportion */}
              <DashboardCard title="Sentiment Proportion" subtitle="Displays the proportional distribution of sentiment in soci..." source="Social Media">
                <DonutChart data={socialSentimentProportion} />
              </DashboardCard>

            </div>

            {/* Sentiment by Engagement & Sentiment Proportion by Engagement */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Sentiment by Engagement */}
              <DashboardCard title="Sentiment By Engagement" subtitle="Displays sentiment trends over time, segmented by engagement volume on social media." source="Social Media">
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '8px' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#b91c1c' }}/> Negative</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Neutral</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}/> Positive</span>
                </div>
                <div style={{ height: '180px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Red line */}
                    <path d="M 40 60 L 90 85 L 140 20 L 190 90 L 240 70 L 290 120 L 340 135" fill="none" stroke="#b91c1c" strokeWidth="2" />
                    {/* Grey line */}
                    <path d="M 40 120 L 90 100 L 140 115 L 190 105 L 240 110 L 290 130 L 340 135" fill="none" stroke="#4b5563" strokeWidth="2" />
                    {/* Blue line */}
                    <path d="M 40 70 L 90 90 L 140 45 L 190 120 L 240 130 L 290 135 L 340 138" fill="none" stroke="#2563eb" strokeWidth="2" />
                    
                    {['14:00', '18:00', '22:00', '02:00', '06:00', '10:00', '14:00'].map((x, i) => (
                      <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '3K', '6K', '9K', '12K', '15K', '18K'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 22 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Sentiment Proportion by Engagement */}
              <DashboardCard title="Sentiment Proportion By Engagement" subtitle="Displays sentiment proportions weighted by engagement..." source="Social Media">
                <DonutChart data={socialSentimentEngagement} />
              </DashboardCard>

            </div>

            {/* Emotion Trend & Emotion Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Emotion Trend */}
              <DashboardCard title="Emotion Trend" subtitle="Shows trends in emotional tone (e.g., anger, anticipation, joy, fear) within posts and comments over time." source="Social Media">
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '9px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {socialEmotionDistribution.map(em => (
                    <span key={em.label} style={{ display:'flex', alignItems:'center', gap:'2px' }}>
                      <div style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor: em.color }}/> {em.label}
                    </span>
                  ))}
                </div>
                <div style={{ height: '180px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Disgust (Purple) curve */}
                    <path d="M 40 80 Q 90 70 140 30 T 240 50 T 340 70 L 380 110" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                    {/* Anticipation (Orange) curve */}
                    <path d="M 40 100 L 90 92 L 140 75 L 190 85 L 240 102 L 290 98 L 340 120" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    {/* Trust (Green) curve */}
                    <path d="M 40 120 L 90 125 L 140 110 L 190 115 L 240 120 L 290 122 L 340 125" fill="none" stroke="#84cc16" strokeWidth="1.5" />
                    
                    {['14:00', '18:00', '22:00', '02:00', '06:00', '10:00', '14:00'].map((x, i) => (
                      <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '50', '100', '150', '200', '250'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 30 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Emotion Distribution */}
              <DashboardCard title="Emotion Distribution" subtitle="Displays the distribution of emotional categories found in..." source="Social Media">
                <DonutChart data={socialEmotionDistribution} />
              </DashboardCard>

            </div>

            {/* Emotion Trend by Engagement & Emotion by Engagement */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Emotion Trend by Engagement */}
              <DashboardCard title="Emotion Trend By Engagement" subtitle="Shows how engagement varies over time in relation to the emotional tone of posts and comments." source="Social Media">
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '9px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {socialEmotionEngagement.map(em => (
                    <span key={em.label} style={{ display:'flex', alignItems:'center', gap:'2px' }}>
                      <div style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor: em.color }}/> {em.label}
                    </span>
                  ))}
                </div>
                <div style={{ height: '180px' }}>
                  <svg viewBox="0 0 400 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {[0, 30, 60, 90, 120, 150].map(y => (
                      <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#f1f5f9" />
                    ))}
                    {/* Anticipation (Orange) dominant line */}
                    <path d="M 40 40 L 90 90 L 140 20 L 190 120 L 240 145 L 340 146" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    {/* Trust (Green) */}
                    <path d="M 40 130 L 90 125 L 140 80 L 190 135 L 240 142 L 340 145" fill="none" stroke="#84cc16" strokeWidth="1.5" />
                    
                    {['14:00', '18:00', '22:00', '02:00', '06:00', '10:00', '14:00'].map((x, i) => (
                      <text key={i} x={40 + i * 50} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                    ))}
                    {['0', '2K', '4K', '6K', '8K', '10K', '12K'].map((val, i) => (
                      <text key={i} x="20" y={150 - i * 22 - 10 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                    ))}
                  </svg>
                </div>
              </DashboardCard>

              {/* Emotion by Engagement */}
              <DashboardCard title="Emotion By Engagement" subtitle="Displays emotional tone segmented by engagement level..." source="Social Media">
                <DonutChart data={socialEmotionEngagement} />
              </DashboardCard>

            </div>

            {/* Sentiment Target Stacked Bar Chart */}
            <DashboardCard title="Sentiment Target" subtitle="Displays sentiment target in social media platforms." source="Social Media">
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '16px' }}>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#dc2626' }}/> Negative</span>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#4b5563' }}/> Neutral</span>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#2563eb' }}/> Positive</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '180px', paddingBottom: '20px', overflowX: 'auto' }}>
                {[
                  { name: 'Prabowo', neg: 4800, neu: 2200, pos: 800 },
                  { name: 'Prabowo Subianto', neg: 1800, neu: 600, pos: 700 },
                  { name: 'Prabowo Galak', neg: 2600, neu: 500, pos: 400 },
                  { name: 'Tni', neg: 800, neu: 300, pos: 200 },
                  { name: 'Human Rights Watch', neg: 400, neu: 600, pos: 900 },
                  { name: 'Polri', neg: 300, neu: 200, pos: 150 },
                  { name: 'Wni', neg: 350, neu: 300, pos: 400 },
                  { name: 'Puki', neg: 300, neu: 100, pos: 300 }
                ].map((target, idx) => {
                  const maxVal = 7800; // sum of max bar
                  const hNeg = (target.neg / maxVal) * 120;
                  const hNeu = (target.neu / maxVal) * 120;
                  const hPos = (target.pos / maxVal) * 120;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70px', position: 'relative' }}>
                      {/* Hover card mock for Prabowo Subianto */}
                      {target.name === 'Prabowo Subianto' && (
                        <div style={{
                          position: 'absolute',
                          bottom: '100px',
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          zIndex: 10,
                          fontSize: '10px',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none'
                        }}>
                          <strong>Prabowo Subianto</strong>
                          <div style={{ color: '#4b5563', marginTop: '2px' }}>● Neutral : <strong>1.681</strong></div>
                        </div>
                      )}
                      
                      <div style={{ width: '22px', height: `${hPos}px`, backgroundColor: '#2563eb' }} />
                      <div style={{ width: '22px', height: `${hNeu}px`, backgroundColor: '#4b5563' }} />
                      <div style={{ width: '22px', height: `${hNeg}px`, backgroundColor: '#b91c1c' }} />
                      <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', textAlign: 'center', height: '30px', overflow: 'hidden' }}>
                        {target.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashboardCard>

            {/* Top Hashtags Treemap */}
            <DashboardCard title="Top Hashtags" subtitle="Displays the most frequently used hashtags across social media posts and comments related to monitored issues." source="Source: Social Media">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '75px', gap: '3px', color: 'white', fontSize: '11px', fontWeight: 'bold' }}>
                <div style={{ gridColumn: 'span 5', gridRow: 'span 3', backgroundColor: '#f59e0b', padding: '12px' }}>
                  PRABOWO<div style={{ fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>(265)</div>
                </div>
                <div style={{ gridColumn: 'span 4', gridRow: 'span 2', backgroundColor: '#06b6d4', padding: '10px' }}>
                  PRABOWOSUBIANTO (103)
                </div>
                <div style={{ gridColumn: 'span 3', gridRow: 'span 1', backgroundColor: '#ec4899', padding: '10px' }}>
                  KETAHANANPANGAN (45)
                </div>
                <div style={{ gridColumn: 'span 3', gridRow: 'span 2', backgroundColor: '#8b5cf6', padding: '10px' }}>
                  MBG (44)
                </div>
                <div style={{ gridColumn: 'span 4', gridRow: 'span 1', backgroundColor: '#10b981', padding: '10px' }}>
                  HOTMANPARIS (67)
                </div>
                <div style={{ gridColumn: 'span 3', gridRow: 'span 1', backgroundColor: '#3b82f6', padding: '10px' }}>
                  INDONESIA (54)
                </div>
                <div style={{ gridColumn: 'span 5', gridRow: 'span 1', backgroundColor: '#f97316', padding: '10px' }}>
                  JAGAINDONESIA (52)
                </div>
                <div style={{ gridColumn: 'span 4', gridRow: 'span 1', backgroundColor: '#dc2626', padding: '10px' }}>
                  FEBRIEADRIANSYAH (50)
                </div>
              </div>
            </DashboardCard>

            {/* Top Wordcloud Hashtags */}
            <DashboardCard title="Top Wordcloud Hashtags" subtitle="Displays the top-performing hashtag based on the highest levels of user engagement on social media." source="Source: Social Media">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignContent: 'center', justifyContent: 'center', padding: '24px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
                <span style={{ fontSize: '12px', color: '#16a34a' }}>makanbergizigratis</span>
                <span style={{ fontSize: '14px', color: '#ea580c' }}>beras</span>
                <span style={{ fontSize: '18px', color: '#dc2626', fontWeight: 'bold' }}>jampidsus</span>
                <span style={{ fontSize: '13px', color: '#2563eb' }}>garudamerah</span>
                <span style={{ fontSize: '38px', color: '#f59e0b', fontWeight: '900' }}>prabowo</span>
                <span style={{ fontSize: '15px', color: '#0f766e' }}>ekonomi</span>
                <span style={{ fontSize: '26px', color: '#e11d48', fontWeight: 'bold' }}>prabowosubianto</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>gibran</span>
                <span style={{ fontSize: '22px', color: '#1d4ed8', fontWeight: 'bold' }}>hotmanparis</span>
                <span style={{ fontSize: '14px', color: '#8b5cf6' }}>febrieadriansyah</span>
                <span style={{ fontSize: '16px', color: '#059669' }}>jagaindonesia</span>
              </div>
            </DashboardCard>

            {/* Latest Posts */}
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px', marginBottom: '16px' }}>
                Latest Posts
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  {
                    user: 'kompascom',
                    time: '18 hours ago',
                    platform: 'Tiktok',
                    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80',
                    content: 'MBG Watch menyampaikan kritik dan aspirasi terkait pelaksanaan program Makan Bergizi Gratis (MBG) dalam Rapat Dengar Pendapat Umum (RDPU) bersama Komisi I...',
                    likes: '32.032', comments: '3.061', shares: '909', views: '14.649',
                    sentiments: ['Negative', 'Neutral']
                  },
                  {
                    user: 'maju.idn',
                    time: '18 hours ago',
                    platform: 'Tiktok',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
                    content: 'Keputusan Hotman Paris untuk menjadi kuasa hukum mantan Jaksa Agung Muda Pidana Khusus (Jampidsus) Febrie Adriansyah menuai sorotan. Selebgram...',
                    likes: '22.197', comments: '1.532', shares: '339', views: '9.798',
                    sentiments: ['Negative', 'Anticipation']
                  },
                  {
                    user: 'wahyubalakosa99',
                    time: '23 hours ago',
                    platform: 'Tiktok',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
                    content: 'presiden prabowo subianto mengatakan yang merasa indonesia suram silahkan cari negara lain. Beliau menyampaikan ini saat pertemuan tertutup...',
                    likes: '14.216', comments: '1.130', shares: '1.310', views: '6.364',
                    sentiments: ['Negative', 'Neutral']
                  }
                ].map((post, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    {/* Header */}
                    <div style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={post.avatar} alt="Avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '13px' }}>{post.user}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{post.time}</div>
                      </div>
                      <div style={{ color: '#000000', fontWeight: 'bold', fontSize: '12px' }}>{post.platform}</div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '0 16px 16px 16px', fontSize: '12px', color: '#334155', flexGrow: 1, lineHeight: '1.5' }}>
                      {post.content}
                    </div>
                    {/* Metrics */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><ThumbsUp size={12} /> {post.likes}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageSquare size={12} /> {post.comments}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Share2 size={12} /> {post.shares}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Eye size={12} /> {post.views}</span>
                    </div>
                    {/* Badges & Actions */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {post.sentiments.map((badge, bIdx) => (
                          <span key={bIdx} style={{
                            fontSize: '9px',
                            fontWeight: '600',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            backgroundColor: badge === 'Negative' ? '#fee2e2' : badge === 'Neutral' ? '#f1f5f9' : '#fef3c7',
                            color: badge === 'Negative' ? '#991b1b' : badge === 'Neutral' ? '#374151' : '#92400e'
                          }}>
                            {badge}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>View Details</button>
                        <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>View Source</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '16px' }}>
                <span>17.132 Total Data</span>
                <span>&lt; 1 / 1 &gt;</span>
              </div>
            </div>

          </div>
        )}

        {/* ONLINE NEWS VIEW */}
        {activeTab === 'news' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* KPI CARDS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {newsMetrics.map(kpi => (
                <div key={kpi.title} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase' }}>
                    {kpi.title}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: kpi.color }}>
                    {kpi.value}
                  </div>
                </div>
              ))}
            </section>

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
                    <DonutChart data={newsSentimentData} />
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
