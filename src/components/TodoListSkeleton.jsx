export const TodoListSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Info text */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse duration-75" />
        <span>Sedang memuat todo...</span>
      </div>

      {/* Skeleton items */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 animate-pulse"
        >
          {/* Checkbox */}
          <div className="w-6 h-6 rounded-full bg-slate-200" />

          {/* Text */}
          <div className="flex-1 space-y-2">
            {/* <div className="h-4 w3/4 bg-slate-200 rounded" /> */}
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-3 w-4/10 bg-slate-100 rounded" />
          </div>

          {/* Action placeholder */}
          {/* <div className="flex gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            <div className="w-8 h-8 bg-slate-100 rounded-lg" />
          </div> */}
        </div>
      ))}
    </div>
  )
}

