import { useEffect, useRef, useState } from "react";

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    "/lovable-uploads/87292a28-bca1-43b2-b882-4c826f91cde0.png",
    "/lovable-uploads/d9f3d167-b920-4172-aba7-88337a7fab17.png",
    "/lovable-uploads/d7b290fb-1f28-4157-9650-6780abaa691b.png",
    "/lovable-uploads/ba7a85cc-49f6-4d8f-86eb-ae7a5ac35455.png",
    "/lovable-uploads/11fdb1f6-a63f-44e5-82eb-971a84a8f304.png",
    "/lovable-uploads/624c10cf-5fd0-4d78-a9f2-61e30c4e3f01.png",
    "/lovable-uploads/5b138093-77f6-4926-a324-9c8db45759bb.png",
    "/lovable-uploads/55424e14-da8f-43a5-b556-f36da0467f00.png",
    "/lovable-uploads/168d2f2a-e6dd-495f-9ca9-0649a4e4029e.png",
    "/lovable-uploads/14752e47-5a72-4ade-80e3-424a92d24909.png"
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-primary/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Capturing moments of innovation, collaboration, and entrepreneurial spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`aspect-square rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 50}ms` }}
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;