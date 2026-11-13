/**
 * Onboarding screen matching Figma:
 * - Responsive layout: mobile full width, desktop clean centered modal card
 * - Blue top section with decorative vector elements
 * - Clean white bottom section with typography and CTA
 */

export default function OnboardingScreen({ onGetStarted }) {
  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] dark:bg-slate-900 flex items-center justify-center p-0 sm:p-4 md:p-6 transition-colors duration-200">
      <div className="w-full sm:max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl bg-surface dark:bg-slate-800 flex flex-col justify-between sm:shadow-2xl relative overflow-hidden select-none sm:border sm:border-border/60 dark:sm:border-slate-700">
        {/* ─── Top Blue Section ─── */}
        <div className="relative w-full h-[55vh] sm:h-80 bg-primary-600 rounded-b-[40px] flex items-center justify-center overflow-hidden p-6">
          {/* Decorative glows */}
          <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-white/10 blur-[1px] pointer-events-none" />
          <div className="absolute top-20 -right-16 w-52 h-52 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-4 -left-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

          {/* Central Task Card illustration */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-44 h-52 bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 p-5 shadow-2xl flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-10 h-2 rounded-full bg-white/40" />
              </div>

              <div className="space-y-2 my-auto">
                <div className="w-full h-2.5 rounded-md bg-white/50" />
                <div className="w-4/5 h-2 rounded-md bg-white/30" />
                <div className="w-3/5 h-2 rounded-md bg-white/30" />
              </div>

              <div className="w-14 h-3.5 rounded-full bg-white/30" />
            </div>

            {/* Zigzag lines */}
            <svg
              className="w-24 h-6 text-white/40 mt-5"
              viewBox="0 0 120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 5,10 L 20,2 L 35,18 L 50,2 L 65,18 L 80,2 L 95,18 L 110,2 L 125,18" />
            </svg>
          </div>
        </div>

        {/* ─── Bottom White Section ─── */}
        <div className="flex-1 flex flex-col justify-between px-6 sm:px-8 py-8 sm:py-10 text-center">
          <div className="my-auto space-y-2.5">
            <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary dark:text-white tracking-tight leading-snug">
              Manage What To Do
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary dark:text-slate-300 leading-relaxed max-w-xs mx-auto">
              The best way to manage your everyday to do list and keep track of your weekly tasks easily.
            </p>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white text-sm sm:text-base font-semibold shadow-lg shadow-primary-600/25 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
