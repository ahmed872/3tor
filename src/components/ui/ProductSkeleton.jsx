/** هيكل تحميل لبطاقة منتج */
export default function ProductSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[4/5] w-full rounded-[3px] bg-ivory-300/70" />
      <div className="pt-4">
        <div className="h-3 w-20 rounded-[2px] bg-ivory-300/70" />
        <div className="mt-3 h-4 w-32 rounded-[2px] bg-ivory-300/70" />
        <div className="mt-3 h-3 w-24 rounded-[2px] bg-ivory-300/60" />
        <div className="mt-5 h-px w-full bg-ivory-300/70" />
        <div className="mt-4 h-4 w-20 rounded-[2px] bg-ivory-300/70" />
      </div>
    </div>
  );
}
