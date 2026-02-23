import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, ChevronLeft, User, DollarSign, MapPin,
    Briefcase, ShieldCheck, Zap, Activity, Maximize2, X
} from 'lucide-react';
import Layout from '../components/Layout';

const InfoRow = ({ icon: Icon, label, value, color = 'var(--primary)' }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', background: 'var(--bg-elevated)',
        border: '1px solid var(--border)', borderRadius: 10,
    }}>
        <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'white', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Icon size={17} color={color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 2 }}>
                {label}
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {value}
            </p>
        </div>
    </div>
);

const Details = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    if (!state?.employee) {
        return (
            <Layout>
                <div className="empty-state">
                    <div className="empty-state-icon"><Zap size={28} color="#ef4444" /></div>
                    <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>No Record Found</h1>
                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)', maxWidth: 320 }}>
                        Couldn&apos;t retrieve the employee record from navigation state.
                    </p>
                    <button onClick={() => navigate('/list')} className="btn btn-primary" style={{ marginTop: 8 }}>
                        Back to Dashboard
                    </button>
                </div>
            </Layout>
        );
    }

    const { employee } = state;
    const avatarHue = (employee.id * 47) % 360;

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
            setIsCameraActive(true);
        } catch (err) {
            alert('Camera access denied: ' + err.message);
        }
    };

    const stopCamera = () => {
        if (stream) stream.getTracks().forEach(t => t.stop());
        setIsCameraActive(false);
        setIsCapturing(false);
    };

    const capturePhoto = async () => {
        setIsCapturing(true);
        await new Promise(r => setTimeout(r, 500));
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.filter = 'contrast(1.1) brightness(1.05)';
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL('image/png');
        if (stream) stream.getTracks().forEach(t => t.stop());
        navigate('/photo-result', { state: { photo: photoData, employee } });
    };

    useEffect(() => () => { if (stream) stream.getTracks().forEach(t => t.stop()); }, [stream]);

    return (
        <Layout>
            <div className="page-wrapper">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate('/list')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-muted)', fontSize: 13, fontWeight: 500,
                        marginBottom: 24, padding: 0, fontFamily: 'inherit'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    <ChevronLeft size={15} />
                    Dashboard &rsaquo; Personnel Profile
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'start' }}>

                    {/* ── Profile Card ─── */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                            {/* Banner */}
                            <div style={{
                                height: 90,
                                background: `linear-gradient(135deg, hsl(${avatarHue},70%,55%) 0%, hsl(${(avatarHue + 40) % 360},65%,50%) 100%)`
                            }} />
                            {/* Avatar */}
                            <div style={{ padding: '0 24px 24px' }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: 18,
                                    background: `hsl(${avatarHue},70%,94%)`,
                                    border: '4px solid white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginTop: -36, marginBottom: 14,
                                    boxShadow: 'var(--shadow-md)'
                                }}>
                                    <span style={{ fontSize: 26, fontWeight: 800, color: `hsl(${avatarHue},55%,40%)`, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {(employee.name || '?').charAt(0)}
                                    </span>
                                </div>
                                <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                                    {employee.name}
                                </h1>
                                <p style={{ fontSize: 13.5, color: 'var(--primary)', fontWeight: 600, marginBottom: 18 }}>
                                    {employee.designation}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <InfoRow icon={DollarSign} label="Annual Salary" value={employee.salary} color="var(--success)" />
                                    <InfoRow icon={MapPin} label="Primary Location" value={employee.city} color="var(--primary)" />
                                    <InfoRow icon={Briefcase} label="Employee ID" value={`ID-${employee.id}`} color="var(--accent)" />
                                </div>

                                {/* Status badge */}
                                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                                    <span className="badge badge-success" style={{ gap: 6 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
                                        Active
                                    </span>
                                    <span className="badge badge-primary">Verified</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Camera Card ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .1 }}
                    >
                        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                            {/* Header */}
                            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Camera size={17} color="var(--primary)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>Identity Verification</h2>
                                    <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Capture live verification photo</p>
                                </div>
                            </div>

                            {/* Camera Area */}
                            <div style={{ padding: 20 }}>
                                <AnimatePresence mode="wait">
                                    {!isCameraActive ? (
                                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', gap: 16 }}>
                                            <div style={{
                                                width: 80, height: 80, borderRadius: 20,
                                                background: 'var(--bg-elevated)', border: '2px dashed var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Camera size={32} color="var(--text-muted)" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                                                    Ready to Verify
                                                </h3>
                                                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
                                                    Click below to activate your camera and capture a verification photo for <strong>{employee.name}</strong>.
                                                </p>
                                            </div>
                                            <button onClick={startCamera} className="btn btn-primary" style={{ height: 44, paddingInline: 28, fontSize: 14, marginTop: 4 }}>
                                                <Zap size={16} /> Start Camera
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="live" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                            {/* Live indicator */}
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.5s infinite' }} />
                                                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Live Camera</span>
                                                </div>
                                                <button onClick={stopCamera} className="btn btn-ghost" style={{ height: 30, padding: '0 10px', fontSize: 12 }}>
                                                    <X size={13} /> Cancel
                                                </button>
                                            </div>

                                            {/* Video */}
                                            <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#0f172a', minHeight: 240, border: '1px solid var(--border)' }}>
                                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', display: 'block', maxHeight: 320, objectFit: 'cover' }} />
                                                {/* Crosshair */}
                                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                                                    <div style={{ width: 120, height: 120, border: '1.5px solid rgba(255,255,255,.35)', borderRadius: '50%' }} />
                                                    <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }} />
                                                </div>
                                                {/* Flash */}
                                                {isCapturing && (
                                                    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }}
                                                        style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 10 }} />
                                                )}
                                            </div>

                                            <button
                                                onClick={capturePhoto} disabled={isCapturing} className="btn btn-primary"
                                                style={{ height: 46, fontSize: 14, borderRadius: 10 }}>
                                                <Camera size={17} />
                                                {isCapturing ? 'Processing…' : 'Capture & Verify'}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
        </Layout>
    );
};

export default Details;
