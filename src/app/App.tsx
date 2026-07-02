import { useState } from "react";
import {
  Menu, X, Crown, Sparkles, Heart, Star, MapPin, Clock,
  Phone, Instagram, ChevronRight, Scissors, Brush,
  Droplets, Hand, Wand2, Gem,
} from "lucide-react";

/* ─── Brand palette ──────────────────────────────────────────────────
   #DAA196  Rosa Imperatriz     #DEBAB1  Rosé Claro
   #F3EBE3  Nude Champagne      #E8D2CA  Areia Suave
   #FDFDF3  Marfim Luxo         #BF8780  Terracota Rosé
   #895144  Cacau Elegante      #4E2D26  Café Profundo
──────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Nosso Espaço", href: "#espaco" },
  { label: "Agendar", href: "#agendar" },
];

const SERVICES = [
  {
    Icon: Scissors,
    title: "Cabelos",
    desc: "Corte, coloração, hidratação e tratamentos especializados para realçar a beleza dos seus fios.",
  },
  {
    Icon: Brush,
    title: "Design de Sobrancelhas",
    desc: "Modelagem precisa e técnicas avançadas para sobrancelhas que emolduram o seu olhar.",
  },
  {
    Icon: Droplets,
    title: "Depilação",
    desc: "Remoção suave e eficiente com produtos de alta qualidade e técnica especializada.",
  },
  {
    Icon: Hand,
    title: "Manicure & Pedicure",
    desc: "Cuidado completo para suas mãos e pés, com acabamento impecável e produtos premium.",
  },
  {
    Icon: Wand2,
    title: "Maquiagem",
    desc: "Da make do dia a dia ao glamour para ocasiões especiais, realçamos a sua beleza natural.",
  },
  {
    Icon: Gem,
    title: "Tratamentos de Beleza",
    desc: "Protocolos exclusivos para nutrição, rejuvenescimento e luminosidade da pele.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    role: "Cliente há 2 anos",
    text: "A Estilo Imperatriz transformou minha relação com a beleza. Cada visita é uma experiência de luxo e cuidado genuíno. Me sinto verdadeiramente especial aqui.",
    stars: 5,
  },
  {
    name: "Isabela Ferreira",
    role: "Cliente fiel",
    text: "O ambiente é simplesmente encantador, e os profissionais são excepcionais. Meu cabelo nunca esteve tão bonito e saudável. Recomendo de olhos fechados!",
    stars: 5,
  },
  {
    name: "Camila Rodrigues",
    role: "Cliente há 1 ano",
    text: "Encontrei aqui muito mais que um salão. É um espaço onde me sinto acolhida e valorizada. O atendimento premium faz toda a diferença.",
    stars: 5,
  },
];

const GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=900&h=600&fit=crop&auto=format",
    alt: "Interior elegante do salão Estilo Imperatriz",
    wide: true,
  },
  {
    url: "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?w=600&h=600&fit=crop&auto=format",
    alt: "Cadeiras e espelhos do espaço premium",
    wide: false,
  },
  {
    url: "https://images.unsplash.com/photo-1626383137804-ff908d2753a2?w=600&h=600&fit=crop&auto=format",
    alt: "Profissionais prontos para atender",
    wide: false,
  },
  {
    url: "https://images.unsplash.com/photo-1746723378067-83a345ff3160?w=600&h=600&fit=crop&auto=format",
    alt: "Ambiente sofisticado com produtos premium",
    wide: false,
  },
];

// ── Small reusable primitives ────────────────────────────────────────

function CrownMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 30L9 12L20 22L26 4L32 22L43 12L48 30H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="4" cy="12" r="2.5" fill="currentColor" />
      <circle cx="26" cy="4" r="2.5" fill="currentColor" />
      <circle cx="48" cy="12" r="2.5" fill="currentColor" />
      <line x1="4" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DiamondRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-[#BF8780]/30" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#DAA196" />
      </svg>
      <div className="h-px flex-1 bg-[#BF8780]/30" />
    </div>
  );
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span
      className={`inline-block text-[10px] font-semibold tracking-[0.22em] uppercase mb-3 font-['Montserrat'] ${
        light ? "text-[#DAA196]" : "text-[#BF8780]"
      }`}
    >
      {text}
    </span>
  );
}

function SectionTitle({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-['Playfair_Display'] text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.18] mb-4 ${
        light ? "text-[#FDFDF3]" : "text-[#4E2D26]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

function PrimaryBtn({
  children,
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 bg-[#895144] hover:bg-[#4E2D26] text-[#FDFDF3] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm tracking-wide font-['Montserrat']";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 border border-[#895144] text-[#895144] hover:bg-[#895144] hover:text-[#FDFDF3] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide font-['Montserrat'] ${className}`}
    >
      {children}
    </button>
  );
}

// ── WhatsApp icon ────────────────────────────────────────────────────
function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "" });

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F3EBE3] font-['Montserrat'] scroll-smooth">

      {/* ══════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FDFDF3]/92 backdrop-blur-md border-b border-[#BF8780]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo("#inicio")} className="flex items-center gap-2.5 group shrink-0">
            <CrownMark className="w-9 h-6 text-[#DAA196] group-hover:text-[#895144] transition-colors duration-300" />
            <div className="text-left">
              <div className="font-['Playfair_Display'] text-[17px] font-semibold text-[#4E2D26] leading-tight">
                Estilo Imperatriz
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#BF8780]">Hair & Beauty</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-[13px] font-medium text-[#895144] hover:text-[#4E2D26] transition-colors tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <PrimaryBtn onClick={() => scrollTo("#agendar")} className="hidden lg:inline-flex !py-2.5 !px-6 text-[13px]">
            Agende um horário
          </PrimaryBtn>

          {/* Hamburger */}
          <button
            className="lg:hidden text-[#895144] p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden bg-[#FDFDF3] border-t border-[#BF8780]/15 overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-[15px] font-medium text-[#4E2D26] hover:text-[#895144] transition-colors py-2"
              >
                {l.label}
              </button>
            ))}
            <PrimaryBtn onClick={() => scrollTo("#agendar")} className="mt-3 w-full !justify-center">
              Agende um horário
            </PrimaryBtn>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section id="inicio" className="pt-[72px] min-h-screen bg-[#FDFDF3] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* — Text — */}
          <div className="order-2 lg:order-1 max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#DAA196]" />
              <SectionLabel text="Hair & Beauty Premium" />
            </div>

            <h1 className="font-['Playfair_Display'] text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-normal text-[#4E2D26] leading-[1.13] mb-6">
              Realce sua beleza com cuidado de{" "}
              <em className="not-italic text-[#895144] italic">imperatriz</em>
            </h1>

            <p className="text-[#895144]/75 text-base md:text-[17px] leading-relaxed mb-10">
              Hair & Beauty em um espaço elegante, acolhedor e pensado para elevar sua autoestima.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <PrimaryBtn onClick={() => scrollTo("#agendar")}>Agende seu horário</PrimaryBtn>
              <OutlineBtn onClick={() => scrollTo("#servicos")}>Conheça nossos serviços</OutlineBtn>
            </div>

            {/* Selos */}
            <div className="flex flex-wrap gap-2.5">
              {["Atendimento premium", "Ambiente acolhedor", "Beleza e autoestima"].map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-[#895144] bg-[#E8D2CA]/50 px-4 py-2 rounded-full border border-[#DAA196]/30"
                >
                  <Sparkles size={9} className="text-[#DAA196]" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* — Image — */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[420px]">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#DAA196]/25 to-[#E8D2CA]/35 rounded-[3rem] blur-3xl scale-110" />

              {/* Decorative outer border */}
              <div className="absolute -inset-4 border border-[#DAA196]/25 rounded-[2.75rem]" />

              {/* Photo frame */}
              <div className="relative rounded-[2.25rem] overflow-hidden bg-[#E8D2CA] aspect-[3/4] shadow-2xl shadow-[#895144]/20">
                <img
                  src="https://images.unsplash.com/photo-1560869713-bf165a9cfac1?w=640&h=854&fit=crop&auto=format"
                  alt="Cabelo elegante no Estilo Imperatriz"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4E2D26]/30 via-transparent to-transparent" />
              </div>

              {/* Crown badge top */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FDFDF3] border border-[#DAA196]/40 rounded-full p-3 shadow-lg">
                <CrownMark className="w-7 h-5 text-[#DAA196]" />
              </div>

              {/* Bottom info card */}
              <div className="absolute -bottom-5 left-5 right-5 bg-[#FDFDF3]/96 backdrop-blur-sm rounded-2xl px-5 py-3.5 shadow-xl border border-[#DAA196]/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8D2CA] flex items-center justify-center shrink-0">
                  <Gem size={15} className="text-[#895144]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-['Playfair_Display'] text-[13px] font-semibold text-[#4E2D26]">
                    Experiência exclusiva
                  </div>
                  <div className="text-[10px] text-[#BF8780] tracking-wide">desde o primeiro atendimento</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          QUEM SOMOS
      ══════════════════════════════════════════════ */}
      <section id="sobre" className="py-24 lg:py-32 bg-[#F3EBE3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#DAA196]/12 rounded-full blur-3xl" />
              <div className="relative rounded-[2rem] overflow-hidden bg-[#E8D2CA] aspect-[4/5] shadow-xl shadow-[#895144]/10">
                <img
                  src="https://images.unsplash.com/photo-1629397685944-7073f5589754?w=720&h=900&fit=crop&auto=format"
                  alt="Profissional do Estilo Imperatriz"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stat badge */}
              <div className="absolute -right-5 bottom-14 bg-[#895144] text-[#FDFDF3] rounded-2xl p-5 shadow-2xl">
                <div className="font-['Playfair_Display'] text-3xl font-semibold mb-0.5">5+</div>
                <div className="text-[11px] font-['Montserrat'] opacity-80 leading-snug max-w-[100px]">
                  anos de excelência em beleza
                </div>
              </div>

              {/* Thin accent line */}
              <div className="absolute top-8 -right-3 w-px h-20 bg-gradient-to-b from-transparent via-[#DAA196]/60 to-transparent" />
            </div>

            {/* Text */}
            <div>
              <SectionLabel text="Quem Somos" />
              <SectionTitle>Elegância, cuidado e beleza em cada detalhe</SectionTitle>

              <DiamondRule className="my-6 max-w-xs" />

              <p className="text-[#895144]/80 text-[15px] leading-relaxed mb-10">
                A Estilo Imperatriz nasceu para oferecer uma experiência de beleza completa, unindo técnica, acolhimento e
                sofisticação. Cada atendimento é pensado para valorizar a individualidade de cada cliente, com conforto,
                segurança e atenção aos detalhes.
              </p>

              {/* Três pilares */}
              <div className="grid grid-cols-3 gap-5">
                {[
                  { Icon: Heart, label: "Cuidado", desc: "Atenção genuína em cada detalhe do seu atendimento" },
                  { Icon: Gem, label: "Sofisticação", desc: "Ambiente e serviços de nível premium" },
                  { Icon: Sparkles, label: "Confiança", desc: "Profissionais especializados e experientes" },
                ].map(({ Icon, label, desc }) => (
                  <div key={label} className="text-center">
                    <div className="w-11 h-11 mx-auto mb-3 bg-[#DEBAB1]/40 rounded-[14px] flex items-center justify-center">
                      <Icon size={17} className="text-[#895144]" strokeWidth={1.5} />
                    </div>
                    <div className="font-['Playfair_Display'] text-[15px] font-semibold text-[#4E2D26] mb-1">{label}</div>
                    <div className="text-[11px] text-[#895144]/65 leading-snug">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVIÇOS
      ══════════════════════════════════════════════ */}
      <section id="servicos" className="py-24 lg:py-32 bg-[#FDFDF3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel text="Nossos Serviços" />
            <SectionTitle className="max-w-xl mx-auto">
              Tudo o que você precisa para se sentir extraordinária
            </SectionTitle>
            <p className="text-[#895144]/70 text-[14px] leading-relaxed max-w-lg mx-auto mt-2">
              Cada serviço é executado com maestria e produtos selecionados para garantir resultados excepcionais.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-[#F3EBE3] hover:bg-[#895144] rounded-3xl p-8 border border-[#DAA196]/20 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-[#895144]/25 hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 mb-6 bg-[#DEBAB1]/35 group-hover:bg-[#FDFDF3]/15 rounded-2xl flex items-center justify-center transition-colors duration-500">
                  <Icon size={19} className="text-[#895144] group-hover:text-[#FDFDF3] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#4E2D26] group-hover:text-[#FDFDF3] mb-3 transition-colors duration-500">
                  {title}
                </h3>
                <p className="text-[#895144]/75 group-hover:text-[#FDFDF3]/75 text-[13px] leading-relaxed mb-6 transition-colors duration-500">
                  {desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#895144] group-hover:text-[#FDFDF3] tracking-widest uppercase transition-colors duration-500">
                  Saiba mais <ChevronRight size={13} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NOSSO ESPAÇO
      ══════════════════════════════════════════════ */}
      <section id="espaco" className="py-24 lg:py-32 bg-[#F3EBE3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-end mb-14">
            <div>
              <SectionLabel text="Nosso Espaço" />
              <SectionTitle>Um ambiente preparado para você se sentir bem</SectionTitle>
            </div>
            <p className="text-[#895144]/75 text-[15px] leading-relaxed lg:pb-2">
              Do início ao fim, cada detalhe foi pensado para proporcionar conforto, privacidade e uma experiência
              verdadeiramente premium em cada visita.
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden bg-[#E8D2CA] group ${img.wide ? "col-span-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4E2D26]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Diferenciais */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { Icon: Sparkles, label: "Ambiente higienizado" },
              { Icon: Heart, label: "Atendimento confortável" },
              { Icon: Gem, label: "Privacidade garantida" },
              { Icon: Star, label: "Organização impecável" },
              { Icon: Crown, label: "Experiência premium" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2.5 bg-[#FDFDF3] rounded-2xl p-5 border border-[#DAA196]/20 hover:border-[#DAA196]/50 transition-colors"
              >
                <div className="w-9 h-9 bg-[#E8D2CA] rounded-xl flex items-center justify-center">
                  <Icon size={14} className="text-[#895144]" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-medium text-[#4E2D26] leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DEPOIMENTOS
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#895144] relative overflow-hidden">
        {/* Subtle texture circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E2D26]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DAA196]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <SectionLabel text="Depoimentos" light />
            <SectionTitle light>O que nossas clientes dizem</SectionTitle>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, stars }) => (
              <div
                key={name}
                className="bg-[#FDFDF3]/10 hover:bg-[#FDFDF3]/16 border border-[#FDFDF3]/12 rounded-3xl p-8 transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#DAA196] text-[#DAA196]" />
                  ))}
                </div>

                <div className="font-['Playfair_Display'] text-5xl text-[#DAA196]/50 leading-none mb-1 select-none">
                  &ldquo;
                </div>
                <p className="text-[#FDFDF3]/85 text-[13px] leading-relaxed mb-7 -mt-3">{text}</p>

                <DiamondRule className="mb-5 opacity-20" />

                <div>
                  <div className="font-['Playfair_Display'] text-[15px] font-semibold text-[#FDFDF3]">{name}</div>
                  <div className="text-[11px] text-[#DAA196] mt-0.5">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AGENDAMENTO
      ══════════════════════════════════════════════ */}
      <section id="agendar" className="py-24 lg:py-32 bg-[#FDFDF3]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-14">
            <CrownMark className="w-10 h-7 text-[#DAA196] mx-auto mb-5" />
            <SectionLabel text="Agendamento" />
            <SectionTitle className="max-w-xl mx-auto">
              Pronta para viver sua experiência de beleza?
            </SectionTitle>
            <p className="text-[#895144]/70 text-[14px] leading-relaxed max-w-md mx-auto mt-1">
              Agende seu horário e permita-se receber um cuidado especial.
            </p>
          </div>

          <div className="bg-[#F3EBE3] rounded-3xl p-8 md:p-12 border border-[#DAA196]/20 shadow-sm">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {/* Nome */}
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#895144] mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#FDFDF3] border border-[#DAA196]/30 rounded-xl px-4 py-3 text-[13px] text-[#4E2D26] placeholder:text-[#BF8780]/50 focus:outline-none focus:border-[#895144] transition-colors"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#895144] mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#FDFDF3] border border-[#DAA196]/30 rounded-xl px-4 py-3 text-[13px] text-[#4E2D26] placeholder:text-[#BF8780]/50 focus:outline-none focus:border-[#895144] transition-colors"
                />
              </div>

              {/* Serviço */}
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#895144] mb-2">
                  Serviço desejado
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-[#FDFDF3] border border-[#DAA196]/30 rounded-xl px-4 py-3 text-[13px] text-[#4E2D26] focus:outline-none focus:border-[#895144] transition-colors appearance-none"
                >
                  <option value="" disabled>Selecione um serviço</option>
                  <option>Cabelos</option>
                  <option>Design de Sobrancelhas</option>
                  <option>Depilação</option>
                  <option>Manicure e Pedicure</option>
                  <option>Maquiagem</option>
                  <option>Tratamentos de Beleza</option>
                </select>
              </div>

              {/* Data */}
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.18em] uppercase text-[#895144] mb-2">
                  Data preferida
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#FDFDF3] border border-[#DAA196]/30 rounded-xl px-4 py-3 text-[13px] text-[#4E2D26] focus:outline-none focus:border-[#895144] transition-colors"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#BF8780] text-center mb-8">
              * Retornaremos para confirmar a disponibilidade.
            </p>

            <div className="flex justify-center">
              <PrimaryBtn href="https://wa.me/5532986561500" className="!py-4 !px-10 text-[14px]">
                <WaIcon className="w-[17px] h-[17px]" />
                Agendar pelo WhatsApp
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="bg-[#4E2D26] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <CrownMark className="w-8 h-6 text-[#DAA196]" />
                <div>
                  <div className="font-['Playfair_Display'] text-[15px] font-semibold text-[#FDFDF3]">
                    Estilo Imperatriz
                  </div>
                  <div className="text-[9px] tracking-[0.18em] uppercase text-[#DAA196]">Hair & Beauty</div>
                </div>
              </div>
              <p className="text-[12px] text-[#DEBAB1]/65 leading-relaxed">
                Beleza com elegância e cuidado. Um espaço pensado para você se sentir extraordinária.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-['Playfair_Display'] text-[13px] font-semibold text-[#FDFDF3] mb-4">
                Links rápidos
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="text-[12px] text-[#DEBAB1]/60 hover:text-[#DAA196] transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-['Playfair_Display'] text-[13px] font-semibold text-[#FDFDF3] mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={12} className="text-[#DAA196] mt-0.5 shrink-0" />
                  <span className="text-[12px] text-[#DEBAB1]/65 leading-snug">
                    R. Antônio de Paula Mendes, 777<br />
                    Bandeirantes, Juiz de Fora – MG<br />
                    <span className="text-[#DEBAB1]/45">Próximo à padaria mercado</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={12} className="text-[#DAA196] mt-0.5 shrink-0" />
                  <span className="text-[12px] text-[#DEBAB1]/65 leading-snug">
                    +55 32 9865-6150<br />+55 32 9 99999-825
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={12} className="text-[#DAA196] mt-0.5 shrink-0" />
                  <span className="text-[12px] text-[#DEBAB1]/65 leading-snug">
                    Seg–Sex: 9h às 19h<br />Sábado: 9h às 17h
                  </span>
                </li>
              </ul>
            </div>

            {/* Redes */}
            <div>
              <h4 className="font-['Playfair_Display'] text-[13px] font-semibold text-[#FDFDF3] mb-4">
                Redes sociais
              </h4>
              <div className="flex gap-3 mb-5">
                <a
                  href="https://www.instagram.com/estiloimperatrizhairbeauty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-[#FDFDF3]/8 hover:bg-[#DAA196] rounded-full flex items-center justify-center transition-all duration-300 group border border-[#FDFDF3]/10"
                >
                  <Instagram size={14} className="text-[#DAA196] group-hover:text-[#FDFDF3] transition-colors" />
                </a>
                <a
                  href="https://wa.me/5532999999825"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 bg-[#FDFDF3]/8 hover:bg-[#DAA196] rounded-full flex items-center justify-center transition-all duration-300 group border border-[#FDFDF3]/10"
                >
                  <WaIcon className="w-3.5 h-3.5 text-[#DAA196] group-hover:text-[#FDFDF3] transition-colors" />
                </a>
              </div>
              <p className="text-[11px] text-[#DEBAB1]/50 leading-snug">
                @estiloimperatrizhairbeauty<br />Siga-nos e se inspire!
              </p>
            </div>
          </div>

          <DiamondRule className="mb-8 opacity-15" />

          <p className="text-center text-[11px] text-[#DEBAB1]/40">
            © 2025 Estilo Imperatriz — Hair & Beauty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
