import { useEffect, useState } from "react";

const Scroll360Viewer = ({ folderPath, totalFrames }) => {
  const [frame, setFrame] = useState(1);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const section = document.getElementById("scroll-360-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY + rect.top;
      setStartY(scrollY);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < startY) {
        setFrame(1);
        return;
      }

      const maxScroll = totalFrames * 60;
      const effectiveScroll = Math.min(scrollTop - startY, maxScroll);
      const scrollFraction = effectiveScroll / maxScroll;

      const currentFrame = Math.min(
        totalFrames,
        Math.max(1, Math.floor(scrollFraction * totalFrames))
      );

      setFrame(currentFrame);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startY, totalFrames]);

  return (
    <section
      id="scroll-360-section"
      className="relative bg-yellow-50 transition-colors duration-500"
    >
      <div className="sticky top-0 z-10 min-h-[700px] flex flex-col justify-center items-center">
        <img
          src={`${folderPath}/frame${frame}.jpg`}
          alt={`frame ${frame}`}
          className="w-[600px] h-[600px] object-contain rounded-xl shadow-lg"
        />
      </div>

      {/* Scroll alanını dinamik olarak frame sayısına göre ayarla */}
      <div style={{ height: `${totalFrames * 80}px` }} />
    </section>
  );
};

export default Scroll360Viewer;
