import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "tu-a11y";
const MIN_SCALE = 0;
const MAX_SCALE = 2; // 0 = 100%, 1 = 112.5%, 2 = 125%

type Prefs = { contrast: boolean; scale: number };

const DEFAULT_PREFS: Prefs = { contrast: false, scale: 0 };

function readPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      contrast: parsed.contrast === true,
      scale: typeof parsed.scale === "number" ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, parsed.scale)) : 0,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  root.classList.toggle("a11y-contrast", prefs.contrast);
  root.classList.toggle("a11y-text-1", prefs.scale === 1);
  root.classList.toggle("a11y-text-2", prefs.scale === 2);
}

function AccessibilityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="3.4" r="1.9" fill="currentColor" />
      <path
        d="M3.2 6.4c2.2.7 4.4 1 6.8 1s4.6-.3 6.8-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 7.4v4.2m0 0-3 5.4m3-5.4 3 5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Restore persisted preferences after hydration (client-only).
  useEffect(() => {
    const stored = readPrefs();
    setPrefs(stored);
    applyPrefs(stored);
  }, []);

  const update = useCallback((next: Prefs) => {
    setPrefs(next);
    applyPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable; preferences last only for the session
    }
  }, []);

  // Close on Escape and return focus to the trigger.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const increaseText = () => update({ ...prefs, scale: Math.min(MAX_SCALE, prefs.scale + 1) });
  const decreaseText = () => update({ ...prefs, scale: Math.max(MIN_SCALE, prefs.scale - 1) });
  const toggleContrast = () => update({ ...prefs, contrast: !prefs.contrast });
  const reset = () => update(DEFAULT_PREFS);

  const modified = prefs.contrast || prefs.scale !== 0;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="group"
          aria-label="Opções de acessibilidade"
          className="w-72 border border-foreground bg-background shadow-none"
        >
          <div className="flex items-center justify-between border-b border-foreground px-4 py-3">
            <p className="label-mono text-terracotta">Acessibilidade</p>
            <Button
              variant="outline"
              size="sm"
              className="label-mono min-h-11 border-foreground shadow-none"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              Fechar
            </Button>
          </div>
          <div className="grid gap-1 p-2">
            <button
              type="button"
              aria-pressed={prefs.contrast}
              onClick={toggleContrast}
              className="flex min-h-11 items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
            >
              <span>Alto contraste</span>
              <span
                aria-hidden="true"
                className={`label-mono border px-2 py-0.5 ${
                  prefs.contrast ? "border-terracotta bg-terracotta text-accent-foreground" : "border-foreground text-muted-foreground"
                }`}
              >
                {prefs.contrast ? "Ativo" : "Inativo"}
              </span>
            </button>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <span className="text-sm">Tamanho do texto</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Diminuir texto"
                  disabled={prefs.scale <= MIN_SCALE}
                  onClick={decreaseText}
                  className="min-h-11 min-w-11 border-foreground shadow-none"
                >
                  A−
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Aumentar texto"
                  disabled={prefs.scale >= MAX_SCALE}
                  onClick={increaseText}
                  className="min-h-11 min-w-11 border-foreground shadow-none"
                >
                  A+
                </Button>
              </div>
            </div>
            <p className="label-mono px-3 pb-1 text-muted-foreground" aria-live="polite">
              Texto em {prefs.scale === 0 ? "100%" : prefs.scale === 1 ? "112%" : "125%"}
            </p>
            <button
              type="button"
              onClick={reset}
              disabled={!modified}
              className="min-h-11 border-t border-border px-3 py-2 text-left text-sm text-terracotta transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:text-muted-foreground"
            >
              Restaurar padrão
            </button>
          </div>
        </div>
      )}
      <Button
        ref={triggerRef}
        variant="outline"
        size="icon"
        aria-label={open ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="min-h-11 min-w-11 rounded-full border-foreground bg-background shadow-none"
      >
        <AccessibilityIcon />
      </Button>
    </div>
  );
}
