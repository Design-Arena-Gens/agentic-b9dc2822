import { Section } from "@/components/Section";
import { ZoneExplorer } from "@/components/ZoneExplorer";

const highlights = [
  {
    title: "Spatial intelligence at core",
    detail:
      "Aligns MahaVastu prescriptions with precise azimuth readings, translating geometry into rituals, layouts, and commerce-ready SKUs."
  },
  {
    title: "Full-stack delivery blueprint",
    detail:
      "Covers mobile AR capture, responsive web dashboards, merch marketplace, AI assistive flows, and secure API / DB contracts."
  },
  {
    title: "Launch-ready acceptance tests",
    detail:
      "Explicit success metrics for orientation accuracy, onboarding funnel, recommendation relevance, conversion and retention."
  }
];

const specPillars = [
  {
    label: "Guided onboarding",
    description:
      "3-step capture (site context → compass calibration → area zoning) with optional remote consultant collaboration."
  },
  {
    label: "Dynamic MahaVastu map",
    description:
      "Interactive plan overlays, rituals timeline, and mood-driven lighting/sound playlists tied to active planetary cycle."
  },
  {
    label: "Decision co-pilot",
    description:
      "LLM-driven assistant that summarises root imbalances, recommends remediations and auto-fills procurement carts."
  },
  {
    label: "Shoppable prescriptions",
    description:
      "Curated remedies (crystals, metals, fragrances, consultancy slots) mapped to zones, bundled into shareable treatment plans."
  }
];

const apiContracts = [
  {
    name: "POST /api/v1/sites/:siteId/readings",
    request: {
      magneticOffset: "number (degrees)",
      azimuth: "number (degrees)",
      device: {
        model: "string",
        platformVersion: "string"
      }
    },
    response: {
      id: "string",
      zone: "string",
      dialRotation: "number",
      recordedAt: "ISO8601"
    }
  },
  {
    name: "GET /api/v1/sites/:siteId/recommendations",
    request: {
      query: {
        zone: "optional string",
        severity: "optional enum(low|medium|high)"
      }
    },
    response: {
      items: [
        {
          id: "string",
          title: "string",
          ritualType: "enum",
          skuIds: ["string"],
          effortMinutes: "number",
          acceptanceTests: ["string"]
        }
      ]
    }
  },
  {
    name: "POST /api/v1/checkouts",
    request: {
      siteId: "string",
      currency: "INR|USD",
      items: [
        {
          skuId: "string",
          quantity: "number",
          source: "enum(zone|ritual|recommendation)"
        }
      ],
      upsellContext: "string"
    },
    response: {
      checkoutUrl: "string",
      total: "number",
      expiresAt: "ISO8601"
    }
  }
];

const dbEntities = [
  {
    table: "sites",
    fields: [
      "id (uuid, pk)",
      "user_id (uuid → users)",
      "title (text)",
      "address (jsonb)",
      "floor_plan_url (text)",
      "timezone (text)",
      "created_at (timestamptz)"
    ]
  },
  {
    table: "azimuth_readings",
    fields: [
      "id (uuid, pk)",
      "site_id (uuid → sites)",
      "raw_degrees (numeric)",
      "magnetic_offset (numeric)",
      "resolved_zone (text enum)",
      "dial_rotation (numeric)",
      "device_meta (jsonb)",
      "captured_at (timestamptz)",
      "created_at (timestamptz default now())"
    ]
  },
  {
    table: "rituals",
    fields: [
      "id (uuid, pk)",
      "title (text)",
      "zone (text enum)",
      "imbalance (text)",
      "instructions (jsonb blocks)",
      "media_ref (jsonb)",
      "effort_minutes (integer)",
      "severity (enum)"
    ]
  },
  {
    table: "prescription_items",
    fields: [
      "id (uuid, pk)",
      "ritual_id (uuid → rituals)",
      "sku_id (text)",
      "quantity (integer)",
      "notes (text)",
      "sequence (integer)"
    ]
  },
  {
    table: "commerce_orders",
    fields: [
      "id (uuid, pk)",
      "site_id (uuid → sites)",
      "status (enum pending|paid|fulfilled)",
      "total_amount (numeric)",
      "currency (text)",
      "line_items (jsonb)",
      "gateway_payload (jsonb)",
      "created_at (timestamptz)",
      "fulfilled_at (timestamptz)"
    ]
  }
];

const uxBehaviours = [
  {
    title: "Capture flow",
    detail:
      "Animated compass dial with haptic ticks every 11.25°. Lock-in feedback when zone stabilises for 2 seconds."
  },
  {
    title: "Insight timeline",
    detail:
      "Scroll-driven story that interleaves consultant notes, AR overlays and remedy suggestions mapped to timeline chips."
  },
  {
    title: "Team collaboration",
    detail:
      "Per-zone comment threads, @mentions, consultant approvals. Slack/Microsoft Teams webhooks for milestone updates."
  },
  {
    title: "Accessibility",
    detail:
      "WCAG 2.2 AA contrast, voice narration for rituals, alternate flows for users unable to capture orientation data."
  }
];

const arMobile = [
  "iOS: ARKit RoomPlan for 3D scan, integrate with Vision Pro for immersive walkthrough of energised layout.",
  "Android: ARCore Geospatial API fallback to manual anchor placement with visual markers.",
  "Offline-first capture with queueing, auto-sync when connectivity restores.",
  "Contextual push notifications aligned with lunar calendar & user persona (Homeowner, Consultant, Investor)."
];

const commerce = [
  "Integrate Shopify Hydrogen storefront via GraphQL for SKU data, stock status and dynamic pricing.",
  "Bundle generator maps MahaVastu imbalances to curated kits, offering EMI support via Razorpay/Stripe.",
  "Track ritual compliance in-app; auto-trigger replenishment reminders and subscription upsells.",
  "Consultancy scheduling via Calendly API; one-click booking from active imbalance cards."
];

const acceptanceCriteria = [
  {
    title: "Orientation accuracy",
    detail:
      "95% of calibration sessions align within ±2° when cross-checked against reference compass across 15 devices."
  },
  {
    title: "Onboarding conversion",
    detail:
      "80% of new users complete capture flow and generate first MahaVastu map within 24h of signup."
  },
  {
    title: "Recommendation resonance",
    detail:
      "70% of delivered rituals receive 4★+ satisfaction rating and improve baseline wellbeing metric by 1 point."
  },
  {
    title: "Commerce performance",
    detail: "10% attach rate of remedy kits per active zone plan, average order value ₹12,000."
  },
  {
    title: "Consultant productivity",
    detail:
      "Reduce manual report drafting time from 2h → 20m by auto-generating spec sections and AR overlays."
  }
];

const roadmap = [
  {
    label: "MVP",
    items: [
      "Responsive web dashboard with capture wizard, zone map, and recommendation list.",
      "Manual floor plan upload with annotations; AR-lite overlay using compass orientation.",
      "Shopify checkout redirect, simple payment capture, and CSV export for consultants.",
      "Foundational analytics: orientation accuracy, ritual adoption, revenue per site."
    ]
  },
  {
    label: "V2",
    items: [
      "Full AR spatial persistence with 3D object placement and shared sessions.",
      "AI co-pilot with voice interface, pattern detection across portfolio sites.",
      "Dynamic pricing engine driven by lunar cycles, limited edition drops and partnerships.",
      "API marketplace for partner healers and interior designers to plug into recommendations."
    ]
  }
];

const delivery = [
  {
    title: "Team Topology",
    points: [
      "Experience squad (PM, UX strategist, 2× full-stack, AR engineer)",
      "Infra & data pod (Platform engineer, Analytics lead, QA automation)",
      "Advisor guild with MahaVastu SMEs for weekly ritual reviews"
    ]
  },
  {
    title: "Cadence",
    points: [
      "Dual-track discovery & delivery with 1-week design spikes feeding 2-week sprints",
      "Nightly observability sync: capture accuracy anomalies, ritual adoption cohorts, cart drop-offs",
      "Monthly ritual effectiveness council to tune recommendations and commerce bundles"
    ]
  }
];

export default function Page() {
  return (
    <main className="relative pb-24">
      <div className="absolute inset-0 -z-10 h-[480px] bg-gradient-to-b from-sand-200/50 via-sand-100/70 to-transparent" />
      <header className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sand-300/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sand-600">
          MahaVastu digital transformation brief
        </div>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-slate-900">
          Ship MahaVastu rituals with precision, calm and commerce.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-700">
          Use this single source of truth to align engineers, designers, data teams and consultants on
          the systems, behaviours and KPIs required to deliver MahaVastu&apos;s signature experience
          across web, mobile and AR touchpoints.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-white/40 bg-white/80 p-6 text-left shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                {highlight.title}
              </p>
              <p className="mt-3 text-sm text-slate-700">{highlight.detail}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <Section id="immediate-spec" title="High-Priority Spec" description="Launch-critical outcomes.">
          <div className="grid gap-6 md:grid-cols-2">
            {specPillars.map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  {pillar.label}
                </p>
                <p className="mt-3 text-sm text-slate-700">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="algorithms"
          title="Spatial Intelligence Algorithms"
          description="Validated conversions the engineering team can ship immediately."
        >
          <ZoneExplorer />
        </Section>

        <Section
          id="api-db"
          title="API + Data Contracts"
          description="Secure, explicit surface area for app, web and partner integrations."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6 rounded-3xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                API Contracts
              </p>
              <div className="space-y-5">
                {apiContracts.map((api) => (
                  <div key={api.name} className="rounded-2xl border border-sand-200/60 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-800">{api.name}</p>
                    <div className="mt-3 grid gap-3 text-xs text-slate-600">
                      <div>
                        <p className="font-semibold uppercase tracking-wide text-sand-500">Request</p>
                        <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-sand-100/60 p-3 text-[11px] leading-relaxed">
{JSON.stringify(api.request, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <p className="font-semibold uppercase tracking-wide text-sand-500">Response</p>
                        <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-sand-100/60 p-3 text-[11px] leading-relaxed">
{JSON.stringify(api.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  Database Entities
                </p>
                <ul className="mt-4 space-y-4 text-sm text-slate-700">
                  {dbEntities.map((entity) => (
                    <li key={entity.table}>
                      <p className="font-semibold text-slate-800">{entity.table}</p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-600">
                        {entity.fields.map((field) => (
                          <li key={field}>{field}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  Security & Governance
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
                  <li>All endpoints require signed JWT scoped to site or consultant role.</li>
                  <li>Row Level Security on Supabase/Postgres for user + consultant isolation.</li>
                  <li>Encrypt azimuth readings at rest (pgcrypto) and redact personal info in logs.</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="ui-ux"
          title="UI & UX Behaviours"
          description="Delightful, ritual-aligned moments that make the product feel like MahaVastu."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {uxBehaviours.map((behaviour) => (
              <div
                key={behaviour.title}
                className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  {behaviour.title}
                </p>
                <p className="mt-3 text-sm text-slate-700">{behaviour.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="ar-mobile" title="AR & Mobile Notes" description="Field-ready capture and guidance.">
          <ul className="space-y-3 text-sm text-slate-700">
            {arMobile.map((item) => (
              <li key={item} className="rounded-2xl border border-sand-200/60 bg-white/70 p-4">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="commerce"
          title="E-commerce Integration"
          description="Turn rituals into revenue with an ecosystem of trusted remedies."
        >
          <ul className="space-y-3 text-sm text-slate-700">
            {commerce.map((item) => (
              <li key={item} className="rounded-2xl border border-sand-200/60 bg-white/70 p-4">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="acceptance"
          title="Acceptance Criteria"
          description="Objective signals that we are ready to ship and scale."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {acceptanceCriteria.map((criterion) => (
              <div
                key={criterion.title}
                className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  {criterion.title}
                </p>
                <p className="mt-3 text-sm text-slate-700">{criterion.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="roadmap" title="Roadmap" description="What unlocks now vs. next.">
          <div className="grid gap-6 md:grid-cols-2">
            {roadmap.map((phase) => (
              <div
                key={phase.label}
                className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  {phase.label}
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="delivery"
          title="Delivery Rituals"
          description="How the cross-functional team ships with clarity."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {delivery.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-sand-600">
                  {item.title}
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
