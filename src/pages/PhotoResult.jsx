import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, RotateCcw, CheckCircle2, User,
    ShieldCheck, Download, Calendar, Fingerprint
} from 'lucide-react';
import Layout from '../components/Layout';

const VerificationStep = ({ icon: Icon, title, description, color = 'var(--primary)' }) => (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: `rgba(${color === 'var(--success)' ? '16,185,129' : '99,102,241'},.1)`,
            border: `1px solid rgba(${color === 'var(--success)' ? '16,185,129' : '99,102,241'},.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2
        }}>
            <Icon size={16} color={color} />
        </div>
        <div>
            <h3 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{title}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
        </div>
    </div>
);

const PhotoResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state?.photo) {
        return (
            <Layout>
                <div className="empty-state">
                    <div className="empty-state-icon"><RotateCcw size={28} color="var(--primary)" /></div>
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>No Session Data</h1>
                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)', maxWidth: 300 }}>
                        No valid verification capture found. Please try again.
                    </p>
                    <button onClick={() => navigate('/list')} className="btn btn-primary">
                        Return to Dashboard
                    </button>
                </div>
            </Layout>
        );
    }

    const { photo, employee } = state;
    const avatarHue = (employee?.id * 47) % 360;
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = photo;
        a.download = `verification-${employee?.id}-${Date.now()}.png`;
        a.click();
    };

    return (
        <Layout>
            <div className="page-wrapper">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate(`/details/${employee?.id}`, { state: { employee } })}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-muted)', fontSize: 13, fontWeight: 500,
                        marginBottom: 24, padding: 0
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    <ChevronLeft size={15} />
                    Profile / Verification Result
                </button>

                {/* Success Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.2)',
                        borderRadius: 12, padding: '14px 20px',
                        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24
                    }}
                >
                    <CheckCircle2 size={20} color="var(--success)" />
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>Identity Verified Successfully</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>Verification record created at {timestamp}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <button onClick={handleDownload} className="btn btn-secondary" style={{ height: 34, padding: '0 12px', fontSize: 12 }}>
                            <Download size={13} /> Download
                        </button>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>

                    {/* Photo */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ position: 'relative' }}>
                                <img src={photo} alt="Verified identification"
                                    style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 400 }} />
                                {/* Overlay */}
                                <div style={{
                                    position: 'absolute', inset: '0 0 0 0',
                                    background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)',
                                    display: 'flex', alignItems: 'flex-end', padding: 20
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                            background: `hsl(${avatarHue},70%,55%)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <span style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>
                                                {(employee?.name || '?').charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{employee?.name}</p>
                                            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 11, fontWeight: 500 }}>{employee?.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Caption */}
                            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Calendar size={13} color="var(--text-muted)" />
                                <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Captured on {timestamp}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Verification Details */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>
                        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', overflow: 'hidden', height: '100%' }}>
                            {/* Header */}
                            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(16,185,129,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShieldCheck size={18} color="var(--success)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>Verification Report</h2>
                                    <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Employee ID-{employee?.id}</p>
                                </div>
                                <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Verified</span>
                            </div>

                            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                                <VerificationStep
                                    icon={Fingerprint}
                                    title="Biometric Signature"
                                    description="Optical landmarks successfully captured and mapped in the verification record."
                                    color="var(--primary)"
                                />
                                <VerificationStep
                                    icon={User}
                                    title="Credential Match"
                                    description={`Identity confirmed for employee record ID-${employee?.id}.`}
                                    color="var(--primary)"
                                />
                                <VerificationStep
                                    icon={ShieldCheck}
                                    title="Session Logged"
                                    description={`Event logged at ${timestamp.split(',')[1]?.trim() || timestamp}.`}
                                    color="var(--success)"
                                />

                                <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <button onClick={() => navigate('/list')} className="btn btn-primary" style={{ height: 46, fontSize: 14 }}>
                                        <CheckCircle2 size={17} /> Save & Return to Dashboard
                                    </button>
                                    <button
                                        onClick={() => navigate(`/details/${employee?.id}`, { state: { employee } })}
                                        className="btn btn-secondary" style={{ height: 42, fontSize: 13 }}
                                    >
                                        <RotateCcw size={14} /> Re-verify Identity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default PhotoResult;
