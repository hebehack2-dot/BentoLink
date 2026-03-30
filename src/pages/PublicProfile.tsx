import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BentoGrid from '../components/BentoGrid';
import { useProfile } from '../hooks/useProfile';

export default function PublicProfile() {
  const { username } = useParams();
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);

  // In a real app, we would fetch the profile by username from a database here.
  // For this local-first MVP, we just show the local profile if the username matches,
  // or a 404 if it doesn't.
  
  useEffect(() => {
    // Simulate network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If the username doesn't match the local profile, show a 404-like state
  // (Since we don't have a backend, we can only preview our own profile)
  if (username !== profile.username && username !== 'demo') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile not found</h1>
        <p className="text-gray-500 mb-8">The user @{username} doesn't exist or hasn't set up their BentoLink yet.</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors">
          Create your own BentoLink
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <BentoGrid profile={profile} />
    </div>
  );
}
