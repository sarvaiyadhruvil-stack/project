import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

function generateData() {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}`,
    usage: 1.8 + Math.random() * 1.2,
  }));
}

export default function EnergyMonitor() {
  const [data, setData] = useState(generateData);
  const [currentUsage, setCurrentUsage] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const newVal = 1.8 + Math.random() * 1.2;
        newData.push({ time: `${Date.now()}`, usage: newVal });
        setCurrentUsage(newVal);
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="text-accent w-5 h-5" />
          <span className="font-mono text-accent text-xs tracking-wider">ENERGY MONITOR</span>
        </div>
        <motion.span
          key={currentUsage.toFixed(1)}
          className="font-mono text-text text-sm"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Current: <span className="text-accent font-bold">{currentUsage.toFixed(1)} kW</span>
        </motion.span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C8FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00C8FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis domain={[1.5, 3.5]} hide />
          <Tooltip
            contentStyle={{ background: '#070F2B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#E8F0FF' }}
            labelStyle={{ display: 'none' }}
            formatter={(value) => [`${value.toFixed(2)} kW`, 'Usage']}
          />
          <Area type="monotone" dataKey="usage" stroke="#00C8FF" fill="url(#energyGradient)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
