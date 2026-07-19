import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Globe, 
  CheckCircle,
  AlertTriangle,
  Users,
  Hash,
  MapPin,
  Share2,
  Tv,
  Layers,
  Database,
  Grid,
  BarChart2,
  PieChart,
  Settings,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

export default function MediaDashboard({ onBack }) {
  const [currentPage, setCurrentPage] = useState('news'); // 'news' or 'social'
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Common mockup date labels
  const dateLabels = ['15 Jul', '16 Jul', '17 Jul', '18 Jul', '19 Jul', '20 Jul', '21 Jul'];

  // Word cloud keywords list
  const wordCloudNews = [
    { text: 'Langkah Strategis', size: '24px', color: '#1d4ed8', weight: 'bold' },
    { text: 'IKN Nusantara', size: '20px', color: '#0d9488', weight: 'bold' },
    { text: 'Prabowo Subianto', size: '28px', color: '#b45309', weight: '900' },
    { text: 'Joko Widodo', size: '22px', color: '#2563eb', weight: 'bold' },
    { text: 'Pemilu Pilkada', size: '16px', color: '#db2777', weight: '500' },
    { text: 'Rapat Paripurna', size: '15px', color: '#4f46e5', weight: '500' },
    { text: 'Ekonomi Nasional', size: '18px', color: '#059669', weight: 'bold' },
    { text: 'KPK Korupsi', size: '14px', color: '#dc2626', weight: 'bold' },
    { text: 'Masyarakat', size: '21px', color: '#4b5563', weight: 'bold' },
    { text: 'Pembangunan', size: '17px', color: '#0891b2', weight: '600' }
  ];

  const wordCloudSocial = [
    { text: 'kawalkeputusan', size: '22px', color: '#2563eb', weight: 'bold' },
    { text: 'IndonesiaMaju', size: '#0d9488', size: '18px', color: '#0d9488', weight: 'bold' },
    { text: 'NetizenSuara', size: '15px', color: '#db2777', weight: '500' },
    { text: 'iknterkini', size: '20px', color: '#b45309', weight: 'bold' },
    { text: 'PilkadaDamai', size: '24px', color: '#059669', weight: 'bold' },
    { text: 'opiniPublik', size: '16px', color: '#4f46e5', weight: '500' },
    { text: 'Demokrasi', size: '14px', color: '#7c3aed', weight: 'bold' },
    { text: 'prabowogibran', size: '26px', color: '#1e3a8a', weight: '900' }
  ];

  // News Feed
  const newsArticles = [
    {
      id: 1,
      title: "Rapat Paripurna DPR RI Ke-15 Menyetujui RUU Pertanahan Menjadi UU",
      source: "Detik News",
      time: "15 mins ago",
      sentiment: "Neutral",
      desc: "DPR RI secara resmi menyetujui RUU Pertanahan dalam sidang paripurna hari ini. Keputusan ini dinilai strategis untuk kepastian hukum kepemilikan lahan di IKN dan daerah lainnya.",
      author: "Aditya Wijaya"
    },
    {
      id: 2,
      title: "Pertemuan Prabowo Subianto dengan Presiden Membahas Transisi Ekonomi Global",
      source: "Kompas",
      time: "1 hour ago",
      sentiment: "Positive",
      desc: "Pertemuan berlangsung hangat di Istana Bogor membahas kelanjutan proyek strategis nasional dan penguatan ketahanan pangan di tengah ketidakpastian geopolitik global.",
      author: "Rian Septian"
    },
    {
      id: 3,
      title: "Bawaslu Temukan Indikasi Pelanggaran Administrasi Pemilu di Beberapa Daerah",
      source: "Tempo",
      time: "3 hours ago",
      sentiment: "Negative",
      desc: "Bawaslu telah mencatat laporan dugaan pelanggaran administrasi dalam proses pencalonan kepala daerah dan merekomendasikan evaluasi menyeluruh dari pihak KPU.",
      author: "Linda Lestari"
    }
  ];

  // Social Media Feed
  const socialPosts = [
    {
      id: 1,
      title: "@sakti_w10: Dukungan untuk keberlanjutan IKN Nusantara terus mengalir dari berbagai elemen pemuda di Kalimantan Timur.",
      source: "Twitter / X",
      time: "12 mins ago",
      sentiment: "Positive",
      desc: "Pembangunan IKN bukan hanya pemindahan fisik gedung, melainkan simbol pemerataan ekonomi dan transformasi teknologi menuju Indonesia Emas 2045.",
      author: "Yusra Sakti"
    },
    {
      id: 2,
      title: "@budi_antoro: Harga beberapa bahan pokok terpantau masih tinggi di pasar tradisional pagi ini.",
      source: "Instagram",
      time: "45 mins ago",
      sentiment: "Negative",
      desc: "Kenaikan harga beras dan minyak goreng dikeluhkan oleh pedagang kecil dan ibu rumah tangga. Perlu langkah cepat dinas terkait untuk menggelar operasi pasar murah.",
      author: "Budi Antoro"
    },
    {
      id: 3,
      title: "@info_publik: KPU terus melakukan pemutakhiran data pemilih secara transparan untuk menyambut Pilkada serentak.",
      source: "Facebook",
      time: "2 hours ago",
      sentiment: "Neutral",
      desc: "Warga dihimbau aktif mengecek status DPT online secara mandiri untuk menjamin hak suara tersalurkan dengan baik tanpa kendala administrasi.",
      author: "Humas KPU"
    }
  ];

  // Filtered lists
  const currentFeed = currentPage === 'news' ? newsArticles : socialPosts;
  const filteredFeed = useMemo(() => {
    return currentFeed.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSentiment = sentimentFilter === 'All' || art.sentiment === sentimentFilter;
      return matchesSearch && matchesSentiment;
    });
  }, [currentPage, searchQuery, sentimentFilter]);

  return (
    <div className="modern-dashboard-theme" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      color: '#334155',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {/* LEFT SIDEBAR */}
      <aside style={{
        width: '70px',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        flexShrink: 0
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginBottom: '40px'
        }}>
          MI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Overview"><Grid size={22} /></button>
          <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '8px' }} title="Analytics"><BarChart2 size={22} /></button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Reports"><FileText size={22} /></button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Settings"><Settings size={22} /></button>
        </div>

        <button onClick={onBack} style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          padding: '8px',
          marginTop: 'auto'
        }} title="Exit Workspace">
          <ArrowLeft size={22} />
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        {/* HEADER BAR */}
        <header style={{
          height: '70px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          flexShrink: 0
        }}>
          {/* Page Tabs */}
          <div style={{ display: 'flex', gap: '32px', height: '100%', alignItems: 'center' }}>
            <button 
              onClick={() => { setCurrentPage('news'); setSentimentFilter('All'); }}
              style={{
                background: 'none',
                border: 'none',
                height: '100%',
                fontSize: '1rem',
                fontWeight: currentPage === 'news' ? '700' : '500',
                color: currentPage === 'news' ? '#2563eb' : '#64748b',
                borderBottom: currentPage === 'news' ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: '0 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Tv size={18} /> News & Blogs
            </button>
            <button 
              onClick={() => { setCurrentPage('social'); setSentimentFilter('All'); }}
              style={{
                background: 'none',
                border: 'none',
                height: '100%',
                fontSize: '1rem',
                fontWeight: currentPage === 'social' ? '700' : '500',
                color: currentPage === 'social' ? '#2563eb' : '#64748b',
                borderBottom: currentPage === 'social' ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: '0 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Share2 size={18} /> Social Media
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Workspace: **Default**</span>
            <button onClick={onBack} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
            }}>
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main style={{
          padding: '24px',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {/* Top Filter and Info Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                {currentPage === 'news' ? 'News & Blogs Monitoring Overview' : 'Social Media Intelligence Panel'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Real-time dashboard summarizing streaming analytical records and data pipelines.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}>
                <Calendar size={16} style={{ color: '#64748b' }} />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#1e293b',
                    outline: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  <option value="Today">Today</option>
                  <option value="Last 7 Days">Last 7 Days (Default)</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* PAGE 1: NEWS OVERVIEW */}
          {currentPage === 'news' && (
            <div className="fade-in">
              {/* News KPI Stats Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#2563eb', paddingLeft: '14px' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total News & Blogs</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>12,683,936</div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>★ Volume threshold secure</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#d97706', paddingLeft: '14px' }}>
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total News Exposure</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>12,258,041,833</div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>▲ 12.8% vs last week</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#059669', paddingLeft: '14px' }}>
                    <Globe size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Monitored Sources</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>3,732</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Active RSS and API feeds</div>
                  </div>
                </div>
              </div>

              {/* News Graphics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* News Volume Trend */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Trend Media (Daily Article Volume)</h3>
                  
                  <div style={{ width: '100%', height: '220px' }}>
                    <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', display: 'block' }}>
                      {/* Grid background */}
                      <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" />
                      <line x1="40" y1="70" x2="480" y2="70" stroke="#f1f5f9" />
                      <line x1="40" y1="120" x2="480" y2="120" stroke="#f1f5f9" />
                      <line x1="40" y1="170" x2="480" y2="170" stroke="#cbd5e1" />
                      
                      {/* Labels */}
                      <text x="10" y="25" fill="#94a3b8" fontSize="8">1,000</text>
                      <text x="10" y="75" fill="#94a3b8" fontSize="8">500</text>
                      <text x="10" y="125" fill="#94a3b8" fontSize="8">200</text>
                      
                      {/* Day values */}
                      {dateLabels.map((day, idx) => (
                        <text key={day} x={45 + idx * 70} y="185" fill="#64748b" fontSize="9" textAnchor="middle">{day}</text>
                      ))}

                      {/* Area Trend Area Chart */}
                      <path 
                        d="M 45 140 Q 115 100 185 110 T 325 60 T 465 40 L 465 170 L 45 170 Z" 
                        fill="rgba(59, 130, 246, 0.1)"
                      />
                      <path 
                        d="M 45 140 Q 115 100 185 110 T 325 60 T 465 40" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="3"
                      />
                      {/* Interactive nodes */}
                      <circle cx="45" cy="140" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="185" cy="110" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="325" cy="60" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="465" cy="40" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* News Top Keyword (Word Cloud) */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Top Keywords in News</h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    padding: '10px 0'
                  }}>
                    {wordCloudNews.map(item => (
                      <span key={item.text} style={{
                        fontSize: item.size,
                        color: item.color,
                        fontWeight: item.weight,
                        padding: '4px'
                      }}>{item.text}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* News Tables Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* News Influencer Matrix */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Top Influencer Channels</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0' }}>Channel</th>
                        <th style={{ padding: '8px 0' }}>Articles</th>
                        <th style={{ padding: '8px 0', textAlign: 'right' }}>Exposure Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>Twitter / X News</td>
                        <td style={{ padding: '12px 0' }}>14,500</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#3b82f6', fontWeight: '600' }}>3.2B</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>Online Media Portals</td>
                        <td style={{ padding: '12px 0' }}>12,890</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#3b82f6', fontWeight: '600' }}>5.4B</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>Institutional RSS</td>
                        <td style={{ padding: '12px 0' }}>4,120</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#3b82f6', fontWeight: '600' }}>1.8B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* System tech stack references */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Tool & Database Distribution</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0' }}>Technology</th>
                        <th style={{ padding: '8px 0' }}>Integration Roles</th>
                        <th style={{ padding: '8px 0', textAlign: 'right' }}>Indexing Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>Python ETL</td>
                        <td style={{ padding: '12px 0' }}>News ingestion pipelines</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Active</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>Elasticsearch</td>
                        <td style={{ padding: '12px 0' }}>Indexing & aggregation queries</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Optimal</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #f1f5f9' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600' }}>React Dashboard</td>
                        <td style={{ padding: '12px 0' }}>Interactive analytics views</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Optimal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: SOCIAL MEDIA VIEW */}
          {currentPage === 'social' && (
            <div className="fade-in">
              {/* Social KPI Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#0284c7', paddingLeft: '14px' }}>
                    <Share2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Social Posts</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>5,683,936</div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>★ Social feeds stable</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#d97706', paddingLeft: '14px' }}>
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Social Exposure</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>12,258,041,833</div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>▲ 8.3% reach index</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContents: 'center', color: '#7c3aed', paddingLeft: '14px' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Active Profiles</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>154,230</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Influencers & public accounts</div>
                  </div>
                </div>
              </div>

              {/* Social Graphics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* Exposure Trend Bar Chart */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Exposure Trend (Social Volume)</h3>
                  
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" />
                      <line x1="30" y1="70" x2="480" y2="70" stroke="#f1f5f9" />
                      <line x1="30" y1="120" x2="480" y2="120" stroke="#f1f5f9" />
                      <line x1="30" y1="150" x2="480" y2="150" stroke="#cbd5e1" />

                      {/* Y labels */}
                      <text x="5" y="25" fill="#94a3b8" fontSize="8">600k</text>
                      <text x="5" y="75" fill="#94a3b8" fontSize="8">300k</text>
                      <text x="5" y="125" fill="#94a3b8" fontSize="8">100k</text>

                      {/* Bars */}
                      {[25, 40, 50, 42, 30, 48, 65, 55, 38, 49, 58, 62].map((val, idx) => {
                        const barWidth = 24;
                        const gap = 12;
                        const x = 40 + idx * (barWidth + gap);
                        const height = (val / 80) * 130;
                        const y = 150 - height;
                        const isHovered = hoveredIndex === idx;

                        return (
                          <g key={idx} 
                             onMouseEnter={() => setHoveredIndex(idx)} 
                             onMouseLeave={() => setHoveredIndex(null)}
                             style={{ cursor: 'pointer' }}>
                            <rect 
                              x={x} 
                              y={y} 
                              width={barWidth} 
                              height={height} 
                              fill={isHovered ? '#1d4ed8' : '#3b82f6'} 
                              rx="3"
                              style={{ transition: 'all 0.15s ease' }}
                            />
                            {/* X-axis minor labels */}
                            {idx % 2 === 0 && (
                              <text x={x + barWidth/2} y="165" fill="#64748b" fontSize="8" textAnchor="middle">
                                {idx * 2 + 1} Jul
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Sentiment Proportion Donut */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Sentiment Proportion</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContents: 'center', gap: '24px', flexGrow: 1 }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                        
                        {/* Positive - 35% (Green) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="35 65" strokeDashoffset="0" />
                        
                        {/* Neutral - 45% (Blue) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="45 55" strokeDashoffset="-35" />
                        
                        {/* Negative - 20% (Red) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-80" />
                      </svg>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                        <span style={{ fontWeight: '600' }}>Positive (35%)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                        <span style={{ fontWeight: '600' }}>Neutral (45%)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                        <span style={{ fontWeight: '600' }}>Negative (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Tables Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* Top mentioned Persons */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Top Mentioned Persons</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>1. Prabowo Subianto</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>12,954 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>2. Joko Widodo</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>10,123 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>3. Anies Baswedan</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>8,432 mentions</span>
                    </div>
                  </div>
                </div>

                {/* Top organizations */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Top Mentioned Organizations</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>1. KPU (Komisi Pemilihan Umum)</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>5,430 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>2. Bawaslu</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>4,120 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>3. DPR RI</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>3,954 mentions</span>
                    </div>
                  </div>
                </div>

                {/* Top Location Tweet */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Top Location Activity</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>1. Jakarta (DKI)</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>780 posts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>2. Surabaya (Jawa Timur)</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>450 posts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: '600' }}>3. Bandung (Jawa Barat)</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>320 posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOWER DOCUMENT FEED */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
            {/* Feed Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                {currentPage === 'news' ? 'Recent Articles Feed' : 'Recent Social Posts'}
              </h3>
              
              {/* Inline Filters */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Sentiment:</span>
                {['All', 'Positive', 'Neutral', 'Negative'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSentimentFilter(opt)}
                    style={{
                      background: sentimentFilter === opt ? '#dbeafe' : 'none',
                      border: '1px solid',
                      borderColor: sentimentFilter === opt ? '#2563eb' : '#cbd5e1',
                      color: sentimentFilter === opt ? '#2563eb' : '#475569',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredFeed.map(art => {
                const isPositive = art.sentiment === 'Positive';
                const isNegative = art.sentiment === 'Negative';
                const badgeBg = isPositive ? '#d1fae5' : isNegative ? '#fee2e2' : '#f1f5f9';
                const badgeColor = isPositive ? '#065f46' : isNegative ? '#991b1b' : '#334155';

                return (
                  <div key={art.id} style={{
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: badgeBg,
                          color: badgeColor
                        }}>{art.sentiment}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{art.source}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{art.time}</span>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>{art.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 8px 0', lineHeight: '1.4' }}>{art.desc}</p>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Author / Source: **{art.author}**</div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
