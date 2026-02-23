import React from 'react';

const SkeletonCard = () => (
    <div style={{
        background: 'white',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
    }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="shimmer-wrap" style={{ width: 44, height: 44, borderRadius: 12 }} />
            <div className="shimmer-wrap" style={{ width: 40, height: 20, borderRadius: 6 }} />
        </div>
        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="shimmer-wrap" style={{ height: 16, borderRadius: 6 }} />
            <div className="shimmer-wrap" style={{ height: 13, width: '65%', borderRadius: 6 }} />
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />
        {/* Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="shimmer-wrap" style={{ height: 12, width: 80, borderRadius: 6 }} />
            <div className="shimmer-wrap" style={{ height: 12, width: 70, borderRadius: 6 }} />
        </div>
        {/* CTA */}
        <div className="shimmer-wrap" style={{ height: 12, width: 90, borderRadius: 6 }} />
    </div>
);

const SkeletonCards = ({ count = 9 }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16
    }}>
        {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);

export default SkeletonCards;
