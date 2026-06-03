import React from 'react';

// 1. Define your categorized portfolio items matrix
const CATEGORIZED_PROJECTS = [
  {
    id: "ui-ux",
    categoryTitle: "User Interface",
    accentLabel: "UI/UX Design",
    projects: [
      {
        title: "VegCurious Blog",
        description: "VEGCURIOUS is a blog website about vegetarian restaurants and food trends. The blog allows users to read about vegetarian meals and share experiences with fellow vegetarians.",
        logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100", // Replace with your VegCurious camera logo asset
        mockupLeft: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600", // Replace with full layout screens
        mockupRight: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600",
        link: "#"
      },
      {
        title: "Brand Identity Project",
        description: "Comprehensive corporate rebranding project showcasing modern vector layouts and typography scaling guides.",
        logo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=600",
        link: "#"
      },
      {
        title: "3D Kinetic Loop",
        description: "Explorations into structural loop dynamics, cloth simulations, and high-framerate commercial rendering passes.",
        logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600",
        link: "#"
      },
      {
        title: "Cinematic Cut",
        description: "Color grading work, audio spatial mixing, and fast-paced micro-narrative multi-cam tracking edits.",
        logo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
        link: "#"
      }
    ]
  },
  {
    id: "graphic-design",
    categoryTitle: "Graphic Art",
    accentLabel: "Graphic",
    projects: [
      {
        title: "VegCurious Blog",
        description: "VEGCURIOUS is a blog website about vegetarian restaurants and food trends. The blog allows users to read about vegetarian meals and share experiences with fellow vegetarians.",
        logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100", // Replace with your VegCurious camera logo asset
        mockupLeft: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600", // Replace with full layout screens
        mockupRight: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600",
        link: "#"
      },
      {
        title: "Brand Identity Project",
        description: "Comprehensive corporate rebranding project showcasing modern vector layouts and typography scaling guides.",
        logo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=600",
        link: "#"
      },
      {
        title: "3D Kinetic Loop",
        description: "Explorations into structural loop dynamics, cloth simulations, and high-framerate commercial rendering passes.",
        logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600",
        link: "#"
      },
      {
        title: "Cinematic Cut",
        description: "Color grading work, audio spatial mixing, and fast-paced micro-narrative multi-cam tracking edits.",
        logo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
        link: "#"
      }
    ]
  },
  {
    id: "animation",
    categoryTitle: "Motion Canvas",
    accentLabel: "Animation",
    projects: [
      {
        title: "3D Kinetic Loop",
        description: "Explorations into structural loop dynamics, cloth simulations, and high-framerate commercial rendering passes.",
        logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600",
        link: "#"
      }
    ]
  },
  {
    id: "editing",
    categoryTitle: "VFX & Timeline",
    accentLabel: "Video Editing",
    projects: [
      {
        title: "Cinematic Cut",
        description: "Color grading work, audio spatial mixing, and fast-paced micro-narrative multi-cam tracking edits.",
        logo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=100",
        mockupLeft: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600",
        mockupRight: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
        link: "#"
      }
    ]
  }
];

export default function ProjectsSection() {
  return (
    <div id="projects" className="w-full bg-black text-white selection:bg-blue-600 select-none relative">

       <div className=" flex flex-col justify-between p-4 md:p-12 font-sans opacity-20 font-extrabold tracking-widest text-[9rem] md:text-[14rem] leading-none pointer-events-none select-none z-0 ">
        <div className="text-transparent stroke-blue-600 [-webkit-text-stroke:2px_#2563eb] uppercase tracking-normal mx-auto">
          projects
        </div>
      </div>
      
      {/* Loop through each category wrapper block */}
      {CATEGORIZED_PROJECTS.map((cat) => (
        <section 
          key={cat.id} 
          className="relative w-full border-b border-neutral-900 flex flex-col lg:flex-row items-start"
        >
          
          {/* ================= STICKY LEFT SIDEBAR (TITLE CANVAS) ================= */}
          {/* This wrapper stays locked in view for the entire height of the category container */}
          <div className="w-full lg:w-[45%] h-screen lg:sticky lg:top-0 bg-black flex items-center justify-center overflow-hidden p-6 md:p-12 z-20">
            
            {/* The structural Category Title watermark background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full text-right pointer-events-none pr-4 md:pr-10">
              <h2 className="font-antagon text-[7rem] sm:text-[10rem] md:text-[13rem] leading-[0.85] uppercase tracking-normal text-transparent [-webkit-text-stroke:2px_#2563eb] opacity-80 whitespace-nowrap transform rotate-12 origin-right transition-transform duration-700">
                {cat.categoryTitle}
              </h2>
            </div>

            {/* Solid Section Signifier in Foreground */}
            <div className="absolute left-8 md:left-16 bottom-1/3 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-start z-10">
              <div className="flex items-baseline gap-1">
                <span className="font-antagon text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
                  {cat.accentLabel.split(" ")[0]}
                </span>
                {cat.accentLabel.split(" ")[1] && (
                  <span className="font-antagon text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white hidden sm:inline">
                    {cat.accentLabel.split(" ")[1]}
                  </span>
                )}
              </div>
              <span className="font-script text-4xl sm:text-5xl md:text-6xl text-blue-500 mt-[-10px] ml-6 tracking-wide drop-shadow-[0_4px_10px_rgba(37,99,235,0.3)]">
                Design
              </span>
            </div>

          </div>

          {/* ================= RIGHT SIDEBAR (PROJECT WORK FEED) ================= */}
          {/* Contains a vertical scroll block stack of projects corresponding to this specific track */}
          <div className="w-full lg:w-[55%] flex flex-col bg-black z-10">
            {cat.projects.map((project, idx) => (
              <div 
                key={idx} 
                className="w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 border-t border-neutral-950 lg:first:border-t-0"
              >
                
                {/* Project Header Row */}
                <div className="w-full flex items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    
                    {/* Embedded Accent Block Title */}
                    <div className="relative inline-block scale-90">
                      <div className="absolute inset-0 bg-blue-700 rounded-lg -skew-x-6 scale-y-105 scale-x-105 opacity-90 blur-[0.5px]" />
                      <span className="relative font-antagon text-xs tracking-widest text-white uppercase px-3 py-1 font-bold">
                        UI/UX Design
                      </span>
                    </div>

                    {/* Main Dynamic Headline */}
                    <h3 className="text-3xl sm:text-4xl font-light font-sans tracking-wide text-neutral-100">
                      -{project.title}
                    </h3>
                  </div>

                  {/* Brand Circular Logo Icon Box */}
                  {project.logo && (
                    <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-md">
                      <img src={project.logo} alt="Project Logo" className="w-full h-full object-contain brightness-110" />
                    </div>
                  )}
                </div>

                {/* Narrative Description Blocks */}
                <p className="text-neutral-400 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-12">
                  {project.description}
                </p>

                {/* Combined Presentation Layout Feed Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start max-w-4xl w-full">
                  
                  {/* Left Work Screen Layout Card */}
                  <div className="w-full aspect-[3/4] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 shadow-2xl relative group">
                    <img 
                      src={project.mockupLeft} 
                      alt={`${project.title} Showcase view`} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                    />
                  </div>

                  {/* Right Work Screen Layout Card + Interactive Link Button Stack */}
                  <div className="flex flex-col gap-8 w-full">
                    <div className="w-full aspect-[3/4] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 shadow-2xl relative group">
                      <img 
                        src={project.mockupRight} 
                        alt={`${project.title} Sub-view`} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                      />
                    </div>

                    {/* Interactive Hand-drawn Vector Callout Hook */}
                    <a 
                      href={project.link}
                      className="self-center flex items-center gap-4 group mt-4 text-neutral-400 hover:text-white transition-colors"
                    >
                      <span className="font-script text-2xl md:text-3xl tracking-wide group-hover:text-blue-500 transition-colors">
                        Check it out
                      </span>
                      
                      {/* Interactive chalk vector dynamic stroke */}
                      <div className="transform rotate-[105deg] translate-y-[-4px] scale-x-[-1] text-neutral-500 group-hover:text-blue-500 transition-colors">
                        <svg width="32" height="42" viewBox="0 0 46 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M40 2C15 2 2 18 2 36C2 50 14 58 36 58M36 58L26 48M36 58L28 62" />
                        </svg>
                      </div>
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </section>
      ))}

    </div>
  );
}