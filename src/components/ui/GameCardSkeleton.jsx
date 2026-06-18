import React from 'react';

const GameCardSkeleton = () => {
  return (
    <div className="relative w-full rounded-[2rem] p-1 bg-white border border-zinc-200 shadow-sm overflow-hidden min-h-[420px]">
      <div className="p-6 h-full flex flex-col justify-between">
        {/* Image Placeholder with Shimmer */}
        <div className="relative w-full h-44 rounded-2xl bg-zinc-200 overflow-hidden mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
        </div>

        {/* Badges/Tags Skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-24 bg-zinc-200 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
          <div className="h-6 w-16 bg-zinc-200 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
        </div>

        {/* Title & Desc Skeletons */}
        <div className="flex-grow space-y-3">
          <div className="h-8 w-3/4 bg-zinc-200 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
          <div className="h-4 w-full bg-zinc-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
          <div className="h-4 w-5/6 bg-zinc-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
        </div>

        {/* Footer Skeletons */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
              </div>
            ))}
          </div>
          <div className="w-12 h-12 rounded-full bg-zinc-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_linear]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
