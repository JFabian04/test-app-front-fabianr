import { Skeleton } from "@/components/ui/skeleton"


export function SkeletonTable({ rows = 5 }) {
    return (
        <div className="overflow-hidden rounded-md border">
            <div className="grid grid-cols-[2fr_3fr_70px] gap-4 p-4 border-b bg-muted">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-6" />
            </div>
            <div className="divide-y">
                {Array.from({ length: rows }).map((_, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-[2fr_3fr_70px] gap-4 p-4 items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-6" />
                    </div>
                ))}
            </div>
        </div>
    )
}


