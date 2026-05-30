import React from 'react';
import { Link } from 'react-router-dom';

// Category metadata
const CATEGORY_META = {
  plumber: { icon: '🔧', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  electrician: { icon: '⚡', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  carpenter: { icon: '🪵', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  mechanic: { icon: '🔩', color: 'bg-slate-50 text-slate-700 border-slate-100' },
  painter: { icon: '🎨', color: 'bg-pink-50 text-pink-700 border-pink-100' },
  cleaner: { icon: '🧹', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  gardener: { icon: '🌿', color: 'bg-green-50 text-green-700 border-green-100' },
  other: { icon: '🛠️', color: 'bg-stone-50 text-stone-700 border-stone-100' },
};

// Render star rating
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'star-filled' : 'star-empty'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Generate a consistent avatar color from name
const getAvatarColor = (name) => {
  const colors = [
    'bg-rose-400', 'bg-orange-400', 'bg-amber-400', 'bg-teal-500',
    'bg-cyan-500', 'bg-blue-500', 'bg-violet-500', 'bg-pink-500',
  ];
  const idx = (name?.charCodeAt(0) || 0) % colors.length;
  return colors[idx];
};

const WorkerCard = ({ worker }) => {
  const meta = CATEGORY_META[worker.category] || CATEGORY_META.other;
  const avatarColor = getAvatarColor(worker.name);

  return (
    <div className="card p-5 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={`w-12 h-12 rounded-xl ${avatarColor} flex items-center justify-center shadow-sm flex-shrink-0`}>
            <span className="text-white font-display font-bold text-lg">
              {worker.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-display font-bold text-stone-900 leading-tight">{worker.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={worker.rating} />
              <span className="text-xs text-stone-500 font-medium">
                {worker.rating?.toFixed(1)} ({worker.reviewCount || 0})
              </span>
            </div>
          </div>
        </div>

        {/* Availability Badge */}
        {worker.availability ? (
          <span className="badge-available flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Available
          </span>
        ) : (
          <span className="badge-unavailable flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
            Busy
          </span>
        )}
      </div>

      {/* Category & Location */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.color}`}>
          <span>{meta.icon}</span>
          {worker.category?.charAt(0).toUpperCase() + worker.category?.slice(1)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-stone-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {worker.location}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-stone-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {worker.experience} yr{worker.experience !== 1 ? 's' : ''} exp.
        </span>
      </div>

      {/* Bio */}
      {worker.bio && (
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">{worker.bio}</p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <a
          href={`tel:${worker.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </a>
        <Link
          to={`/worker/${worker._id}`}
          className="flex-1 flex items-center justify-center gap-2 border border-stone-200 text-stone-700 py-2.5 rounded-xl text-sm font-semibold hover:border-brand-300 hover:text-brand-700 transition-colors"
        >
          View Profile
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default WorkerCard;
export { CATEGORY_META, StarRating };
