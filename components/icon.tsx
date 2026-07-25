import {
  MapPin,
  MapPinned,
  Satellite,
  FileCheck2,
  FileText,
  Archive,
  Upload,
  ShieldCheck,
  Vault,
  ScrollText,
  Server,
  Globe2,
  Lock,
  Scale,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/** Registry so content in lib/site.ts can reference icons by string name. */
const registry: Record<string, ComponentType<LucideProps>> = {
  MapPin,
  MapPinned,
  Satellite,
  FileCheck2,
  FileText,
  Archive,
  Upload,
  ShieldCheck,
  Vault,
  ScrollText,
  Server,
  Globe2,
  Lock,
  Scale,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = registry[name] ?? MapPin;
  return <Cmp {...props} />;
}
