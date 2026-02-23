import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart3, TrendingUp, DollarSign, ArrowUpRight, Users, Award } from 'lucide-react';
import Layout from '../components/Layout';

const PALETTE = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#3b82f6', '#06b6d4', '#10b981', '#84cc16',
    '#eab308', '#f97316'
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{
                background: 'white', borderRadius: 10, padding: '10px 14px',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
                minWidth: 140
            }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>
                    {label}
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                    ${(payload[0].value / 1000).toFixed(1)}k
                </p>
            </div>
        );
    }
    return null;
};

const SalaryChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ avg: 0, max: 0, min: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getEmployeeData();
                const emps = Array.isArray(res) ? res : (res?.data || []);

                const chartData = emps.slice(0, 10).map(emp => ({
                    name: (emp?.name || 'Unknown').split(' ')[0],
                    fullName: emp?.name || 'Unknown',
                    salary: parseInt((emp?.salary || '0').replace(/[^0-9]/g, '')) || 0,
                    originalSalary: emp?.salary || '$0'
                }));

                const salaries = chartData.map(d => d.salary).filter(Boolean);
                setStats({
                    avg: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
                    max: Math.max(...salaries),
                    min: Math.min(...salaries)
                });
                setData(chartData);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 600);
            }
        };
        fetch();
    }, []);

    const statCards = [
        { label: 'Average Salary', value: `$${(stats.avg / 1000).toFixed(1)}k`, icon: DollarSign, color: 'var(--primary)' },
        { label: 'Highest Salary', value: `$${(stats.max / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'var(--success)' },
        { label: 'Records', value: `${data.length}`, icon: Users, color: 'var(--accent)' },
    ];

    return (
        <Layout>
            <div className="page-wrapper">
                {/* Breadcrumb */}
                <button onClick={() => navigate('/list')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, marginBottom: 24, padding: 0 }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <ChevronLeft size={15} /> Dashboard / Analytics
                </button>

                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BarChart3 size={18} color="var(--primary)" />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Financial Data</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.02em', marginBottom: 4 }}>
                        Compensation Analytics
                    </h1>
                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                        Salary breakdown across top 10 personnel records.
                    </p>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
                    {loading
                        ? [1, 2, 3].map(i => (
                            <div key={i} className="shimmer-wrap" style={{ height: 90, borderRadius: 12 }} />
                        ))
                        : statCards.map(({ label, value, icon: Icon, color }) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="stat-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                        <p className="stat-card-label">{label}</p>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `rgba(${color === 'var(--success)' ? '16,185,129' : color === 'var(--accent)' ? '139,92,246' : '99,102,241'},.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={15} color={color} />
                                        </div>
                                    </div>
                                    <p className="stat-card-value">{value}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                                        <ArrowUpRight size={12} color="var(--success)" />
                                        <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>Live data</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>

                {/* Chart Card */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BarChart3 size={17} color="var(--primary)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>Salary Distribution</h2>
                                    <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Top 10 personnel by compensation</p>
                                </div>
                            </div>
                            <span className="badge badge-primary">
                                <Award size={11} /> FY2026 Data
                            </span>
                        </div>

                        <div style={{ padding: '24px 20px 16px' }}>
                            {loading ? (
                                <div className="shimmer-wrap" style={{ height: 360, borderRadius: 10 }} />
                            ) : (
                                <ResponsiveContainer width="100%" height={360}>
                                    <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 60 }} barCategoryGap="35%">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={600}
                                            tickLine={false} axisLine={false} interval={0} angle={-40} textAnchor="end" dy={8} />
                                        <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600}
                                            tickLine={false} axisLine={false}
                                            tickFormatter={v => `$${v / 1000}k`} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,.05)', radius: 6 }} />
                                        <Bar dataKey="salary" radius={[8, 8, 0, 0]} maxBarSize={52}>
                                            {data.map((_, i) => (
                                                <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={.88} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Legend */}
                        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            {[
                                { color: 'var(--primary)', label: 'Market Benchmark +4.2%' },
                                { color: 'var(--accent)', label: 'Budget Utilization 92%' },
                                { color: '#94a3b8', label: 'FY2026 Projection' },
                            ].map(({ color, label }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default SalaryChart;
