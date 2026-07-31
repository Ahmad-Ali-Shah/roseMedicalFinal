"use client";

export default function RootError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" className="route-placeholder">
      <p className="route-eyebrow">Application error</p>
      <h1 className="route-title">This page could not be displayed.</h1>
      <button type="button" onClick={reset}>Try again</button>
    </main>
  );
}
