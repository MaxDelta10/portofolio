import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  RefreshCw, 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Users, 
  Globe, 
  ThumbsUp, 
  MessageSquare,
  ThumbsDown,
  ChevronRight,
  TrendingDown,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function MediaDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);
  const [hoveredDonutIndex, setHoveredDonutIndex] = useState(null);

  // Mock stats
  const [stats, setStats] = useState({
    totalArticles: 12683936,
    totalExposure: 12258041833,
    totalSources: 3732,
    sentimentPositive: 38,
    sentimentNeutral: 42,
    sentimentNegative: 20
  });

  // Handler to refresh/randomize stats slightly
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats(prev => ({
        totalArticles: prev.totalArticles + Math.floor(Math.random() * 500) - 200,
        totalExposure: prev.totalExposure + Math.floor(Math.random() * 20000) - 5000,
        totalSources: prev.totalSources + Math.floor(Math.random() * 5) - 2,
        sentimentPositive: Math.max(30, Math.min(50, prev.sentimentPositive + Math.floor(Math.random() * 5) - 2)),
        sentimentNeutral: Math.max(30, Math.min(50, prev.sentimentNeutral + Math.floor(Math.random() * 5) - 2)),
        sentimentNegative: 100 - (prev.sentimentPositive + Math.floor(Math.random() * 5) - 2) - (prev.sentimentNeutral + Math.floor(Math.random() * 5) - 2)
      }));
      setIsRefreshing(false);
    }, 800);
  };

  // Exposure trend daily data (14 days)
  const exposureTrendData = [
    { day: '08 Jul', value: 340 },
    { day: '09 Jul', value: 450 },
    { day: '10 Jul', value: 490 },
    { day: '11 Jul', value: 380 },
    { day: '12 Jul', value: 290 },
    { day: '13 Jul', value: 410 },
    { day: '14 Jul', value: 520 },
    { day: '15 Jul', value: 580 },
    { day: '16 Jul', value: 610 },
    { day: '17 Jul', value: 430 },
    { day: '18 Jul', value: 320 },
    { day: '19 Jul', value: 490 },
    { day: '20 Jul', value: 550 },
    { day: '21 Jul', value: 680 }
  ];

  // Top Persons data
  const topPersons = [
    { name: 'Prabowo Subianto', count: 12954, role: 'Minister of Defense / President-Elect' },
    { name: 'Joko Widodo', count: 10123, role: 'President of Indonesia' },
    { name: 'Anies Baswedan', count: 8432, role: 'Former Governor of Jakarta' },
    { name: 'Ganjar Pranowo', count: 7543, role: 'Former Governor of Central Java' },
    { name: 'Gibran Rakabuming', count: 6120, role: 'Vice President-Elect' },
    { name: 'Erick Thohir', count: 4310, role: 'Minister of SOEs' }
  ];

  // Top Organizations
  const topOrganizations = [
    { name: 'KPU (Komisi Pemilihan Umum)', count: 5430, category: 'Electoral' },
    { name: 'Bawaslu', count: 4120, category: 'Electoral Oversight' },
    { name: 'DPR RI', count: 3954, category: 'Legislative' },
    { name: 'Mahkamah Konstitusi (MK)', count: 3120, category: 'Judicial' },
    { name: 'KPK', count: 2890, category: 'Law Enforcement' }
  ];

  // Top Media Outlets
  const topMediaOutlets = [
    { name: 'Detik.com', count: 2450, type: 'Online News' },
    { name: 'Kompas.com', count: 1890, type: 'Online News' },
    { name: 'Tempo.co', count: 1650, type: 'Online News' },
    { name: 'CNN Indonesia', count: 1420, type: 'TV & Online' },
    { name: 'Tribunnews', count: 1280, type: 'Online News Portal' }
  ];

  // Recent Articles
  const allArticles = [
    {
      id: 1,
      title: "Rapat Paripurna DPR RI Ke-15 Menyetujui RUU Pertanahan Menjadi UU",
      source: "Detik News",
      time: "15 mins ago",
      sentiment: "Neutral",
      desc: "DPR RI secara resmi menyetujui RUU Pertanahan dalam sidang paripurna hari ini. Keputusan ini dinilai strategis untuk kepastian hukum kepemilikan lahan di IKN dan daerah lainnya.",
      author: "Aditya Wijaya",
      url: "https://detik.com"
    },
    {
      id: 2,
      title: "Pertemuan Prabowo Subianto dengan Presiden Membahas Transisi Ekonomi Global",
      source: "Kompas",
      time: "1 hour ago",
      sentiment: "Positive",
      desc: "Pertemuan berlangsung hangat di Istana Bogor membahas kelanjutan proyek strategis nasional dan penguatan ketahanan pangan di tengah ketidakpastian geopolitik global.",
      author: "Rian Septian",
      url: "https://kompas.com"
    },
    {
      id: 3,
      title: "Bawaslu Temukan Indikasi Pelanggaran Administrasi Pemilu di Beberapa Daerah",
      source: "Tempo",
      time: "3 hours ago",
      sentiment: "Negative",
      desc: "Bawaslu telah mencatat laporan dugaan pelanggaran administrasi dalam proses pencalonan kepala daerah dan merekomendasikan evaluasi menyeluruh dari pihak KPU.",
      author: "Linda Lestari",
      url: "https://tempo.co"
    },
    {
      id: 4,
      title: "KPK Menggelar Sosialisasi Antikorupsi untuk Kepala Daerah Seluruh Indonesia",
      source: "Kabar24",
      time: "5 hours ago",
      sentiment: "Positive",
      desc: "Langkah preventif KPK diapresiasi tinggi dalam menyelenggarakan pembekalan tata kelola anggaran daerah bebas gratifikasi guna menghindari penyelewengan dana APBD.",
      author: "Hendra Putera",
      url: "https://bisnis.com"
    },
    {
      id: 5,
      title: "KPU Matangkan Distribusi Logistik Kotak Suara ke Wilayah Terpencil",
      source: "Liputan6",
      time: "8 hours ago",
      sentiment: "Neutral",
      desc: "Persiapan logistik Pilkada serentak dilaporkan telah mencapai tahap finalisasi. KPU bekerja sama dengan TNI-AL untuk pengiriman ke daerah kepulauan terluar.",
      author: "Santi Rahma",
      url: "https://liputan6.com"
    },
    {
      id: 6,
      title: "Penurunan Daya Beli Kelas Menengah Menjadi Sorotan Utama Diskusi Ekonomi Nasional",
      source: "CNBC Indonesia",
      time: "12 hours ago",
      sentiment: "Negative",
      desc: "Ekonom memperingatkan perlunya stimulus fiskal segera karena indeks keyakinan konsumen menunjukkan tren penurunan akibat kenaikan biaya energi dan bahan pokok.",
      author: "Dewi Kartika",
      url: "https://cnbcindonesia.com"
    }
  ];

  // Filtering articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSentiment = sentimentFilter === 'All' || art.sentiment === sentimentFilter;
      return matchesSearch && matchesSentiment;
    });
  }, [searchQuery, sentimentFilter]);

  // Format currency or big numbers
  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + ' M';
    return num.toLocaleString();
  };

  return (
    <div className="dashboard-container animate-fade-in" style={{
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-mono)',
      minHeight: '100vh',
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header bar */}
      <header className="dashboard-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} className="btn-secondary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-pixel)'
          }}>
            <ArrowLeft size={14} /> BACK
          </button>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '1.2rem',
              color: 'var(--text-heading)',
              margin: 0
            }}>MEDIA INTELLIGENCE</h1>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              REAL-TIME MONITORING WORKSPACE // EXECUTIVE SUMMARIES
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Preset date dropdown */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--card-bg)',
            border: '2px solid var(--border-color)',
            padding: '6px 12px',
            fontSize: '0.8rem'
          }}>
            <Calendar size={14} style={{ color: 'var(--accent-cyan)' }} />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-heading)',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>

          <button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="btn-primary" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-pixel)'
            }}
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-anim' : ''} /> 
            {isRefreshing ? 'SYNCING...' : 'SYNC DATA'}
          </button>
        </div>
      </header>

      {/* Tabs list */}
      <div className="dashboard-tabs" style={{
        display: 'flex',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: '28px',
        gap: '4px',
        overflowX: 'auto'
      }}>
        {['Overview', 'Sentiment Analysis', 'Top Entities', 'News Feed'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.65rem',
              padding: '12px 20px',
              border: 'none',
              background: activeTab === tab ? 'var(--card-bg)' : 'transparent',
              color: activeTab === tab ? 'var(--accent-cyan)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '3px solid var(--accent-cyan)' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Contents: Overview */}
      {activeTab === 'Overview' && (
        <div className="fade-in">
          {/* Key Stats Cards */}
          <div className="stats-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {/* Stat 1 */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px',
              boxShadow: 'var(--shadow-retro)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)' }}>[TOTAL_NEWS_ARTICLES]</span>
                <FileText size={18} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-heading)', fontFamily: 'var(--font-pixel)', marginBottom: '8px' }}>
                {formatNumber(stats.totalArticles)}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> +4.8% increase in media volume
              </div>
            </div>

            {/* Stat 2 */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px',
              boxShadow: 'var(--shadow-retro)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)' }}>[NEWS_EXPOSURE_INDEX]</span>
                <TrendingUp size={18} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-heading)', fontFamily: 'var(--font-pixel)', marginBottom: '8px' }}>
                {formatNumber(stats.totalExposure)}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> +12.4% estimated reach growth
              </div>
            </div>

            {/* Stat 3 */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px',
              boxShadow: 'var(--shadow-retro)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)' }}>[TOTAL_ACTIVE_SOURCES]</span>
                <Globe size={18} style={{ color: 'var(--accent-mint)' }} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-heading)', fontFamily: 'var(--font-pixel)', marginBottom: '8px' }}>
                {stats.totalSources}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Monitored online feeds & outlets
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="charts-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr',
            gap: '24px',
            marginBottom: '28px'
          }}>
            {/* Exposure Trend Chart */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '24px',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                marginBottom: '20px'
              }}>■ EXPOSURE TREND (DAILY ARTICLES)</h3>
              
              {/* Custom SVG Bar Chart */}
              <div style={{ position: 'relative', width: '100%', height: '240px', marginTop: '10px' }}>
                <svg viewBox="0 0 600 220" style={{ width: '100%', height: '100%', display: 'block' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="var(--border-color)" strokeDasharray="4 4" />
                  <line x1="40" y1="80" x2="580" y2="80" stroke="var(--border-color)" strokeDasharray="4 4" />
                  <line x1="40" y1="140" x2="580" y2="140" stroke="var(--border-color)" strokeDasharray="4 4" />
                  <line x1="40" y1="200" x2="580" y2="200" stroke="var(--border-color)" />

                  {/* Y Axis text */}
                  <text x="15" y="25" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">700</text>
                  <text x="15" y="85" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">400</text>
                  <text x="15" y="145" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">100</text>
                  
                  {/* Bars */}
                  {exposureTrendData.map((d, index) => {
                    const x = 50 + index * 37;
                    const height = (d.value / 700) * 180;
                    const y = 200 - height;
                    const isHovered = hoveredChartIndex === index;
                    return (
                      <g 
                        key={d.day}
                        onMouseEnter={() => setHoveredChartIndex(index)}
                        onMouseLeave={() => setHoveredChartIndex(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Interactive Highlight Bar background */}
                        <rect 
                          x={x - 2} 
                          y="20" 
                          width="24" 
                          height="180" 
                          fill={isHovered ? 'rgba(0, 229, 255, 0.05)' : 'transparent'} 
                        />
                        <rect 
                          x={x} 
                          y={y} 
                          width="20" 
                          height={height} 
                          fill={isHovered ? 'var(--accent-cyan)' : 'var(--border-color)'}
                          stroke={isHovered ? '#fff' : 'var(--accent-cyan)'}
                          strokeWidth={isHovered ? '1.5' : '1'}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                        {/* X-axis labels */}
                        <text 
                          x={x + 10} 
                          y="215" 
                          fill={isHovered ? 'var(--accent-cyan)' : 'var(--text-primary)'}
                          fontSize="9" 
                          fontFamily="var(--font-mono)"
                          textAnchor="middle"
                        >
                          {d.day.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                {/* Custom Tooltip */}
                {hoveredChartIndex !== null && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: `${hoveredChartIndex * 6 + 10}%`,
                    background: 'var(--card-hover)',
                    border: '1.5px solid var(--accent-cyan)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    pointerEvents: 'none',
                    boxShadow: 'var(--shadow-retro-accent)',
                    zIndex: 10
                  }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{exposureTrendData[hoveredChartIndex].day} 2026</div>
                    <div style={{ marginTop: '4px' }}>Volume: <span style={{ color: '#fff', fontWeight: 'bold' }}>{exposureTrendData[hoveredChartIndex].value} articles</span></div>
                  </div>
                )}
              </div>
            </div>

            {/* Sentiment Proportion Donut */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '24px',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                marginBottom: '20px'
              }}>■ SENTIMENT RATIO</h3>
              
              {/* Donut Chart representation */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                  <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', display: 'block' }}>
                    {/* Background circle */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="4" />
                    
                    {/* Positive Segment */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.915" 
                      fill="none" 
                      stroke="var(--accent-mint)" 
                      strokeWidth="4" 
                      strokeDasharray={`${stats.sentimentPositive} ${100 - stats.sentimentPositive}`} 
                      strokeDashoffset="0"
                      onMouseEnter={() => setHoveredDonutIndex('pos')}
                      onMouseLeave={() => setHoveredDonutIndex(null)}
                      style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease', strokeWidth: hoveredDonutIndex === 'pos' ? '5.5' : '4' }}
                    />
                    
                    {/* Neutral Segment */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.915" 
                      fill="none" 
                      stroke="var(--accent-cyan)" 
                      strokeWidth="4" 
                      strokeDasharray={`${stats.sentimentNeutral} ${100 - stats.sentimentNeutral}`} 
                      strokeDashoffset={-stats.sentimentPositive}
                      onMouseEnter={() => setHoveredDonutIndex('neu')}
                      onMouseLeave={() => setHoveredDonutIndex(null)}
                      style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease', strokeWidth: hoveredDonutIndex === 'neu' ? '5.5' : '4' }}
                    />

                    {/* Negative Segment */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.915" 
                      fill="none" 
                      stroke="var(--accent-magenta)" 
                      strokeWidth="4" 
                      strokeDasharray={`${stats.sentimentNegative} ${100 - stats.sentimentNegative}`} 
                      strokeDashoffset={-(stats.sentimentPositive + stats.sentimentNeutral)}
                      onMouseEnter={() => setHoveredDonutIndex('neg')}
                      onMouseLeave={() => setHoveredDonutIndex(null)}
                      style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease', strokeWidth: hoveredDonutIndex === 'neg' ? '5.5' : '4' }}
                    />
                  </svg>
                  {/* Center Text */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}>
                    <span style={{ fontSize: '0.5rem', display: 'block', color: 'var(--text-muted)', fontFamily: 'var(--font-pixel)' }}>NEUTRAL</span>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-pixel)' }}>{stats.sentimentNeutral}%</span>
                  </div>
                </div>

                {/* Legend list */}
                <div style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                  <span style={{ color: 'var(--accent-mint)', fontWeight: hoveredDonutIndex === 'pos' ? 'bold' : 'normal' }}>
                    ● POS ({stats.sentimentPositive}%)
                  </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: hoveredDonutIndex === 'neu' ? 'bold' : 'normal' }}>
                    ● NEU ({stats.sentimentNeutral}%)
                  </span>
                  <span style={{ color: 'var(--accent-magenta)', fontWeight: hoveredDonutIndex === 'neg' ? 'bold' : 'normal' }}>
                    ● NEG ({stats.sentimentNegative}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Entities and Keywords Row */}
          <div className="entities-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '28px'
          }}>
            {/* Top Persons */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '8px'
              }}>[TOP_MENTIONED_PERSONS]</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topPersons.map((p, idx) => (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContents: 'space-between', gap: '12px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', width: '20px', fontFamily: 'var(--font-pixel)' }}>{idx+1}.</span>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{p.role}</div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(0, 229, 255, 0.05)',
                      padding: '4px 8px',
                      border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}>{p.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Key Activities & Word Cloud */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '20px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '8px'
              }}>[TOP_TOPIC_CLOUD]</h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignContent: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                padding: '20px 0'
              }}>
                <span style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>Prabowo Subianto</span>
                <span style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>Joko Widodo</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-mint)', fontWeight: 'bold' }}>Langkah Strategis</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-heading)' }}>KPU Pemilu</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-magenta)' }}>IKN Nusantara</span>
                <span style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>Gibran Rakabuming</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>Sosialisasi Antikorupsi</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ketahanan Pangan</span>
                <span style={{ fontSize: '1.3rem', color: 'var(--accent-mint)' }}>Pembangunan Nasional</span>
                <span style={{ fontSize: '1.0rem', color: 'var(--accent-cyan)' }}>APBD Transparansi</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Contents: Sentiment Analysis */}
      {activeTab === 'Sentiment Analysis' && (
        <div className="fade-in">
          <div className="charts-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '24px',
            marginBottom: '28px'
          }}>
            {/* Sentiment Distribution Over Time */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '24px',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.75rem',
                color: 'var(--accent-cyan)',
                marginBottom: '20px'
              }}>■ SENTIMENT DISTRIBUTION OVER TIME (LAST 7 DAYS)</h3>
              
              {/* Custom SVG Line Chart */}
              <div style={{ width: '100%', height: '260px' }}>
                <svg viewBox="0 0 500 220" style={{ width: '100%', height: '100%', display: 'block' }}>
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeDasharray="3 3" />
                  <line x1="30" y1="80" x2="480" y2="80" stroke="var(--border-color)" strokeDasharray="3 3" />
                  <line x1="30" y1="140" x2="480" y2="140" stroke="var(--border-color)" strokeDasharray="3 3" />
                  <line x1="30" y1="200" x2="480" y2="200" stroke="var(--border-color)" />

                  {/* Y Axis text */}
                  <text x="5" y="25" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">100%</text>
                  <text x="5" y="85" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">50%</text>
                  <text x="5" y="145" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">20%</text>
                  
                  {/* X Axis days */}
                  {['15 Jul', '16 Jul', '17 Jul', '18 Jul', '19 Jul', '20 Jul', '21 Jul'].map((day, idx) => (
                    <text 
                      key={day} 
                      x={40 + idx * 70} 
                      y="215" 
                      fill="var(--text-primary)" 
                      fontSize="8" 
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      {day}
                    </text>
                  ))}

                  {/* Line 1: Positive Trend (Mint) */}
                  <path 
                    d="M 40 110 L 110 80 L 180 90 L 250 60 L 320 85 L 390 65 L 460 50" 
                    fill="none" 
                    stroke="var(--accent-mint)" 
                    strokeWidth="2.5" 
                  />
                  {/* Dots for Line 1 */}
                  <circle cx="40" cy="110" r="4" fill="var(--accent-mint)" />
                  <circle cx="110" cy="80" r="4" fill="var(--accent-mint)" />
                  <circle cx="180" cy="90" r="4" fill="var(--accent-mint)" />
                  <circle cx="250" cy="60" r="4" fill="var(--accent-mint)" />
                  <circle cx="320" cy="85" r="4" fill="var(--accent-mint)" />
                  <circle cx="390" cy="65" r="4" fill="var(--accent-mint)" />
                  <circle cx="460" cy="50" r="4" fill="var(--accent-mint)" />

                  {/* Line 2: Neutral Trend (Cyan) */}
                  <path 
                    d="M 40 70 L 110 90 L 180 80 L 250 110 L 320 95 L 390 100 L 460 90" 
                    fill="none" 
                    stroke="var(--accent-cyan)" 
                    strokeWidth="2.5" 
                  />
                  {/* Dots for Line 2 */}
                  <circle cx="40" cy="70" r="4" fill="var(--accent-cyan)" />
                  <circle cx="110" cy="90" r="4" fill="var(--accent-cyan)" />
                  <circle cx="180" cy="80" r="4" fill="var(--accent-cyan)" />
                  <circle cx="250" cy="110" r="4" fill="var(--accent-cyan)" />
                  <circle cx="320" cy="95" r="4" fill="var(--accent-cyan)" />
                  <circle cx="390" cy="100" r="4" fill="var(--accent-cyan)" />
                  <circle cx="460" cy="90" r="4" fill="var(--accent-cyan)" />

                  {/* Line 3: Negative Trend (Magenta) */}
                  <path 
                    d="M 40 150 L 110 160 L 180 140 L 250 150 L 320 170 L 390 155 L 460 160" 
                    fill="none" 
                    stroke="var(--accent-magenta)" 
                    strokeWidth="2.5" 
                  />
                  {/* Dots for Line 3 */}
                  <circle cx="40" cy="150" r="4" fill="var(--accent-magenta)" />
                  <circle cx="110" cy="160" r="4" fill="var(--accent-magenta)" />
                  <circle cx="180" cy="140" r="4" fill="var(--accent-magenta)" />
                  <circle cx="250" cy="150" r="4" fill="var(--accent-magenta)" />
                  <circle cx="320" cy="170" r="4" fill="var(--accent-magenta)" />
                  <circle cx="390" cy="155" r="4" fill="var(--accent-magenta)" />
                  <circle cx="460" cy="160" r="4" fill="var(--accent-magenta)" />
                </svg>
              </div>
            </div>

            {/* Sentiment Range Summary */}
            <div className="dashboard-card" style={{
              background: 'var(--card-bg)',
              border: '2px solid var(--border-color)',
              padding: '24px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-cyan)',
                  marginBottom: '20px'
                }}>■ SENTIMENT SCORE DISTRIBUTION</h3>
                
                {/* Stacked bar or list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold' }}>Rekomendasi (Positif Kuat)</span>
                      <span style={{ color: 'var(--accent-mint)', fontWeight: 'bold' }}>24%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '24%', height: '100%', background: 'var(--accent-mint)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold' }}>Informasi (Netral)</span>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>42%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '42%', height: '100%', background: 'var(--accent-cyan)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold' }}>Perhatian (Negatif Ringan)</span>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>20%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '20%', height: '100%', background: 'var(--accent-gold)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 'bold' }}>Masalah (Negatif Kritis)</span>
                      <span style={{ color: 'var(--accent-magenta)', fontWeight: 'bold' }}>14%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '14%', height: '100%', background: 'var(--accent-magenta)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '16px', marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                System computes sentiment scores via BERT NLP models fine-tuned on Indonesian media text.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Contents: Top Entities */}
      {activeTab === 'Top Entities' && (
        <div className="fade-in" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Top Organizations Table */}
          <div className="dashboard-card" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--border-color)',
            padding: '24px',
            borderRadius: '4px'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '8px'
            }}>■ TOP MENTIONED ORGANIZATIONS</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)' }}># RANK</th>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)' }}>ORGANIZATION</th>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', textAlign: 'right' }}>MENTIONS</th>
                </tr>
              </thead>
              <tbody>
                {topOrganizations.map((o, idx) => (
                  <tr key={o.name} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                    <td style={{ padding: '12px 0', color: 'var(--accent-gold)', fontFamily: 'var(--font-pixel)', fontSize: '0.7rem' }}>0{idx+1}</td>
                    <td style={{ padding: '12px 0', fontWeight: 'bold' }}>{o.name}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--accent-cyan)' }}>{o.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Media Outlets Table */}
          <div className="dashboard-card" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--border-color)',
            padding: '24px',
            borderRadius: '4px'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '8px'
            }}>■ TOP MEDIA OUTLETS</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)' }}># RANK</th>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)' }}>OUTLET</th>
                  <th style={{ padding: '8px 0', fontSize: '0.7rem', fontFamily: 'var(--font-pixel)', textAlign: 'right' }}>VOLUME</th>
                </tr>
              </thead>
              <tbody>
                {topMediaOutlets.map((m, idx) => (
                  <tr key={m.name} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                    <td style={{ padding: '12px 0', color: 'var(--accent-gold)', fontFamily: 'var(--font-pixel)', fontSize: '0.7rem' }}>0{idx+1}</td>
                    <td style={{ padding: '12px 0', fontWeight: 'bold' }}>{m.name}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--accent-cyan)' }}>{m.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Contents: News Feed */}
      {activeTab === 'News Feed' && (
        <div className="fade-in">
          {/* Filters Bar */}
          <div className="news-filter-bar" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--border-color)',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Search Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              border: '2px solid var(--border-color)',
              padding: '6px 12px',
              width: '100%',
              maxWidth: '360px',
              gap: '8px'
            }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search news, topics, or sources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-heading)',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem'
                }}
              />
            </div>

            {/* Sentiment selection */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>FILTER SENTIMENT:</span>
              {['All', 'Positive', 'Neutral', 'Negative'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setSentimentFilter(opt)}
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.55rem',
                    padding: '6px 10px',
                    border: '1.5px solid',
                    borderColor: sentimentFilter === opt ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: sentimentFilter === opt ? 'var(--accent-cyan-bg)' : 'transparent',
                    color: sentimentFilter === opt ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map(art => {
                const isPositive = art.sentiment === 'Positive';
                const isNegative = art.sentiment === 'Negative';
                const sentimentColor = isPositive ? 'var(--accent-mint)' : isNegative ? 'var(--accent-magenta)' : 'var(--accent-cyan)';
                const sentimentIcon = isPositive ? <CheckCircle size={14} /> : isNegative ? <AlertTriangle size={14} /> : <FileText size={14} />;

                return (
                  <div key={art.id} className="news-card" style={{
                    background: 'var(--card-bg)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '20px',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontFamily: 'var(--font-pixel)',
                          fontSize: '0.55rem',
                          padding: '4px 8px',
                          background: isPositive ? 'rgba(16, 185, 129, 0.1)' : isNegative ? 'rgba(244, 63, 94, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                          color: sentimentColor,
                          border: `1.5px solid ${sentimentColor}`,
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {sentimentIcon} {art.sentiment.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{art.source}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{art.time}</span>
                    </div>

                    <h4 style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-heading)',
                      marginBottom: '10px',
                      lineHeight: '1.4',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 'bold'
                    }}>{art.title}</h4>

                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>{art.desc}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <span>Reporter: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{art.author}</span></span>
                      <a href={art.url} target="_blank" rel="noopener noreferrer" style={{
                        color: 'var(--accent-cyan)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: 'bold'
                      }}>
                        READ SOURCE <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '48px',
                border: '2px dashed var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-muted)',
                fontSize: '0.8rem'
              }}>
                No articles match your query. Try clearing search or sentiment filters!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
