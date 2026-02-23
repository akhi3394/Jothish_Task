import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart3, TrendingUp, DollarSign, ArrowUpRight, Loader2 } from 'lucide-react';

const SalaryChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getEmployeeData();
                const employees = Array.isArray(responseData) ? responseData : (responseData.data || []);

                const chartData = employees.slice(0, 10).map(emp => {
                    const empName = emp?.name || 'Unknown';
                    const empSalary = emp?.salary || '0';
                    return {
                        name: empName.split(' ')[0],
                        fullName: empName,
                        salary: parseInt(empSalary.replace(/[^0-9]/g, '')) || 0,
                        originalSalary: empSalary
                    };
                });

                setData(chartData);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchData();
    }, []);

    const COLORS = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
        '#3b82f6', '#06b6d4', '#10b981', '#84cc16',
        '#eab308', '#f97316'
    ];

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-[1200px] mx-auto bg-[var(--bg-main)]">
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/list')}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mb-10 font-medium text-sm"
            >
                <ChevronLeft size={16} /> Dashboard / Analytics
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-1 shadow-lg !bg-white"
            >
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-10 h-10 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center border border-[var(--primary-light)]">
                                    <BarChart3 size={20} />
                                </div>
                                <span className="text-[var(--primary)] font-bold tracking-wider text-[10px] uppercase">Financial Data</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight mb-2">Compensation Matrix</h1>
                            <p className="text-[var(--text-muted)] text-base">Analytical breakdown of personnel expenditure across top roles.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Avg. Salary</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-bold text-[var(--text-main)]">$118.5k</p>
                                    <ArrowUpRight size={14} className="text-green-600" />
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Dataset</p>
                                <p className="text-lg font-bold text-[var(--text-main)]">10 Records</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full relative group mt-8 flex justify-center items-center bg-slate-50 rounded-2xl p-6 min-h-[440px] border border-slate-100">
                        {loading ? (
                            <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
                        ) : (
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#64748b"
                                        fontSize={11}
                                        fontWeight={600}
                                        tickLine={false}
                                        axisLine={false}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={11}
                                        fontWeight={600}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                            padding: '12px'
                                        }}
                                        itemStyle={{ color: '#0f172a', fontSize: '13px', fontWeight: '700' }}
                                        labelStyle={{ color: '#64748b', fontSize: '11px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                    />
                                    <Bar dataKey="salary" radius={[6, 6, 0, 0]} barSize={40}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--primary)]" /> Market Benchmark +4.2%
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" /> Budget Utilization 92%
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-300" /> FY2026 Projection
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SalaryChart;
