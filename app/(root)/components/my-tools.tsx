'use client'

// Mock data for the designer's tools
// Replace these placeholders with your actual SVG icons or image paths
const SKILLS = [
  { name: 'Figma', color: 'rgba(242, 78, 30, 0.15)', borderColor: '#F24E1E', top: '15%', left: '25%', size: 'w-24 h-24 md:w-28 md:h-28' },
  { name: 'Illustrator', color: 'rgba(255, 154, 0, 0.15)', borderColor: '#FF9A00', top: '35%', left: '40%', size: 'w-28 h-28 md:w-32 md:h-32' },
  { name: 'Photoshop', color: 'rgba(49, 197, 244, 0.15)', borderColor: '#31C5F4', top: '20%', left: '55%', size: 'w-24 h-24 md:w-26 md:h-26' },
  { name: 'Webflow', color: 'rgba(67, 83, 255, 0.15)', borderColor: '#4353FF', top: '18%', left: '75%', size: 'w-26 h-26 md:w-28 md:h-28' },
  { name: 'Framer', color: 'rgba(0, 85, 255, 0.15)', borderColor: '#0055FF', top: '45%', left: '85%', size: 'w-24 h-24 md:w-26 md:h-26' },
  { name: 'Protopie', color: 'rgba(74, 222, 128, 0.15)', borderColor: '#4ADE80', top: '60%', left: '70%', size: 'w-28 h-28 md:w-32 md:h-32' },
  { name: 'Sketch', color: 'rgba(253, 186, 116, 0.15)', borderColor: '#FDBA74', top: '75%', left: '58%', size: 'w-26 h-26 md:w-28 md:h-28' },
  { name: 'After Effects', color: 'rgba(153, 102, 255, 0.15)', borderColor: '#9966FF', top: '65%', left: '42%', size: 'w-24 h-24 md:w-26 md:h-26' },
  { name: 'Miro', color: 'rgba(255, 215, 0, 0.15)', borderColor: '#FFD700', top: '78%', left: '28%', size: 'w-24 h-24 md:w-26 md:h-26' },
  { name: 'Notion', color: 'rgba(255, 255, 255, 0.1)', borderColor: '#FFFFFF', top: '62%', left: '10%', size: 'w-24 h-24 md:w-26 md:h-26' },
  { name: 'Maze', color: 'rgba(59, 130, 246, 0.15)', borderColor: '#3B82F6', top: '40%', left: '15%', size: 'w-22 h-22 md:w-24 md:h-24' },
];

export default function MyToolsSection() {
  return (
    <section className="relative text-white min-h-[900px] w-full overflow-hidden py-20 flex flex-col items-center">
      

      {/* Interactive Floating Skills Board */}
      <div className="absolute inset-0 w-full h-full z-10 hidden sm:block">
        {SKILLS.map((skill, index) => (
          <div
            key={skill.name}
            className={`absolute flex animation: var(--animate-float) flex-col items-center justify-center transition-transform duration-300 hover:scale-110 group cursor-pointer`}
            style={{
              top: skill.top,
              left: skill.left,
              // Adds a delayed CSS custom property for staggered floating animations if you choose to add keyframes
              animation: `float 6s ease-in-out infinite ${index * 0.4}s`
            }}
          >
            {/* The Orb / Ball Container */}
            <div 
              className={`${skill.size} rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl border transition-all duration-300`}
              style={{ 
                backgroundColor: skill.color,
                borderColor: `${skill.borderColor}40`, // 40 adds transparency to the border
                boxShadow: `0 0 25px ${skill.borderColor}20, inset 0 0 15px ${skill.borderColor}20`
              }}
            >
              {/* Icon Placeholder */}
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: skill.borderColor }}
              >
                {skill.name.substring(0, 2)}
              </div>
            </div>
            
            {/* Tool Label underneath bubble */}
            <span className="mt-2 text-xs md:text-sm font-medium text-slate-400 group-hover:text-white transition-colors duration-200">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile-Friendly Fallback Layout (Standard Grid for small viewports) */}
      <div className="relative z-10 sm:hidden grid grid-cols-3 gap-6 px-6 w-full max-w-md">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center text-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center border"
              style={{ 
                backgroundColor: skill.color, 
                borderColor: `${skill.borderColor}40` 
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: skill.borderColor }}
              >
                {skill.name.substring(0, 2)}
              </div>
            </div>
            <span className="mt-2 text-xs text-slate-400">{skill.name}</span>
          </div>
        ))}
      </div>      
    </section>
  );
}