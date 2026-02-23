import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    DollarSign,
    MapPin,
    Eye,
    BarChart3,
    Map as MapIcon,
    Loader2,
    LogOut,
    Search,
    Filter,
    ChevronRight,
    TrendingUp
} from 'lucide-react';

import SkeletonCards from '../components/SkeletonCards';

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployeeData();
                // data is now an array of objects
                setEmployees(data || []);
            } catch (err) {
                setError('Systems integration failed');
            } finally {
                // Add a small delay for a smoother transition from skeleton to content
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const filteredEmployees = (employees || []).filter(emp => {
        const name = emp?.name?.toLowerCase() || '';
        const designation = emp?.designation?.toLowerCase() || '';
        const query = searchQuery?.toLowerCase() || '';
        return name.includes(query) || designation.includes(query);
    });

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-[1400px] mx-auto bg-[var(--bg-main)]">
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 bg-[var(--primary-light)] text-[var(--primary)] rounded-lg flex items-center justify-center border border-[var(--primary-light)]">
                            <TrendingUp size={18} />
                        </div>
                        <span className="text-[var(--primary)] font-bold tracking-wider text-[10px] uppercase">Enterprise Hub</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-2">Internal Dashboard</h1>
                    <p className="text-[var(--text-muted)] text-base max-w-sm">Manage and monitor workforce data across global operations.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-3"
                >
                    <button onClick={() => navigate('/chart')} className="btn-outline !bg-white">
                        <BarChart3 size={18} className="text-[var(--text-muted)]" /> Analytics
                    </button>
                    <button onClick={() => navigate('/map')} className="btn-outline !bg-white">
                        <MapIcon size={18} className="text-[var(--text-muted)]" /> Map View
                    </button>
                    <button onClick={handleLogout} className="btn-outline !bg-white !p-2.5" title="Logout">
                        <LogOut size={18} className="text-[var(--text-muted)]" />
                    </button>
                </motion.div>
            </header>

            {/* Search & Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card mb-12 flex items-center gap-2 max-w-xl overflow-hidden"
            >
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                    <input
                        type="text"
                        placeholder="Filter personnel by name, role or city..."
                        className="premium-input !bg-transparent !border-none !ring-0 !py-4 !pl-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </motion.div>

            {/* Content Section */}
            {loading ? (
                <SkeletonCards count={9} />
            ) : (
                <>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            layout
                        >
                            {filteredEmployees.map((emp, index) => (
                                <motion.div
                                    key={emp.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}
                                    onClick={() => navigate(`/details/${emp.id}`, { state: { employee: emp } })}
                                    className="glass-card p-6 cursor-pointer group hover:border-[var(--primary)]"
                                >
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[var(--primary-light)] group-hover:border-[var(--primary-light)] transition-all">
                                            <User className="text-slate-400 group-hover:text-[var(--primary)] transition-colors" size={24} />
                                        </div>
                                        <span className="text-[10px] font-bold text-[var(--text-muted)] px-2 py-1 bg-slate-50 rounded border border-slate-100 uppercase tracking-tight">ID-{emp.id}</span>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-1">{emp.name}</h3>
                                        <p className="text-[var(--text-muted)] text-sm font-medium">{emp.designation}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-50">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] opacity-60">Compensation</p>
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-main)]">
                                                <DollarSign size={14} className="text-slate-400" />
                                                <span>{emp.salary}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] opacity-60">Location</p>
                                            <div className="flex items-center justify-end gap-1.5 text-sm font-semibold text-[var(--text-main)]">
                                                <MapPin size={14} className="text-slate-400" />
                                                <span>{emp.city}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-[var(--primary)] font-bold text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                                        View Full Profile
                                        <ChevronRight size={16} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredEmployees.length === 0 && (
                        <div className="bg-white border border-slate-100 rounded-2xl p-20 flex flex-col items-center text-center shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
                                <Search size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">No results found</h2>
                            <p className="text-[var(--text-muted)] text-sm max-w-xs">We couldn't find any personnel matching your search criteria.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 text-[var(--primary)] font-bold text-sm hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default List;
