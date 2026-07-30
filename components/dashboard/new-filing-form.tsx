"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowRight, Loader2, Plus, Trash2 } from "lucide-react";
import {
  COMMODITIES,
  emptySupplier,
  emptyDdsReference,
  type FilingRole,
  type SupplierEntry,
  type DdsReference,
} from "@/lib/filing-types";

const input =
  "w-full rounded-2xl border border-forest/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-signal focus:ring-2 focus:ring-signal/15";
const labelCls = "mb-1.5 block text-sm font-medium text-forest";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-faint">{hint}</p>}
    </div>
  );
}

export function NewFilingForm({
  action,
}: {
  action: (fd: FormData) => Promise<void>;
}) {
  const [pending, start] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [role, setRole] = useState<FilingRole | "">("");
  const [suppliers, setSuppliers] = useState<SupplierEntry[]>([emptySupplier()]);
  const [ddsRefs, setDdsRefs] = useState<DdsReference[]>([emptyDdsReference()]);

  function setSupplier(i: number, key: keyof SupplierEntry, val: string) {
    setSuppliers((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r))
    );
  }
  function setDds(i: number, key: keyof DdsReference, val: string) {
    setDdsRefs((rows) =>
      rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r))
    );
  }

  return (
    <form
      ref={formRef}
      action={(fd) => start(async () => await action(fd))}
      className="space-y-8"
    >
      {/* Serialized repeatable rows */}
      <input type="hidden" name="suppliers" value={JSON.stringify(suppliers)} />
      <input
        type="hidden"
        name="dds_references"
        value={JSON.stringify(ddsRefs)}
      />
      <input type="hidden" name="role" value={role} />

      {/* 1 — Role */}
      <section>
        <h3 className="font-display text-base font-semibold text-forest">
          1 · Who are you in the supply chain?
        </h3>
        <p className="mt-1 text-sm text-muted">
          This decides what the regulation needs from you.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <RoleCard
            active={role === "operator"}
            onClick={() => setRole("operator")}
            title="Operator"
            body="You're the first to import these goods into the EU. You carry the full due-diligence burden: geolocation, forest check, TRACES filing."
          />
          <RoleCard
            active={role === "downstream"}
            onClick={() => setRole("downstream")}
            title="Downstream buyer / trader"
            body="You buy goods that another business already imported into the EU. You collect and keep your suppliers' due-diligence reference numbers."
          />
        </div>
      </section>

      {role && (
        <>
          {/* 2 — Business */}
          <section className="space-y-4">
            <h3 className="font-display text-base font-semibold text-forest">
              2 · Your business
            </h3>
            <Field label="Filing name">
              <input
                name="title"
                required
                className={input}
                placeholder="e.g. Q3 Colombia coffee shipment"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Legal business name">
                <input
                  name="org_name"
                  required
                  className={input}
                  placeholder="Acme Coffee Imports Ltd"
                />
              </Field>
              <Field
                label="EORI number"
                hint="Your EU customs ID — required on every due-diligence statement."
              >
                <input
                  name="eori_number"
                  required
                  className={input}
                  placeholder="GB123456789000"
                />
              </Field>
            </div>
            <Field label="Registered business address">
              <input
                name="business_address"
                required
                className={input}
                placeholder="Street, city, postcode, country"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contact name">
                <input
                  name="contact_name"
                  required
                  className={input}
                  placeholder="Jane Roaster"
                />
              </Field>
              <Field label="Contact email">
                <input
                  name="contact_email"
                  type="email"
                  required
                  className={input}
                  placeholder="jane@acme.com"
                />
              </Field>
            </div>
          </section>

          {/* 3 — Goods */}
          <section className="space-y-4">
            <h3 className="font-display text-base font-semibold text-forest">
              3 · The goods
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Commodity">
                <select name="commodity" required className={input} defaultValue="">
                  <option value="" disabled>
                    Choose a commodity…
                  </option>
                  {COMMODITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="HS / customs code"
                hint="The tariff code for the product, if you have it."
              >
                <input
                  name="hs_code"
                  className={input}
                  placeholder="0901.21"
                />
              </Field>
            </div>
            <Field label="Product description">
              <input
                name="product_description"
                required
                className={input}
                placeholder="Roasted arabica coffee beans"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Quantity"
                hint="Net mass in kg, or units/volume where that applies."
              >
                <input
                  name="quantity"
                  required
                  className={input}
                  placeholder="12,000 kg"
                />
              </Field>
              <Field label="Country of production">
                <input
                  name="country_of_production"
                  required
                  className={input}
                  placeholder="Colombia"
                />
              </Field>
            </div>
            <Field label="Region / area of production (optional)">
              <input
                name="production_region"
                className={input}
                placeholder="Huila"
              />
            </Field>
          </section>

          {/* 4a — Operator: suppliers & plots */}
          {role === "operator" && (
            <section>
              <h3 className="font-display text-base font-semibold text-forest">
                4 · Suppliers &amp; plot locations
              </h3>
              <p className="mt-1 text-sm text-muted">
                Add each supplier and where their goods were produced. You can
                type coordinates here and/or upload a GeoJSON/KML file on the
                next screen. Plots over 4 ha need a polygon; smaller ones a
                point.
              </p>
              <div className="mt-4 space-y-4">
                {suppliers.map((s, i) => (
                  <RowCard
                    key={i}
                    index={i}
                    canRemove={suppliers.length > 1}
                    onRemove={() =>
                      setSuppliers((r) => r.filter((_, idx) => idx !== i))
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        className={input}
                        placeholder="Supplier / farm name"
                        value={s.supplier_name}
                        onChange={(e) =>
                          setSupplier(i, "supplier_name", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Supplier contact (email/phone)"
                        value={s.contact}
                        onChange={(e) =>
                          setSupplier(i, "contact", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Country of production"
                        value={s.country}
                        onChange={(e) =>
                          setSupplier(i, "country", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Region / municipality"
                        value={s.region}
                        onChange={(e) =>
                          setSupplier(i, "region", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Plot size (hectares)"
                        value={s.hectares}
                        onChange={(e) =>
                          setSupplier(i, "hectares", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Production period (e.g. 2024 harvest)"
                        value={s.production_period}
                        onChange={(e) =>
                          setSupplier(i, "production_period", e.target.value)
                        }
                      />
                    </div>
                    <textarea
                      className={`${input} mt-3 resize-none`}
                      rows={2}
                      placeholder="Plot coordinates — lat, long (one plot per line). Or leave blank and upload GeoJSON/KML next."
                      value={s.plot_coordinates}
                      onChange={(e) =>
                        setSupplier(i, "plot_coordinates", e.target.value)
                      }
                    />
                  </RowCard>
                ))}
              </div>
              <AddButton
                label="Add another supplier"
                onClick={() => setSuppliers((r) => [...r, emptySupplier()])}
              />
            </section>
          )}

          {/* 4b — Downstream: DDS references */}
          {role === "downstream" && (
            <section>
              <h3 className="font-display text-base font-semibold text-forest">
                4 · Supplier reference numbers
              </h3>
              <p className="mt-1 text-sm text-muted">
                For each supplier, add the due-diligence statement (DDS)
                reference and verification number they gave you. This is the
                core of your obligation as a downstream buyer.
              </p>
              <div className="mt-4 space-y-4">
                {ddsRefs.map((d, i) => (
                  <RowCard
                    key={i}
                    index={i}
                    canRemove={ddsRefs.length > 1}
                    onRemove={() =>
                      setDdsRefs((r) => r.filter((_, idx) => idx !== i))
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input
                        className={input}
                        placeholder="Supplier name"
                        value={d.supplier_name}
                        onChange={(e) =>
                          setDds(i, "supplier_name", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="DDS reference number"
                        value={d.dds_reference}
                        onChange={(e) =>
                          setDds(i, "dds_reference", e.target.value)
                        }
                      />
                      <input
                        className={input}
                        placeholder="Verification number"
                        value={d.verification_number}
                        onChange={(e) =>
                          setDds(i, "verification_number", e.target.value)
                        }
                      />
                    </div>
                  </RowCard>
                ))}
              </div>
              <AddButton
                label="Add another reference"
                onClick={() => setDdsRefs((r) => [...r, emptyDdsReference()])}
              />
            </section>
          )}

          {/* 5 — Notes */}
          <section>
            <h3 className="font-display text-base font-semibold text-forest">
              5 · Anything else for our team?
            </h3>
            <textarea
              name="notes"
              rows={3}
              className={`${input} mt-3 resize-none`}
              placeholder="Deadlines, unusual supply chains, questions — anything that helps us prepare your pack."
            />
          </section>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating…
              </>
            ) : (
              <>
                Create filing <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
}

function RoleCard({
  active,
  onClick,
  title,
  body,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-4 text-left transition-colors ${
        active
          ? "border-signal bg-signal/[0.06] ring-2 ring-signal/20"
          : "border-forest/15 bg-paper hover:border-signal/40"
      }`}
    >
      <p className="font-display text-sm font-semibold text-forest">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
    </button>
  );
}

function RowCard({
  index,
  canRemove,
  onRemove,
  children,
}: {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-forest/10 bg-paper p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-faint">
          #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-flag"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-paper px-4 py-2 text-sm font-medium text-forest transition-colors hover:border-signal/40 hover:text-signal"
    >
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}
