import React from 'react';
import { Block, UserProfile } from '../types';
import { cn } from '../lib/utils';
import { Twitter, Github, Linkedin, Instagram, Youtube, Mail, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface BentoGridProps {
  profile: UserProfile;
  isEditable?: boolean;
  onBlockClick?: (block: Block) => void;
}

export default function BentoGrid({ profile, isEditable, onBlockClick }: BentoGridProps) {
  return (
    <div className={cn(
      "w-full max-w-3xl mx-auto p-4 sm:p-8 min-h-screen",
      profile.theme === 'dark' ? 'bg-black text-white' : 
      profile.theme === 'glass' ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white' : 
      'bg-[#f5f5f5] text-black'
    )}>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 pt-8">
        <img 
          src={profile.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
          alt={profile.name} 
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white/20 shadow-xl"
          referrerPolicy="no-referrer"
        />
        <h1 className="text-3xl font-bold tracking-tight mb-2">{profile.name}</h1>
        <p className="text-opacity-70 max-w-md mx-auto leading-relaxed" style={{ color: 'inherit', opacity: 0.7 }}>
          {profile.bio}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
        {profile.blocks.map((block) => (
          <BlockItem 
            key={block.id} 
            block={block} 
            isEditable={isEditable}
            onClick={() => onBlockClick?.(block)}
            theme={profile.theme}
          />
        ))}
      </div>

      {/* Branding */}
      <div className="mt-16 pb-8 text-center">
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: 'inherit' }}
        >
          <LayoutGridIcon className="w-4 h-4" />
          Powered by BentoLink
        </a>
      </div>
    </div>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function BlockItem({ block, isEditable, onClick, theme }: { block: Block, isEditable?: boolean, onClick?: () => void, theme: string }) {
  const sizeClasses = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-2 row-span-1',
    '2x2': 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
  };

  const isGlass = theme === 'glass';
  const baseClasses = cn(
    "relative rounded-3xl overflow-hidden transition-all duration-300",
    sizeClasses[block.size],
    isEditable ? "cursor-pointer hover:ring-2 hover:ring-indigo-500 hover:scale-[1.02]" : "hover:scale-[1.02]",
    isGlass ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl" : "shadow-sm border border-black/5"
  );

  const style = !isGlass ? {
    backgroundColor: block.bgColor || '#ffffff',
    color: block.textColor || '#000000',
  } : {};

  const content = () => {
    switch (block.type) {
      case 'social':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <SocialIcon name={block.icon || ''} className="w-8 h-8 mb-2" />
            {block.size !== '1x1' && <span className="font-semibold">{block.title}</span>}
          </div>
        );
      case 'link':
        return (
          <div className="flex items-center justify-between h-full w-full p-6">
            <span className="font-semibold text-lg">{block.title}</span>
            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRightIcon className="w-5 h-5" />
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="flex flex-col h-full w-full p-6">
            {block.title && <h3 className="font-bold text-xl mb-2">{block.title}</h3>}
            <p className="opacity-80 text-sm leading-relaxed overflow-hidden">{block.content}</p>
          </div>
        );
      case 'image':
        return (
          <div className="relative w-full h-full group">
            <img 
              src={block.imageUrl || 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80'} 
              alt={block.title || 'Image block'}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {block.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-semibold">{block.title}</span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (isEditable) {
    return (
      <div className={baseClasses} style={style} onClick={onClick}>
        {content()}
      </div>
    );
  }

  return (
    <a 
      href={block.url || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className={baseClasses}
      style={style}
    >
      {content()}
    </a>
  );
}

function SocialIcon({ name, className }: { name: string, className?: string }) {
  switch (name.toLowerCase()) {
    case 'twitter': return <Twitter className={className} />;
    case 'github': return <Github className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'youtube': return <Youtube className={className} />;
    case 'mail': return <Mail className={className} />;
    default: return <LinkIcon className={className} />;
  }
}

function ArrowUpRightIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
