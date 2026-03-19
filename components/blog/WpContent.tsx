"use client";
import { useEffect, useRef } from "react";

const COPY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export default function WpContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return;
      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-code-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `${COPY_SVG}<span>Copy</span>`;

      btn.addEventListener("click", async () => {
        const text = (pre.querySelector("code") ?? pre).textContent ?? "";
        const reset = () => {
          setTimeout(() => { btn.innerHTML = `${COPY_SVG}<span>Copy</span>`; }, 2000);
        };
        try {
          await navigator.clipboard.writeText(text);
          btn.innerHTML = `${CHECK_SVG}<span style="color:#34c759">Copied!</span>`;
          reset();
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          Object.assign(ta.style, { position: "fixed", opacity: "0", top: "0", left: "0" });
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          try { document.execCommand("copy"); } catch { /* noop */ }
          document.body.removeChild(ta);
          btn.innerHTML = `${CHECK_SVG}<span style="color:#34c759">Copied!</span>`;
          reset();
        }
      });

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="wp-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
