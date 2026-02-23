import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
    return (
        <div className="glass-card p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl skeleton" />
                <div className="w-16 h-5 rounded skeleton" />
            </div>

            <div className="mb-6 space-y-2">
                <div className="w-2/3 h-6 rounded skeleton" />
                <div className="w-1/3 h-4 rounded skeleton" />
            </div>

            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-50">
                <div className="space-y-2">
                    <div className="w-12 h-2 rounded skeleton opacity-50" />
                    <div className="w-16 h-4 rounded skeleton" />
                </div>
                <div className="space-y-2 flex flex-col items-end">
                    <div className="w-12 h-2 rounded skeleton opacity-50" />
                    <div className="w-16 h-4 rounded skeleton" />
                </div>
            </div>

            <div className="mt-4 w-24 h-3 rounded skeleton opacity-30" />
        </div>
    );
};

const SkeletonCards = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                    <SkeletonCard />
                </motion.div>
            ))}
        </div>
    );
};

export default SkeletonCards;
