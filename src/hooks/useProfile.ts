import { useState, useEffect } from 'react';
import { UserProfile, DEFAULT_PROFILE } from '../types';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bento_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('bento_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addBlock = (block: any) => {
    setProfile(prev => ({ ...prev, blocks: [...prev.blocks, block] }));
  };

  const updateBlock = (id: string, updates: any) => {
    setProfile(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const removeBlock = (id: string) => {
    setProfile(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== id)
    }));
  };

  return { profile, updateProfile, addBlock, updateBlock, removeBlock };
}
