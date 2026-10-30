"use client";

import { useEffect, useState } from "react";
import SiteIntro from "@/components/site-intro";

const KEY = "siteIntroShown_v1";

// The server HTML has no idea whether this session has seen the intro, so a
// dark cover is painted first and hidden by this inline script for anyone who
// has. Otherwise the page would flash before the intro, or the intro after it.
const hideForReturning = `try{if(sessionStorage.getItem("${KEY}"))document.getElementById("intro-cover").style.display="none"}catch(e){}`;

export function HomeIntro() {
    const [play, setPlay] = useState<boolean | null>(null);
    useEffect(() => {
        try {
            setPlay(!sessionStorage.getItem(KEY));
        } catch {
            setPlay(false);
        }
    }, []);

    if (play !== null) return play ? <SiteIntro /> : null;
    return (
        <>
            <div id="intro-cover" className="fixed inset-0 z-[99999] bg-[#0a0f18]" suppressHydrationWarning />
            <script dangerouslySetInnerHTML={{ __html: hideForReturning }} />
            <noscript>
                <style>{"#intro-cover{display:none}"}</style>
            </noscript>
        </>
    );
}
