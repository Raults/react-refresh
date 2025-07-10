import React, { useRef, useState, useEffect } from 'react';

interface Clip {
  id: number;
  start: string;
  end: string;
  duration: string;
  thumbnail: string;
}

const MAX_CLIPS = 3;

export default function ClipAndShipDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [clips, setClips] = useState<Clip[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSaveClip = async () => {
    if (endTime <= startTime) return alert("End time must be after start time.");
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTimeBackup = video.currentTime;
    const wasPaused = video.paused;
    const captureTime = (startTime + endTime) / 2;

    const thumbnail = await new Promise<string>((resolve) => {
      const tempVideo = document.createElement('video');
      tempVideo.src = video.currentSrc;
      tempVideo.crossOrigin = 'anonymous';
      tempVideo.muted = true;
      tempVideo.currentTime = captureTime;

      const onSeeked = () => {
        try {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL('image/jpeg');
          resolve(dataURL);
        } catch (e) {
          resolve('');
        }
      };

      tempVideo.addEventListener('seeked', onSeeked);
    });

    const newClip: Clip = {
      id: Date.now(),
      start: startTime.toFixed(2),
      end: endTime.toFixed(2),
      duration: (endTime - startTime).toFixed(2),
      thumbnail,
    };

    setClips((prev) => [newClip, ...prev.slice(0, MAX_CLIPS - 1)]);
    setShowSnackbar(true);
  };

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleSetStart = () => {
    if (videoRef.current) setStartTime(videoRef.current.currentTime);
  };

  const handleSetEnd = () => {
    if (videoRef.current) setEndTime(videoRef.current.currentTime);
  };

  const handleReplayClip = (start: number, end: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = start;
    video.play();

    const stopPlayback = () => {
      if (video.currentTime >= end) {
        video.pause();
        video.removeEventListener('timeupdate', stopPlayback);
      }
    };

    video.addEventListener('timeupdate', stopPlayback);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-900 text-white h-[700px] rounded-xl">
      <div className="w-full relative">
        <video
          ref={videoRef}
          controls
          crossOrigin="anonymous"
          className="w-full rounded-xl border border-gray-700"
        >
          <source src="/videos/flower.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <canvas ref={canvasRef} width={160} height={90} className="hidden" />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSetStart}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer"
          >
            Set Start
          </button>
          <button
            onClick={handleSetEnd}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded cursor-pointer"
          >
            Set End
          </button>
          <button
            onClick={handleSaveClip}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded cursor-pointer"
          >
            Save Clip
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Start: {startTime.toFixed(2)}s | End: {endTime.toFixed(2)}s | Duration: {(endTime - startTime).toFixed(2)}s
        </p>
        {showSnackbar && (
          <div className="absolute bottom-2 right-2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            ✅ Clip saved!
          </div>
        )}
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold mb-2">Recent Clips</h2>
        <div className="flex flex-wrap gap-3 transition-all duration-300">
          {clips.length === 0 && (
            <p className="text-gray-500">No clips yet.</p>
          )}
          {clips.map((clip) => (
            <div
              key={clip.id}
              title={`Start: ${clip.start}s | End: ${clip.end}s | Duration: ${clip.duration}s`}
              className="border border-gray-700 p-2 rounded bg-gray-800 hover:bg-gray-700 transition-opacity duration-500 animate-fadeIn cursor-pointer"
              onClick={() => handleReplayClip(parseFloat(clip.start), parseFloat(clip.end))}
            >
              <img src={clip.thumbnail} alt="thumbnail" className="w-40 h-auto mb-1 rounded" />
              <div className="text-sm text-center">
                ⏱️ {clip.start}s → {clip.end}s<br />({clip.duration}s)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
