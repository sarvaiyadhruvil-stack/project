import { useReducer, Suspense } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import ControlsPanel from '../components/sections/dashboard/ControlsPanel';
import RoomVisualization from '../components/sections/dashboard/RoomVisualization';
import EnergyMonitor from '../components/sections/dashboard/EnergyMonitor';

const initialState = {
  livingRoom: { lights: true, tv: false, acTemp: 24, brightness: 80 },
  bedroom: { lights: false, fan: true, acTemp: 22 },
  security: { lock: true, sensors: true, cameras: false },
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          [action.device]: !state[action.room][action.device],
        },
      };
    case 'SET_VALUE':
      return {
        ...state,
        [action.room]: {
          ...state[action.room],
          [action.device]: action.value,
        },
      };
    default:
      return state;
  }
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <motion.main
      className="pt-24 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SectionHeading eyebrow="LIVE DEMO" title="Smart Home Control Center." />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
        {/* Controls */}
        <div className="md:col-span-2 order-2 md:order-1">
          <ControlsPanel state={state} dispatch={dispatch} />
        </div>

        {/* Visualization */}
        <div className="md:col-span-3 order-1 md:order-2">
          <Suspense fallback={<div className="glass-card animate-pulse h-[400px] rounded-xl" />}>
            <RoomVisualization state={state} />
          </Suspense>
          <EnergyMonitor />
        </div>
      </div>
    </motion.main>
  );
}
