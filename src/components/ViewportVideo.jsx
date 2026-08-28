import { useEffect, useRef } from 'react';

const ViewportVideo = ({ src, poster, className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const playWhenVisible = (entries) => {
      if (entries[0]?.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(playWhenVisible, { threshold: 0.35 });

    if (observer) {
      observer.observe(video);
    } else {
      video.play().catch(() => {});
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <video ref={videoRef} className={className} autoPlay muted loop controls playsInline preload="metadata" poster={poster}>
      <source src={src} type="video/mp4" />
      Browser Anda tidak mendukung pemutaran video.
    </video>
  );
};

export default ViewportVideo;
