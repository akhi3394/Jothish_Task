import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay for "Production" feel
        await new Promise(resolve => setTimeout(resolve, 800));

        if (username === 'test' && password === '123456') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/list');
        } else {
            setError('Invalid identity credentials');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-main)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px]"
            >
                <div className="glass-card p-8 md:p-10">
                    <header className="text-center mb-10">
                        <div className="w-12 h-12 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[var(--primary-light)]">
                            <ShieldCheck size={28} />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Welcome Back</h1>
                        <p className="text-[var(--text-muted)] text-sm">Please enter your credentials to access the portal</p>
                    </header>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-1">
                                Username
                            </label>
                            <div className="input-group">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                                <input
                                    type="text"
                                    className="premium-input"
                                    placeholder="Enter employee ID"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider ml-1">
                                Password
                            </label>
                            <div className="input-group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                                <input
                                    type="password"
                                    className="premium-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <p className="text-red-600 text-xs font-medium">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-premium w-full !py-3 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <footer className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                        <div className="flex items-center justify-center gap-3 text-xs text-[var(--text-muted)]">
                            <span className="font-medium">Test Account:</span>
                            <div className="flex gap-1.5">
                                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-[var(--text-main)]">test</code>
                                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-[var(--text-main)]">123456</code>
                            </div>
                        </div>
                    </footer>
                </div>

                <p className="text-center mt-8 text-xs text-[var(--text-muted)]">
                    &copy; 2026 Nexus Enterprise. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
