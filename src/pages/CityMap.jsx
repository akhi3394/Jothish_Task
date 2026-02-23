import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { ChevronLeft, Map as MapIcon, Users, Globe, Navigation, Loader2 } from 'lucide-react';
import L from 'leaflet';

// Custom Marker Fix
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const cityCoords = {
    'New York': [40.7128, -74.0060], 'Los Angeles': [34.0522, -118.2437],
    'Chicago': [41.8781, -87.6298], 'Houston': [29.7604, -95.3698],
    'Phoenix': [33.4484, -112.0740], 'Philadelphia': [39.9526, -75.1652],
    'San Antonio': [29.4241, -98.4936], 'San Diego': [32.7157, -117.1611],
    'Dallas': [32.7767, -96.7970], 'San Jose': [37.3382, -121.8863],
    'San Francisco': [37.7749, -122.4194], 'Seattle': [47.6062, -122.3321],
    'Austin': [30.2672, -97.7431], 'Miami': [25.7617, -80.1918],
    'Denver': [39.7392, -104.9903], 'Boston': [42.3601, -71.0589],
    'Portland': [45.5152, -122.6784], 'Atlanta': [33.7490, -84.3880],
    'Las Vegas': [36.1699, -115.1398], 'Minneapolis': [44.9778, -93.2650],
};

const CityMap = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalCities: 0, totalEmployees: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getEmployeeData();
                const employees = Array.isArray(responseData) ? responseData : (responseData.data || []);

                const cityGroups = employees.reduce((acc, emp) => {
                    const city = emp?.city || 'Unknown';
                    if (!acc[city]) acc[city] = [];
                    acc[city].push(emp);
                    return acc;
                }, {});

                const mappedLocations = Object.entries(cityGroups).map(([city, emps]) => ({
                    city,
                    employees: emps,
                    coords: cityCoords[city] || [37.0902 + (Math.random() - 0.5) * 10, -95.7129 + (Math.random() - 0.5) * 20]
                })).filter(loc => loc.coords[0] !== undefined);

                setLocations(mappedLocations);
                setStats({
                    totalCities: mappedLocations.length,
                    totalEmployees: employees.length
                });
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-6 md:p-12 max-w-[1400px] mx-auto flex flex-col bg-[var(--bg-main)]">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/list')}
                    className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm self-start"
                >
                    <ChevronLeft size={16} /> Dashboard / Distribution
                </motion.button>

                <div className="flex-grow text-center lg:text-right">
                    <div className="flex items-center gap-2.5 lg:justify-end mb-2">
                        <div className="w-10 h-10 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center border border-[var(--primary-light)]">
                            <Globe size={20} />
                        </div>
                        <span className="text-[var(--primary)] font-bold tracking-wider text-[10px] uppercase">Geospatial Data</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Personnel Distribution</h1>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-grow">
                {/* Stats Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="xl:col-span-1 space-y-6"
                >
                    <div className="glass-card p-6 !bg-white">
                        <h3 className="text-[var(--text-main)] font-bold mb-5 flex items-center gap-2 text-sm">
                            <Navigation size={16} className="text-[var(--primary)]" /> Regional Hubs
                        </h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Active Centers</p>
                                <p className="text-xl font-bold text-[var(--text-main)]">{stats.totalCities}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Global Headcount</p>
                                <p className="text-xl font-bold text-[var(--text-main)]">{stats.totalEmployees}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 !bg-white">
                        <h3 className="text-[var(--text-main)] font-bold mb-4 text-xs uppercase tracking-wider text-[var(--text-muted)]">Key Locations</h3>
                        <div className="space-y-2.5">
                            {locations.slice(0, 5).map((loc, i) => (
                                <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 last:border-0">
                                    <span className="text-[var(--text-muted)] font-medium">{loc.city}</span>
                                    <span className="text-[var(--text-main)] font-bold px-2 py-0.5 bg-slate-100 rounded text-[10px]">{loc.employees.length}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Map Main */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="xl:col-span-3 glass-card p-1 shadow-lg overflow-hidden relative min-h-[500px]"
                >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-[1001]">
                            <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
                        </div>
                    ) : (
                        <div style={{ height: '600px', width: '100%', borderRadius: '11px', overflow: 'hidden' }}>
                            <MapContainer
                                center={[37.8, -96]}
                                zoom={4}
                                zoomControl={false}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />
                                {locations.map((loc, idx) => {
                                    if (!loc.coords) return null;
                                    return (
                                        <Marker key={idx} position={loc.coords}>
                                            <Popup>
                                                <div className="p-1">
                                                    <h3 className="font-bold text-[var(--text-main)] text-sm mb-0.5">{loc.city}</h3>
                                                    <p className="text-[var(--text-muted)] text-[10px]">{loc.employees?.length || 0} Professional(s)</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                                <ZoomControl position="bottomright" />
                            </MapContainer>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CityMap;
