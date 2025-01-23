import React, { useState, useEffect } from 'react';
import { Clock, Palette, Play, Pause, RotateCcw } from 'lucide-react';

const colorPalettes = {
  sunset: {
    background: 'bg-gradient-to-br from-[#EBEF95] to-[#EF9595]',
    text: 'text-gray-900'
  },
  ocean: {
    background: 'bg-gradient-to-br from-[#BDCDD6] to-[#6096B4]',
    text: 'text-gray-900'
  },
  forest: {
    background: 'bg-gradient-to-br from-[#D3F1DF] to-[#658147]',
    text: 'text-gray-900'
  },
  twilight: {
    background: 'bg-gradient-to-br from-[#EFB6C8] to-[#8174A0]',
    text: 'text-gray-900'
  }
};

const timePresets = [
  { label: '5 min', value: 5 },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 }
];

const MeditationTimer = () => {
  const [selectedPalette, setSelectedPalette] = useState('sunset');
  const [timeInMinutes, setTimeInMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(timeInMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timeInMinutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimePresetClick = (minutes) => {
    setIsCustom(false);
    setTimeInMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setCustomTime('');
  };

  const handleCustomTimeSubmit = (e) => {
    e.preventDefault();
    const customMinutes = parseInt(customTime);
    if (customMinutes > 0 && customMinutes <= 180) {  // Max 3 hours
      setIsCustom(true);
      setTimeInMinutes(customMinutes);
      setTimeLeft(customMinutes * 60);
      setIsRunning(false);
    }
  };

  return (
    <div className={`min-h-screen ${colorPalettes[selectedPalette].background} flex flex-col items-center justify-center p-8`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-md w-full">
        <h1 className={`text-3xl font-bold mb-8 text-center ${colorPalettes[selectedPalette].text}`}>
          Meditation Timer
        </h1>

        {/* Color Palette Selection */}
        <div className="mb-8 text-gray-900">
          <div className="flex items-center gap-2 mb-4 ">
            <Palette size={20} />
            <h2 className="text-lg font-semibold text-gray-900 ">Theme</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 ">
            {Object.keys(colorPalettes).map((palette) => (
              <button
                key={palette}
                onClick={() => setSelectedPalette(palette)}
                className={`p-3 rounded-lg text-sm capitalize ${
                  selectedPalette === palette
                    ? 'ring-2 ring-offset-2 ring-blue-500'
                    : ''
                } ${colorPalettes[palette].background}`}
              >
                {palette}
              </button>
            ))}
          </div>
        </div>

        {/* Time Presets and Custom Time */}
        <div className="mb-8 text-gray-900">
          <div className="flex items-center gap-2 mb-4 ">
            <Clock size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Duration</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {timePresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleTimePresetClick(preset.value)}
                className={`p-3 rounded-lg text-sm ${
                  timeInMinutes === preset.value && !isCustom
                    ? 'bg-[#F2827F] text-white'
                    : 'bg-[#F2827F] text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Custom Time Input */}
          <form onSubmit={handleCustomTimeSubmit} className="flex gap-2 text-gray-100">
            <input
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              placeholder="Custom minutes"
              min="1"
              max="180"
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className={`p-3 rounded-lg ${
                isCustom
                  ? 'bg-[#F2827F] text-white'
                  : 'bg-[#F2827F] text-white'
              }`}
            >
              Set
            </button>
          </form>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8 ">
          <div className="text-6xl font-mono font-bold text-gray-900 mb-8">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleTimer}
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;