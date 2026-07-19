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
  Grid,
  BarChart2,
  Settings,
  MoreVertical,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Heart,
  Share
} from 'lucide-react';

export default function MediaDashboard({ onBack }) {
  const [currentPage, setCurrentPage] = useState('news'); // 'news' or 'social'
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Custom stats state that updates on sync
  const [stats, setStats] = useState({
    newsArticles: 12683936,
    newsExposure: 12258041833,
    newsSources: 3732,
    socialPosts: 5683936,
    socialExposure: 12258041833,
    socialSources: 3732
  });

  const dateLabels = ['16 Jul', '17 Jul', '18 Jul', '19 Jul', '20 Jul', '21 Jul', '22 Jul'];

  const wordCloudNews = [
    { text: 'Langkah Strategis', size: '22px', color: '#1d4ed8', weight: 'bold' },
    { text: 'IKN Nusantara', size: '18px', color: '#0d9488', weight: 'bold' },
    { text: 'Prabowo Subianto', size: '24px', color: '#b45309', weight: '900' },
    { text: 'Joko Widodo', size: '20px', color: '#2563eb', weight: 'bold' },
    { text: 'RUU Pertanahan', size: '16px', color: '#db2777', weight: '500' },
    { text: 'DPR RI', size: '15px', color: '#4f46e5', weight: '500' },
    { text: 'Bawaslu', size: '14px', color: '#dc2626', weight: 'bold' }
  ];

  const wordCloudSocial = [
    { text: 'kawalkeputusan', size: '20px', color: '#2563eb', weight: 'bold' },
    { text: 'IndonesiaMaju', size: '16px', color: '#0d9488', weight: 'bold' },
    { text: 'PilkadaDamai', size: '22px', color: '#059669', weight: 'bold' },
    { text: 'prabowogibran', size: '24px', color: '#1e3a8a', weight: '900' }
  ];

  const handleSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats(prev => ({
        newsArticles: prev.newsArticles + Math.floor(Math.random() * 500) - 200,
        newsExposure: prev.newsExposure + Math.floor(Math.random() * 50000) - 20000,
        newsSources: prev.newsSources,
        socialPosts: prev.socialPosts + Math.floor(Math.random() * 400) - 150,
        socialExposure: prev.socialExposure + Math.floor(Math.random() * 30000) - 10000,
        socialSources: prev.socialSources
      }));
      setIsRefreshing(false);
    }, 800);
  };

  const subTabs = [
    'Overview',
    'Sentiment',
    'Top Person',
    'Top Organization',
    'Top Media',
    'Performance',
    'Top Keywords',
    'Recent News',
    'Recent News (Word Cloud)'
  ];

  // News Page Mock Data
  const newsFeed = [
    {
      id: 1,
      author: "Humas Kemenko",
      handle: "@kemendagri",
      time: "2 hours ago",
      title: "Rapat Paripurna DPR RI Ke-15 Menyetujui RUU Pertanahan Menjadi UU",
      desc: "Rapat paripurna menyepakati RUU Pertanahan resmi disahkan menjadi Undang-Undang. Langkah strategis ini mempercepat legalitas lahan pembangunan infrastruktur nasional.",
      sentiment: "Positive",
      likes: 124,
      replies: 12,
      retweets: 45
    },
    {
      id: 2,
      author: "Detik News",
      handle: "@detikcom",
      time: "4 hours ago",
      title: "Pertemuan Prabowo Subianto dengan Presiden Membahas Transisi Ekonomi Global",
      desc: "Pertemuan di Istana Bogor membahas langkah strategis transisi pemerintahan serta koordinasi ketahanan pangan dalam menghadapi tantangan ekonomi makro global.",
      sentiment: "Neutral",
      likes: 540,
      replies: 89,
      retweets: 120
    },
    {
      id: 3,
      author: "Laporan Utama",
      handle: "@laporan_utama",
      time: "5 hours ago",
      title: "Bawaslu Temukan Indikasi Pelanggaran Administrasi Pemilu di Beberapa Daerah",
      desc: "Bawaslu merekomendasikan evaluasi menyeluruh atas beberapa laporan pelanggaran kampanye di wilayah Jawa Barat dan Jawa Timur untuk kepatuhan regulasi.",
      sentiment: "Negative",
      likes: 89,
      replies: 34,
      retweets: 15
    }
  ];

  // Social Page Mock Data
  const socialFeed = [
    {
      id: 1,
      author: "Yusra Sakti W.",
      handle: "@sakti_w10",
      time: "12 mins ago",
      title: "Dukungan IKN Nusantara Mengalir Dari Elemen Pemuda Kaltim",
      desc: "Pembangunan IKN bukan hanya pemindahan fisik gedung pemerintahan saja, melainkan pemerataan ekonomi nasional dan simbol kemajuan teknologi digital Indonesia.",
      sentiment: "Positive",
      likes: 310,
      replies: 15,
      retweets: 92
    },
    {
      id: 2,
      author: "Info Ekonomi",
      handle: "@ekonomi_ri",
      time: "1 hour ago",
      title: "Penurunan Daya Beli Kelas Menengah Menjadi Sorotan Utama Diskusi Ekonomi",
      desc: "Ekonom menyarankan adanya program stimulus fiskal serta pengadaan bantuan modal bagi pelaku UMKM guna menjaga tingkat konsumsi domestik tetap stabil.",
      sentiment: "Negative",
      likes: 145,
      replies: 28,
      retweets: 40
    },
    {
      id: 3,
      author: "KPU RI",
      handle: "@kpu_ri",
      time: "3 hours ago",
      title: "Sosialisasi Pemutakhiran Data Pemilih DPT Online",
      desc: "KPU menghimbau masyarakat luas untuk aktif mengecek status kepesertaan pemilih mereka secara mandiri melalui portal resmi cekdptonline.kpu.go.id.",
      sentiment: "Neutral",
      likes: 215,
      replies: 8,
      retweets: 55
    }
  ];

  const currentFeed = currentPage === 'news' ? newsFeed : socialFeed;
  const filteredFeed = useMemo(() => {
    return currentFeed.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSentiment = sentimentFilter === 'All' || art.sentiment === sentimentFilter;
      return matchesSearch && matchesSentiment;
    });
  }, [currentPage, searchQuery, sentimentFilter]);

  return (
    <div className="modern-dashboard-theme" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f6f8fc',
      color: '#334155',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '65px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        flexShrink: 0
      }}>
        {/* Logo Icon */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: '800',
          fontSize: '1rem',
          marginBottom: '36px'
        }}>
          MI
        </div>

        {/* Sidebar Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', flexGrow: 1 }}>
          <button style={{ background: '#eff6ff', border: 'none', color: '#2563eb', cursor: 'pointer', padding: '8px', borderRadius: '6px' }} title="Overview"><Grid size={20} /></button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Media Monitoring"><Tv size={20} /></button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Social Analysis"><Share2 size={20} /></button>
          <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }} title="Database"><BarChart2 size={20} /></button>
        </div>

        {/* Exit Button */}
        <button onClick={onBack} style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          padding: '8px',
          marginTop: 'auto'
        }} title="Exit Workspace">
          <ArrowLeft size={20} />
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        {/* HEADER BAR */}
        <header style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}>
          {/* Top Row: Primary Navigation & Controls */}
          <div style={{
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Primary Page Navigation */}
            <div style={{ display: 'flex', gap: '24px', height: '100%', alignItems: 'center' }}>
              <button 
                onClick={() => { setCurrentPage('news'); setSentimentFilter('All'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  height: '100%',
                  fontSize: '0.95rem',
                  fontWeight: currentPage === 'news' ? '700' : '500',
                  color: currentPage === 'news' ? '#2563eb' : '#64748b',
                  borderBottom: currentPage === 'news' ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                News
              </button>
              <button 
                onClick={() => { setCurrentPage('social'); setSentimentFilter('All'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  height: '100%',
                  fontSize: '0.95rem',
                  fontWeight: currentPage === 'social' ? '700' : '500',
                  color: currentPage === 'social' ? '#2563eb' : '#64748b',
                  borderBottom: currentPage === 'social' ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Social Media
              </button>
            </div>

            {/* Top Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={handleSync}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#1e293b',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} className={isRefreshing ? 'spin-anim' : ''} />
                Sync
              </button>
              <button onClick={onBack} style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ArrowLeft size={14} /> Back
              </button>
            </div>
          </div>

          {/* Bottom Row: Sub Tabs */}
          <div style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            borderTop: '1px solid #f1f5f9',
            padding: '10px 0'
          }}>
            {subTabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                style={{
                  background: activeSubTab === tab ? '#eff6ff' : 'none',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: activeSubTab === tab ? '600' : '500',
                  color: activeSubTab === tab ? '#2563eb' : '#64748b',
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
        <main style={{
          padding: '24px',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {/* Top Filter Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '14px 20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Day:</span>
                <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', padding: '2px 8px' }}>
                  <option>7</option>
                  <option>14</option>
                  <option>30</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Content:</span>
                <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', padding: '2px 8px' }}>
                  <option>All Content</option>
                  <option>Exclude Retweets</option>
                </select>
              </div>

              {/* Datepicker display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#475569',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                <Calendar size={14} />
                <span>16 Jul 2026 00:00 AM - 22 Jul 2026 11:59 PM</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" id="exclude" style={{ cursor: 'pointer' }} />
              <label htmlFor="exclude" style={{ fontSize: '0.75rem', color: '#64748b', cursor: 'pointer' }}>Exclude</label>
            </div>
          </div>

          {/* PAGE 1: NEWS */}
          {currentPage === 'news' && (
            <div className="fade-in">
              {/* Stats Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                {/* Stat 1 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total news & blogs</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.newsArticles.toLocaleString()} articles
                  </div>
                </div>
                {/* Stat 2 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total news exposure</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.newsExposure.toLocaleString()} exposure
                  </div>
                </div>
                {/* Stat 3 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total source</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.newsSources.toLocaleString()} sources
                  </div>
                </div>
              </div>

              {/* Row 1: Trend Media Area Chart & Word Cloud */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.1fr',
                gap: '20px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                {/* Trend Media */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Trend Media</h4>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 0 0' }}>Chart value represent proportion of positive, negative, and neutral sentiment in media articles over time.</p>
                    </div>
                    <MoreVertical size={16} style={{ color: '#94a3b8' }} />
                  </div>
                  
                  {/* SVG Area Chart */}
                  <div style={{ width: '100%', height: '220px' }}>
                    <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" />
                      <line x1="30" y1="70" x2="480" y2="70" stroke="#f1f5f9" />
                      <line x1="30" y1="120" x2="480" y2="120" stroke="#f1f5f9" />
                      <line x1="30" y1="160" x2="480" y2="160" stroke="#cbd5e1" />
                      
                      {/* Lines */}
                      {/* Neutral - Blue line */}
                      <path d="M 30 130 C 100 80, 200 110, 300 50 C 400 90, 450 60, 480 30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                      {/* Positive - Green line */}
                      <path d="M 30 110 C 100 70, 200 90, 300 40 C 400 80, 450 50, 480 20" fill="none" stroke="#10b981" strokeWidth="2.5" />
                      {/* Negative - Red line */}
                      <path d="M 30 150 C 100 130, 200 140, 300 120 C 400 140, 450 130, 480 110" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                      
                      {/* Labels */}
                      {dateLabels.map((day, idx) => (
                        <text key={day} x={30 + idx * 75} y="175" fill="#64748b" fontSize="8" textAnchor="middle">{day}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Top Keyword */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Top Keyword</h4>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 0 0' }}>Chart represent frequency of keyword mentioned in media articles.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    {wordCloudNews.map(item => (
                      <span key={item.text} style={{ fontSize: item.size, color: item.color, fontWeight: item.weight, padding: '2px' }}>{item.text}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Trend Media By Category & Top Keyword By Category */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Trend Media by Category</h4>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 0 0' }}>Daily trend data grouped by main categories.</p>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '160px' }}>
                    <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <line x1="30" y1="120" x2="480" y2="120" stroke="#cbd5e1" />
                      <path d="M 30 90 L 130 50 L 230 80 L 330 30 L 430 70 L 480 40" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                      <path d="M 30 70 L 130 90 L 230 40 L 330 60 L 430 30 L 480 50" fill="none" stroke="#f59e0b" strokeWidth="2" />
                      {dateLabels.map((day, idx) => (
                        <text key={day} x={30 + idx * 75} y="135" fill="#64748b" fontSize="8" textAnchor="middle">{day}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Keyword by Category</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <span style={{ fontSize: '1.2rem', color: '#3b82f6', fontWeight: '600' }}>Politik</span>
                    <span style={{ fontSize: '1rem', color: '#10b981' }}>Nasional</span>
                    <span style={{ fontSize: '0.95rem', color: '#f59e0b' }}>IKN Infrastruktur</span>
                    <span style={{ fontSize: '0.85rem', color: '#ec4899' }}>RUU Agraria</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Influencer Table & Tool/Language Distribution */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1.5fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Influencer</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0' }}>Platform</th>
                        <th style={{ padding: '8px 0' }}>Engagement Volume</th>
                        <th style={{ padding: '8px 0', textAlign: 'right' }}>Active Coverage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>Twitter / X</td>
                        <td style={{ padding: '10px 0' }}>5,230,123</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#2563eb' }}>95.4%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>TikTok</td>
                        <td style={{ padding: '10px 0' }}>3,430,950</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#2563eb' }}>89.2%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>YouTube</td>
                        <td style={{ padding: '10px 0' }}>1,890,200</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#2563eb' }}>72.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Tool/Language Distribution</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '8px 0' }}>Framework / Tool</th>
                        <th style={{ padding: '8px 0' }}>Data Processing Role</th>
                        <th style={{ padding: '8px 0', textAlign: 'right' }}>Indexing Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>Python pandas</td>
                        <td style={{ padding: '10px 0' }}>Ingestion & cleaning scripts</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Active</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>Elasticsearch</td>
                        <td style={{ padding: '10px 0' }}>Aggregations & index queries</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Active</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '10px 0', fontWeight: '600' }}>React 19</td>
                        <td style={{ padding: '10px 0' }}>Interactive dashboard client</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>Active</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Row 4: Most Read News & News Sentiment Breakdown */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Most Read News</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span>DPR Sahkan RUU Pertanahan</span>
                      <span style={{ color: '#2563eb', fontWeight: '600' }}>14K Reads</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span>Pertemuan Prabowo-Jokowi di Bogor</span>
                      <span style={{ color: '#2563eb', fontWeight: '600' }}>12K Reads</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px', alignSelf: 'flex-start' }}>News Sentiment Breakdown</h4>
                  <div style={{ position: 'relative', width: '80px', height: '80px', margin: 'auto' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="30 70" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="50 50" strokeDashoffset="-30" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-80" />
                    </svg>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Trend Media</h4>
                  <div style={{ width: '100%', height: '85px' }}>
                    <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%' }}>
                      <path d="M 10 40 Q 30 20 50 30 T 90 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: SOCIAL MEDIA */}
          {currentPage === 'social' && (
            <div className="fade-in">
              {/* Stats Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total post & blogs</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.socialPosts.toLocaleString()} posts
                  </div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total post exposure</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.socialExposure.toLocaleString()} exposure
                  </div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total source</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {stats.socialSources.toLocaleString()} sources
                  </div>
                </div>
              </div>

              {/* Row 1: Exposure Trend Bar Chart */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Exposure Trend</h4>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '2px 0 0 0' }}>Chart represent intensity of positive, negative, and neutral sentiment in media articles over time.</p>
                  </div>
                </div>

                {/* SVG Bar Chart */}
                <div style={{ width: '100%', height: '200px' }}>
                  <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <line x1="30" y1="20" x2="570" y2="20" stroke="#f1f5f9" />
                    <line x1="30" y1="70" x2="570" y2="70" stroke="#f1f5f9" />
                    <line x1="30" y1="120" x2="570" y2="120" stroke="#cbd5e1" />
                    
                    {/* Y-axis metrics */}
                    <text x="5" y="25" fill="#94a3b8" fontSize="8">800</text>
                    <text x="5" y="75" fill="#94a3b8" fontSize="8">400</text>
                    <text x="5" y="125" fill="#94a3b8" fontSize="8">100</text>

                    {/* 20 Bars */}
                    {[25, 40, 50, 42, 30, 48, 65, 55, 38, 49, 58, 62, 45, 52, 60, 42, 35, 50, 68, 55].map((val, idx) => {
                      const barWidth = 18;
                      const gap = 8;
                      const x = 35 + idx * (barWidth + gap);
                      const height = (val / 80) * 100;
                      const y = 120 - height;
                      return (
                        <rect key={idx} x={x} y={y} width={barWidth} height={height} fill="#2563eb" rx="2" />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Row 2: Sentiment Proportion & Sentiment Distribution */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Sentiment Proportion</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexGrow: 1 }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="35 65" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="45 55" strokeDashoffset="-35" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-80" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span>● Positive (35%)</span>
                      <span>● Neutral (45%)</span>
                      <span>● Negative (20%)</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Sentiment Distribution</h4>
                  <div style={{ width: '100%', height: '120px' }}>
                    <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%' }}>
                      <path d="M 10 70 Q 50 40 100 60 T 200 30 T 290 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                      <path d="M 10 50 Q 50 70 100 40 T 200 50 T 290 20" fill="none" stroke="#10b981" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 3: Sentiment Range Stacked Bar Chart */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Sentiment Range</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Item 1 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>Masalah (Negative Critical)</span>
                      <span style={{ color: '#ef4444', fontWeight: '700' }}>15%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '15%', height: '100%', backgroundColor: '#ef4444' }}></div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>Perhatian (Warning/Alert)</span>
                      <span style={{ color: '#f59e0b', fontWeight: '700' }}>30%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', backgroundColor: '#f59e0b' }}></div>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>Informasi (General Data)</span>
                      <span style={{ color: '#3b82f6', fontWeight: '700' }}>55%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '55%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Top Person & Top Keyword */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Person</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>1. Prabowo Subianto</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>12,954 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>2. Joko Widodo</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>10,123 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>3. Donald Trump</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>8,432 mentions</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Keyword</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    {wordCloudSocial.map(item => (
                      <span key={item.text} style={{ fontSize: item.size, color: item.color, fontWeight: item.weight }}>{item.text}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Top Influencer News & Influencer News Feed */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Influencer News</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>1. Prabowo Subianto</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>1,254 mentions</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>2. Gibran Rakabuming</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>943 mentions</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Influencer News Feed</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                    <div>**@prabowo**: Terima kasih atas dukungan pemuda demi transisi pembangunan yang adekuat.</div>
                    <div>**@gibran_tweet**: Mari kita kawal terus digitalisasi program UMKM daerah.</div>
                  </div>
                </div>
              </div>

              {/* Row 6: Top Media Outlet & Top Tweet Location */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Media Outlet</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                        <th style={{ padding: '6px 0' }}>Media Outlet</th>
                        <th style={{ padding: '6px 0', textAlign: 'right' }}>Published Articles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Detik News Portal</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#2563eb' }}>2,450 articles</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Kompas Cyber Media</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#2563eb' }}>1,890 articles</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Top Tweet Location</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <span style={{ width: '100px' }}>Jawa Barat</span>
                      <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '85%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                      <span style={{ width: '100px' }}>DKI Jakarta</span>
                      <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '70%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SHARED LOWER FEED CARD */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
            {/* Feed Filter Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                {currentPage === 'news' ? 'News Feed' : 'Social Feeds Monitoring'}
              </h4>
              
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sentiment:</span>
                {['All', 'Positive', 'Neutral', 'Negative'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSentimentFilter(opt)}
                    style={{
                      background: sentimentFilter === opt ? '#eff6ff' : 'none',
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

            {/* Articles list */}
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
                    backgroundColor: '#ffffff'
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
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b' }}>{art.author}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{art.handle}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{art.time}</span>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>{art.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 12px 0', lineHeight: '1.4' }}>{art.desc}</p>
                    
                    {/* Action Bar */}
                    <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={14} /> {art.replies}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw size={14} /> {art.retweets}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} /> {art.likes}</span>
                    </div>
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
