import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployeeData } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { ChevronLeft, Globe, Users, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import Layout from '../components/Layout';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const cityCoords = {
    'New York': [40.7128, -74.006], 'Los Angeles': [34.0522, -118.2437],
    'Chicago': [41.8781, -87.6298], 'Houston': [29.7604, -95.3698],
    'Phoenix': [33.4484, -112.074], 'Philadelphia': [39.9526, -75.1652],
    'San Antonio': [29.4241, -98.4936], 'San Diego': [32.7157, -117.1611],
    'Dallas': [32.7767, -96.797], 'San Jose': [37.3382, -121.8863],
    'San Francisco': [37.7749, -122.4194], 'Seattle': [47.6062, -122.3321],
    'Austin': [30.2672, -97.7431], 'Miami': [25.7617, -80.1918],
    'Denver': [39.7392, -104.9903], 'Boston': [42.3601, -71.0589],
    'Portland': [45.5152, -122.6784], 'Atlanta': [33.749, -84.388],
    'Las Vegas': [36.1699, -115.1398], 'Minneapolis': [44.9778, -93.265],
};

const CityMap = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ cities: 0, employees: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getEmployeeData();
                const emps = Array.isArray(res) ? res : (res?.data || []);

                const groups = emps.reduce((acc, emp) => {
                    const city = emp?.city || 'Unknown';
                    if (!acc[city]) acc[city] = [];
                    acc[city].push(emp);
                    return acc;
                }, {});

                const locs = Object.entries(groups)
                    .map(([city, empList]) => ({
                        city, employees: empList,
                        coords: cityCoords[city] || [37 + (Math.random() - .5) * 10, -95 + (Math.random() - .5) * 20]
                    }))
                    .filter(l => l.coords);

                setLocations(locs);
                setStats({ cities: locs.length, employees: emps.length });
            } catch (err) { console.error(err); }
            finally { setTimeout(() => setLoading(false), 600); }
        };
        fetch();
    }, []);

    return (
        <Layout>
            <div className="page-wrapper">
                {/* Breadcrumb */}
                <button onClick={() => navigate('/list')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, marginBottom: 24, padding: 0 }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <ChevronLeft size={15} /> Dashboard / Map View
                </button>

                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe size={18} color="var(--primary)" />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Geospatial Data</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.02em', marginBottom: 4 }}>
                        Personnel Distribution
                    </h1>
                    <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Workforce locations across regional hubs</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, gridTemplateAreas: '"map" "sidebar"' }}>

                    {/* Sidebar Stats */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {/* Stat Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {[
                                    { label: 'Active Cities', value: loading ? '…' : stats.cities, icon: MapPin, color: 'var(--primary)' },
                                    { label: 'Total Headcount', value: loading ? '…' : stats.employees, icon: Users, color: 'var(--success)' },
                                ].map(({ label, value, icon: Icon, color }) => (
                                    <div key={label} className="stat-card">
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `rgba(${color === 'var(--success)' ? '16,185,129' : '99,102,241'},.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                            <Icon size={15} color={color} />
                                        </div>
                                        <p className="stat-card-value" style={{ fontSize: 22 }}>{value}</p>
                                        <p className="stat-card-label" style={{ marginTop: 3 }}>{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* City List */}
                            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Navigation size={15} color="var(--primary)" />
                                    <h3 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>Top Locations</h3>
                                </div>
                                <div style={{ padding: 8 }}>
                                    {loading
                                        ? [1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="shimmer-wrap" style={{ height: 36, borderRadius: 8, margin: 4 }} />
                                        ))
                                        : locations
                                            .sort((a, b) => b.employees.length - a.employees.length)
                                            .slice(0, 8)
                                            .map((loc, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, transition: 'background .15s' }}
                                                    onMouseOver={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <MapPin size={12} color="var(--primary)" />
                                                        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{loc.city}</span>
                                                    </div>
                                                    <span className="badge badge-primary" style={{ fontSize: 10 }}>{loc.employees.length}</span>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
                        style={{ gridColumn: 'span 1' }}>
                        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', height: '100%', minHeight: 420 }}>
                            {/* Map Header */}
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Globe size={16} color="var(--primary)" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Interactive Map</h2>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Click markers for details</p>
                                </div>
                            </div>
                            {loading ? (
                                <div className="shimmer-wrap" style={{ flex: 1, height: 'calc(100% - 60px)', minHeight: 360 }} />
                            ) : (
                                <MapContainer
                                    center={[37.8, -96]} zoom={4} zoomControl={false}
                                    style={{ height: '100%', minHeight: 360, width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://carto.com">CARTO</a>'
                                    />
                                    {locations.map((loc, i) => (
                                        <Marker key={i} position={loc.coords}>
                                            <Popup>
                                                <div style={{ padding: '4px 2px' }}>
                                                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#0f172a' }}>{loc.city}</p>
                                                    <p style={{ color: '#64748b', fontSize: 12 }}>{loc.employees.length} professional{loc.employees.length > 1 ? 's' : ''}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                    <ZoomControl position="bottomright" />
                                </MapContainer>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default CityMap;
