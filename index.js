import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WorkerCard from '../components/WorkerCard';
import { workerAPI } from '../services/api';

// ─── Loading Skeleton ────────────────────────────────────
const SkeletonCard = () => (
  <div className="card p-5 animate-pulse">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-12 h-12 rounded-xl bg-stone-200 flex-shrink-0"></div>
      <div className="flex-1">
        <div className="h-4 bg-stone-200 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-stone-100 rounded w-1/3"></div>
      </div>
    </div>
    <div className="flex gap-2 mb-3">
      <div className="h-6 bg-stone-100 rounded-full w-24"></div>
      <div className="h-6 bg-stone-100 rounded-full w-28"></div>
    </div>
    <div className="h-3 bg-stone-100 rounded w-full mb-2"></div>
    <div className="h-3 bg-stone-100 rounded w-4/5 mb-4"></div>
    <div className="flex gap-2">
      <div className="h-10 bg-stone-200 rounded-xl flex-1"></div>
      <div className="h-10 bg-stone-100 rounded-xl flex-1"></div>
    </div>
  </div>
);

// ─── Stats Strip ─────────────────────────────────────────
const StatsStrip = () => (
  <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-100 my-8">
    {[
      { value: '500+', label: 'Verified Workers' },
      { value: '4.8★', label: 'Average Rating' },
      { value: '10k+', label: 'Jobs Completed' },
    ].map((s) => (
      <div key={s.label} className="text-center">
        <div className="font-display font-bold text-2xl text-brand-700">{s.value}</div>
        <div className="text-sm text-stone-500 mt-0.5">{s.label}</div>
      </div>
    ))}
  </div>
);

const Home = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', location: '', category: 'all' });
  const [seeding, setSeeding] = useState(false);

  const fetchWorkers = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      // Build clean query — omit empty strings and 'all'
      const query = {};
      if (params.search) query.search = params.search;
      if (params.location) query.location = params.location;
      if (params.category && params.category !== 'all') query.category = params.category;

      const res = await workerAPI.getAll(query);
      setWorkers(res.data);
    } catch (err) {
      setError('Failed to load workers. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    fetchWorkers(newFilters);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await workerAPI.seed();
      await fetchWorkers(filters);
    } catch (err) {
      alert('Seed failed. Is the backend running?');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="hero-bg relative overflow-hidden py-16 px-4">
        {/* Decorative blobs */}
        <div className="shape-blob w-64 h-64 -top-16 -right-16"></div>
        <div className="shape-blob w-48 h-48 bottom-0 left-8"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Trusted by thousands across the city
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight mb-4">
            Find a Local Pro <br />
            <span className="text-brand-200">in Minutes</span>
          </h1>
          <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Connect instantly with verified plumbers, electricians, carpenters, and more — right in your neighborhood.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <SearchBar onSearch={handleSearch} initialValues={filters} />
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <StatsStrip />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-stone-900">
              {loading ? 'Loading...' : `${workers.length} Worker${workers.length !== 1 ? 's' : ''} Found`}
            </h2>
            {(filters.category !== 'all' || filters.search || filters.location) && (
              <p className="text-sm text-stone-500 mt-0.5">
                Filtered results
                {filters.category !== 'all' && ` · ${filters.category}`}
                {filters.location && ` · ${filters.location}`}
              </p>
            )}
          </div>

          {/* Seed button for demo */}
          {workers.length === 0 && !loading && !error && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              {seeding ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <span>✨</span> Load Sample Data
                </>
              )}
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-stone-800 text-lg mb-2">Connection Error</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto">{error}</p>
            <button onClick={() => fetchWorkers(filters)} className="btn-primary mt-4 mx-auto">
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && workers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-stone-800 text-xl mb-2">No workers found</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
              Try adjusting your search filters, or load sample data to explore the app.
            </p>
            <button onClick={handleSeed} disabled={seeding} className="btn-primary">
              {seeding ? 'Loading...' : '✨ Load Sample Workers'}
            </button>
          </div>
        )}

        {/* Workers Grid */}
        {!loading && !error && workers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
