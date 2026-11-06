import { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayer.css';
import soulfulAudio from '../../experience/audio/SoulfulAudioEngine';
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
  FiVolumeX,
  FiMaximize2,
  FiMinimize2,
  FiList
} from 'react-icons/fi';

// Community-shared recordings plus royalty-free tracks and an original browser synth.
const AUDIO_TRACKS = [
  {
    id: 'soulful-piano',
    title: 'Meekness (Soulful Piano Ambient)',
    artist: 'Kai Engel',
    genre: 'Soulful Neoclassical Piano',
    duration: '3:15',
    src: '/audio/soulful-piano-ambient.ogg',
    credit: 'Kai Engel - Meekness (from Sustains album)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kai_Engel_-_02_-_Meekness.ogg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  },
  {
    id: 'soulful-flow',
    title: 'Placid Meditative Flow',
    artist: 'MusicLFiles',
    genre: 'Peaceful Ambient Chords',
    duration: '2:50',
    src: '/audio/soulful-flow.ogg',
    credit: 'Placid Ambient by MusicLFiles',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Placid_Ambient_by_MusicLFiles.ogg',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  },
  {
    id: 'soulful-kashmir-ambient',
    title: 'Soulful Kashmiri Ambient & Santoor',
    artist: 'Farman Studio · Procedural Meditation',
    genre: 'Soulful Ambient · Kashmiri Chords',
    duration: 'Infinite',
    src: '',
    credit: 'Generative soulful modal synthesizer with santoor chimes and warm Rhodes pads',
    license: 'Original generative audio',
    isProcedural: true
  },
  {
    id: 'urdu-sare-jahan',
    title: 'Saare Jahan Se Achha',
    artist: 'Instrumental · Mvkulkarni23',
    genre: 'Urdu · Patriotic melody',
    duration: '0:30',
    src: '/audio/sare-jahan-urdu.ogg',
    credit: 'Sare Jahan Se Acha - Music by Mvkulkarni23',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sare_Jahan_Se_Acha_-_Music.ogg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  {
    id: 'persian-folk',
    title: 'Popular Song (1931)',
    artist: 'Traditional Persian music · archive recording',
    genre: 'Persian · Traditional',
    duration: '3:37',
    src: '/audio/persian-folk-1931.ogg',
    credit: 'Traditional Persian recording, from Musik des Orients (1931)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Popular_song_(1931).ogg',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/'
  },
  {
    id: 'deep-ambient',
    title: 'Deep Focus Ambient Flow',
    artist: 'Kashmir Audio Studio',
    genre: 'Ambient Relax',
    duration: '3:30',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    credit: 'Pixabay audio contributor',
    sourceUrl: 'https://pixabay.com/music/',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    fallbackProcedural: true
  },
  {
    id: 'lofi-study',
    title: 'Midnight Coding Lo-Fi',
    artist: 'Chillhop Beats',
    genre: 'Lo-Fi Chill',
    duration: '2:45',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    credit: 'Pixabay audio contributor',
    sourceUrl: 'https://pixabay.com/music/',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    fallbackProcedural: true
  },
  {
    id: 'synthwave-pulse',
    title: 'Cyberpunk Synth Drift',
    artist: 'Neon Wave Lab',
    genre: 'Synthwave',
    duration: '3:12',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3',
    credit: 'Pixabay audio contributor',
    sourceUrl: 'https://pixabay.com/music/',
    license: 'Pixabay Content License',
    licenseUrl: 'https://pixabay.com/service/license-summary/',
    fallbackProcedural: true
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('portfolio_audio_volume');
    return saved !== null ? parseFloat(saved) : 0.65;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isProceduralActiveRef = useRef(false);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
    soulfulAudio.setVolume(isMuted ? 0 : volume * 0.75);
  }, [isMuted, volume]);

  // Helper to start procedural soulful synthesizer
  const startProceduralSynth = useCallback(() => {
    if (isProceduralActiveRef.current) return;
    isProceduralActiveRef.current = true;
    soulfulAudio.setVolume(isMuted ? 0 : volume * 0.75);
    soulfulAudio.start();
  }, [volume, isMuted]);

  const stopProceduralSynth = useCallback(() => {
    isProceduralActiveRef.current = false;
    soulfulAudio.stop();
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopProceduralSynth();
      setIsPlaying(false);
    } else {
      if (currentTrack.isProcedural || !currentTrack.src) {
        startProceduralSynth();
        setIsPlaying(true);
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If external audio is blocked, seamlessly start procedural synthesizer
              startProceduralSynth();
              setIsPlaying(true);
            });
        }
      }
    }
  };

  // Next / Previous Track
  const changeTrack = useCallback((newIndex) => {
    stopProceduralSynth();
    setCurrentTrackIndex(newIndex);
    setCurrentTime(0);

    const nextTrack = AUDIO_TRACKS[newIndex];
    if (nextTrack.isProcedural || !nextTrack.src) {
      if (audioRef.current) audioRef.current.pause();
      if (isPlaying) startProceduralSynth();
    } else if (audioRef.current) {
      audioRef.current.src = nextTrack.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => startProceduralSynth());
      }
    }
  }, [isPlaying, startProceduralSynth, stopProceduralSynth]);

  const handleNextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % AUDIO_TRACKS.length;
    changeTrack(nextIdx);
  }, [currentTrackIndex, changeTrack]);

  const handlePrevTrack = useCallback(() => {
    const prevIdx = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    changeTrack(prevIdx);
  }, [currentTrackIndex, changeTrack]);

  // Volume Change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    localStorage.setItem('portfolio_audio_volume', newVol.toString());
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  // Mute Toggle
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  // Seek bar
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current && !currentTrack.isProcedural) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Time & Duration updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 165);
    const onEnded = () => handleNextTrack();
    const onError = () => {
      // Seamlessly fall back to procedural ambient synthesizer on network error
      if (isPlaying) startProceduralSynth();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [handleNextTrack, isPlaying, startProceduralSynth]);

  // Audio Visualizer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const renderVisualizer = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 24;
      const barWidth = canvas.width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;
        if (isPlaying) {
          const wave = Math.sin(frame * 0.12 + i * 0.45) * 0.5 + 0.5;
          const noise = Math.cos(frame * 0.08 + i * 0.9) * 0.4 + 0.4;
          barHeight = 4 + (wave * noise * 0.8 + 0.2) * (canvas.height - 8);
        }

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#f76707');
        gradient.addColorStop(0.5, '#ffa94d');
        gradient.addColorStop(1, '#ffc078');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;
        ctx.roundRect ? ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]) : ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`music-player-container ${isExpanded ? 'is-expanded' : ''}`}>
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
      />

      {/* Expanded Studio View */}
      {isExpanded && (
        <div className="music-player-window">
          {/* Header */}
          <div className="player-window-header">
            <div className="player-badge">
              <span className="live-indicator-dot" />
              <span>OPEN MUSIC &amp; AMBIENCE</span>
            </div>
            <div className="player-header-actions">
              <button
                type="button"
                className={`player-icon-btn ${showPlaylist ? 'active' : ''}`}
                onClick={() => setShowPlaylist(!showPlaylist)}
                title="Playlist tracks"
              >
                <FiList size={16} />
              </button>
              <button
                type="button"
                className="player-icon-btn"
                onClick={() => setIsExpanded(false)}
                title="Minimize player"
              >
                <FiMinimize2 size={16} />
              </button>
            </div>
          </div>

          {/* Visualizer Canvas & Track Info */}
          <div className="player-main-display">
            <div className="player-visualizer-box">
              <canvas
                ref={canvasRef}
                className="player-visualizer-canvas"
                width={260}
                height={55}
              />
            </div>

            <div className="player-meta-box">
              <div className="player-disc-spin-large">
                <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                  <div className="vinyl-grooves" />
                  <div className="vinyl-center-dot" />
                </div>
              </div>
              <div className="player-text-details">
                <h4 className="player-track-title">{currentTrack.title}</h4>
                <p className="player-track-artist">{currentTrack.artist} • <span className="player-genre-badge">{currentTrack.genre}</span></p>
                {currentTrack.sourceUrl ? (
                  <span className="player-license-tag">
                    <a href={currentTrack.sourceUrl} target="_blank" rel="noopener noreferrer">{currentTrack.credit}</a>
                    {' · '}
                    <a href={currentTrack.licenseUrl} target="_blank" rel="noopener noreferrer">{currentTrack.license}</a>
                  </span>
                ) : (
                  <span className="player-license-tag">{currentTrack.license}</span>
                )}
              </div>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="player-scrubber-section">
            <span className="player-time-label">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeek}
              className="player-seek-slider"
              disabled={currentTrack.isProcedural}
            />
            <span className="player-time-label">{currentTrack.isProcedural ? '∞' : formatTime(duration)}</span>
          </div>

          {/* Controls: Prev, Play/Pause, Next, Volume */}
          <div className="player-controls-row">
            <div className="player-track-buttons">
              <button
                type="button"
                className="player-btn-secondary"
                onClick={handlePrevTrack}
                title="Previous track"
              >
                <FiSkipBack size={18} />
              </button>
              <button
                type="button"
                className="player-btn-play"
                onClick={togglePlay}
                title={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <button
                type="button"
                className="player-btn-secondary"
                onClick={handleNextTrack}
                title="Next track"
              >
                <FiSkipForward size={18} />
              </button>
            </div>

            <div className="player-volume-control">
              <button
                type="button"
                className="player-volume-icon-btn"
                onClick={toggleMute}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="player-volume-slider"
              />
            </div>
          </div>

          {/* Playlist Drawer */}
          {showPlaylist && (
            <div className="player-playlist-drawer">
              <div className="playlist-drawer-header">
                <span>Urdu · Persian · Focus ({AUDIO_TRACKS.length})</span>
              </div>
              <div className="playlist-items-list">
                {AUDIO_TRACKS.map((track, idx) => (
                  <div
                    key={track.id}
                    className={`playlist-item ${idx === currentTrackIndex ? 'is-active' : ''}`}
                  >
                    <button type="button" className="playlist-item-select" onClick={() => changeTrack(idx)}>
                      <div className="playlist-item-left">
                        <span className="playlist-item-num">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="playlist-item-info">
                          <span className="playlist-item-title">{track.title}</span>
                          <span className="playlist-item-artist">{track.artist}</span>
                        </div>
                      </div>
                      <span className="playlist-item-genre">{track.genre}</span>
                    </button>
                    {track.sourceUrl && (
                      <a className="playlist-item-credit" href={track.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {track.license} · credits
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Pill Mini Player (Minimized State) */}
      {!isExpanded && (
        <div className="music-player-mini">
          {/* Vinyl mini disc */}
          <button 
            type="button" 
            className="mini-vinyl-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause audio" : "Play free music"}
          >
            <div className={`mini-vinyl ${isPlaying ? 'spinning' : ''}`}>
              <div className="mini-vinyl-grooves" />
              <div className="mini-vinyl-center">
                {isPlaying ? <FiPause size={12} /> : <FiPlay size={12} style={{ marginLeft: '1px' }} />}
              </div>
            </div>
          </button>

          {/* Song info & live equalizer */}
          <div className="mini-info-wrapper" onClick={() => setIsExpanded(true)}>
            <div className="mini-song-meta">
              <span className="mini-song-title">{currentTrack.title}</span>
              <span className="mini-song-genre">{currentTrack.genre}</span>
            </div>

            {/* Dynamic CSS Equalizer bars */}
            <div className={`mini-equalizer ${isPlaying ? 'active' : ''}`}>
              <span className="eq-bar eq-1" />
              <span className="eq-bar eq-2" />
              <span className="eq-bar eq-3" />
              <span className="eq-bar eq-4" />
            </div>
          </div>

          {/* Expand to studio button */}
          <button
            type="button"
            className="mini-expand-btn"
            onClick={() => setIsExpanded(true)}
            title="Open audio studio"
          >
            <FiMaximize2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
