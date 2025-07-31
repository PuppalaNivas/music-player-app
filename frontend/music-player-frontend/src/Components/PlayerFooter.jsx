import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRedo, FaHeart } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';
import '../CSS files/PlayerFooter.css';

const PlayerFooter = () => {
  const {
    currentSong, playNext, playPrev,
    favorites, addToFavorites, removeFromFavorites
  } = usePlayer();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isFav = currentSong && favorites.some(fav => fav.songId === currentSong.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong && audio) {
      audio.src = currentSong.url;
      audio.load();
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.error('Play error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = !isLoop;
    setIsLoop(!isLoop);
  };

  const toggleFav = () => {
    if (!currentSong) return;
    isFav ? removeFromFavorites(currentSong.id) : addToFavorites(currentSong);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const onEnded = () => {
    if (!isLoop) {
      setIsPlaying(false);
      playNext();
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    const width = e.target.clientWidth;
    const offset = e.nativeEvent.offsetX;
    if (!audio || !audio.duration) return;
    audio.currentTime = (offset / width) * audio.duration;
  };

  const formatTime = (time = 0) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <footer className="player-footer">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} />

      {currentSong && (
        <>
          <div className="song-info">
            <img src={currentSong.image} alt={currentSong.songName} className="song-image" />
            <div className="details">
              <p className="song-name">{currentSong.songName}</p>
              <p className="artist-name">{currentSong.artist}</p>
              <p className="movie-name">{currentSong.movieName}</p>
            </div>
          </div>

          <div className="footer-center">
            <div className="controls">
              <button onClick={playPrev}><FaStepBackward /></button>
              <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={playNext}><FaStepForward /></button>
              <button onClick={toggleLoop}><FaRedo className={isLoop ? 'loop-active' : ''} /></button>
              <button onClick={toggleFav}><FaHeart color={isFav ? 'red' : 'gray'} /></button>
            </div>

            <div className="progress-container" onClick={seek}>
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="time-info">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default PlayerFooter;
