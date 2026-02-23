import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowRight, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    { icon: Shield, title: 'Enterprise Security', desc: 'Military-grade encryption and identity verification.' },
    { icon: Zap, title: 'Real-time Analytics', desc: 'Live compensation and personnel data insights.' },
    { icon: Globe, title: 'Global Distribution', desc: 'Monitor your workforce across all locations.' },
];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise(r => setTimeout(r, 900));

        if (username === 'test' && password === '123456') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/list');
        } else {
            setError('Invalid credentials. Use test / 123456.');
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', background: '#f1f5f9' }}>

            {/* ── Left Panel ────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .55, ease: [.4, 0, .2, 1] }}
                style={{
                    flex: '0 0 52%',
                    background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #1e293b 100%)',
                    display: 'flex', flexDirection: 'column',
                    padding: '48px 56px',
                    position: 'relative', overflow: 'hidden',
                }}
                className="login-left-panel"
            >
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute', width: 500, height: 500,
                    background: 'radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)',
                    top: -150, right: -150, borderRadius: '50%', pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', width: 350, height: 350,
                    background: 'radial-gradient(circle, rgba(139,92,246,.12) 0%, transparent 70%)',
                    bottom: 50, left: -80, borderRadius: '50%', pointerEvents: 'none'
                }} />
                {/* Grid */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px', pointerEvents: 'none'
                }} />

                {/* Logo */}
                <div style={{ position: 'relative', zIndex: 1, marginBottom: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 44, height: 44,
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(99,102,241,.4)'
                        }}>
                            <TrendingUp size={22} color="white" />
                        </div>
                        <div>
                            <p style={{ color: 'white', fontWeight: 800, fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}>Nexus</p>
                            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase' }}>Enterprise Hub</p>
                        </div>
                    </div>
                </div>

                {/* Hero Text */}
                <div style={{ position: 'relative', zIndex: 1, marginTop: 56, marginBottom: 48 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.3)',
                        borderRadius: 9999, padding: '4px 12px', marginBottom: 20
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1' }} />
                        <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                            Secure Portal
                        </span>
                    </div>
                    <h1 style={{
                        color: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16
                    }}>
                        Workforce<br />
                        <span style={{ background: 'linear-gradient(90deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Intelligence
                        </span>{' '}Platform
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>
                        Unified management for your global operations — personnel, compensation &amp; distribution insights in one secure place.
                    </p>
                </div>

                {/* Feature List */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Icon size={17} color="rgba(255,255,255,.6)" />
                            </div>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,.85)', fontWeight: 600, fontSize: 13.5, marginBottom: 2 }}>{title}</p>
                                <p style={{ color: 'rgba(255,255,255,.38)', fontSize: 12, lineHeight: 1.5 }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p style={{ position: 'relative', zIndex: 1, marginTop: 48, color: 'rgba(255,255,255,.2)', fontSize: 11, fontWeight: 500 }}>
                    © 2026 Nexus Enterprise · All rights reserved
                </p>
            </motion.div>

            {/* ── Right Panel (Form) ────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .55, ease: [.4, 0, .2, 1], delay: .08 }}
                style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '40px 24px',
                }}
            >
                <div style={{ width: '100%', maxWidth: 420 }}>
                    {/* Header */}
                    <div style={{ marginBottom: 36 }}>
                        <h2 style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800,
                            color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8
                        }}>
                            Welcome back
                        </h2>
                        <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>
                            Sign in to access your enterprise dashboard.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                            {/* Username */}
                            <div>
                                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 7 }}>
                                    Username
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        style={{
                                            width: '100%', height: 48,
                                            border: `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`,
                                            borderRadius: 10, paddingLeft: 42, paddingRight: 14,
                                            fontSize: 14, color: '#0f172a', outline: 'none',
                                            background: 'white', fontFamily: 'inherit',
                                            transition: 'border-color .15s, box-shadow .15s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,.15)'; }}
                                        onBlur={e => { e.target.style.borderColor = error ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Password</label>
                                    <button type="button" style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                        Forgot password?
                                    </button>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: '100%', height: 48,
                                            border: `1.5px solid ${error ? '#fca5a5' : '#e2e8f0'}`,
                                            borderRadius: 10, paddingLeft: 42, paddingRight: 44,
                                            fontSize: 14, color: '#0f172a', outline: 'none',
                                            background: 'white', fontFamily: 'inherit',
                                            transition: 'border-color .15s, box-shadow .15s',
                                        }}
                                        onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,.15)'; }}
                                        onBlur={e => { e.target.style.borderColor = error ? '#fca5a5' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        style={{
                                            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                            background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center'
                                        }}
                                    >
                                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -8, height: 0 }}
                                        style={{
                                            background: 'rgba(239,68,68,.06)',
                                            border: '1px solid rgba(239,68,68,.2)',
                                            borderRadius: 8, padding: '10px 14px',
                                            display: 'flex', alignItems: 'center', gap: 8
                                        }}
                                    >
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                                        <p style={{ color: '#dc2626', fontSize: 13, fontWeight: 500 }}>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    height: 48, borderRadius: 10, border: 'none',
                                    background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
                                    color: 'white', fontSize: 15, fontWeight: 700,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    transition: 'all .2s',
                                    boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,.35)',
                                    fontFamily: 'inherit',
                                }}
                                onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {loading ? (
                                    <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                                ) : (
                                    <><span>Sign In</span><ArrowRight size={17} /></>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Demo Hint */}
                    <div style={{
                        marginTop: 28, padding: '14px 16px',
                        background: 'rgba(99,102,241,.05)', border: '1px solid rgba(99,102,241,.12)',
                        borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Shield size={15} color="#6366f1" />
                        </div>
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 3 }}>Demo Credentials</p>
                            <p style={{ fontSize: 12, color: '#64748b' }}>
                                Username: <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace', color: '#0f172a' }}>test</code>{' '}
                                Password: <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace', color: '#0f172a' }}>123456</code>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 767px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
        </div>
    );
};

export default Login;
