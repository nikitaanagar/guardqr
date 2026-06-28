import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown, 
  UserPlus, 
  QrCode, 
  ShieldCheck, 
  HeartPulse, 
  Lock, 
  Bell, 
  MapPin, 
  Users, 
  Smartphone, 
  Check
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // IntersectionObserver for fade-in animations on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-section');
    animatedElements.forEach(el => observer.observe(el));

    // Scroll event listener to add shadow-md on header scroll
    const handleScroll = () => {
      const header = document.getElementById('lp-navbar');
      if (header) {
        if (window.scrollY > 60) {
          header.classList.add('shadow-md');
          header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)';
        } else {
          header.classList.remove('shadow-md');
          header.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="landing-page">
      
      {/* SECTION 1 — NAVBAR */}
      <nav 
        id="lp-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E4E4E7',
          transition: 'box-shadow 200ms ease'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A0A0A' }}>
            <Shield size={24} fill="#0A0A0A" />
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>GuardianQR</span>
          </Link>

          {/* Desktop Navigation links */}
          <div className="desktop-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} style={{ fontSize: '0.85rem', fontWeight: '500', color: '#71717A' }} className="nav-hover-link">How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} style={{ fontSize: '0.85rem', fontWeight: '500', color: '#71717A' }} className="nav-hover-link">Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} style={{ fontSize: '0.85rem', fontWeight: '500', color: '#71717A' }} className="nav-hover-link">Pricing</a>
            <a href="#use-cases" onClick={(e) => handleSmoothScroll(e, 'use-cases')} style={{ fontSize: '0.85rem', fontWeight: '500', color: '#71717A' }} className="nav-hover-link">About</a>
          </div>

          {/* Action CTAs */}
          <div className="desktop-ctas" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/login" className="btn-lp-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', height: '36px' }}>Login</Link>
            <Link to="/signup" className="btn-lp-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', height: '36px' }}>Get Started Free</Link>
          </div>

          {/* Mobile hamburger icon toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', padding: '8px' }}
          >
            {mobileMenuOpen ? <X size={20} color="#0A0A0A" /> : <Menu size={20} color="#0A0A0A" />}
          </button>
        </div>

        {/* Mobile menu dropdown dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown animate-fade-in" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E4E4E7', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} style={{ fontSize: '0.95rem', fontWeight: '500', color: '#71717A' }}>How It Works</a>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} style={{ fontSize: '0.95rem', fontWeight: '500', color: '#71717A' }}>Features</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} style={{ fontSize: '0.95rem', fontWeight: '500', color: '#71717A' }}>Pricing</a>
            <a href="#use-cases" onClick={(e) => handleSmoothScroll(e, 'use-cases')} style={{ fontSize: '0.95rem', fontWeight: '500', color: '#71717A' }}>About</a>
            <div style={{ height: '1px', backgroundColor: '#E4E4E7', margin: '8px 0' }}></div>
            <Link to="/login" className="btn-lp-secondary" style={{ width: '100%', justifyContent: 'center' }}>Login</Link>
            <Link to="/signup" className="btn-lp-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started Free</Link>
          </div>
        )}

        {/* CSS to manage desktop vs mobile display elements */}
        <style dangerouslySetInnerHTML={{__html: `
          .nav-hover-link:hover {
            color: #0A0A0A !important;
          }
          @media (max-width: 768px) {
            .desktop-links, .desktop-ctas {
              display: none !important;
            }
            .mobile-toggle {
              display: block !important;
            }
          }
        `}} />
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="fade-in-section" style={{ backgroundColor: '#FFFFFF', padding: '80px 0 40px 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Top trust pill */}
          <div className="badge-lp" style={{ marginBottom: '24px', border: '1px solid #0A0A0A' }}>
            <span style={{ fontSize: '0.8rem' }}>🛡️ Trusted by 10,000+ families</span>
          </div>

          {/* Headline */}
          <h1 className="title" style={{ fontSize: '3rem', fontWeight: '800', color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: '1.1', maxWidth: '600px', margin: '0 auto 16px auto' }}>
            One QR Code.<br/>A Lifetime of Safety.
          </h1>

          {/* Subtext */}
          <p className="text-muted" style={{ fontSize: '1.125rem', lineHeight: '1.6', maxWidth: '520px', marginBottom: '32px', margin: '0 auto 32px auto' }}>
            Attach a GuardianQR code to your child, elderly parent, or pet. If they're ever found, a simple scan shares their emergency info — instantly, privately, safely.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
            <Link to="/signup" className="btn-lp-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Create Your First QR — It's Free
            </Link>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="btn-lp-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              See How It Works
            </a>
          </div>

          {/* Trust lines */}
          <p className="text-muted" style={{ fontSize: '0.8rem', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
            <span>✓ No credit card required</span>
            <span>✓ Setup in under 2 minutes</span>
            <span>✓ Works on any phone</span>
          </p>

          {/* Hero Image */}
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', overflow: 'hidden', borderRadius: '12px', border: '1px solid #E4E4E7', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
            <img 
              src="/guardianqr-hero.jpg" 
              alt="GuardianQR dashboard preview" 
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF BAR */}
      <section className="fade-in-section" style={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #E4E4E7', borderBottom: '1px solid #E4E4E7', padding: '32px 0' }}>
        <div className="container">
          <div className="stats-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            
            <div style={{ flex: 1, minWidth: '130px', textAlign: 'center' }} className="stat-col">
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A0A0A', marginBottom: '4px' }}>10,000+</h4>
              <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>Families Safe</p>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: '#E4E4E7' }} className="stat-divider"></div>

            <div style={{ flex: 1, minWidth: '130px', textAlign: 'center' }} className="stat-col">
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A0A0A', marginBottom: '4px' }}>3 Types</h4>
              <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>Child • Elder • Pet</p>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: '#E4E4E7' }} className="stat-divider"></div>

            <div style={{ flex: 1, minWidth: '130px', textAlign: 'center' }} className="stat-col">
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A0A0A', marginBottom: '4px' }}>2 Min</h4>
              <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>Setup Time</p>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: '#E4E4E7' }} className="stat-divider"></div>

            <div style={{ flex: 1, minWidth: '130px', textAlign: 'center' }} className="stat-col">
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A0A0A', marginBottom: '4px' }}>100%</h4>
              <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>Private</p>
            </div>

          </div>
        </div>

        {/* Responsive CSS for metrics row */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 600px) {
            .stats-row {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 24px !important;
            }
            .stat-divider {
              display: none !important;
            }
          }
        `}} />
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="fade-in-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>HOW IT WORKS</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px', marginBottom: '48px' }}>Safety in Three Simple Steps</h2>

          <div style={{ display: 'flex', gap: '30px', position: 'relative', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            {/* Desktop Connective dashed Line */}
            <div className="step-connective-line" style={{ position: 'absolute', top: '130px', left: '10%', right: '10%', height: '1px', borderTop: '2px dashed #E4E4E7', zIndex: 0 }}></div>

            {/* Step 1 */}
            <div className="lp-card step-card" style={{ flex: 1, minWidth: '260px', zIndex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', padding: '10px', borderRadius: '50%' }}>
                  <UserPlus size={20} color="#0A0A0A" />
                </div>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#E4E4E7', lineHeight: 1 }}>01</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Create a Profile</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                Add emergency medical info, blood group, allergies, and up to 3 emergency contacts for your child, parent, or pet.
              </p>
            </div>

            {/* Step 2 */}
            <div className="lp-card step-card" style={{ flex: 1, minWidth: '260px', zIndex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', padding: '10px', borderRadius: '50%' }}>
                  <QrCode size={20} color="#0A0A0A" />
                </div>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#E4E4E7', lineHeight: 1 }}>02</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Get Your QR Code</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                Download and print the unique QR code. Attach it to an ID card, collar tag, school bag, or wristband.
              </p>
            </div>

            {/* Step 3 */}
            <div className="lp-card step-card" style={{ flex: 1, minWidth: '260px', zIndex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', padding: '10px', borderRadius: '50%' }}>
                  <ShieldCheck size={20} color="#0A0A0A" />
                </div>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#E4E4E7', lineHeight: 1 }}>03</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Stay Protected 24/7</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                If someone finds your loved one, they scan the QR — no app needed. You get an instant alert with their location.
              </p>
            </div>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 900px) {
            .step-connective-line {
              display: none !important;
            }
          }
        `}} />
      </section>

      {/* SECTION 5 — FEATURES */}
      <section id="features" className="bg-alt fade-in-section">
        <div className="container" style={{ textAlign: 'center' }}>
          
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>FEATURES</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px', marginBottom: '48px' }}>Everything You Need to Keep Loved Ones Safe</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Feature 1 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeartPulse size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Instant Emergency Info</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                Blood group, allergies, medications, and doctor contact — visible in one scan. No app download needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Your Number Stays Private</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                Finders never see your phone number. They contact you through our secure in-app messaging only.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Instant Scan Alerts</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                Get notified the moment your QR is scanned — with timestamp and approximate location of the scanner.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Location on Every Scan</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                GPS location when available. Falls back to IP-based location automatically. Always know where the scan happened.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Manage Multiple Profiles</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                One account for your whole family. Create separate QR profiles for each child, elderly parent, or pet.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ background: '#0A0A0A', padding: '8px', borderRadius: '6px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={18} color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Works on Any Device</h3>
              <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                No app needed to scan. Any smartphone camera opens the emergency page instantly — Android or iPhone.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 — FOR WHO (Use Cases) */}
      <section id="use-cases" className="fade-in-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>WHO IT'S FOR</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px', marginBottom: '48px' }}>Built for Every Family</h2>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            {/* Child Card */}
            <div className="lp-card use-case-card" style={{ flex: 1, minWidth: '280px', padding: 0, overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <img src="/usecase-child.jpg" alt="Child safety preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <span className="badge-lp" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', alignSelf: 'flex-start' }}>
                  👶 Children
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Keep Your Child Safe</h3>
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0, flex: 1 }}>
                  Attach a QR tag to school bags, water bottles, or ID cards. If your child gets lost, anyone who finds them can instantly see who to call.
                </p>
                <Link to="/signup" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#0A0A0A', marginTop: '8px' }} className="lp-underline-link">
                  Create Child Profile →
                </Link>
              </div>
            </div>

            {/* Elderly Card */}
            <div className="lp-card use-case-card" style={{ flex: 1, minWidth: '280px', padding: 0, overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <img src="/usecase-elderly.jpg" alt="Elderly safety preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <span className="badge-lp" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', alignSelf: 'flex-start' }}>
                  👴 Elderly
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Peace of Mind for Aging Parents</h3>
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0, flex: 1 }}>
                  For parents with memory conditions or who live alone. Their medical history and your contact are one scan away — always.
                </p>
                <Link to="/signup" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#0A0A0A', marginTop: '8px' }} className="lp-underline-link">
                  Create Elder Profile →
                </Link>
              </div>
            </div>

            {/* Pet Card */}
            <div className="lp-card use-case-card" style={{ flex: 1, minWidth: '280px', padding: 0, overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <img src="/usecase-pet.jpg" alt="Pet safety tag preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <span className="badge-lp" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', alignSelf: 'flex-start' }}>
                  🐾 Pets
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0A0A0A', margin: 0 }}>Never Lose Your Pet Again</h3>
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0, flex: 1 }}>
                  Print a QR tag for your dog or cat's collar. If they wander off, the finder sees your pet's name, vet contact, and can reach you privately.
                </p>
                <Link to="/signup" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#0A0A0A', marginTop: '8px' }} className="lp-underline-link">
                  Create Pet Profile →
                </Link>
              </div>
            </div>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .lp-underline-link:hover {
            text-decoration: underline;
          }
        `}} />
      </section>

      {/* SECTION 7 — TESTIMONIALS */}
      <section className="bg-alt fade-in-section">
        <div className="container" style={{ textAlign: 'center' }}>
          
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>WHAT FAMILIES SAY</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px', marginBottom: '48px' }}>Real Stories. Real Peace of Mind.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Testimonial 1 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://ui-avatars.com/api/?name=Meera+Kapoor&background=0A0A0A&color=fff&size=56" alt="Meera Kapoor avatar" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '0.95rem', margin: 0 }}>Meera Kapoor</h4>
                  <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>Mother of two, Delhi</p>
                </div>
              </div>
              <div style={{ color: '#0A0A0A', fontSize: '0.85rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                "My 6-year-old got separated at a mall. A stranger scanned his bag tag and called me within minutes. GuardianQR literally brought my son back to me."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://ui-avatars.com/api/?name=Suresh+Iyer&background=0A0A0A&color=fff&size=56" alt="Suresh Iyer avatar" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '0.95rem', margin: 0 }}>Suresh Iyer</h4>
                  <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>Son of elderly parent, Bangalore</p>
                </div>
              </div>
              <div style={{ color: '#0A0A0A', fontSize: '0.85rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                "My mother has early-stage dementia. She wandered out once and a kind neighbour scanned her ID card. I got the alert before I even knew she was missing."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="lp-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://ui-avatars.com/api/?name=Priya+Nair&background=0A0A0A&color=fff&size=56" alt="Priya Nair avatar" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '0.95rem', margin: 0 }}>Priya Nair</h4>
                  <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>Pet parent, Mumbai</p>
                </div>
              </div>
              <div style={{ color: '#0A0A0A', fontSize: '0.85rem' }}>★★★★☆</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                "Bruno got out through the gate one evening. Someone found him, scanned his collar tag, and messaged me through the app. He was home in 20 minutes."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 — PRICING */}
      <section id="pricing" className="fade-in-section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>PRICING</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px', marginBottom: '8px' }}>Simple Pricing. No Surprises.</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '32px' }}>Start free. Upgrade when you need more profiles.</p>

          {/* Pricing Toggle Switch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: isAnnual ? '500' : '700', color: isAnnual ? '#71717A' : '#0A0A0A' }}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                backgroundColor: '#0A0A0A',
                position: 'relative',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                transform: isAnnual ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 200ms ease'
              }}></div>
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: isAnnual ? '700' : '500', color: isAnnual ? '#0A0A0A' : '#71717A', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Annual <span className="badge-lp badge-success-lp" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>Save 20%</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>
            
            {/* Plan 1 — Free */}
            <div className="lp-card pricing-card" style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', borderRadius: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0A0A0A', margin: '0 0 4px 0' }}>Free</h3>
                <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>Perfect to get started</p>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0A0A0A' }}>
                ₹0 <span style={{ fontSize: '0.85rem', color: '#71717A', fontWeight: '500' }}>/ forever</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#E4E4E7' }}></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> 1 QR Profile</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Basic emergency info page</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Scan alerts via email</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#A1A1AA', textDecoration: 'line-through' }}>✗ Location on scan alerts</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#A1A1AA', textDecoration: 'line-through' }}>✗ Multiple profiles</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#A1A1AA', textDecoration: 'line-through' }}>✗ Analytics</li>
              </ul>
              <Link to="/signup" className="btn-lp-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started Free
              </Link>
            </div>

            {/* Plan 2 — Family (Recommended) */}
            <div className="lp-card pricing-card recommended-card" style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', borderRadius: '12px', border: '2px solid #0A0A0A', position: 'relative', transform: 'scale(1.02)' }}>
              <span className="badge-lp" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', position: 'absolute', top: '16px', right: '16px', border: 'none' }}>
                Most Popular
              </span>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0A0A0A', margin: '0 0 4px 0' }}>Family</h3>
                <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>For families with multiple members</p>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0A0A0A' }}>
                {isAnnual ? '₹158' : '₹199'} <span style={{ fontSize: '0.85rem', color: '#71717A', fontWeight: '500' }}>/ month</span>
                {isAnnual && <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: '600' }}>Billed ₹1,899 annually</div>}
              </div>
              <div style={{ height: '1px', backgroundColor: '#E4E4E7' }}></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Up to 5 QR Profiles</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Full emergency info page</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Scan alerts with GPS location</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Real-time email + SMS alerts</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Scan history & analytics</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#A1A1AA' }}>✗ Priority support</li>
              </ul>
              <Link to="/signup" className="btn-lp-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Start Free Trial
              </Link>
            </div>

            {/* Plan 3 — Pro */}
            <div className="lp-card pricing-card" style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', borderRadius: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0A0A0A', margin: '0 0 4px 0' }}>Guardian Pro</h3>
                <p style={{ fontSize: '0.8rem', color: '#71717A', margin: 0 }}>For large families or professionals</p>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0A0A0A' }}>
                {isAnnual ? '₹399' : '₹499'} <span style={{ fontSize: '0.85rem', color: '#71717A', fontWeight: '500' }}>/ month</span>
                {isAnnual && <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: '600' }}>Billed ₹4,799 annually</div>}
              </div>
              <div style={{ height: '1px', backgroundColor: '#E4E4E7' }}></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Unlimited QR Profiles</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Full emergency info page</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Scan alerts with GPS + IP location</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Real-time email + SMS + WhatsApp</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Advanced analytics & reports</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Priority 24/7 support</li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><Check size={14} color="#16A34A" /> Custom QR card design</li>
              </ul>
              <Link to="/signup" className="btn-lp-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 960px) {
            .pricing-card.recommended-card {
              transform: scale(1) !important;
              margin: 16px 0 !important;
            }
          }
        `}} />
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="bg-alt fade-in-section">
        <div className="container" style={{ maxWidth: '680px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#71717A', textTransform: 'uppercase' }}>FAQ</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#0A0A0A', marginTop: '8px' }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            
            {/* FAQ 1 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(1)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>Does the person scanning need to download an app?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 1 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 1 ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 1 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  No. The QR code opens a regular webpage in any browser. No app download required — it works on any smartphone instantly.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(2)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>Is my phone number visible to whoever scans the QR?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 2 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 2 ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 2 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  Never. Your personal contact details are kept completely private. Finders can only reach you through our secure in-app messaging system.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(3)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>What information is shown when someone scans the QR?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 3 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 3 ? '120px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 3 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  Only the emergency information you choose to share: name, blood group, allergies, medical conditions, and emergency contact names. No private address or phone numbers.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(4)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>How do I know when my QR has been scanned?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 4 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 4 ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 4 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  You get an instant notification via email (and SMS on paid plans) with the exact time and approximate location of the scan.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(5)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>Can I create profiles for multiple family members?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 5 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 5 ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 5 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  Yes. The Family and Pro plans allow multiple profiles under one account — one for each child, parent, or pet.
                </p>
              </div>
            </div>

            {/* FAQ 6 */}
            <div style={{ borderBottom: '1px solid #E4E4E7', backgroundColor: '#FFFFFF' }}>
              <button 
                onClick={() => toggleFaq(6)}
                className="faq-question-btn"
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#0A0A0A'
                }}
              >
                <span>What if GPS is not available when scanned?</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transform: openFaq === 6 ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease'
                  }}
                />
              </button>
              <div 
                style={{
                  maxHeight: openFaq === 6 ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 250ms ease-out, padding 250ms ease-out',
                  padding: openFaq === 6 ? '0 20px 20px 20px' : '0 20px'
                }}
              >
                <p style={{ fontSize: '0.85rem', color: '#71717A', lineHeight: '1.6', margin: 0 }}>
                  We automatically fall back to IP-based location, which gives an approximate city-level location. You'll always get some location information.
                </p>
              </div>
            </div>

          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .faq-question-btn:hover {
            background-color: #fafafa !important;
          }
        `}} />
      </section>

      {/* SECTION 10 — CTA BANNER */}
      <section className="fade-in-section" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '80px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
            Set Up Your First QR Profile in 2 Minutes
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
            Free forever. No credit card. Works on any phone.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <Link to="/signup" className="btn-lp-primary" style={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', padding: '14px 28px' }}>
              Create Free Profile
            </Link>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="btn-lp-secondary" style={{ backgroundColor: 'transparent', color: '#FFFFFF', borderColor: '#FFFFFF', padding: '14px 28px' }}>
              See a Live Demo
            </a>
          </div>
          <p style={{ color: '#71717A', fontSize: '0.8rem', marginTop: '16px', margin: 0 }}>
            Join 10,000+ families already using GuardianQR
          </p>
        </div>
      </section>

      {/* SECTION 11 — FOOTER */}
      <footer className="fade-in-section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E4E4E7', padding: '60px 0 24px 0' }}>
        <div className="container">
          
          <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            
            {/* Col 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A0A0A' }}>
                <Shield size={22} fill="#0A0A0A" />
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>GuardianQR</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#71717A', lineHeight: '1.5', margin: 0 }}>
                Emergency info, one scan away. Keep your loved ones safe.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</h5>
              <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">How It Works</a>
              <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Features</a>
              <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Pricing</a>
              <Link to="/signup" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Create Profile</Link>
            </div>

            {/* Col 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h5>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'use-cases')} style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">About Us</a>
              <a href="#blog" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Blog</a>
              <a href="#careers" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Careers</a>
              <a href="#contact" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Contact Us</a>
            </div>

            {/* Col 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h5>
              <a href="#privacy" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Privacy Policy</a>
              <a href="#terms" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Terms of Service</a>
              <a href="#cookies" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Cookie Policy</a>
              <a href="#security" style={{ fontSize: '0.8rem', color: '#71717A' }} className="footer-link">Data Security</a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid #E4E4E7', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', color: '#71717A' }}>
            <span>© 2024 GuardianQR. All rights reserved.</span>
            <span>Made with ❤️ for families everywhere</span>
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .footer-social {
            color: #71717A;
            transition: color 200ms ease;
          }
          .footer-social:hover {
            color: #0A0A0A;
          }
          .footer-link:hover {
            color: #0A0A0A !important;
          }
          @media (max-width: 768px) {
            .footer-cols {
              grid-template-columns: 1fr 1fr !important;
              gap: 28px !important;
            }
          }
          @media (max-width: 480px) {
            .footer-cols {
              grid-template-columns: 1fr !important;
            }
          }
        `}} />
      </footer>

    </div>
  );
};

export default LandingPage;
