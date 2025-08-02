import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleTeam = (index: number) => {
    setExpandedTeams(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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

  const teamCategories = [
    {
      name: "Strategic Core",
      image: "/lovable-uploads/c61e204f-0d53-4555-b497-fac8917e4180.png"
    },
    {
      name: "Technical Team",
      image: "/lovable-uploads/d98f8a21-d865-4320-a054-995f05362825.png"
    },
    {
      name: "Design Team",
      image: "/lovable-uploads/ed2dd08c-33fd-4927-b2d2-0bcc9c5da8ce.png"
    },
    {
      name: "Social Media Team",
      image: "/lovable-uploads/96d8fda2-03c0-4dfa-be6a-cb5a538b5d2d.png"
    },
    {
      name: "Marketing Team",
      image: "/lovable-uploads/daa0d4dd-844a-4d69-869c-393b6e3e541c.png"
    }
  ];

  return (
    <section id="team" ref={sectionRef} className="py-20 bg-card relative overflow-hidden">
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
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Get to know the passionate individuals driving innovation and entrepreneurship at SMEC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-background/80 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-foreground mb-4">{category.name}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTeam(index)}
                  className="w-full flex items-center justify-center"
                >
                  View Team
                  {expandedTeams.includes(index) ? (
                    <ChevronUp className="ml-2 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-2 w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ${
                expandedTeams.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="mt-4">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;