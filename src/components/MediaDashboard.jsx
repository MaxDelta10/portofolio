import React, { useState } from 'react';
import { 
  Monitor, Filter, Settings, Users, Clock, 
  ChevronDown, Calendar, Search, ExternalLink, RefreshCw, ArrowLeft,
  TrendingUp, BarChart2, MessageSquare, ThumbsUp, Eye, Heart, Share2, FileText
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

// Reusable Area Line Chart Component matching Ebdesk Fusion reference
// Renders lines with area fills, precise dot placement, spanning full container width
const AreaLineChart = ({ lines, xLabels, yLabels, height = 200, viewBoxW = 500, viewBoxH = 160, padL = 35, padR = 10, padT = 5, padB = 25 }) => {
  const chartW = viewBoxW - padL - padR;
  const chartH = viewBoxH - padT - padB;
  const n = xLabels.length;
  const xStep = chartW / (n - 1);

  // Convert data array to SVG coordinates
  const toPoints = (data) => data.map((val, i) => ({
    x: padL + i * xStep,
    y: padT + chartH - (val / 100) * chartH // val is 0-100 normalized
  }));

  // Build SVG path string from points
  const pathD = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // Build closed area path (line + bottom edge)
  const areaD = (pts) => {
    const line = pathD(pts);
    return `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${padT + chartH} L ${pts[0].x.toFixed(1)} ${padT + chartH} Z`;
  };

  // Grid lines
  const gridCount = yLabels.length;
  const gridLines = Array.from({ length: gridCount }, (_, i) => padT + chartH - (i / (gridCount - 1)) * chartH);

  return (
    <div style={{ height: `${height}px` }}>
      <svg viewBox={`0 0 ${viewBoxW} ${viewBoxH + 15}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
        {/* Grid lines */}
        {gridLines.map((y, i) => (
          <line key={`g-${i}`} x1={padL} y1={y} x2={viewBoxW - padR} y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
        ))}

        {/* Area fills (rendered first, behind lines) */}
        {lines.map((line, li) => {
          if (!line.area) return null;
          const pts = toPoints(line.data);
          return (
            <path key={`area-${li}`} d={areaD(pts)} fill={line.color} opacity={line.areaOpacity || 0.12} />
          );
        })}

        {/* Lines */}
        {lines.map((line, li) => {
          const pts = toPoints(line.data);
          return (
            <path key={`line-${li}`} d={pathD(pts)} fill="none" stroke={line.color} strokeWidth={line.width || 2} />
          );
        })}

        {/* Dots */}
        {lines.map((line, li) => {
          if (line.hideDots) return null;
          const pts = toPoints(line.data);
          return pts.map((p, pi) => (
            <circle key={`dot-${li}-${pi}`} cx={p.x} cy={p.y} r={line.dotR || 3.5} fill={line.color} stroke="white" strokeWidth="1.5" />
          ));
        })}

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <text key={`xl-${i}`} x={padL + i * xStep} y={viewBoxH + 10} fill="#94a3b8" fontSize="7" textAnchor="middle">{label}</text>
        ))}

        {/* Y-axis labels */}
        {yLabels.map((label, i) => (
          <text key={`yl-${i}`} x={padL - 4} y={gridLines[i] + 2.5} fill="#94a3b8" fontSize="7" textAnchor="end">{label}</text>
        ))}
      </svg>
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
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'social'
  const [selectedNewsId, setSelectedNewsId] = useState(0);

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

  // News Data (Copied directly from Ebdesk screenshots)
  const newsSentimentProportion = [
    { label: 'Positive', value: '606', color: '#2563eb', percent: 50.71 },
    { label: 'Neutral', value: '375', color: '#4b5563', percent: 31.38 },
    { label: 'Negative', value: '214', color: '#b91c1c', percent: 17.91 }
  ];

  const newsList = [
    {
      id: 0,
      source: 'Temporatur.com',
      badge: 'Negative',
      time: '5 minutes ago',
      title: 'Celotehannya Dinilai Merendahkan Martabat Wartawan, Hotman Paris Menuai Kecaman Kalangan Pers',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'JAKARTA, TEMPORATUR.COM Persatuan Wartawan Indonesia (PWI) Pusat mengecam pernyataan Advokat Hotman Paris Hutapea. Celotehan pengacara eks Jampidsus Febrie Adriansyah dinilai merendahkan martabat profesi wartawan yang sedang menjalankan tugas jurnalistik dan berpotensi mencederai semangat kemerdekaan pers yang dijamin Undang-Undang Nomor 40 Tahun 1999 tentang Pers.\nKetua Umum PWI Pusat, Akhmad Munir, menegaskan bahwa bertanya kepada narasumber merupakan bagian yang tidak terpisahkan dari tugas jurnalistik dalam memenuhi hak masyarakat.'
    },
    {
      id: 1,
      source: '55tv.co.id',
      badge: 'Neutral',
      time: '5 minutes ago',
      title: 'Bikin Kaget Diskon Listrik 50 Persen PLN Hadir Lagi',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'PLN kembali menghadirkan program diskon tarif listrik hingga 50 persen bagi pelanggan golongan tertentu untuk meringankan beban ekonomi masyarakat.'
    },
    {
      id: 2,
      source: 'Bitvonline.com',
      badge: 'Neutral',
      time: '6 minutes ago',
      title: 'BGN Kaji Skema Baru MBG, Siswa Desil 8-10 Berpotensi Tak Lagi Jadi Penerima Manfaat',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'Badan Gizi Nasional tengah mengkaji ulang kriteria penerima program Makan Bergizi Gratis agar penyaluran lebih tepat saran bagi siswa yang membutuhkan.'
    },
    {
      id: 3,
      source: 'Bitvonline.com',
      badge: 'Neutral',
      time: '6 minutes ago',
      title: 'Pendirian Koperasi Kini Gratis, Pemerintah Tetapkan Tarif Rp0 Lewat Regulasi Baru',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'Kementerian Koperasi menetapkan tarif nol rupiah untuk pengesahan akta pendirian koperasi guna memacu pertumbuhan ekonomi kreatif di daerah.'
    },
    {
      id: 4,
      source: 'Bitvonline.com',
      badge: 'Negative',
      time: '6 minutes ago',
      title: 'GNK Sentil Hotman Paris, Minta Tak Kaitkan Nama Presiden dalam Kasus Korupsi Timah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'Gerakan Nasional Anti Korupsi meminta pengacara Hotman Paris untuk fokus pada substansi hukum dan tidak menyeret nama Presiden dalam pusaran kasus korupsi timah.'
    },
    {
      id: 5,
      source: 'Bitvonline.com',
      badge: 'Positive',
      time: '6 minutes ago',
      title: 'Kemendagri Apresiasi Pengelolaan Dana TKD Simalungun, Infrastruktur Jalan Meningkat Pesat',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80',
      content: 'Kementerian Dalam Negeri memberikan apresiasi atas keberhasilan Pemkab Simalungun mengoptimalkan Dana Transfer ke Daerah untuk pembangunan jalan.'
    }
  ];

  return (
    <div className="media-intelligence-dashboard-wrapper" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '"Inter", sans-serif',
      color: '#0f172a',
      width: '100vw'
    }}>
      <style>{`
        /* Protect Dashboard component from parent project retro font overriding */
        .media-intelligence-dashboard-wrapper,
        .media-intelligence-dashboard-wrapper * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }
      `}</style>
      
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
          {/* Top icon - Social Media */}
          <button 
            onClick={() => setActiveTab('social')} 
            style={{ 
              background: activeTab === 'social' ? '#1e293b' : 'none', 
              border: 'none', 
              color: activeTab === 'social' ? '#3b82f6' : '#94a3b8', 
              cursor: 'pointer', 
              padding: '12px', 
              borderRadius: '8px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            title="Monitoring Social Media"
          >
            <MessageSquare size={22} />
          </button>
          
          {/* Bottom icon - Online News */}
          <button 
            onClick={() => setActiveTab('news')} 
            style={{ 
              background: activeTab === 'news' ? '#1e293b' : 'none', 
              border: 'none', 
              color: activeTab === 'news' ? '#3b82f6' : '#94a3b8', 
              cursor: 'pointer', 
              padding: '12px', 
              borderRadius: '8px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            title="Monitoring Online News"
          >
            <FileText size={22} />
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
              Filter <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>{activeTab === 'social' ? '4' : '3'}</span> <ChevronDown size={12} />
            </button>
            
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8', fontWeight: '600' }}>
              <Users size={12} /> Presiden Prabowo <ChevronDown size={12} />
            </button>

            {activeTab === 'social' && (
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8' }}>
                Account Not Found <ChevronDown size={12} />
              </button>
            )}

            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#1d4ed8' }}>
              <Clock size={12} /> 18 Jul 26, 14:09 - 19 Jul 26, 14:09
            </button>

            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#334155' }}>
              Platform <span style={{ backgroundColor: '#cbd5e1', color: '#0f172a', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>{activeTab === 'social' ? '6' : '3'}</span>
            </button>

            {activeTab === 'social' && (
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', color: '#334155' }}>
                Type Content <span style={{ backgroundColor: '#cbd5e1', color: '#0f172a', padding: '1px 5px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>2</span>
              </button>
            )}
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
                <AreaLineChart
                  height={200}
                  xLabels={['09:00','11:00','13:00','15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00']}
                  yLabels={['0','10K','20K','30K','40K','50K']}
                  lines={[
                    { data: [72,76,78,80,64,62,88,92,90,52,56,70,54], color: '#06b6d4', width: 2.5, area: true, areaOpacity: 0.15, dotR: 3.5 },
                    { data: [18,20,22,24,24,25,28,26,14,6,5,8,6], color: '#0f172a', width: 1.5, area: true, areaOpacity: 0.08, dotR: 2.5 },
                    { data: [6,8,10,12,14,14,16,12,8,4,3,4,3], color: '#94a3b8', width: 1.5, area: true, areaOpacity: 0.06, dotR: 2.5 },
                    { data: [2,3,4,5,5,6,6,4,3,2,2,2,2], color: '#3b82f6', width: 1.5, dotR: 2 },
                    { data: [1,2,2,3,3,3,4,3,2,1,1,1,1], color: '#ec4899', width: 1.5, dotR: 2 },
                    { data: [1,1,1,1,2,2,2,1,1,1,1,1,1], color: '#ef4444', width: 1.5, dotR: 2 }
                  ]}
                />
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
                <AreaLineChart
                  height={200}
                  xLabels={['09:00','11:00','13:00','15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00']}
                  yLabels={['0','5K','10K','15K','20K','25K','30K']}
                  lines={[
                    { data: [20,32,28,35,38,70,90,88,50,10,8,6,4], color: '#22d3ee', width: 2.5, area: true, areaOpacity: 0.15, dotR: 3.5 }
                  ]}
                />
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
                        <td style={{ padding: '8px' }}>{row.platform}</td>
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
                        <td style={{ padding: '8px' }}>{row.platform}</td>
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

              {/* Top Locations by Engagement (Horizontal Bar Chart Fix: No Gap, Right-Aligned Labels) */}
              <DashboardCard title="Top Locations by Engagement" subtitle="Displays the most mentioned locations associated with th..." source="Social Media">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                  {[
                    { name: 'Jawa Timur', val: '9.415,31', percent: 100 },
                    { name: 'Dki Jakarta', val: '9.167,87', percent: 97.3 },
                    { name: 'Lampung', val: '2.080,40', percent: 22.1 },
                    { name: 'Sumatera Selatan', val: '2.053,15', percent: 21.8 },
                    { name: 'Jawa Tengah', val: '1.548,20', percent: 16.4 },
                    { name: 'Kalimantan Barat', val: '1.103,20', percent: 11.7 },
                    { name: 'Jawa Barat', val: '610,30', percent: 6.5 }
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                      <span style={{ width: '90px', textAlign: 'right', marginRight: '12px', fontWeight: '500', color: '#475569', flexShrink: 0 }}>
                        {row.name}
                      </span>
                      <div style={{ flexGrow: 1, height: '12px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          height: '100%', 
                          backgroundColor: '#1d4ed8', 
                          width: `${row.percent}%`,
                          borderRadius: '2px'
                        }} />
                      </div>
                      <span style={{ width: '55px', textAlign: 'left', marginLeft: '12px', fontWeight: '700', color: '#0f172a', flexShrink: 0 }}>
                        {row.val}
                      </span>
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
                <AreaLineChart
                  height={180}
                  xLabels={['07 Jun','08 Jun','09 Jun','10 Jun','11 Jun','12 Jun','13 Jun']}
                  yLabels={['0','100','200','300','400','450']}
                  lines={[
                    { data: [60,70,80,85,78,72,68,], color: '#b91c1c', width: 2, area: true, areaOpacity: 0.10, dotR: 3.5 },
                    { data: [48,55,50,52,50,48,45], color: '#4b5563', width: 2, area: true, areaOpacity: 0.06, dotR: 3.5 },
                    { data: [18,22,15,20,25,30,28], color: '#2563eb', width: 2, dotR: 3.5 }
                  ]}
                />
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
                <AreaLineChart
                  height={180}
                  xLabels={['09:00','11:00','13:00','15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00']}
                  yLabels={['0','0.5M','1.0M','1.5M','2.0M','2.5M','3.0M','3.5M']}
                  lines={[
                    { data: [15,30,38,42,55,70,80,65,52,40,48,55,50], color: '#b91c1c', width: 2, area: true, areaOpacity: 0.10, dotR: 3 },
                    { data: [8,14,18,20,30,40,52,35,22,16,20,24,22], color: '#4b5563', width: 2, area: true, areaOpacity: 0.06, dotR: 3 },
                    { data: [4,6,8,10,12,18,22,14,10,6,8,10,8], color: '#2563eb', width: 2, dotR: 3 }
                  ]}
                />
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
                <AreaLineChart
                  height={180}
                  xLabels={['09:00','11:00','13:00','15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00']}
                  yLabels={['0','50','100','150','200','250']}
                  lines={[
                    { data: [30,38,45,55,60,72,80,68,40,20,18,22,16], color: '#8b5cf6', width: 2, area: true, areaOpacity: 0.10, dotR: 3 },
                    { data: [20,25,30,35,40,50,55,42,28,15,14,16,12], color: '#f59e0b', width: 1.5, dotR: 3 },
                    { data: [10,12,15,18,20,25,28,22,16,10,8,10,8], color: '#84cc16', width: 1.5, dotR: 3 },
                    { data: [8,10,12,14,15,18,20,16,12,8,6,8,6], color: '#1d4ed8', width: 1, dotR: 2 },
                    { data: [6,8,9,10,12,14,15,12,8,5,4,5,4], color: '#dc2626', width: 1, dotR: 2 },
                    { data: [4,5,6,7,8,10,12,8,6,3,3,4,3], color: '#06b6d4', width: 1, dotR: 2 }
                  ]}
                />
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
                <AreaLineChart
                  height={180}
                  xLabels={['09:00','11:00','13:00','15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00']}
                  yLabels={['0','2K','4K','6K','8K','10K','12K']}
                  lines={[
                    { data: [15,28,35,40,55,80,90,68,35,12,8,10,6], color: '#f59e0b', width: 2.5, area: true, areaOpacity: 0.12, dotR: 3.5 },
                    { data: [6,10,14,18,22,35,42,28,16,8,6,8,5], color: '#84cc16', width: 1.5, area: true, areaOpacity: 0.06, dotR: 3 },
                    { data: [3,5,7,8,10,15,18,12,8,4,3,4,3], color: '#06b6d4', width: 1, dotR: 2 },
                    { data: [2,3,4,5,6,8,10,6,4,2,2,2,2], color: '#eab308', width: 1, dotR: 2 }
                  ]}
                />
              </DashboardCard>

              {/* Emotion by Engagement */}
              <DashboardCard title="Emotion by Engagement" subtitle="Displays emotional tone segmented by engagement level..." source="Social Media">
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
            
            {/* Exposure Trend Bar Chart */}
            <DashboardCard 
              title="Exposure Trend" 
              subtitle="Displays the trend in exposure, indicating the volume of news coverage published by mainstream media over time."
              source="Mainstream Media"
            >
              <div style={{ height: '180px', marginTop: '16px' }}>
                <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  {[0, 30, 60, 90, 120, 150].map(y => (
                    <line key={y} x1="30" y1={y} x2="480" y2={y} stroke="#f1f5f9" />
                  ))}
                  {/* News Volume Bars (Copied directly from Ebdesk News screenshot) */}
                  {[65, 105, 55, 88, 90, 56, 87, 78, 38, 36, 10, 13, 9, 8, 14, 28, 20, 35, 52, 47, 81, 48, 64, 69, 18].map((val, i) => {
                    const h = (val / 120) * 120;
                    return (
                      <rect 
                        key={i} 
                        x={38 + i * 17.5} 
                        y={150 - h} 
                        width="8" 
                        height={h} 
                        fill="#1d4ed8" 
                        rx="1"
                      />
                    );
                  })}
                  {['14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'].map((x, i) => (
                    <text key={i} x={38 + i * 35} y="165" fill="#94a3b8" fontSize="8" textAnchor="middle">{x}</text>
                  ))}
                  {['0', '20', '40', '60', '80', '100', '120'].map((val, i) => (
                    <text key={i} x="20" y={150 - (val / 120) * 120 + 3} fill="#94a3b8" fontSize="8" textAnchor="end">{val}</text>
                  ))}
                </svg>
              </div>
            </DashboardCard>

            {/* Total News KPI Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>Total News</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>1.195</div>
              </div>
              <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '4px', color: '#3b82f6' }}>
                <TrendingUp size={16} />
              </div>
            </div>

            {/* Sentiment Proportion & Sentiment Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
              
              {/* Sentiment Proportion */}
              <DashboardCard title="Sentiment Proportion" subtitle="Displays the proportion of positive, negative, and neutral..." source="Mainstream Media">
                <DonutChart data={newsSentimentProportion} />
              </DashboardCard>

              {/* Sentiment Distribution */}
              <DashboardCard title="Sentiment Distribution" subtitle="Displays the trend in sentiment over time within mainstream media reporting." source="Mainstream Media">
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', fontSize: '10px', marginBottom: '12px' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#b91c1c' }}/> Negative</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4b5563' }}/> Neutral</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2563eb' }}/> Positive</span>
                </div>
                <AreaLineChart
                  height={180}
                  xLabels={['14:00','16:00','18:00','20:00','22:00','00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00']}
                  yLabels={['0','10','20','30','40','50','60']}
                  lines={[
                    { data: [50,80,65,85,70,55,30,15,10,40,50,45,30], color: '#2563eb', width: 2, area: true, areaOpacity: 0.10, dotR: 3.5 },
                    { data: [28,35,22,30,38,32,20,8,12,22,28,25,18], color: '#4b5563', width: 2, area: true, areaOpacity: 0.06, dotR: 3.5 },
                    { data: [10,18,14,16,20,22,6,4,8,16,18,20,10], color: '#b91c1c', width: 2, dotR: 3.5 }
                  ]}
                />
              </DashboardCard>

            </div>

            {/* Sentiment Target Stacked Bar Chart */}
            <DashboardCard title="Sentiment Target" subtitle="Displays sentiment target in mainstream media coverage." source="Mainstream Media">
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', fontSize: '10px', marginBottom: '16px' }}>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#dc2626' }}/> Negative</span>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#4b5563' }}/> Neutral</span>
                <span style={{ display:'flex', alignItems:'center', gap:'4px' }}><div style={{ width:'8px', height:'8px', borderRadius:'2px', backgroundColor:'#2563eb' }}/> Positive</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '180px', paddingBottom: '20px', overflowX: 'auto' }}>
                {[
                  { name: 'Indonesia', neg: 30, neu: 150, pos: 180 },
                  { name: 'Febrie Adriansyah', neg: 110, neu: 140, pos: 30 },
                  { name: 'Presiden', neg: 100, neu: 90, pos: 25 },
                  { name: 'Pemerintah', neg: 15, neu: 90, pos: 95 },
                  { name: 'Febrie', neg: 85, neu: 65, pos: 20 },
                  { name: 'Masyarakat', neg: 10, neu: 35, pos: 85 },
                  { name: 'Jampidsus', neg: 98, neu: 15, pos: 10 },
                  { name: 'Hotman Paris Hutapea', neg: 42, neu: 15, pos: 5 },
                  { name: 'Tni-polri', neg: 2, neu: 38, pos: 0 },
                  { name: 'Petani', neg: 5, neu: 10, pos: 15 }
                ].map((target, idx) => {
                  const maxVal = 400; // sum of max bar
                  const hNeg = (target.neg / maxVal) * 120;
                  const hNeu = (target.neu / maxVal) * 120;
                  const hPos = (target.pos / maxVal) * 120;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70px', position: 'relative' }}>
                      <div style={{ width: '20px', height: `${hPos}px`, backgroundColor: '#2563eb' }} />
                      <div style={{ width: '20px', height: `${hNeu}px`, backgroundColor: '#4b5563' }} />
                      <div style={{ width: '20px', height: `${hNeg}px`, backgroundColor: '#b91c1c' }} />
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '8px', textAlign: 'center', height: '24px', overflow: 'hidden' }}>
                        {target.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashboardCard>

            {/* Top Person & Top Keywords */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
              
              {/* Top Person Table */}
              <DashboardCard title="Top Person" subtitle="Displays the top ten public figures most frequently mentioned." source="Mainstream Media">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                      <th style={{ padding: '6px' }}>Person</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Expose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Prabowo Subianto', count: '990' },
                      { name: 'Febrie Adriansyah', count: '194' },
                      { name: 'Hotman Paris Hutapea', count: '162' },
                      { name: 'Airlangga Hartarto', count: '76' },
                      { name: 'Gibran Rakabuming Raka', count: '73' },
                      { name: 'Listyo Sigit Prabowo', count: '63' },
                      { name: 'Bahlil Lahadalia', count: '36' },
                      { name: 'Joko Widodo', count: '28' },
                      { name: 'Khofifah Indar Parawansa', count: '27' },
                      { name: 'Wang Wonton', count: '25' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px' }}>{row.name}</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                  <span>422 Total Data</span>
                  <span>&lt; 1 / 43 &gt;</span>
                </div>
              </DashboardCard>

              {/* Top Keywords Word Cloud */}
              <DashboardCard title="Top Keywords" subtitle="Displays the top-performing keywords based on the highest levels of Mainstream Media Reporting." source="Mainstream Media">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignContent: 'center', justifyContent: 'center', padding: '16px' }}>
                  <span style={{ fontSize: '28px', color: '#b91c1c', fontWeight: '900' }}>kesejahteraan masyarakat</span>
                  <span style={{ fontSize: '26px', color: '#2563eb', fontWeight: '800' }}>ketahanan pangan</span>
                  <span style={{ fontSize: '24px', color: '#eab308', fontWeight: 'bold' }}>presiden prabowo</span>
                  <span style={{ fontSize: '22px', color: '#16a34a', fontWeight: 'bold' }}>izin presiden</span>
                  <span style={{ fontSize: '18px', color: '#f59e0b', fontWeight: 'bold' }}>febrie adriansyah</span>
                  <span style={{ fontSize: '16px', color: '#8b5cf6', fontWeight: 'bold' }}>hotman paris</span>
                  <span style={{ fontSize: '14px', color: '#0d9488' }}>sinergitas dan soliditas antara tni - polri</span>
                  <span style={{ fontSize: '14px', color: '#1d4ed8' }}>akses aplikasi babe cepat</span>
                  <span style={{ fontSize: '13px', color: '#ca8a04' }}>kedatangan mereka disambut</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>produktifitas pertanian</span>
                </div>
              </DashboardCard>

            </div>

            {/* Top Influencer & Influencer Statements */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
              
              {/* Top Influencer News Table */}
              <DashboardCard title="Top Influencer News" subtitle="Displays the top ten influencer most frequently mentioned." source="Mainstream Media">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                      <th style={{ padding: '6px' }}>Influencer</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Statement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Prabowo Subianto', count: '1.318' },
                      { name: 'Hotman Paris Hutapea', count: '624' },
                      { name: 'Airlangga Hartarto', count: '353' },
                      { name: 'Boyamin Saiman', count: '261' },
                      { name: 'Khofifah Indar Parawansa', count: '181' },
                      { name: 'Bahlil Lahadalia', count: '115' },
                      { name: 'Widodo', count: '81' },
                      { name: 'Febrie Adriansyah', count: '67' },
                      { name: 'Haidar Alwi', count: '64' },
                      { name: 'Handika Honggowongso', count: '56' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px' }}>{row.name}</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                  <span>249 Total Influencer</span>
                  <span>&lt; 1 / 25 &gt;</span>
                </div>
              </DashboardCard>

              {/* Influencers Statements Grid */}
              <DashboardCard title="Influencers Statements News" subtitle="Displays the top ten individuals most frequently quoted or cited in mainstream media articles." source="Mainstream Media">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { name: 'Prabowo Subianto', time: '6 Minutes Ago', quote: 'Menurut Prabowo Subianto, proses hukum tidak memiliki hubungan dengan kewibawaan maupun marwah Presiden.', exp: 327, stat: '1.3K', badge: 'Neutral' },
                    { name: 'Hotman Paris Hutapea', time: '6 Minutes Ago', quote: 'Sebelumnya, Hotman Paris Hutapea menyatakan dirinya bersedia menjadi kuasa hukum Febrie Adriansyah...', exp: 134, stat: 624, badge: 'Negative' },
                    { name: 'Airlangga Hartarto', time: '25 Minutes Ago', quote: 'Menurut Airlangga Hartarto, Indonesia dan China memiliki struktur ekonomi yang saling melengkapi.', exp: 77, stat: 353, badge: 'Positive' },
                    { name: 'Febrie Adriansyah', time: '1 Hour Ago', quote: 'Febrie Adriansyah mengakui rumah yang digeledah polisi merupakan aset milik pribadi, yang tercatat atas na...', exp: 35, stat: 67, badge: 'Neutral' }
                  ].map((stmt, idx) => (
                    <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: '700', marginBottom: '2px' }}>{stmt.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '9px', marginBottom: '8px' }}>{stmt.time}</div>
                        <p style={{ margin: '0 0 10px 0', color: '#4b5563', lineHeight: '1.4' }}>"{stmt.quote}"</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px', fontSize: '9px', color: '#64748b' }}>
                        <span>Exp: {stmt.exp}</span>
                        <span>Badge: <strong style={{ color: stmt.badge === 'Positive' ? '#16a34a' : stmt.badge === 'Negative' ? '#dc2626' : '#4b5563' }}>{stmt.badge}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '16px' }}>
                  <span>249 Total Influencer</span>
                  <span>&lt; 1 / 62 &gt;</span>
                </div>
              </DashboardCard>

            </div>

            {/* Top Media Outlets & Top News Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
              
              {/* Top Media Outlets Table */}
              <DashboardCard title="Top Media Outlets" subtitle="Displays the top media outlets based on the volume of news content published." source="Mainstream Media">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                      <th style={{ padding: '6px' }}>Media</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Expose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Babeindonesia Com', count: '35' },
                      { name: 'Kompas', count: '21' },
                      { name: 'Koranmanado Co Id', count: '15' },
                      { name: 'Tvonenews', count: '15' },
                      { name: 'Akurat Co', count: '14' },
                      { name: 'Asatunews Co Id', count: '12' },
                      { name: 'Mediakompeten Co Id', count: '12' },
                      { name: 'Rm Id', count: '12' },
                      { name: 'Tribun News Gorontalo', count: '12' },
                      { name: 'Antara', count: '11' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px' }}>{row.name}</td>
                        <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                  <span>567 Total Data</span>
                  <span>&lt; 1 / 57 &gt;</span>
                </div>
              </DashboardCard>

              {/* Top News Location Horizontal Bar Chart (Fix: No Gap, Right-Aligned Labels) */}
              <DashboardCard title="Top News Location" subtitle="Displays the most frequently mentioned locations in mainstream media reporting." source="Mainstream Media">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                  {[
                    { name: 'Jawa Timur', val: 750, percent: 100 },
                    { name: 'Dki Jakarta', val: 400, percent: 53.3 },
                    { name: 'Jawa Barat', val: 250, percent: 33.3 },
                    { name: 'Jawa Tengah', val: 220, percent: 29.3 },
                    { name: 'Maluku', val: 160, percent: 21.3 },
                    { name: 'Sumatera Selatan', val: 130, percent: 17.3 },
                    { name: 'Lampung', val: 100, percent: 13.3 },
                    { name: 'Sulawesi Selatan', val: 95, percent: 12.7 },
                    { name: 'Banten', val: 85, percent: 11.3 },
                    { name: 'Sumatera Utara', val: 80, percent: 10.7 }
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', height: '18px' }}>
                      <span style={{ width: '100px', textAlign: 'right', marginRight: '12px', fontWeight: '500', color: '#475569', flexShrink: 0 }}>
                        {row.name}
                      </span>
                      <div style={{ flexGrow: 1, height: '12px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          height: '100%', 
                          backgroundColor: '#b91c1c', 
                          width: `${row.percent}%`,
                          borderRadius: '2px'
                        }} />
                      </div>
                      <span style={{ width: '40px', textAlign: 'left', marginLeft: '12px', fontWeight: '700', color: '#0f172a', flexShrink: 0 }}>
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>

            </div>

            {/* Latest News Layout (Grid list on left, detailed view on right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
              
              {/* Left Side: News List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '700', borderLeft: '4px solid #2563eb', paddingLeft: '8px' }}>
                  Latest News
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {newsList.map((news) => (
                    <div 
                      key={news.id} 
                      onClick={() => setSelectedNewsId(news.id)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: selectedNewsId === news.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '700', fontSize: '11px', color: '#64748b' }}>{news.source}</span>
                          <span style={{ 
                            fontSize: '9px', 
                            fontWeight: '600', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            backgroundColor: news.badge === 'Positive' ? '#dcfce7' : news.badge === 'Negative' ? '#fee2e2' : '#f1f5f9',
                            color: news.badge === 'Positive' ? '#15803d' : news.badge === 'Negative' ? '#b91c1c' : '#475569'
                          }}>{news.badge}</span>
                        </div>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#0f172a', lineHeight: '1.4' }}>
                          {news.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{news.time}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                  <span>1.195 Total Data</span>
                  <span>&lt; 1 / 150 &gt;</span>
                </div>
              </div>

              {/* Right Side: Selected News Detail */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb' }}>
                    {newsList[selectedNewsId].source}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: newsList[selectedNewsId].badge === 'Positive' ? '#dcfce7' : newsList[selectedNewsId].badge === 'Negative' ? '#fee2e2' : '#f1f5f9',
                    color: newsList[selectedNewsId].badge === 'Positive' ? '#15803d' : newsList[selectedNewsId].badge === 'Negative' ? '#b91c1c' : '#475569'
                  }}>{newsList[selectedNewsId].badge}</span>
                </div>

                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>
                  {newsList[selectedNewsId].title}
                </h3>

                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" 
                  alt="News illustration" 
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '16px' }}
                />

                <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', flexGrow: 1, whiteSpace: 'pre-line', margin: '0 0 16px 0' }}>
                  {newsList[selectedNewsId].content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', fontSize: '10px', color: '#94a3b8' }}>
                  <span>{newsList[selectedNewsId].time}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', fontSize: '10px' }}>Lihat Detail</button>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', fontSize: '10px' }}>Copy Link</button>
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
