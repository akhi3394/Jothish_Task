import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera,
    ChevronLeft,
    User,
    DollarSign,
    MapPin,
    Briefcase,
    ShieldCheck,
    Zap,
    Activity,
    Maximize2
} from 'lucide-react';

const Details = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    if (!state || !state.employee) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-6 text-center p-6 bg-[var(--bg-main)]">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                    <Zap className="text-red-500" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-[var(--text-main)]">Data Error: Missing Record</h1>
                <p className="text-[var(--text-muted)] max-w-sm text-sm">We couldn't retrieve the employee record from the current navigation state.</p>
                <button onClick={() => navigate('/list')} className="btn-premium mt-2 px-8">Return to Dashboard</button>
            </div>
        );
    }

    const { employee } = state;

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setStream(mediaStream);
            setIsCameraActive(true);
        } catch (err) {
            alert("Nexus Camera Access Denied: " + err.message);
        }
    };

    const capturePhoto = async () => {
        setIsCapturing(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate flash/shutter

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');

        // Add a slight cinematic filter to the capture
        ctx.filter = 'contrast(1.1) brightness(1.1)';
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const photoData = canvas.toDataURL('image/png');

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        navigate('/photo-result', { state: { photo: photoData, employee } });
    };

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto bg-[var(--bg-main)]">
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/list')}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mb-10 font-medium text-sm"
            >
                <ChevronLeft size={16} /> Dashboard / Personnel Profile
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Col: Employee Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="glass-card p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-6 border border-[var(--primary-light)]">
                                <User size={40} />
                            </div>
                            <h1 className="text-3xl font-extrabold text-[var(--text-main)] mb-1 leading-tight">{employee.name}</h1>
                            <p className="text-[var(--primary)] text-lg font-semibold mb-8">{employee.designation}</p>

                            <div className="space-y-3">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-500">
                                            <DollarSign size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mb-0.5">Annual Salary</p>
                                            <p className="text-base font-bold text-[var(--text-main)]">{employee.salary}</p>
                                        </div>
                                    </div>
                                    <Activity size={16} className="text-slate-300 group-hover:text-[var(--primary)] transition-colors" />
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-500">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mb-0.5">Primary Location</p>
                                            <p className="text-base font-bold text-[var(--text-main)]">{employee.city}</p>
                                        </div>
                                    </div>
                                    <MapPin size={16} className="text-slate-300 group-hover:text-[var(--primary)] transition-colors" />
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-500">
                                            <Briefcase size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mb-0.5">Employee ID</p>
                                            <p className="text-base font-bold text-[var(--text-main)]">ID-{employee.id}</p>
                                        </div>
                                    </div>
                                    <ShieldCheck size={16} className="text-slate-300 group-hover:text-[var(--primary)] transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Col: Camera Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-3"
                >
                    <div className="glass-card p-1 h-full min-h-[500px]">
                        <div className="bg-white rounded-xl h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!isCameraActive ? (
                                    <motion.div
                                        key="start-ui"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6">
                                            <Camera className="text-slate-300" size={36} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-3">Identity Verification</h2>
                                        <p className="text-[var(--text-muted)] mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                                            Please verify the physical identity of <strong>{employee.name}</strong> to proceed.
                                        </p>
                                        <button
                                            onClick={startCamera}
                                            className="btn-premium px-10 py-3.5"
                                        >
                                            <Zap size={18} /> Start Verification
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="camera-ui"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-full flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Live Camera Feed</span>
                                            </div>
                                            <Maximize2 size={16} className="text-slate-300" />
                                        </div>

                                        <div className="relative flex-grow rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group min-h-[300px]">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Viewfinder overlay */}
                                            <div className="absolute inset-x-0 inset-y-0 pointer-events-none border-[30px] border-black/10" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full flex items-center justify-center">
                                                <div className="w-1 h-1 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]" />
                                            </div>

                                            {/* Flash animation */}
                                            {isCapturing && (
                                                <motion.div
                                                    initial={{ opacity: 1 }}
                                                    animate={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-white z-50"
                                                />
                                            )}
                                        </div>

                                        <div className="mt-6 flex gap-3">
                                            <button
                                                onClick={() => {
                                                    if (stream) stream.getTracks().forEach(track => track.stop());
                                                    setIsCameraActive(false);
                                                }}
                                                className="btn-outline px-6 !bg-slate-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={capturePhoto}
                                                disabled={isCapturing}
                                                className="btn-premium flex-grow !py-3.5"
                                            >
                                                <Camera size={20} /> {isCapturing ? 'Processing...' : 'Complete Verification'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Details;
