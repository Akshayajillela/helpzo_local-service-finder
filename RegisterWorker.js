@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background-color: #f8fffe;
    color: #1a2e2b;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: 'Syne', sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95;
  }

  .btn-secondary {
    @apply bg-white text-brand-700 border border-brand-200 px-5 py-2.5 rounded-xl font-medium hover:bg-brand-50 transition-all duration-200;
  }

  .btn-outline {
    @apply border border-stone-200 text-stone-700 px-5 py-2.5 rounded-xl font-medium hover:border-brand-400 hover:text-brand-700 transition-all duration-200;
  }

  .card {
    @apply bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-200;
  }

  .input-field {
    @apply w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-white text-stone-800 placeholder-stone-400 transition-all duration-200;
  }

  .badge-available {
    @apply inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200;
  }

  .badge-unavailable {
    @apply inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 3px; }

/* Page transition */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 250ms, transform 250ms;
}

/* Star rating */
.star-filled { color: #f59e0b; }
.star-empty { color: #e2e8f0; }

/* Hero gradient */
.hero-bg {
  background: linear-gradient(135deg, #0f766e 0%, #0d9488 40%, #134e4a 100%);
}

/* Floating shapes */
.shape-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: white;
  pointer-events: none;
}
