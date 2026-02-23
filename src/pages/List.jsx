import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Search, ChevronRight, BarChart3, Map as MapIcon,
    DollarSign, MapPin, Users, RefreshCw, SlidersHorizontal
} from 'lucide-react';
import SkeletonCards from '../components/SkeletonCards';
import Layout from '../components/Layout';

/* ── Stat summary bar ─── */
const StatBar = ({ total, filtered }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={16} color="var(--primary)" />
            </div>
            <div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Total Personnel</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>{total}</p>
            </div>
        </div>
        {filtered !== total && (
            <div style={{ fontSize: 12, color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 10px', borderRadius: 999, fontWeight: 600 }}>
                Showing {filtered} results
            </div>
        )}
    </div>
);

/* ── Employee Card ─── */
const EmployeeCard = ({ emp, index, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: .97 }}
        transition={{ duration: .22, delay: index * 0.04 }}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        whileHover={{ y: -3 }}
    >
        <div style={{
            background: 'white', border: '1px solid var(--border)',
            borderRadius: 14, padding: 20,
            boxShadow: '0 1px 4px rgba(0,0,0,.06)',
            transition: 'box-shadow .2s, border-color .2s',
            height: '100%', display: 'flex', flexDirection: 'column', gap: 16
        }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,.12)'; e.currentTarget.style.borderColor = '#a5b4fc'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.06)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `hsl(${(emp.id * 47) % 360}, 70%, 94%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: `hsl(${(emp.id * 47) % 360}, 55%, 40%)` }}>
                        {(emp.name || '?').charAt(0)}
                    </span>
                </div>
                <span style={{
                    fontSize: 10, fontWeight: 700, color: 'var(--text-muted)',
                    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    padding: '3px 8px', borderRadius: 6, letterSpacing: '.04em'
                }}>
                    #{emp.id}
                </span>
            </div>

            {/* Name / Role */}
            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3, lineHeight: 1.3 }}>
                    {emp.name}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500 }}>{emp.designation}</p>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <DollarSign size={12} color="var(--success)" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{emp.salary}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={12} color="var(--primary)" />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{emp.city}</span>
                </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--primary)', letterSpacing: '.02em' }}>
                    View Profile
                </span>
                <ChevronRight size={14} color="var(--primary)" />
            </div>
        </div>
    </motion.div>
);

/* ── Main Component ─── */
const List = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getEmployeeData();
            setEmployees(data || []);
        } catch {
            setError('Failed to load employee data. Please try again.');
        } finally {
            setTimeout(() => setLoading(false), 600);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = employees.filter(emp => {
        const q = search.toLowerCase();
        return (
            (emp?.name?.toLowerCase() || '').includes(q) ||
            (emp?.designation?.toLowerCase() || '').includes(q) ||
            (emp?.city?.toLowerCase() || '').includes(q)
        );
    });

    return (
        <Layout>
            <div className="page-wrapper">
                {/* Page Header */}
                <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 6 }}>
                        <div>
                            <h1 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                                Personnel Directory
                            </h1>
                            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>
                                Manage and monitor your global workforce
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button onClick={() => navigate('/chart')} className="btn btn-secondary" style={{ fontSize: 13 }}>
                                <BarChart3 size={15} /> Analytics
                            </button>
                            <button onClick={() => navigate('/map')} className="btn btn-secondary" style={{ fontSize: 13 }}>
                                <MapIcon size={15} /> Map View
                            </button>
                            <button onClick={fetchData} className="btn btn-secondary" title="Refresh" style={{ padding: '0 12px' }}>
                                <RefreshCw size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{
                    background: 'white', border: '1.5px solid var(--border)',
                    borderRadius: 12, display: 'flex', alignItems: 'center',
                    gap: 10, padding: '0 16px', marginBottom: 24,
                    boxShadow: '0 1px 4px rgba(0,0,0,.05)',
                    maxWidth: 520,
                }}>
                    <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search by name, role or city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            flex: 1, height: 46, border: 'none', outline: 'none',
                            fontSize: 14, color: 'var(--text-primary)', background: 'transparent',
                            fontFamily: 'inherit'
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
                            ×
                        </button>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.2)',
                        borderRadius: 10, padding: '14px 18px', marginBottom: 24,
                        color: '#dc2626', fontSize: 13.5, fontWeight: 500,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        {error}
                        <button onClick={fetchData} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Retry</button>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <SkeletonCards count={9} />
                ) : (
                    <>
                        <StatBar total={employees.length} filtered={filtered.length} />
                        <AnimatePresence mode="popLayout">
                            {filtered.length === 0 ? (
                                <div className="empty-state card" style={{ padding: '60px 24px' }}>
                                    <div className="empty-state-icon"><Search size={28} color="var(--text-muted)" /></div>
                                    <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>No results found</h2>
                                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)', maxWidth: 280 }}>
                                        No personnel matching "<strong>{search}</strong>"
                                    </p>
                                    <button onClick={() => setSearch('')} className="btn btn-primary" style={{ marginTop: 8, fontSize: 13 }}>
                                        Clear search
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}
                                >
                                    {filtered.map((emp, i) => (
                                        <EmployeeCard
                                            key={emp.id}
                                            emp={emp}
                                            index={i}
                                            onClick={() => navigate(`/details/${emp.id}`, { state: { employee: emp } })}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default List;
