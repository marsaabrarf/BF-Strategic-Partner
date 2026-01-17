
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Cpu, 
  Maximize2,
  AlertCircle,
  Clock,
  Briefcase
} from 'lucide-react';

// --- Types ---
interface SolutionTier {
  id: string;
  tier: string;
  name: string;
  description: string;
  objective: string;
  system: string;
  actionLabel: string;
}

// --- Data ---
const FRICTIONS = [
  {
    title: "Strategic Loneliness",
    description: "Anda tidak memiliki teman debat yang selevel untuk memvalidasi langkah besar, sehingga setiap keputusan terasa seperti pertaruhan.",
    icon: <Briefcase className="w-6 h-6 text-accent" />
  },
  {
    title: "Invisible Leaks",
    description: "Profitabilitas yang tergerus oleh kebocoran operasional yang tidak terdeteksi karena Anda terlalu dekat dengan masalah.",
    icon: <AlertCircle className="w-6 h-6 text-accent" />
  },
  {
    title: "Operational Friction",
    description: "Tim sudah ada, namun energi Anda tetap terkuras untuk hal-hal non-strategis karena sistem delegasi yang tidak memiliki struktur logika yang kuat.",
    icon: <Cpu className="w-6 h-6 text-accent" />
  },
  {
    title: "Scaling Complexity",
    description: "Keinginan untuk ekspansi seringkali terhambat oleh kekhawatiran akan rusaknya cashflow dan hilangnya kendali atas kualitas.",
    icon: <Maximize2 className="w-6 h-6 text-accent" />
  }
];

const SOLUTIONS: SolutionTier[] = [
  {
    id: "tier-1",
    tier: "TIER 1",
    name: "PRIVATE 1-ON-1 DEEP DIVE",
    description: "Precision Diagnostic Session (90 Menit). Diskusi intensif untuk validasi cepat atau pencarian solusi atas hambatan spesifik yang menghambat laju bisnis Anda.",
    objective: "Audit Pricing, Validasi Keputusan Besar, & Identifikasi Kebocoran Operasional.",
    system: "Format: Tatap Muka",
    actionLabel: "Cek Ketersediaan Jadwal"
  },
  {
    id: "tier-2",
    tier: "TIER 2",
    name: "PRIVATE BUSINESS ADVISORY",
    description: "Operational Excellence & Foundation Building Program. Pendampingan bulanan untuk membangun fondasi bisnis yang kuat, ramping, dan siap untuk skalabilitas.",
    objective: "Restrukturisasi Tim, Optimasi Margin, & Pembenahan Alur Kerja.",
    system: "Sistem: Private Strategic Meeting + Priority WhatsApp Access.",
    actionLabel: "Konsultasi Detail Program"
  },
  {
    id: "tier-3",
    tier: "TIER 3",
    name: "SHADOW CEO / DECISION PARTNER",
    description: "Strategic Integration & High-Stakes Partnership. Level tertinggi kemitraan strategis. Saya masuk ke dalam struktur berpikir Anda untuk memastikan setiap langkah memiliki presisi tinggi dan risiko yang terukur.",
    objective: "Strategic Scaling, Performance Audit (Termasuk intervensi SDM), & VIP Hotline Support.",
    system: "Sistem: Rutin Meeting + Visit Lapangan + Direct Team Direction.",
    actionLabel: "Ajukan Interview Kemitraan"
  }
];

const RULES = [
  {
    title: "Tanpa Rekaman & Tanpa Materi Umum",
    description: "Setiap diskusi bersifat rahasia dan spesifik pada kasus bisnis Anda. Kita tidak membahas teori, kita membahas solusi nyata."
  },
  {
    title: "Filter Ketat",
    description: "Saya hanya menerima klien yang memiliki model bisnis yang valid dan kesiapan mental untuk melakukan perubahan struktural."
  },
  {
    title: "Direct Accountability",
    description: "Saya memberikan arahan strategis yang tajam. Jika diperlukan, saya akan melakukan intervensi langsung pada struktur tim untuk memastikan target tercapai."
  }
];

// --- Shared Components ---

const WhatsAppCTA: React.FC<{ label: string; className?: string }> = ({ label, className }) => {
  const handleClick = () => {
    // Replace with actual WhatsApp link
    window.open('https://wa.me/your-number-here', '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className={`group flex items-center gap-2 bg-accent hover:bg-accent-hover text-black px-8 py-4 rounded-none font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(34,197,94,0.4)] ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gradient leading-tight">{children}</h2>
    {subtitle && <p className="text-accent font-sans text-sm tracking-[0.2em] mt-4 uppercase font-bold">{subtitle}</p>}
  </div>
);

// --- Layout Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white flex items-center justify-center font-bold text-black text-xl font-serif">BF</div>
        <span className="font-sans font-bold tracking-widest text-sm md:text-base">STRATEGIC PARTNER</span>
      </div>
      <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
        <a href="#friction" className="hover:text-accent transition-colors">Friction</a>
        <a href="#about" className="hover:text-accent transition-colors">Practitioner</a>
        <a href="#solutions" className="hover:text-accent transition-colors">Solutions</a>
        <a href="#rules" className="hover:text-accent transition-colors">Rules</a>
      </div>
      <button 
        onClick={() => window.open('https://wa.me/your-number-here', '_blank')}
        className="bg-accent text-black px-4 py-2 text-xs font-bold tracking-tighter hover:bg-accent-hover transition-colors"
      >
        CONTACT
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
    {/* Background Grid Decoration */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent_70%)]"></div>
    </div>

    <div className="max-w-5xl mx-auto relative z-10">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-8">
        Kualitas Bisnis Anda Tidak Akan Pernah Melebihi <span className="text-accent italic">Kualitas Keputusan</span> Anda.
      </h1>
      
      <p className="text-lg md:text-xl text-muted font-sans max-w-3xl leading-relaxed mb-12">
        Banyak brand terjebak di <span className="text-white italic underline decoration-accent">revenue plateau</span> bukan karena kurang modal atau kurang tim, 
        melainkan karena keterbatasan sudut pandang Owner dalam mengeksekusi langkah strategis. 
        Saya menawarkan <span className="text-white font-bold">Logika Praktisi</span> untuk membedah titik buta (blindspot) 
        dan mengakselerasi pertumbuhan bisnis Anda melalui sistem yang terukur.
      </p>

      <WhatsAppCTA label="Ajukan Diskusi Strategis" />
    </div>
  </section>
);

const FrictionSection = () => (
  <section id="friction" className="py-32 px-6 bg-secondary relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionTitle subtitle="THE STRATEGIC FRICTION">
            Skalabilitas Membutuhkan Presisi, Bukan Sekadar Kerja Keras.
          </SectionTitle>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            Di level ini, masalah Anda bukan lagi soal "cara jualan", tapi soal <span className="text-white font-bold">efisiensi keputusan</span>. 
            Program ini dirancang untuk menghilangkan gesekan-gesekan berikut:
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FRICTIONS.map((f, i) => (
            <div key={i} className="p-8 border border-white/5 bg-black/50 hover:border-accent/30 transition-all duration-500 group">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed font-sans">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-2/5 aspect-[4/5] bg-neutral-900 border border-white/10 relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
          <img 
            src="https://picsum.photos/800/1000?random=1" 
            alt="Bryan Ferdiansyah" 
            className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
          />
          <div className="absolute bottom-8 left-8">
            <h4 className="text-3xl font-serif font-bold">Bryan</h4>
            <p className="text-accent font-sans font-bold tracking-widest text-sm">25 TAHUN | PRACTITIONER</p>
          </div>
        </div>
        
        <div className="w-full lg:w-3/5">
          <SectionTitle subtitle="TRACK RECORD & PRACTITIONER LOGIC">
            Bukan Sekadar Teori. <br/> Ini adalah Logika yang Teruji.
          </SectionTitle>
          
          <div className="space-y-6 text-muted text-lg leading-relaxed font-sans">
            <p>
              Saya tidak datang dari latar belakang akademis konsultan, melainkan dari lapangan. 
              Saat ini, saya mengelola tiga entitas bisnis berbeda (<span className="text-white">Doel Aksesoris, Onlyifyouknow, dan Close Your Eyes</span>) 
              secara paralel dengan dukungan tim aktif.
            </p>
            <p>
              Keahlian saya bukan pada motivasi, melainkan pada <span className="text-white font-bold italic">Sistem & Integrasi</span>. 
              Saya membangun struktur yang memungkinkan multi-brand berjalan secara efektif tanpa harus menuntut kehadiran fisik saya di setiap lini teknis.
            </p>
            <p>
              Yang saya bagikan adalah kerangka berpikir yang saya gunakan sendiri untuk memitigasi risiko, 
              mengoptimalkan margin, dan membangun delegasi yang akuntabel.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SolutionsSection = () => (
  <section id="solutions" className="py-32 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <SectionTitle subtitle="STRATEGIC SOLUTIONS">Pilih Paket Tier Anda</SectionTitle>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SOLUTIONS.map((s) => (
          <div key={s.id} className="flex flex-col bg-black border border-white/10 p-10 hover:border-accent/40 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="text-7xl font-serif font-bold italic">{s.tier.split(' ')[1]}</span>
            </div>
            
            <div className="mb-8">
              <span className="text-accent font-bold tracking-widest text-xs uppercase block mb-2">{s.tier}</span>
              <h3 className="text-2xl font-serif font-bold leading-tight mb-4">{s.name}</h3>
              <p className="text-muted text-sm leading-relaxed mb-6 italic">{s.description}</p>
            </div>
            
            <div className="flex-grow space-y-4 mb-10">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white uppercase mb-1">Objektif</p>
                  <p className="text-muted text-sm">{s.objective}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white uppercase mb-1">Metode</p>
                  <p className="text-muted text-sm">{s.system}</p>
                </div>
              </div>
            </div>
            
            <WhatsAppCTA label={s.actionLabel} className="w-full text-sm py-3 px-4" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RulesSection = () => (
  <section id="rules" className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <SectionTitle subtitle="THE ENGAGEMENT RULES">Prasyarat Kemitraan</SectionTitle>
        <p className="text-muted font-sans text-lg">
          Untuk menjaga kualitas keputusan dan fokus, saya menerapkan batasan ketat:
        </p>
      </div>
      
      <div className="space-y-12">
        {RULES.map((rule, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center p-8 border border-white/5 hover:bg-white/[0.02] transition-colors">
            <span className="text-4xl md:text-5xl font-serif font-bold italic text-white/20">0{i+1}</span>
            <div>
              <h4 className="text-xl font-bold mb-2 font-serif text-white">{rule.title}</h4>
              <p className="text-muted leading-relaxed font-sans">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-20 pb-10 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white flex items-center justify-center font-bold text-black text-2xl font-serif">BF</div>
            <div>
              <h2 className="font-serif font-bold text-xl tracking-tight">BF STRATEGIC PARTNER</h2>
              <p className="text-muted text-xs font-sans tracking-widest uppercase">A Business Strategic Unit of Bryan Ferdiansyah Group</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted font-sans text-sm">
            <Clock className="w-4 h-4" />
            <span>Mon — Fri, 09:00 — 18:00 WIB</span>
          </div>
          <p className="mt-2 text-muted text-sm font-sans">Surabaya, Jawa Timur.</p>
        </div>
        
        <div className="w-full md:w-auto">
          <p className="text-white font-bold mb-4 font-sans text-right">Siap Mengambil Keputusan Lebih Baik?</p>
          <WhatsAppCTA label="Hubungi untuk Detail" className="w-full md:w-auto" />
        </div>
      </div>
      
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-sans tracking-widest uppercase font-bold">
        <p>© {new Date().getFullYear()} BF STRATEGIC PARTNER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <FrictionSection />
        <AboutSection />
        <SolutionsSection />
        <RulesSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
