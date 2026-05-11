import ToggleSwitch from '../../ui/ToggleSwitch';

export default function ControlsPanel({ state, dispatch }) {
  return (
    <div className="glass-card p-6 md:p-8 md:sticky md:top-24 space-y-8">
      {/* Living Room */}
      <div>
        <p className="font-mono text-accent text-xs tracking-wider mb-4">LIVING ROOM</p>
        <div className="space-y-4">
          <ToggleSwitch label="Lights" on={state.livingRoom.lights} onToggle={() => dispatch({ type: 'TOGGLE', room: 'livingRoom', device: 'lights' })} />
          <ToggleSwitch label="TV" on={state.livingRoom.tv} onToggle={() => dispatch({ type: 'TOGGLE', room: 'livingRoom', device: 'tv' })} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text text-sm font-medium">AC Temperature</span>
              <span className="text-accent font-mono text-sm">{state.livingRoom.acTemp}°C</span>
            </div>
            <input type="range" min={18} max={30} value={state.livingRoom.acTemp} onChange={e => dispatch({ type: 'SET_VALUE', room: 'livingRoom', device: 'acTemp', value: Number(e.target.value) })} className="w-full" style={{ accentColor: '#00C8FF' }} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text text-sm font-medium">Brightness</span>
              <span className="text-accent font-mono text-sm">{state.livingRoom.brightness}%</span>
            </div>
            <input type="range" min={0} max={100} value={state.livingRoom.brightness} onChange={e => dispatch({ type: 'SET_VALUE', room: 'livingRoom', device: 'brightness', value: Number(e.target.value) })} className="w-full" style={{ accentColor: '#00C8FF' }} />
          </div>
        </div>
      </div>

      {/* Bedroom */}
      <div>
        <p className="font-mono text-accent text-xs tracking-wider mb-4">BEDROOM</p>
        <div className="space-y-4">
          <ToggleSwitch label="Lights" on={state.bedroom.lights} onToggle={() => dispatch({ type: 'TOGGLE', room: 'bedroom', device: 'lights' })} />
          <ToggleSwitch label="Fan" on={state.bedroom.fan} onToggle={() => dispatch({ type: 'TOGGLE', room: 'bedroom', device: 'fan' })} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-text text-sm font-medium">AC Temperature</span>
              <span className="text-accent font-mono text-sm">{state.bedroom.acTemp}°C</span>
            </div>
            <input type="range" min={18} max={30} value={state.bedroom.acTemp} onChange={e => dispatch({ type: 'SET_VALUE', room: 'bedroom', device: 'acTemp', value: Number(e.target.value) })} className="w-full" style={{ accentColor: '#00C8FF' }} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div>
        <p className="font-mono text-accent text-xs tracking-wider mb-4">SECURITY</p>
        <div className="space-y-4">
          <ToggleSwitch label="Door Lock" on={state.security.lock} onToggle={() => dispatch({ type: 'TOGGLE', room: 'security', device: 'lock' })} />
          <ToggleSwitch label="Sensors" on={state.security.sensors} onToggle={() => dispatch({ type: 'TOGGLE', room: 'security', device: 'sensors' })} />
          <ToggleSwitch label="Cameras" on={state.security.cameras} onToggle={() => dispatch({ type: 'TOGGLE', room: 'security', device: 'cameras' })} />
        </div>
      </div>
    </div>
  );
}
