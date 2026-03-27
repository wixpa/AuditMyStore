export default function ErrorScreen({ error, onRetry }) {
   return (
      <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
            ⚠️
         </div>
         <div>
            <p className="text-lg font-black text-gray-900">Audit Failed</p>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">{error}</p>
            <p className="mt-1 text-xs text-gray-400">
               Make sure the URL is a valid publicly accessible Shopify store.
            </p>
         </div>
         <button
            onClick={onRetry}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition-all active:scale-95"
         >
            Try Again
            <svg
               className="h-4 w-4"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2.5"
               strokeLinecap="round"
            >
               <path d="M1 4v6h6M23 20v-6h-6" />
               <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
         </button>
      </div>
   );
}
