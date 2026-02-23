import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    RotateCcw,
    CheckCircle2,
    User,
    ShieldCheck,
    Download,
    Share2,
    Calendar
} from 'lucide-react';

const PhotoResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.photo) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-6 text-center p-6 bg-[var(--bg-main)]">
                <RotateCcw className="text-[var(--primary)] animate-spin-slow" size={48} />
                <h1 className="text-xl font-bold text-[var(--text-main)]">No Session Data Found</h1>
                <p className="text-[var(--text-muted)] text-sm max-w-xs">We couldn't find a valid identification capture. Please try again.</p>
                <button onClick={() => navigate('/list')} className="btn-premium px-8">Return to Dashboard</button>
            </div>
        );
    }

    const { photo, employee } = state;
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    return (
        <div className="min-h-screen p-6 md:p-12 flex items-center justify-center bg-[var(--bg-main)]">
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-card p-1 max-w-4xl w-full !bg-white"
            >
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-extrabold text-[var(--text-main)] tracking-tight">Identity Verified</h1>
                                <p className="text-[var(--text-muted)] text-sm font-medium">Verification record successfully captured</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn-outline !p-2.5 text-slate-400 hover:text-[var(--text-main)]" title="Download">
                                <Download size={18} />
                            </button>
                            <button className="btn-outline !p-2.5 text-slate-400 hover:text-[var(--text-main)]" title="Share">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Visual Record */}
                        <div className="lg:col-span-7">
                            <motion.div
                                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group"
                            >
                                <img src={photo} alt="Verified identification" className="w-full h-auto grayscale-[0.1] transition-all group-hover:grayscale-0" />

                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center border border-white/20">
                                            <User size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-base leading-none mb-1">{employee.name}</p>
                                            <p className="text-white/70 text-[10px] font-medium tracking-wide uppercase">{employee.designation}</p>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-white/40 text-[8px] uppercase font-bold tracking-widest mb-0.5">Recorded At</p>
                                        <p className="text-white/80 text-[10px] font-mono">{timestamp}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Verification Stats */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Optical Signature</h3>
                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed">Biometric landmarks successfully mapped and verified.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Credential Match</h3>
                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed">Identity confirmed for employee record ID-{employee.id}.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-[var(--primary-light)] flex items-center justify-center shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Session Log</h3>
                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed">Verification event logged at {timestamp.split(',')[1].trim()}.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 space-y-3">
                                <button
                                    onClick={() => navigate('/list')}
                                    className="btn-premium w-full !py-3.5 shadow-md"
                                >
                                    <CheckCircle2 size={20} /> Save Verification Record
                                </button>
                                <button
                                    onClick={() => navigate(`/details/${employee.id}`, { state: { employee } })}
                                    className="btn-outline w-full !py-3 !bg-slate-50 text-slate-600 border-slate-200"
                                >
                                    <RotateCcw size={16} /> Re-verify Identity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PhotoResult;
