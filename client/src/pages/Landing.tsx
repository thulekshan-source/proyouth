import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Target,
  BookOpen,
  Star,
  CheckCircle,
  Users,
  Zap,
  Award,
  ChevronDown,
  Play,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';

/* ───────────── tiny hook: animate-on-scroll ───────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ────────────────────────────────────────────────────────── */
export const Landing: React.FC = () => {
  const navigate = useNavigate();

  // counters
  const [counts, setCounts] = useState({ students: 0, careers: 0, mentors: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        animate(12000, 'students');
        animate(150, 'careers');
        animate(80, 'mentors');
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animate = (target: number, key: keyof typeof counts) => {
    let start = 0;
    const step = target / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(id); }
      setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
    }, 25);
  };

  // section hooks
  const feat = useInView();
  const how  = useInView();
  const testi = useInView();
  const cta   = useInView();

  const testimonials = [
    {
      name: 'Amaya Perera',
      role: 'A/L Student – Kandy',
      text: 'MyFuture.lk helped me discover I was passionate about data science. I would never have considered it without the quiz!',
      rating: 5,
      img: '/students_hero.png',
    },
    {
      name: 'Tharindu Silva',
      role: 'O/L Graduate – Colombo',
      text: 'The mentor I found through this platform guided me step-by-step into a scholarship at University of Moratuwa.',
      rating: 5,
      img: '/mentor_student.png',
    },
    {
      name: 'Kavitha Rajapaksa',
      role: 'A/L Student – Jaffna',
      text: 'As a Tamil student, having the platform in my language and finding relatable career paths was truly life-changing.',
      rating: 5,
      img: '/career_quiz_student.png',
    },
  ];

  const steps = [
    { icon: <Target size={28} />, title: 'Take the Career Quiz', desc: 'Answer 10 simple questions about your interests, strengths, and goals.', color: '#7c3aed' },
    { icon: <Compass size={28} />, title: 'Get AI Recommendations', desc: 'Our AI analyses your answers and suggests the best career paths for you.', color: '#2563eb' },
    { icon: <Users size={28} />, title: 'Connect with a Mentor', desc: 'Chat with a real professional who has walked the path you want to take.', color: '#059669' },
    { icon: <TrendingUp size={28} />, title: 'Build Your Future', desc: 'Access free resources, scholarships, and institutes to start your journey.', color: '#d97706' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', overflowX: 'hidden' }}>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 1.5rem',
      }}>
        {/* animated orbs */}
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)', top:'-150px', left:'-100px', animation:'float 8s ease-in-out infinite' }} />
        <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', bottom:'-120px', right:'-80px', animation:'float 10s ease-in-out infinite reverse' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center', position:'relative', zIndex:1, padding:'5rem 0' }}>
          {/* left text */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.4)', borderRadius:999, padding:'6px 16px', marginBottom:'1.5rem', color:'#c4b5fd', fontSize:14, fontWeight:600 }}>
              <Zap size={14} /> 🇱🇰 Built for Sri Lankan Students
            </div>

            <h1 style={{ fontSize:'clamp(2.2rem, 5vw, 3.8rem)', fontWeight:800, lineHeight:1.15, color:'#fff', marginBottom:'1.5rem' }}>
              Discover Your{' '}
              <span style={{ background:'linear-gradient(90deg, #a78bfa, #60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', display:'inline-block' }}>
                Dream Career
              </span>{' '}
              Path Today
            </h1>

            <p style={{ fontSize:'1.15rem', color:'rgba(255,255,255,0.7)', lineHeight:1.7, marginBottom:'2.5rem', maxWidth:480 }}>
              Free AI-powered career guidance for O/L and A/L students in Sri Lanka. Take the quiz in Sinhala, Tamil, or English and unlock your potential.
            </p>

            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <button
                id="hero-quiz-cta"
                onClick={() => navigate('/quiz')}
                style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  background:'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color:'#fff', border:'none', borderRadius:999,
                  padding:'14px 32px', fontSize:'1.05rem', fontWeight:700,
                  cursor:'pointer', boxShadow:'0 8px 30px rgba(124,58,237,0.5)',
                  transition:'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(124,58,237,0.6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(124,58,237,0.5)'; }}
              >
                <Play size={18} fill="#fff" /> Start Free Quiz <ArrowRight size={18} />
              </button>

              <Link
                to="/register"
                id="hero-register-cta"
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)',
                  color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:999,
                  padding:'14px 32px', fontSize:'1.05rem', fontWeight:600,
                  textDecoration:'none', transition:'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
              >
                Create Free Account
              </Link>
            </div>

            {/* trust badges */}
            <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', marginTop:'2.5rem', flexWrap:'wrap' }}>
              {['100% Free', 'No Sign-up Required', 'Works Offline'].map(badge => (
                <div key={badge} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.6)', fontSize:13 }}>
                  <CheckCircle size={14} style={{ color:'#34d399' }} /> {badge}
                </div>
              ))}
            </div>
          </div>

          {/* right image */}
          <div style={{ position:'relative' }}>
            <div style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.5)', border:'2px solid rgba(255,255,255,0.1)', transform:'perspective(1000px) rotateY(-4deg)', transition:'transform 0.5s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'perspective(1000px) rotateY(-4deg)'; }}
            >
              <img src="/students_hero.png" alt="Sri Lankan students studying together" style={{ width:'100%', height:480, objectFit:'cover', display:'block' }} />
              {/* overlay card */}
              <div style={{ position:'absolute', bottom:20, left:20, right:20, background:'rgba(15,12,41,0.85)', backdropFilter:'blur(12px)', borderRadius:16, padding:'16px 20px', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg, #7c3aed, #2563eb)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <MessageCircle size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>Career Quiz Result</div>
                    <div style={{ color:'#a78bfa', fontSize:13 }}>Software Engineer is your top match!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div style={{ position:'absolute', top:-16, right:-16, background:'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius:999, padding:'8px 16px', color:'#fff', fontWeight:800, fontSize:13, boxShadow:'0 8px 24px rgba(245,158,11,0.5)', animation:'pulse 2s ease-in-out infinite' }}>
              AI Powered
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', color:'rgba(255,255,255,0.4)', display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontSize:12, animation:'bounce 2s infinite' }}>
          <span>Scroll to explore</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section ref={statsRef} style={{ background:'#1a1040', padding:'3rem 1.5rem', borderBottom:'1px solid rgba(124,58,237,0.2)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'2rem', textAlign:'center', color:'#e2d9f3' }}>
          {[
            { value: counts.students.toLocaleString() + '+', label: 'Students Guided', icon: '' },
            { value: counts.careers + '+', label: 'Career Paths', icon: '' },
            { value: counts.mentors + '+', label: 'Expert Mentors', icon: '' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize:'2rem', marginBottom:4 }}>{stat.icon}</div>
              <div style={{ fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:900, background:'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                {stat.value}
              </div>
              <div style={{ color:'#a78bfa', fontWeight:600, fontSize:15 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <div ref={feat.ref} style={{ opacity: feat.visible ? 1 : 0, transform: feat.visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <section style={{ padding:'5rem 1.5rem', background:'linear-gradient(180deg, #100d2e 0%, #1a1040 100%)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div style={{ display:'inline-block', background:'rgba(124,58,237,0.25)', color:'#c4b5fd', padding:'6px 16px', borderRadius:999, fontWeight:600, fontSize:14, marginBottom:12 }}>Why Choose MyFuture.lk?</div>
              <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:800, color:'#fff', marginBottom:'1rem' }}>
                Everything You Need to Choose the Right Career
              </h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.1rem', maxWidth:550, margin:'0 auto' }}>Designed specifically for Sri Lankan students with local context, languages, and opportunities.</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem' }}>
              {[
                { icon:<Compass size={28}/>, title:'Explore 150+ Careers', desc:'From Software Engineering to Marine Biology — discover careers you never knew existed in Sri Lanka.', color:'#60a5fa', bg:'rgba(37,99,235,0.2)' },
                { icon:<Target size={28}/>, title:'Personalised AI Guidance', desc:'Our AI quiz adapts to your answers and gives you tailored career recommendations in minutes.', color:'#a78bfa', bg:'rgba(124,58,237,0.2)' },
                { icon:<BookOpen size={28}/>, title:'Free Resources & Institutes', desc:'Find the right A/L stream, degree programmes, and scholarships that match your career path.', color:'#34d399', bg:'rgba(5,150,105,0.2)' },
                { icon:<Users size={28}/>, title:'1-on-1 Mentor Sessions', desc:'Connect with professionals — doctors, engineers, lawyers — who studied at Sri Lankan schools just like you.', color:'#fbbf24', bg:'rgba(217,119,6,0.2)' },
                { icon:<Award size={28}/>, title:'Scholarship Finder', desc:'Discover Mahapola, Bursary, and international scholarships you qualify for based on your profile.', color:'#f87171', bg:'rgba(220,38,38,0.2)' },
                { icon:<MessageCircle size={28}/>, title:'AI Chatbot in 3 Languages', desc:'Ask anything in Sinhala, Tamil, or English. Get instant answers about careers, exams, and more.', color:'#22d3ee', bg:'rgba(8,145,178,0.2)' },
              ].map(f => (
                <div key={f.title} style={{ background:'rgba(255,255,255,0.05)', borderRadius:20, padding:'2rem', boxShadow:'0 4px 24px rgba(0,0,0,0.2)', border:'1px solid rgba(124,58,237,0.2)', transition:'all 0.3s ease', cursor:'default', backdropFilter:'blur(8px)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(124,58,237,0.25)'; (e.currentTarget as HTMLElement).style.border='1px solid rgba(124,58,237,0.5)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 24px rgba(0,0,0,0.2)'; (e.currentTarget as HTMLElement).style.border='1px solid rgba(124,58,237,0.2)'; }}
                >
                  <div style={{ width:56, height:56, borderRadius:16, background:f.bg, color:f.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontWeight:700, fontSize:'1.05rem', marginBottom:8, color:'#fff' }}>{f.title}</h3>
                  <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, lineHeight:1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <div ref={how.ref} style={{ opacity: how.visible ? 1 : 0, transform: how.visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <section style={{ padding:'5rem 1.5rem', background:'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, bottom:0, backgroundImage:'radial-gradient(circle at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(37,99,235,0.15) 0%, transparent 50%)' }} />

          <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div style={{ display:'inline-block', background:'rgba(167,139,250,0.15)', color:'#c4b5fd', padding:'6px 16px', borderRadius:999, fontWeight:600, fontSize:14, marginBottom:12 }}>Simple 4-Step Process</div>
              <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:800, color:'#fff', marginBottom:'1rem' }}>How It Works</h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.1rem' }}>From quiz to career clarity in under 10 minutes</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.5rem' }}>
              {steps.map((step, i) => (
                <div key={step.title} style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:'2rem', textAlign:'center', transition:'all 0.3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)'; }}
                >
                  <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(124,58,237,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', color:step.color }}>
                    {step.icon}
                  </div>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:step.color, color:'#fff', fontSize:13, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', margin:'-1.5rem auto 1rem', position:'relative' }}>
                    {i + 1}
                  </div>
                  <h3 style={{ color:'#fff', fontWeight:700, fontSize:'1rem', marginBottom:8 }}>{step.title}</h3>
                  <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <button
                id="how-it-works-quiz-cta"
                onClick={() => navigate('/quiz')}
                style={{ display:'inline-flex', alignItems:'center', gap:10, background:'linear-gradient(135deg, #7c3aed, #2563eb)', color:'#fff', border:'none', borderRadius:999, padding:'14px 36px', fontSize:'1.05rem', fontWeight:700, cursor:'pointer', boxShadow:'0 8px 30px rgba(124,58,237,0.4)', transition:'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(124,58,237,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 30px rgba(124,58,237,0.4)'; }}
              >
                Take the Free Quiz Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ PHOTO SPLIT SECTION ═══════════════════ */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:480 }}>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <img src="/career_quiz_student.png" alt="Student taking career quiz" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.5s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,12,41,0.85) 0%, transparent 60%)' }} />
          <div style={{ position:'absolute', bottom:32, left:32, right:32 }}>
            <h3 style={{ color:'#fff', fontSize:'1.5rem', fontWeight:800, marginBottom:8 }}>5-Minute Career Quiz</h3>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:15, marginBottom:16 }}>Answer questions about your interests and get matched with ideal career paths instantly.</p>
            <button id="split-quiz-btn" onClick={() => navigate('/quiz')} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#7c3aed', color:'#fff', border:'none', borderRadius:999, padding:'10px 24px', fontWeight:700, cursor:'pointer', fontSize:14, transition:'all 0.2s' }}>
              Try It Free <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div style={{ position:'relative', overflow:'hidden' }}>
          <img src="/mentor_student.png" alt="Mentor guiding a student" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.5s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 60%)' }} />
          <div style={{ position:'absolute', bottom:32, left:32, right:32 }}>
            <h3 style={{ color:'#fff', fontSize:'1.5rem', fontWeight:800, marginBottom:8 }}>Meet Your Mentor</h3>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:15, marginBottom:16 }}>Get personal guidance from doctors, engineers, and professionals from Sri Lanka.</p>
            <button id="split-mentor-btn" onClick={() => navigate('/mentors')} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#059669', color:'#fff', border:'none', borderRadius:999, padding:'10px 24px', fontWeight:700, cursor:'pointer', fontSize:14, transition:'all 0.2s' }}>
              Find a Mentor <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <div ref={testi.ref} style={{ opacity: testi.visible ? 1 : 0, transform: testi.visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <section style={{ padding:'5rem 1.5rem', background:'linear-gradient(180deg, #1a1040 0%, #100d2e 100%)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
              <div style={{ display:'inline-block', background:'rgba(124,58,237,0.25)', color:'#c4b5fd', padding:'6px 16px', borderRadius:999, fontWeight:600, fontSize:14, marginBottom:12 }}>Student Success Stories</div>
              <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:800, color:'#fff', marginBottom:'1rem' }}>Real Students, Real Results</h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.1rem' }}>Join thousands of Sri Lankan students who found their path</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'1.5rem' }}>
              {testimonials.map((item) => (
                <div key={item.name} style={{ background:'rgba(255,255,255,0.06)', borderRadius:24, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.3)', border:'1px solid rgba(124,58,237,0.25)', transition:'all 0.3s ease', backdropFilter:'blur(8px)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.border='1px solid rgba(124,58,237,0.5)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 24px rgba(0,0,0,0.3)'; (e.currentTarget as HTMLElement).style.border='1px solid rgba(124,58,237,0.25)'; }}
                >
                  <div style={{ height:180, overflow:'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                  </div>
                  <div style={{ padding:'1.5rem' }}>
                    <div style={{ display:'flex', marginBottom:12 }}>
                      {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
                    </div>
                    <p style={{ color:'rgba(255,255,255,0.75)', fontSize:15, lineHeight:1.7, marginBottom:'1rem', fontStyle:'italic' }}>"{item.text}"</p>
                    <div>
                      <div style={{ fontWeight:700, color:'#fff', fontSize:15 }}>{item.name}</div>
                      <div style={{ color:'#a78bfa', fontSize:13, fontWeight:600 }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ SUCCESS BANNER ═══════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', minHeight:400, display:'flex', alignItems:'center' }}>
        <img src="/success_graduate.png" alt="Successful Sri Lankan graduate" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(15,12,41,0.92) 0%, rgba(48,43,99,0.85) 50%, rgba(36,36,62,0.8) 100%)' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:700, margin:'0 auto', textAlign:'center', padding:'4rem 1.5rem' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🏆</div>
          <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)', fontWeight:800, color:'#fff', marginBottom:'1rem' }}>
            Your Success Story Starts Here
          </h2>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.1rem', lineHeight:1.7, marginBottom:'2rem' }}>
            Thousands of Sri Lankan students have already discovered their calling. Don't let uncertainty hold you back — your ideal career is just one quiz away.
          </p>
          <button id="banner-quiz-cta" onClick={() => navigate('/quiz')} style={{ display:'inline-flex', alignItems:'center', gap:10, background:'linear-gradient(135deg, #7c3aed, #2563eb)', color:'#fff', border:'none', borderRadius:999, padding:'16px 40px', fontSize:'1.1rem', fontWeight:800, cursor:'pointer', boxShadow:'0 8px 30px rgba(124,58,237,0.5)', transition:'all 0.3s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px) scale(1.03)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0) scale(1)'; }}
          >
            Start Your Journey — It is Free <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <div ref={cta.ref} style={{ opacity: cta.visible ? 1 : 0, transform: cta.visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <section style={{ padding:'5rem 1.5rem', background:'#0f0c29' }}>
          <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
            <h2 style={{ fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:800, color:'#fff', marginBottom:'1rem' }}>
              Ready to Find Your{' '}
              <span style={{ background:'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Perfect Career Path?</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.1rem', marginBottom:'2.5rem', maxWidth:520, margin:'0 auto 2.5rem' }}>
              Create a free account to save your results, track your progress, and connect with mentors.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link
                to="/register"
                id="final-register-cta"
                style={{ display:'inline-flex', alignItems:'center', gap:10, background:'linear-gradient(135deg, #7c3aed, #2563eb)', color:'#fff', textDecoration:'none', borderRadius:999, padding:'15px 40px', fontSize:'1.05rem', fontWeight:800, boxShadow:'0 8px 30px rgba(124,58,237,0.35)', transition:'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(124,58,237,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 30px rgba(124,58,237,0.35)'; }}
              >
                Create Free Account <ArrowRight size={18} />
              </Link>
              <button id="final-quiz-cta" onClick={() => navigate('/quiz')} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,58,237,0.15)', color:'#c4b5fd', border:'2px solid rgba(124,58,237,0.5)', borderRadius:999, padding:'15px 36px', fontSize:'1.05rem', fontWeight:700, cursor:'pointer', transition:'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.15)'; }}
              >
                Take Quiz First
              </button>
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:'2rem', marginTop:'2.5rem', flexWrap:'wrap' }}>
              {['No credit card', 'Free forever', 'Join 12,000+ students'].map(p => (
                <div key={p} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.5)', fontSize:14 }}>
                  <CheckCircle size={15} style={{ color:'#059669' }} /> {p}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{ background:'#0f172a', color:'rgba(255,255,255,0.6)', padding:'2.5rem 1.5rem', textAlign:'center' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:'1rem' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg, #2563eb, #7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800 }}>M</div>
            <span style={{ color:'#fff', fontWeight:700, fontSize:'1.1rem' }}>MyFuture.lk</span>
          </div>
          <p style={{ fontSize:14, marginBottom:'1.5rem' }}>Empowering Sri Lankan students to discover their future</p>
          <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
            {[['/', 'Home'], ['/quiz', 'Career Quiz'], ['/careers', 'Careers'], ['/mentors', 'Mentors'], ['/register', 'Sign Up']].map(([to, label]) => (
              <Link key={label} to={to} style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:14, transition:'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#a78bfa'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.5)'; }}
              >{label}</Link>
            ))}
          </div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.3)' }}>2026 MyFuture.lk — All rights reserved</p>
        </div>
      </footer>

      {/* ═══════════════════ KEYFRAMES ═══════════════════ */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes pulse { 0%,100%{box-shadow:0 8px 24px rgba(245,158,11,0.5)} 50%{box-shadow:0 8px 40px rgba(245,158,11,0.8)} }
      `}</style>
    </div>
  );
};
