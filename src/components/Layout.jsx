import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BarChart3,
    Map as MapIcon,
    LogOut,
    Menu,
    X,
    TrendingUp,
    ChevronRight,
    Bell,
    Settings
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/list' },
    { label: 'Analytics', icon: BarChart3, path: '/chart' },
    { label: 'Map View', icon: MapIcon, path: '/map' },
];

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const NavContent = () => (
        <>
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="flex items-center gap-3">
                    <div style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                        borderRadius: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(99,102,241,.4)'
                    }}>
                        <TrendingUp size={18} color="white" />
                    </div>
                    <div>
                        <p style={{ color: 'white', fontWeight: 700, fontSize: 14, lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Nexus
                        </p>
                        <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                            Enterprise Hub
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="sidebar-nav">
                <p style={{ color: 'rgba(255,255,255,.25)', fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '8px 12px 6px', marginBottom: 4 }}>
                    Main Menu
                </p>
                {navItems.map(({ label, icon: Icon, path }) => (
                    <button
                        key={path}
                        onClick={() => { navigate(path); setSidebarOpen(false); }}
                        className={`nav-item ${location.pathname === path ? 'active' : ''}`}
                    >
                        <Icon size={16} />
                        <span>{label}</span>
                        {location.pathname === path && (
                            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: .7 }} />
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '10px 12px',
                        borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: 'rgba(239,68,68,.1)',
                        color: 'rgba(239,68,68,.8)',
                        fontSize: 13.5, fontWeight: 500,
                        transition: 'background .15s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,.18)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,.1)'}
                >
                    <LogOut size={15} />
                    Sign Out
                </button>
                <p style={{ color: 'rgba(255,255,255,.18)', fontSize: 10, textAlign: 'center', marginTop: 12 }}>
                    v2.0.0 · Nexus Enterprise
                </p>
            </div>
        </>
    );

    return (
        <div className="app-shell">
            {/* Desktop Sidebar */}
            <aside className="sidebar">
                <NavContent />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            className="sidebar-overlay open"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            key="mobile-sidebar"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            style={{
                                position: 'fixed', top: 0, left: 0,
                                width: 'var(--sidebar-w)', height: '100vh',
                                background: 'var(--bg-sidebar)',
                                zIndex: 200,
                                display: 'flex', flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            <button
                                onClick={() => setSidebarOpen(false)}
                                style={{
                                    position: 'absolute', top: 16, right: 16,
                                    background: 'rgba(255,255,255,.1)',
                                    border: 'none', borderRadius: 8,
                                    width: 32, height: 32,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'rgba(255,255,255,.7)', cursor: 'pointer',
                                    zIndex: 1
                                }}
                            >
                                <X size={16} />
                            </button>
                            <NavContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main */}
            <div className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    {/* Hamburger (mobile) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            display: 'none',
                            alignItems: 'center', justifyContent: 'center',
                            width: 36, height: 36, borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'var(--bg-surface)',
                            color: 'var(--text-secondary)', cursor: 'pointer'
                        }}
                        id="hamburger-btn"
                    >
                        <Menu size={18} />
                    </button>

                    {/* Breadcrumb */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                            {navItems.find(n => n.path === location.pathname)?.label || 'Page'}
                        </span>
                    </div>

                    {/* Right Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button className="btn-ghost btn" style={{ height: 36, padding: '0 10px' }} title="Notifications">
                            <Bell size={16} />
                        </button>
                        <button className="btn-ghost btn" style={{ height: 36, padding: '0 10px' }} title="Settings">
                            <Settings size={16} />
                        </button>
                        {/* Avatar */}
                        <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                            boxShadow: '0 2px 8px rgba(99,102,241,.3)',
                            cursor: 'pointer'
                        }}>
                            AD
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="page-content">
                    {children}
                </main>
            </div>

            {/* CSS to show hamburger on mobile */}
            <style>{`
        @media (max-width: 1023px) {
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
        </div>
    );
};

export default Layout;
