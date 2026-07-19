import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Tv, 
  Share2, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Heart, 
  Calendar,
  Grid,
  FileText,
  Settings,
  MoreVertical,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function MediaDashboard({ onBack }) {
  const [currentPage, setCurrentPage] = useState('news'); // 'news' (News IMA) or 'social' (Social Media ISA)
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [selectedArticleId, setSelectedArticleId] = useState(1);

  // Common dates and layout options
  const subTabs = ['Overview', 'Sentiment', 'Top Person', 'Top Organization', 'Top Media', 'Performance', 'Top Keywords', 'Recent News'];

  // Word Clouds
  const newsKeywords = [
    { text: 'langkah strategis', size: '28px', color: '#1e40af', weight: 'bold' },
    { text: 'kesejahteraan masyarakat', size: '24px', color: '#0f766e', weight: 'bold' },
    { text: 'manfaat bagi masyarakat', size: '22px', color: '#b45309', weight: '700' },
    { text: 'IKN Nusantara', size: '20px', color: '#0369a1', weight: 'bold' },
    { text: 'pembangunan infrastruktur', size: '18px', color: '#4338ca', weight: '600' },
    { text: 'ekonomi nasional', size: '16px', color: '#15803d', weight: 'bold' },
    { text: 'sidang paripurna', size: '15px', color: '#be185d', weight: '500' },
    { text: 'KPK RI', size: '14px', color: '#b91c1c', weight: 'bold' }
  ];

  const socialKeywords = [
    { text: 'kawalkeputusan', size: '26px', color: '#2563eb', weight: '900' },
    { text: 'world cup', size: '22px', color: '#d97706', weight: 'bold' },
    { text: 'trump calling', size: '20px', color: '#dc2626', weight: 'bold' },
    { text: 'live camera', size: '18px', color: '#059669', weight: '600' },
    { text: 'IndonesiaMaju', size: '16px', color: '#0891b2', weight: 'bold' },
    { text: 'PilkadaDamai', size: '15px', color: '#7c3aed', weight: '500' }
  ];

  // News IMA articles list (Grid + preview)
  const newsArticles = [
    {
      id: 1,
      title: "Rapat Paripurna DPR RI Ke-15 Menyetujui RUU Pertanahan Menjadi UU",
      source: "Detik News",
      time: "15 mins ago",
      sentiment: "Positive",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=60",
      desc: "DPR RI secara resmi menyetujui RUU Pertanahan dalam sidang paripurna hari ini. Keputusan ini dinilai sangat strategis untuk kepastian hukum pembangunan dan investasi infrastruktur nasional khususnya di wilayah IKN Nusantara guna mendukung pertumbuhan ekonomi berkelanjutan.",
      author: "Aditya Wijaya",
      exposure: "1.2B Reach"
    },
    {
      id: 2,
      title: "Pertemuan Prabowo Subianto dengan Presiden Membahas Transisi Pemerintahan",
      source: "Kompas",
      time: "1 hour ago",
      sentiment: "Positive",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60",
      desc: "Pertemuan hangat berlangsung di Istana Kepresidenan Bogor membahas transisi program strategis nasional serta stabilitas ekonomi makro di tengah ketidakpastian geopolitik global.",
      author: "Rian Septian",
      exposure: "980M Reach"
    },
    {
      id: 3,
      title: "Bawaslu Temukan Indikasi Pelanggaran Administrasi Pemilu di Beberapa Daerah",
      source: "Tempo",
      time: "3 hours ago",
      sentiment: "Negative",
      image: "https://images.unsplash.com/photo-1505664194779-8bebcb95c539?w=500&auto=format&fit=crop&q=60",
      desc: "Bawaslu telah mencatat laporan pelanggaran administrasi dalam proses pendaftaran calon kepala daerah dan menyerahkan berkas evaluasi komprehensif ke KPU.",
      author: "Linda Lestari",
      exposure: "540M Reach"
    },
    {
      id: 4,
      title: "KPK Menggelar Sosialisasi Antikorupsi untuk Aparatur Sipil Negara (ASN)",
      source: "Tribun News",
      time: "4 hours ago",
      sentiment: "Neutral",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&auto=format&fit=crop&q=60",
      desc: "Upaya pencegahan korupsi terus diintensifkan dengan menggelar bimbingan teknis integritas bagi jajaran pejabat tinggi pratama di tingkat kementerian dan lembaga.",
      author: "Humas KPK",
      exposure: "320M Reach"
    }
  ];

  // Social Media ISA posts
  const socialPosts = [
    {
      id: 1,
      author: "Yusra Sakti W.",
      handle: "@sakti_w10",
      platform: "Twitter",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
      desc: "Pembangunan IKN Nusantara bukan sekadar pemindahan gedung pemerintahan saja, melainkan langkah besar pemerataan ekonomi dan transformasi teknologi menuju Indonesia Emas 2045! 🇮🇩✨ #IKNNusantara #IndonesiaMaju",
      sentiment: "Positive",
      emotion: "Joy",
      likes: "1,250",
      comments: "45",
      views: "12.4K"
    },
    {
      id: 2,
      author: "Humas Kemenko",
      handle: "@kemendagri",
      platform: "Facebook",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      desc: "Kementerian Dalam Negeri kembali menegaskan kesiapan seluruh aparatur daerah dalam menyambut proses pendaftaran pilkada serentak secara tertib, aman, dan mematuhi regulasi administrasi yang berlaku.",
      sentiment: "Neutral",
      emotion: "Anticipation",
      likes: "890",
      comments: "12",
      views: "5.6K"
    },
    {
      id: 3,
      author: "Netizen Kritik",
      handle: "@kritik_publik",
      platform: "Instagram",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60",
      desc: "Harga beras dan beberapa komoditas pokok terpantau masih tinggi di pasar tradisional. Operasi pasar murah dinilai belum merata dan kurang efektif menjangkau masyarakat kecil.",
      sentiment: "Negative",
      emotion: "Sadness",
      likes: "2,430",
      comments: "189",
      views: "45.2K"
    }
  ];

  const selectedArticle = newsArticles.find(art => art.id === selectedArticleId) || newsArticles[0];

  return (
    <div className="modern-dashboard-theme" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      color: '#334155',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '60px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        flexShrink: 0
      }}>
        {/* MI Logo */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: '900',
          fontSize: '0.95rem',
          marginBottom: '32px'
        }}>
          MI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
          <button 
            onClick={() => setCurrentPage('news')} 
            style={{ 
              background: currentPage === 'news' ? '#eff6ff' : 'none', 
              border: 'none', 
              color: currentPage === 'news' ? '#2563eb' : '#64748b', 
              cursor: 'pointer', 
              padding: '10px', 
              borderRadius: '6px' 
            }} 
            title="News IMA"
          >
            <Tv size={18} />
          </button>
          <button 
            onClick={() => setCurrentPage('social')} 
            style={{ 
              background: currentPage === 'social' ? '#eff6ff' : 'none', 
              border: 'none', 
              color: currentPage === 'social' ? '#2563eb' : '#64748b', 
              cursor: 'pointer', 
              padding: '10px', 
              borderRadius: '6px' 
            }} 
            title="Social Media ISA"
          >
            <Share2 size={18} />
          </button>
        </div>

        <button onClick={onBack} style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
          padding: '8px',
          marginTop: 'auto'
        }} title="Exit Workspace">
          <ArrowLeft size={18} />
        </button>
      </aside>

      {/* MAIN CONTAINER */}
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
          {/* Top Row */}
          <div style={{
            height: '56px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'center' }}>
              <button 
                onClick={() => setCurrentPage('news')}
                style={{
                  background: 'none',
                  border: 'none',
                  height: '100%',
                  fontSize: '0.9rem',
                  fontWeight: currentPage === 'news' ? '700' : '500',
                  color: currentPage === 'news' ? '#2563eb' : '#64748b',
                  borderBottom: currentPage === 'news' ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: '0 4px'
                }}
              >
                News Media (News IMA)
              </button>
              <button 
                onClick={() => setCurrentPage('social')}
                style={{
                  background: 'none',
                  border: 'none',
                  height: '100%',
                  fontSize: '0.9rem',
                  fontWeight: currentPage === 'social' ? '700' : '500',
                  color: currentPage === 'social' ? '#2563eb' : '#64748b',
                  borderBottom: currentPage === 'social' ? '3px solid #2563eb' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: '0 4px'
                }}
              >
                Social Media (Social Media ISA)
              </button>
            </div>

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
              <ArrowLeft size={14} /> Back to Portfolio
            </button>
          </div>

          {/* Sub-tabs Row */}
          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            borderTop: '1px solid #f1f5f9',
            padding: '8px 0'
          }}>
            {subTabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                style={{
                  background: activeSubTab === tab ? '#eff6ff' : 'none',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
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
          padding: '20px',
          overflowY: 'auto',
          flexGrow: 1
        }}>
          {/* Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
              <span style={{ color: '#64748b' }}>Day:</span>
              <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px' }}>
                <option>7</option>
                <option>14</option>
                <option>30</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
              <span style={{ color: '#64748b' }}>Content:</span>
              <select style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px' }}>
                <option>All Content</option>
              </select>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: '#475569',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              padding: '3px 8px',
              borderRadius: '4px'
            }}>
              <Calendar size={12} />
              <span>16 Jul 2026 00:00 AM - 22 Jul 2026 11:59 PM</span>
            </div>
          </div>

          {/* PAGE 1: NEWS MEDIA (NEWS IMA) */}
          {currentPage === 'news' && (
            <div className="fade-in">
              {/* Row 1: Exposure Trend (Full Width) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Exposure Trend</h4>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                
                <div style={{ width: '100%', height: '180px' }}>
                  <svg viewBox="0 0 600 160" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <line x1="30" y1="20" x2="570" y2="20" stroke="#f1f5f9" />
                    <line x1="30" y1="70" x2="570" y2="70" stroke="#f1f5f9" />
                    <line x1="30" y1="120" x2="570" y2="120" stroke="#cbd5e1" />
                    
                    {/* Bars representing Mainstream Media volume */}
                    {[45, 60, 75, 80, 70, 85, 95, 90, 80, 88, 92, 110, 100, 95, 85, 75, 65, 80, 90, 85].map((val, idx) => {
                      const barWidth = 18;
                      const gap = 8;
                      const x = 35 + idx * (barWidth + gap);
                      const height = (val / 130) * 100;
                      const y = 120 - height;
                      return (
                        <rect key={idx} x={x} y={y} width={barWidth} height={height} fill="#1e3a8a" rx="1.5" />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Row 2: Total News KPI (Full Width) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Total News</h4>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '8px' }}>🔗 Source: Mainstream Media</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>34.258</span>
                  <span style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: '700' }}>[↗]</span>
                </div>
              </div>

              {/* Row 3: Sentiment Proportion & Sentiment Distribution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Sentiment Proportion</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '16px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                    <div style={{ width: '80px', height: '80px' }}>
                      <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="4.5" strokeDasharray="45 55" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#475569" strokeWidth="4.5" strokeDasharray="34 66" strokeDashoffset="-45" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="21 79" strokeDashoffset="-79" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: '#2563eb' }}>● Positive (45.47%)</span>
                      <span style={{ color: '#475569' }}>● Neutral (34.32%)</span>
                      <span style={{ color: '#ef4444' }}>● Negative (20.21%)</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Sentiment Distribution</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ width: '100%', height: '110px' }}>
                    <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', display: 'block' }}>
                      {/* Positive Line */}
                      <path d="M 10 30 Q 80 15, 150 40 T 290 20 T 390 10" fill="none" stroke="#2563eb" strokeWidth="2" />
                      {/* Neutral Line */}
                      <path d="M 10 50 Q 80 35, 150 50 T 290 40 T 390 30" fill="none" stroke="#475569" strokeWidth="2" />
                      {/* Negative Line */}
                      <path d="M 10 80 Q 80 65, 150 80 T 290 70 T 390 60" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 4: Sentiment Target (Full Width) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Sentiment Target</h4>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                
                {/* Vertical Stacked Bar Chart for Entities */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', height: '140px', paddingBottom: '20px' }}>
                  {['Masyarakat', 'Pemerintah', 'Indonesia', 'Bawaslu', 'DPR RI'].map((label, idx) => {
                    const vals = [[40, 30, 30], [50, 20, 30], [60, 25, 15], [30, 40, 30], [25, 35, 40]][idx];
                    return (
                      <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: `${vals[0]}%`, backgroundColor: '#2563eb' }}></div>
                          <div style={{ height: `${vals[1]}%`, backgroundColor: '#475569' }}></div>
                          <div style={{ height: `${vals[2]}%`, backgroundColor: '#ef4444' }}></div>
                        </div>
                        <span style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '6px', color: '#64748b' }}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Top Person & Top Keywords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Person</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <tbody>
                      {[['Prabowo Subianto', '4,230 Exposure'], ['Joko Widodo', '3,950 Exposure'], ['Gibran Rakabuming', '2,890 Exposure']].map((row, idx) => (
                        <tr key={row[0]} style={{ borderBottom: '1px dashed #e2e8f0' }}>
                          <td style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold' }}>{idx+1}</div>
                            <span style={{ fontWeight: '600' }}>{row[0]}</span>
                          </td>
                          <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Keywords</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    {newsKeywords.map(k => (
                      <span key={k.text} style={{ fontSize: k.size, color: k.color, fontWeight: k.weight }}>{k.text}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 6: Top Influencer & Influencer Statements */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Influencer News</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>1. Humas Kemenko</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>340 Statements</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>2. Bawaslu Press</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>289 Statements</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Influencers Statements News</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem' }}>
                    <div style={{ border: '1px solid #f1f5f9', padding: '8px', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700' }}>@kemendagri</span>
                        <span style={{ fontSize: '0.65rem', backgroundColor: '#d1fae5', color: '#065f46', padding: '1px 6px', borderRadius: '3px' }}>Positive</span>
                      </div>
                      <p style={{ margin: 0, color: '#475569' }}>"RUU Pertanahan yang baru disahkan menjamin legalitas hak atas tanah pembangunan IKN Nusantara."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 7: Top Media Outlets & Top News Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Media Outlets</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <tbody>
                      {[['Detik News', '1,240 articles'], ['Kompas', '980 articles'], ['Tempo', '750 articles']].map(row => (
                        <tr key={row[0]} style={{ borderBottom: '1px dashed #e2e8f0' }}>
                          <td style={{ padding: '8px 0', fontWeight: '600' }}>{row[0]}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top News Location</h4>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Mainstream Media</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Jawa Barat', 85], ['Jawa Timur', 70], ['DKI Jakarta', 65]].map(loc => (
                      <div key={loc[0]} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                        <span style={{ width: '80px', fontWeight: '600' }}>{loc[0]}</span>
                        <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${loc[1]}%`, height: '100%', backgroundColor: '#b91c1c' }}></div>
                        </div>
                        <span style={{ width: '30px', color: '#64748b' }}>{loc[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 8: Latest News (Interactive Split Grid Panel) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Latest News</h4>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '16px' }}>🔗 Source: Mainstream Media</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                  {/* Left Side: Article Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {newsArticles.map(art => (
                      <div 
                        key={art.id} 
                        onClick={() => setSelectedArticleId(art.id)}
                        style={{
                          border: selectedArticleId === art.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          borderRadius: '6px',
                          padding: '10px',
                          backgroundColor: '#fafafa',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: '110px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '700', color: '#2563eb' }}>{art.source}</span>
                            <span style={{ color: '#94a3b8' }}>{art.time}</span>
                          </div>
                          <h5 style={{ fontSize: '0.75rem', fontWeight: '700', margin: 0, lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{art.title}</h5>
                        </div>
                        <span style={{
                          fontSize: '0.6rem',
                          alignSelf: 'flex-start',
                          fontWeight: '700',
                          padding: '1px 6px',
                          borderRadius: '3px',
                          backgroundColor: art.sentiment === 'Positive' ? '#d1fae5' : art.sentiment === 'Negative' ? '#fee2e2' : '#f1f5f9',
                          color: art.sentiment === 'Positive' ? '#065f46' : art.sentiment === 'Negative' ? '#991b1b' : '#334155'
                        }}>{art.sentiment}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right Side: Active Preview Card */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <img src={selectedArticle.image} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginBottom: '4px' }}>
                        <span>Author: **{selectedArticle.author}**</span>
                        <span>{selectedArticle.exposure}</span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>{selectedArticle.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0 0 8px 0', lineHeight: '1.4' }}>{selectedArticle.desc}</p>
                      <button style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Read Full Article</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: SOCIAL MEDIA (SOCIAL MEDIA ISA) */}
          {currentPage === 'social' && (
            <div className="fade-in">
              {/* Row 1: KPI Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total Exposure</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>1.187.492 Postingan</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total Engagements</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>23.581.835,38 Engagement</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total Contributor</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>776.229 Account</div>
                </div>
              </div>

              {/* Row 2: Split Columns for Trend Charts and Keywords */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', marginBottom: '20px' }}>
                {/* Left Column: Exposure Trend (Social Channels) & Engagement History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Exposure Trend</h4>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Social Media</div>
                    <div style={{ width: '100%', height: '140px' }}>
                      <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', display: 'block' }}>
                        {/* Area layers representing Twitter, Facebook, Instagram */}
                        <path d="M 10 90 Q 80 50 150 70 T 290 40 T 390 20 L 390 90 Z" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" strokeWidth="1.5" />
                        <path d="M 10 90 Q 80 65 150 80 T 290 60 T 390 45 L 390 90 Z" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Engagement History</h4>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '12px' }}>🔗 Source: Social Media</div>
                    <div style={{ width: '100%', height: '100px' }}>
                      <svg viewBox="0 0 400 80" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <path d="M 10 60 L 100 30 L 200 50 L 300 15 L 390 40" fill="none" stroke="#d97706" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Column: Top Keywords & Top Keywords by Engagement */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Keywords</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                      {socialKeywords.map(k => (
                        <span key={k.text} style={{ fontSize: k.size, color: k.color, fontWeight: k.weight }}>{k.text}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Keywords by Engagement</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignContent: 'center', justifyContent: 'center', flexGrow: 1 }}>
                      <span style={{ fontSize: '1.2rem', color: '#d97706', fontWeight: 'bold' }}>#kawalkeputusan</span>
                      <span style={{ fontSize: '1rem', color: '#dc2626' }}>#PEACHANDMESERIESEP2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Total Posts & Total Engagement Platform */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Total Posts</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Twitter</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>866.546 posts</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Tiktok</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>154.456 posts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Total Engagement Platform</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Twitter</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>10.187.946,08</td>
                      </tr>
                      <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600' }}>Tiktok</td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>4,231,040,12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Row 4: Top Contributors, Locations, and Cities */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Contributors</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>@sakti_w10</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>140 posts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>@info_kpu</span>
                      <span style={{ color: '#2563eb', fontWeight: '700' }}>98 posts</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Top Locations by Engagement</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Jawa Barat', 90], ['DKI Jakarta', 80]].map(loc => (
                      <div key={loc[0]} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem' }}>
                        <span style={{ width: '70px' }}>{loc[0]}</span>
                        <div style={{ flexGrow: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${loc[1]}%`, height: '100%', backgroundColor: '#1e3b8a' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>User Location (City Level)</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <div style={{ width: '50px', height: '50px' }}>
                      <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="6" strokeDasharray="60 40" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#7c3aed" strokeWidth="6" strokeDasharray="40 60" strokeDashoffset="-60" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.65rem' }}>
                      <div>● Bandung (60%)</div>
                      <div>● Pekanbaru (40%)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Sentiment Trend & Sentiment Proportion */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Sentiment Trend</h4>
                  <div style={{ width: '100%', height: '110px' }}>
                    <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                      <path d="M 10 50 Q 150 10 290 60 T 390 30" fill="none" stroke="#10b981" strokeWidth="2" />
                      <path d="M 10 70 Q 150 90 290 40 T 390 60" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', alignSelf: 'flex-start' }}>Sentiment Proportion</h4>
                  <div style={{ width: '70px', height: '70px', margin: 'auto' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="35 65" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="-35" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="5" strokeDasharray="20 80" strokeDashoffset="-80" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 7: Emotion Trend & Emotion Distribution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Emotion Trend</h4>
                  <div style={{ width: '100%', height: '110px' }}>
                    <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                      <path d="M 10 40 C 100 20, 200 80, 390 10" fill="none" stroke="#ec4899" strokeWidth="2" title="Joy" />
                      <path d="M 10 80 C 100 90, 200 30, 390 60" fill="none" stroke="#3b82f6" strokeWidth="2" title="Anticipation" />
                    </svg>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', alignSelf: 'flex-start' }}>Emotion Distribution</h4>
                  <div style={{ width: '70px', height: '70px', margin: 'auto' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ec4899" strokeWidth="5" strokeDasharray="50 50" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-50" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="20 80" strokeDashoffset="-80" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 9: Sentiment Target (Full Width) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Sentiment Target</h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', height: '120px', paddingBottom: '16px' }}>
                  {['IKN Nusantara', 'Pemerintah', 'Masyarakat'].map((label, idx) => {
                    const vals = [[50, 30, 20], [60, 20, 20], [45, 35, 20]][idx];
                    return (
                      <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: `${vals[0]}%`, backgroundColor: '#10b981' }}></div>
                          <div style={{ height: `${vals[1]}%`, backgroundColor: '#3b82f6' }}></div>
                          <div style={{ height: `${vals[2]}%`, backgroundColor: '#ef4444' }}></div>
                        </div>
                        <span style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '6px', color: '#64748b' }}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 10: Top Hashtags (Treemap Grid) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0' }}>Top Hashtags</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', height: '120px', color: '#ffffff', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  <div style={{ backgroundColor: '#3b82f6', padding: '10px', borderRadius: '4px' }}>#kawalkeputusan (65%)</div>
                  <div style={{ backgroundColor: '#10b981', padding: '10px', borderRadius: '4px' }}>#IKNbaru (20%)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ backgroundColor: '#7c3aed', padding: '6px', borderRadius: '4px', flexGrow: 1 }}>#Pilkada (10%)</div>
                    <div style={{ backgroundColor: '#ec4899', padding: '6px', borderRadius: '4px', flexGrow: 1 }}>#KPU (5%)</div>
                  </div>
                </div>
              </div>

              {/* Row 12: Latest Posts (3-Column Social Feed Card Grid) */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>Latest Posts</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {socialPosts.map(post => (
                    <div key={post.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContents: 'space-between', height: '220px' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                          <img src={post.avatar} alt="User avatar" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>{post.author}</div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{post.handle} • {post.platform}</div>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0 0 12px 0', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>{post.desc}</p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ fontSize: '0.6rem', fontWeight: '700', padding: '1px 6px', borderRadius: '3px', backgroundColor: '#d1fae5', color: '#065f46' }}>{post.sentiment}</span>
                          <span style={{ fontSize: '0.6rem', fontWeight: '700', padding: '1px 6px', borderRadius: '3px', backgroundColor: '#fef3c7', color: '#d97706' }}>{post.emotion}</span>
                        </div>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{post.views} Views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
