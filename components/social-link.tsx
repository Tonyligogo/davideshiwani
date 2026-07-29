// components/SocialLink.tsx
import React from 'react';

export interface SocialLinkProps {
  platform: string;
  icon?: string; // Passing the SVG as a node is cleaner than just a path string for full styling control
  url?: string;
  phone?: string; // Optional: for WhatsApp or calling
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  icon,
  url,
  phone,
}) => {
  // Determine the correct link destination
  let finalUrl = url || '#';
  
  if (platform.toLowerCase() === 'whatsapp' && phone) {
    // Strips out spaces, dashes, or parentheses from the phone number
    const cleanPhone = phone.replace(/\D/g, '');
    finalUrl = `https://wa.me/${cleanPhone}`;
  } else if (phone && !url) {
    finalUrl = `tel:${phone}`;
  }

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow or contact on ${platform}`}
      className='flex gap-2 items-center hover:text-[#0000ff] transition'
    >
      <div 
        className="h-8 w-8  flex items-center justify-center transition-transform duration-200 group-hover:scale-105 [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: icon || '' }} 
      />
      <span className="text-base font-medium">{platform}</span>
    </a>
  );
};

// Optional: A wrapper component to grid them layout-wise
export const SocialLinksContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  );
};