"use client";

import { useRef, useState, useTransition } from "react";
import { UploadCloud, Loader2, FileText } from "lucide-react";

export function UploadForm({
  action,
  requestId,
  label,
  tone = "signal",
}: {
  action: (fd: FormData) => Promise<void>;
  requestId: string;
  label: string;
  tone?: "signal" | "forest";
}) {
  const [pending, start] = useTransition();
  const [names, setNames] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const btn =
    tone === "signal"
      ? "bg-signal hover:bg-signal-bright text-white"
      : "bg-forest hover:bg-forest-deep text-paper-soft";

  return (
    <form
      ref={formRef}
      action={(fd) =>
        start(async () => {
          await action(fd);
          formRef.current?.reset();
          setNames([]);
        })
      }
      className="space-y-3"
    >
      <input type="hidden" name="request_id" value={requestId} />
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-forest/25 bg-paper px-4 py-8 text-center transition-colors hover:border-signal/50 hover:bg-paper-deep/40">
        <UploadCloud className="h-6 w-6 text-moss" />
        <span className="text-sm font-medium text-forest">
          Choose files or drop them here
        </span>
        <span className="text-xs text-faint">
          GeoJSON, KML, PDF, CSV, images — up to 25 MB each
        </span>
        <input
          type="file"
          name="files"
          multiple
          className="hidden"
          onChange={(e) =>
            setNames(Array.from(e.target.files ?? []).map((f) => f.name))
          }
        />
      </label>

      {names.length > 0 && (
        <ul className="space-y-1.5 rounded-2xl bg-paper-deep/40 p-3">
          {names.map((n) => (
            <li key={n} className="flex items-center gap-2 text-sm text-forest/80">
              <FileText className="h-4 w-4 shrink-0 text-moss" />
              <span className="truncate">{n}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={pending || names.length === 0}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${btn}`}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
          </>
        ) : (
          label
        )}
      </button>
    </form>
  );
}
