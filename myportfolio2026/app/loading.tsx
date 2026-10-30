import SiteIntro from "@/components/site-intro";

export default function Loading() {
    return (
        <SiteIntro
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-background">
                    <div className="animate-pulse text-muted-foreground">Loading...</div>
                </div>
            }
        />
    );
}
