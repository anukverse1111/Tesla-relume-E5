import type { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/layout/Logo";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ModelCard } from "@/components/sections/ModelCard";
import { ModelSlider } from "@/components/sections/ModelSlider";
import { PromoCard } from "@/components/sections/PromoCard";
import { MotionRow } from "@/components/styleguide/MotionRow";
import { DemoBox, SgH3, SgNote, SgRow, SgSection, Swatch, Tile } from "@/components/styleguide/primitives";
import { SectionPreview } from "@/components/styleguide/SectionPreview";
import { ContrastRatio, ResponsiveTokens, TokenValue } from "@/components/styleguide/tokens";
import { TypeSpecimen } from "@/components/styleguide/TypeSpecimen";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stats } from "@/components/ui/Stats";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Styleguide | Tesla",
  description: "Tesla сайтын токен, компонент, хөдөлгөөний сан.",
};

const nav = [
  ["principles", "Зарчим"],
  ["brand", "Брэнд"],
  ["color", "Өнгө"],
  ["type", "Үсэг"],
  ["spacing", "Зай"],
  ["shape", "Хэлбэр"],
  ["stroke", "Шугам"],
  ["shade", "Сүүдэр, бүрхүүл"],
  ["icons", "Дүрс"],
  ["components", "Компонент"],
  ["sections", "Хэсгүүд"],
  ["motion", "Хөдөлгөөн"],
] as const;

const number = (id: (typeof nav)[number][0]) =>
  String(nav.findIndex(([key]) => key === id) + 1).padStart(2, "0");

const principles = [
  ["Хар, цагаан, нэг цэнхэр", "Дэвсгэр цагаан ба саарал, бичвэр хар. Цэнхэр өнгө зөвхөн гол товч ба focus-д хэрэглэгдэнэ."],
  ["Inter нэг гэр бүл", "Гарчиг 500, бичвэр 400, tagline 600 жинтэй. Roboto зөвхөн загварын картын тайлбарт."],
  ["Дэлгэц бүрт токен", "Үсгийн хэмжээ, зай 768 ба 992px дээр :root токеноор солигдоно. Компонентын код өөрчлөгдөхгүй."],
  ["Зураг гол дүр", "Hero, карт зургаараа бүтэн дүүрч, 40% бараан давхарга бичвэрийг уншигдуулна."],
];

const colors = [
  ["--color-black", "Үндсэн бичвэр, гарчиг, идэвхтэй цэг"],
  ["--color-white", "Хуудасны дэвсгэр, зураг дээрх бичвэр"],
  ["--color-gray", "Саарал хэсэг, карт, slider-ийн сум"],
  ["--color-royal-blue", "Гол товч, focus ring"],
  ["--color-black-5", "Хоёрдогч товчны дэвсгэр"],
];

const contrasts = [
  ["Бичвэр · цагаан дээр", "--color-black", "--color-white"],
  ["Бичвэр · саарал дээр", "--color-black", "--color-gray"],
  ["Гол товчны бичвэр", "--color-white", "--color-royal-blue"],
  ["Focus ring · цагаан дээр", "--color-royal-blue", "--color-white"],
];

const typeScale = ["--text-small", "--text-regular", "--text-medium", "--text-h5", "--text-h3", "--text-h2", "--text-h1"];
const responsiveType = ["--text-h1", "--text-h2", "--text-h3", "--text-h5"];
const responsiveSpace = ["--spacing-page", "--spacing-section-lg", "--spacing-section-md", "--spacing-card-gap"];

const spaceScale = [
  [2, "Stat доторх зай, slider-ийн цэг"],
  [3, "Navbar мөр хоорондын зай (утас)"],
  [4, "Гарчгийн блок, Hero-ийн товч"],
  [6, "Stats, гарчиг ба тайлбар"],
  [8, "Карт хоорондын зай, FeatureSplit"],
  [12, "FeatureSplit-ийн дотор зай"],
  [20, "Гарчиг ба агуулгын зай"],
] as const;

const layoutTokens = [
  ["--spacing-page", "Хуудасны хажуугийн зай"],
  ["--spacing-section-lg", "Хэсгийн дээд, доод зай"],
  ["--spacing-section-md", "Footer-ийн дээд, доод зай"],
  ["--spacing-card-gap", "Slider-ийн карт хоорондын зай"],
  ["--spacing-card-width", "Загварын картын өргөн"],
  ["--container-site", "Агуулгын дээд өргөн"],
  ["--container-large", "Гарчиг, Hero-ийн агуулгын өргөн"],
  ["--container-small", "Footer-ийн холбоосны өргөн"],
  ["--breakpoint-md", "Tablet, md: угтвар"],
  ["--breakpoint-lg", "Desktop, lg: угтвар"],
];

const icons = [
  ["arrow-back", 24, 24],
  ["arrow-forward", 24, 24],
  ["chevron-right", 24, 24],
];

const buttonVariants = [
  ["primary", "Гол үйлдэл: Захиалах."],
  ["secondary", "Цайвар дэвсгэр дээрх хоёрдогч."],
  ["onImage", "Зураг дээрх хоёрдогч."],
  ["link", "Дэлгэрэнгүй холбоос. chevron-оор сумтай."],
  ["size=\"sm\"", "Navbar-ын жижиг товч."],
];

const structural = [
  ["Navbar, NavLinks, Footer, Logo", "components/layout/"],
  ["Section", "components/ui/Section.tsx · gray, flushTop, wideGap, center"],
  ["Hero", "components/sections/Hero.tsx · home | detail | cta"],
  ["FeatureSplit", "components/sections/FeatureSplit.tsx · reverse, stats, actions"],
  ["SpecTable, Footnotes", "components/sections/ · data/model-y-specs.tsx"],
];

const allPages = [
  ["Navbar", "body > header", "components/layout/Navbar.tsx"],
  ["Footer", "body > footer", "components/layout/Footer.tsx"],
];

const homeSections = [
  ["Hero", "Hero · home"],
  ["Туршилтын жолоодлого", "FeatureSplit, Stats"],
  ["Машины загварууд", "SectionTitle, ModelSlider, ModelCard"],
  ["Урамшуулал", "PromoCard"],
  ["Цэнэглэх цэг", "app/(site)/page.tsx"],
  ["Статистик", "Stats"],
];

const modelYSections = [
  ["Hero", "Hero · detail"],
  ["Онцлох үзүүлэлт", "SectionTitle, Stats"],
  ["Онцлох боломжууд", "FeatureSplit · reverse"],
  ["Бензин машинаас хямд", "FeatureGrid · 3 багана"],
  ["Үргэлж холбоотой", "FeatureGrid · 4 багана"],
  ["Хувилбаруудын харьцуулалт", "SpecTable, Footnotes"],
  ["Дуудлага", "Hero · cta"],
];

const motions = [
  ["Товчны hover", "opacity 1 → 0.8", "Button.tsx", "Hover", "150ms ease"],
  ["Slider-ийн гүйлт", "translateX, карт + зай", "ModelSlider.tsx", "Сум, цэг дарах", "400ms ease"],
  ["Идэвхтэй цэг", "opacity 0.2 → 1", "ModelSlider.tsx", "Карт солигдох", "200ms ease"],
  ["Холбоосны hover", "text-decoration: underline", "NavLinks.tsx, ModelCard.tsx", "Hover", "Шууд, transition байхгүй"],
];

const durations = [
  ["duration-150", "150ms", "Товчны hover"],
  ["duration-200", "200ms", "Slider-ийн идэвхтэй цэг"],
  ["duration-400", "400ms", "Slider-ийн гүйлт"],
];

const sectionGrid = "mb-4 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]";
const tileGrid = "grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]";
const sampleText = "Нэг цэнэглэлтээр 517 км явна";
const longSample = "Өглөө эрт гарч, үдэш хол хүрнэ. Өдөр бүрийн аялал илүү хялбар, хэмнэлттэй болно.";

export default function StyleguidePage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-6 border-b border-black/15 bg-white/90 px-page py-3 backdrop-blur-md">
        <Logo className="w-24 justify-start md:w-[120px]" />
        <div className="grid gap-0.5">
          <span className="text-[12px] tracking-[0.08em] text-black/60 uppercase">Design system</span>
          <span className="font-semibold">Styleguide</span>
        </div>
        <div className="ml-auto hidden md:block">
          <Button href="/" variant="secondary" size="sm">
            Сайт руу буцах
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-12 px-page lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Styleguide-ийн хэсгүүд">
          <ol className="flex gap-5 overflow-x-auto py-4 whitespace-nowrap lg:sticky lg:top-22 lg:grid lg:gap-0.5 lg:overflow-visible lg:py-8">
            {nav.map(([id, label], index) => (
              <li key={id}>
                <a href={`#${id}`} className="flex gap-3 py-1.5 text-small text-black/60 hover:text-black">
                  <span className="pt-0.5 text-[11px]">{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main className="min-w-0 pt-4 pb-24 lg:pt-12 lg:pb-36">
          <h1 className="heading-1">Tesla дизайн систем</h1>
          <p className="mt-6 max-w-[680px] text-black/60">
            Сайтын бодит CSS-ээс шууд зурагдсан токен, компонент, хөдөлгөөний сан. Өнгө, хэмжээ, зайн утгыг хөтөч дотроос
            уншдаг тул <code>app/globals.css</code> өөрчлөгдөхөд энэ хуудас автоматаар шинэчлэгдэнэ. Компонентууд нь сайтад
            ашиглагдаж буй яг тэр файлууд.
          </p>

          <SgSection id="principles" number={number("principles")} title="Зарчим">
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
              {principles.map(([title, text]) => (
                <article key={title} className="rounded-card bg-gray p-6">
                  <h3 className="mb-2 font-semibold">{title}</h3>
                  <p className="text-small text-black/60">{text}</p>
                </article>
              ))}
            </div>
          </SgSection>

          <SgSection id="brand" number={number("brand")} title="Брэнд">
            <ul className={`${tileGrid} mb-4`}>
              <li className="grid justify-items-center gap-8 rounded-card bg-gray px-6 pt-12 pb-4">
                <img src="/assets/icons/logo-tesla-wordmark.svg" alt="Tesla лого, саарал дэвсгэр дээр" width={342} height={35} className="h-auto w-40" />
                <span className="text-[12px] text-black/60">Цайвар дээр · хар</span>
              </li>
              <li className="grid justify-items-center gap-8 rounded-card bg-black px-6 pt-12 pb-4">
                <img src="/assets/icons/logo-tesla-wordmark.svg" alt="Tesla лого, хар дэвсгэр дээр" width={342} height={35} className="h-auto w-40 brightness-0 invert" />
                <span className="text-[12px] text-white/70">Бараан дээр · цагаан</span>
              </li>
              <li className="has-overlay grid justify-items-center gap-8 overflow-hidden rounded-card px-6 pt-12 pb-4">
                <Image src="/assets/images/hero.jpg" alt="" fill sizes="320px" className="object-cover" />
                <img src="/assets/icons/logo-tesla-wordmark.svg" alt="Tesla лого, зураг дээр" width={342} height={35} className="relative z-1 h-auto w-40 brightness-0 invert" />
                <span className="relative z-1 text-[12px] text-white/80">Зураг дээр · цагаан</span>
              </li>
            </ul>
            <SgNote>
              <code>public/assets/icons/logo-tesla-wordmark.svg</code>. Navbar, footer дээр 120px, утсан дээр 96px өргөнтэй.
            </SgNote>
          </SgSection>

          <SgSection id="color" number={number("color")} title="Өнгө">
            <SgH3>
              Үндсэн токен · <code>globals.css</code>
            </SgH3>
            <SgNote>Hex-ийн ард цагаан дэвсгэртэй харьцуулсан contrast эсвэл тунгалаг байдлын хувь бичигдсэн.</SgNote>
            <ul className="grid gap-x-4 gap-y-6 rounded-card border border-black/15 p-6 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
              {colors.map(([name, usage]) => (
                <Swatch key={name} name={name} usage={usage} />
              ))}
            </ul>

            <SgH3>Contrast</SgH3>
            <SgNote>Сайт дээр бодитоор хэрэглэгддэг бичвэр, дэвсгэрийн хосууд. 16px бичвэрт AA түвшин 4.5:1 шаарддаг.</SgNote>
            <ul>
              {contrasts.map(([label, foreground, background]) => (
                <SgRow key={label} name={label}>
                  <span className="mr-3 inline-block rounded-[4px] px-2 py-0.5" style={{ color: `var(${foreground})`, background: `var(${background})`, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" }}>
                    Аа Өө
                  </span>
                  <span className="font-mono text-[12px]">
                    <ContrastRatio foreground={foreground} background={background} nonText={label.startsWith("Focus")} />
                  </span>
                </SgRow>
              ))}
            </ul>
          </SgSection>

          <SgSection id="type" number={number("type")} title="Үсэг">
            <SgH3>Үсгийн гэр бүл</SgH3>
            <ul>
              <li className="grid items-center gap-2 border-b border-black/15 py-4 md:grid-cols-2 md:gap-6">
                <span className="text-[32px] leading-[1.2]">Аа Өө Үү 0123</span>
                <span className="grid gap-0.5 text-small text-black/60">
                  <strong className="text-black">Inter</strong>
                  400, 500, 600 жинтэй. Гарчиг, бичвэр, товч, цэс.
                </span>
              </li>
              <li className="grid items-center gap-2 border-b border-black/15 py-4 md:grid-cols-2 md:gap-6">
                <span className="font-roboto text-[32px] leading-[1.2]">Аа Өө Үү 0123</span>
                <span className="grid gap-0.5 text-small text-black/60">
                  <strong className="text-black">Roboto</strong>
                  400 жинтэй. Зөвхөн загварын картын тайлбар.
                </span>
              </li>
            </ul>

            <SgH3>Хэмжээний шатлал</SgH3>
            <SgNote>Утга нь одоогийн дэлгэцийн өргөнд тохирсон. Цонхоо багасгавал өөрчлөгдөнө.</SgNote>
            <ul>
              {typeScale.map((name) => (
                <li key={name} className="grid items-baseline gap-1 border-b border-black/15 py-3 md:grid-cols-[130px_70px_minmax(0,1fr)] md:gap-4">
                  <span className="font-mono text-[13px]">{name}</span>
                  <span className="font-mono text-[12px] text-black/60">
                    <TokenValue name={name} />
                  </span>
                  <span className="overflow-hidden leading-[1.2] font-medium tracking-[-0.01em] text-ellipsis whitespace-nowrap" style={{ fontSize: `var(${name})` }}>
                    {sampleText}
                  </span>
                </li>
              ))}
            </ul>

            <SgH3>Дэлгэцээр өөрчлөгдөх хэмжээ</SgH3>
            <ResponsiveTokens names={responsiveType} />

            <SgH3>Мөрийн өндөр</SgH3>
            <ul>
              {[
                ["1.2", "heading-1, 2, 3"],
                ["1.4", "heading-5"],
                ["1.5", "Бичвэр, тайлбар"],
              ].map(([value, usage]) => (
                <li key={value} className="grid items-center gap-2 border-b border-black/15 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-5">
                  <span className="grid gap-0.5 text-[12px]">
                    <span className="font-mono">{value}</span>
                    <span className="text-black/60">{usage}</span>
                  </span>
                  <p
                    className="max-w-[420px] text-small [background:repeating-linear-gradient(transparent_0_calc(1lh-1px),rgba(0,0,0,0.15)_calc(1lh-1px)_1lh)]"
                    style={{ lineHeight: value }}
                  >
                    {longSample}
                  </p>
                </li>
              ))}
            </ul>

            <SgH3>Үсэг хоорондын зай</SgH3>
            <ul>
              {[
                ["-0.01em", "Бүх heading"],
                ["0", "Бичвэр, товч, цэс"],
              ].map(([value, usage]) => (
                <li key={value} className="grid items-center gap-2 border-b border-black/15 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-5">
                  <span className="grid gap-0.5 text-[12px]">
                    <span className="font-mono">{value}</span>
                    <span className="text-black/60">{usage}</span>
                  </span>
                  <span className="text-[20px] font-medium" style={{ letterSpacing: value }}>
                    {sampleText}
                  </span>
                </li>
              ))}
            </ul>

            <SgH3>Бичвэрийн хэв маяг</SgH3>
            <div className="rounded-card border border-black/15">
              <TypeSpecimen className="heading-1" label=".heading-1">Model Y</TypeSpecimen>
              <TypeSpecimen className="heading-2" label=".heading-2">Машины загварууд</TypeSpecimen>
              <TypeSpecimen className="heading-3" label=".heading-3">Статистик</TypeSpecimen>
              <TypeSpecimen className="heading-5" label=".heading-5">Онцгой урамшуулал</TypeSpecimen>
              <TypeSpecimen className="text-medium" label=".text-medium">Танд тохирох аялалын унаа</TypeSpecimen>
              <TypeSpecimen className="font-semibold" label=".font-semibold · tagline">Хүрэх зай</TypeSpecimen>
              <TypeSpecimen label="body">Өндөр хэмнэлт, бага засвар.</TypeSpecimen>
              <TypeSpecimen className="font-roboto text-medium" label=".font-roboto · картын тайлбар">Дунд оврын SUV</TypeSpecimen>
              <TypeSpecimen className="text-small" label=".text-small · footer, тэмдэглэл">Бүх эрх хуулиар хамгаалагдсан.</TypeSpecimen>
            </div>
          </SgSection>

          <SgSection id="spacing" number={number("spacing")} title="Зай">
            <SgH3>
              Шатлал · <code>--spacing</code> 4px
            </SgH3>
            <ul className="grid gap-4">
              {spaceScale.map(([step, usage]) => (
                <li key={step} className="grid items-center gap-1 md:grid-cols-[90px_60px_auto_minmax(0,1fr)] md:gap-4">
                  <span className="font-mono text-[13px]">gap-{step}</span>
                  <span className="font-mono text-[12px] text-black/60">{step * 4}px</span>
                  <span className="block rounded-[2px] bg-royal-blue" style={{ width: `calc(var(--spacing) * ${step})`, height: `calc(var(--spacing) * ${step})` }} />
                  <span className="text-[12px] text-black/60">{usage}</span>
                </li>
              ))}
            </ul>

            <SgH3>Байршил</SgH3>
            <ul>
              {layoutTokens.map(([name, usage]) => (
                <SgRow key={name} name={name}>
                  <code className="block text-[12px]">
                    <TokenValue name={name} />
                  </code>
                  <span className="text-black/60">{usage}</span>
                </SgRow>
              ))}
            </ul>

            <SgH3>Дэлгэцээр өөрчлөгдөх зай</SgH3>
            <ResponsiveTokens names={responsiveSpace} />
          </SgSection>

          <SgSection id="shape" number={number("shape")} title="Хэлбэр">
            <ul className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
              {[
                ["--radius-card", "rounded-card", "Карт, зураг, хүснэгт"],
                ["0", "rounded-none", "Товч, сум, Hero"],
                ["50%", "rounded-full", "Slider-ийн цэг"],
              ].map(([name, shape, usage]) => (
                <li key={name} className="grid content-start gap-1">
                  <span className={`mb-2 h-28 border border-black/15 bg-gray ${shape}`} />
                  <span className="font-mono text-[12px] font-semibold">
                    {name}
                    {name.startsWith("--") && (
                      <>
                        {" · "}
                        <TokenValue name={name} />
                      </>
                    )}
                  </span>
                  <span className="text-[12px] text-black/60">{usage}</span>
                </li>
              ))}
            </ul>
          </SgSection>

          <SgSection id="stroke" number={number("stroke")} title="Шугам">
            <ul className={tileGrid}>
              <Tile title="Hairline" spec="1px black 15% · хүснэгтийн мөр">
                <span className="block h-px w-3/4 bg-black/15" />
              </Tile>
              <Tile title="Divider" spec="divider.svg, 1px · footer">
                <img src="/assets/icons/divider.svg" alt="" width={1280} height={1} className="h-px w-3/4" />
              </Tile>
              <Tile title="Товчны хүрээ" spec="1px, өндрөө хадгалахаар padding 1px-ээр багассан">
                <Button href="#stroke">Захиалах</Button>
              </Tile>
              <Tile title="Сумны хүрээ" spec="1px white, саарал дэвсгэртэй">
                <span className="border border-white bg-gray p-[11px]">
                  <img src="/assets/icons/arrow-forward.svg" alt="" width={24} height={24} />
                </span>
              </Tile>
              <Tile title="Focus ring" spec="2px --color-royal-blue, offset 2px · :focus-visible">
                <span className="px-4 py-2 outline-2 outline-offset-2 outline-royal-blue">Focus</span>
              </Tile>
            </ul>
          </SgSection>

          <SgSection id="shade" number={number("shade")} title="Сүүдэр, бүрхүүл">
            <SgH3>Бүрхүүл</SgH3>
            <ul className={tileGrid}>
              <Tile title="has-overlay" spec="#000 · 40% · Hero, загварын карт">
                <span className="has-overlay absolute inset-0">
                  <Image src="/assets/images/hero.jpg" alt="" fill sizes="320px" className="object-cover" />
                </span>
                <span className="relative z-1 font-medium text-white">Зураг дээрх бичвэр</span>
              </Tile>
              <Tile title="onImage товч" spec="#fff · 20% · зураг дээрх хоёрдогч товч">
                <Image src="/assets/images/hero.jpg" alt="" fill sizes="320px" className="object-cover" />
                <span className="relative z-1">
                  <Button href="#shade" variant="onImage">Үзүүлэлт харах</Button>
                </span>
              </Tile>
              <Tile title="--color-black-5" spec="#000 · 5% · хоёрдогч товч">
                <Button href="#shade" variant="secondary">Цаг авах</Button>
              </Tile>
            </ul>

            <SgH3>Сүүдэр</SgH3>
            <SgNote>Сайтад drop shadow хэрэглэдэггүй. Гүн мэдрэмжийг зураг, бүрхүүл, саарал гадаргуу өгдөг.</SgNote>
          </SgSection>

          <SgSection id="icons" number={number("icons")} title="Дүрс">
            <SgNote>
              Figma-аас экспортолсон SVG файлууд, <code>public/assets/icons/</code>. <code>&lt;img&gt;</code>-ээр орох тул өнгө
              нь файл дотроо тогтмол.
            </SgNote>
            <ul className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(130px,1fr))]">
              {icons.map(([name, width, height]) => (
                <li key={name} className="grid justify-items-center gap-1 rounded-card bg-gray px-2 py-6 text-center">
                  <img src={`/assets/icons/${name}.svg`} alt="" width={Number(width)} height={Number(height)} className="mb-3" />
                  <span className="font-mono text-[11px]">{name}</span>
                  <span className="text-[12px] text-black/60">{width}px</span>
                </li>
              ))}
              {["card-logo-a", "card-logo-b"].map((name) => (
                <li key={name} className="grid justify-items-center gap-1 rounded-card bg-black px-2 py-6 text-center text-white">
                  <img src={`/assets/icons/${name}.svg`} alt="" width={120} height={48} className="mb-1 h-auto w-20" />
                  <span className="font-mono text-[11px]">{name}</span>
                  <span className="text-[12px] text-white/70">120×48px</span>
                </li>
              ))}
            </ul>
          </SgSection>

          <SgSection id="components" number={number("components")} title="Компонент">
            <SgH3>
              Button · <code>components/ui/Button.tsx</code>
            </SgH3>
            <SgNote>Булан 0, Inter 500 16px, padding 10×24. Hover үед 80% тунгалаг болно.</SgNote>
            <DemoBox className="flex flex-wrap items-center gap-4">
              <Button href="#components">Захиалах</Button>
              <Button href="#components" variant="secondary">Дэлгэрэнгүй</Button>
              <Button href="#components" variant="link" chevron>Дэлгэрэнгүй</Button>
              <Button href="#components" size="sm">Туршилтын жолоодлого</Button>
            </DemoBox>
            <div className="has-overlay mb-4 flex flex-wrap gap-4 overflow-hidden rounded-card p-6 md:p-8">
              <Image src="/assets/images/hero.jpg" alt="" fill sizes="1000px" className="object-cover" />
              <div className="relative z-1 flex flex-wrap gap-4">
                <Button href="#components">Захиалах</Button>
                <Button href="#components" variant="onImage">Үзүүлэлт харах</Button>
              </div>
            </div>
            <ul>
              {buttonVariants.map(([name, usage]) => (
                <SgRow key={name} name={name}>
                  <span className="text-black/60">{usage}</span>
                </SgRow>
              ))}
            </ul>

            <SgH3>
              Stats · <code>components/ui/Stats.tsx</code>
            </SgH3>
            <SgNote>
              <code>valueSize</code>: h2 | h5, <code>columns</code>: 2 | 3. Гурван багана утсан дээр нэг багана болно.
            </SgNote>
            <DemoBox>
              <Stats items={[{ value: "30,864", label: "Supercharger станц" }, { value: "241", label: "Destination Charger станц" }]} />
            </DemoBox>
            <DemoBox gray>
              <Stats
                columns={3}
                valueSize="h5"
                items={[
                  { value: "15 мин", label: "257 км хүртэл цэнэглэнэ" },
                  { value: "80,000+", label: "Дэлхий даяарх Supercharger" },
                  { value: "99%", label: "Supercharger-ийн ажиллах хувь" },
                ]}
              />
            </DemoBox>

            <SgH3>
              SectionTitle · <code>components/ui/SectionTitle.tsx</code>
            </SgH3>
            <DemoBox>
              <SectionTitle title="Машины загварууд" description="Танд тохирох аялалын унаа" />
            </DemoBox>

            <SgH3>
              FeatureGrid · <code>components/sections/FeatureGrid.tsx</code>
            </SgH3>
            <SgNote>
              <code>columns</code>: 3 | 4. Саарал дэвсгэр дээр <code>onGray</code> өгөхөд карт цагаан болно.
            </SgNote>
            <DemoBox gray>
              <FeatureGrid
                onGray
                items={[
                  { title: "Цэнэглэлт хямд", text: "Шөнө гэртээ цэнэглэж, өглөө хангалттай зайтайгаар гарна." },
                  { title: "Засвар бага", text: "Тос солих, утааны шалгалт өгөх шаардлагагүй." },
                  { title: "Эд анги цөөн", text: "Эд анги цөөн байх тусам засвар бага гарна." },
                ]}
              />
            </DemoBox>

            <SgH3>
              ModelCard, ModelSlider · <code>components/sections/</code>
            </SgH3>
            <SgNote>Сум, цэгийг дарж үзээрэй. Сүүлийн картаас эхний карт руу эргэлдэнэ.</SgNote>
            <DemoBox>
              <ModelSlider>
                {models.map((model) => (
                  <ModelCard key={model.name} {...model} />
                ))}
              </ModelSlider>
            </DemoBox>

            <SgH3>
              PromoCard · <code>components/sections/PromoCard.tsx</code>
            </SgH3>
            <DemoBox gray>
              <div className="flex flex-col gap-8 lg:flex-row">
                <PromoCard title="Онцгой урамшуулал" href="#components" image="/assets/images/promo-offer.png" imageAlt="Tesla автомашинууд" />
                <PromoCard
                  title="Хувьцаа эзэмшигчдийн хурал"
                  description="Таны санал бидэнд чухал."
                  href="#components"
                  image="/assets/images/promo-shareholder.png"
                  imageAlt="Хар дэвсгэр дээрх улаан Tesla автомашин"
                />
              </div>
            </DemoBox>

            <SgH3>Бүтцийн компонентууд</SgH3>
            <SgNote>Эдгээрийн бодит харагдах байдал дараагийн хэсэгт байна.</SgNote>
            <ul>
              {structural.map(([name, path]) => (
                <SgRow key={name} name={name}>
                  <code className="text-[12px] text-black/60">{path}</code>
                </SgRow>
              ))}
            </ul>
          </SgSection>

          <SgSection id="sections" number={number("sections")} title="Хэсгүүд (sections)">
            <SgNote>Хэсэг бүр бодит хуудаснаас шууд, 1440px өргөнөөр харагдана. Хуудас өөрчлөгдөхөд энд мөн өөрчлөгдөнө.</SgNote>
            <SgH3>Бүх хуудас</SgH3>
            <ul className={sectionGrid}>
              {allPages.map(([title, selector, source]) => (
                <SectionPreview key={title} page="/" selector={selector} title={title} source={source} />
              ))}
            </ul>
            <SgH3>
              Нүүр · <code>/</code>
            </SgH3>
            <ul className={sectionGrid}>
              {homeSections.map(([title, source], index) => (
                <SectionPreview key={title} page="/" selector={`main > section:nth-of-type(${index + 1})`} title={title} source={source} />
              ))}
            </ul>
            <SgH3>
              Model Y · <code>/model-y</code>
            </SgH3>
            <ul className={sectionGrid}>
              {modelYSections.map(([title, source], index) => (
                <SectionPreview key={title} page="/model-y" selector={`main > section:nth-of-type(${index + 1})`} title={title} source={source} />
              ))}
            </ul>
          </SgSection>

          <SgSection id="motion" number={number("motion")} title="Хөдөлгөөн">
            <SgNote>
              Сайт дээр ажиллаж буй бүх хөдөлгөөн. <code>prefers-reduced-motion</code> асаалттай үед transition зогсоно.
            </SgNote>
            <SgH3>Сайт дээрх хөдөлгөөн</SgH3>
            <ul className="grid gap-2">
              {motions.map(([name, change, where, trigger, timing]) => (
                <li key={name} className="grid gap-2 rounded-card bg-gray p-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
                  <span className="font-semibold">{name}</span>
                  <dl className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-4 gap-y-1 text-small">
                    <dt className="text-black/60">Өөрчлөлт</dt>
                    <dd>{change}</dd>
                    <dt className="text-black/60">Үүсгэгч</dt>
                    <dd>{trigger}</dd>
                    <dt className="text-black/60">Хугацаа</dt>
                    <dd>{timing}</dd>
                    <dt className="text-black/60">Хаана</dt>
                    <dd className="font-mono text-[12px]">{where}</dd>
                  </dl>
                </li>
              ))}
            </ul>

            <SgH3>
              Easing · <code>--default-transition-timing-function</code>
            </SgH3>
            <SgNote>Мөрөн дээр дарж тоглуулна.</SgNote>
            <MotionRow name="ease" value="cubic-bezier(.25, .1, .25, 1)" usage="Сайтын бүх transition" duration="400ms" />

            <SgH3>Duration</SgH3>
            <ul className="grid gap-2">
              {durations.map(([name, value, usage]) => (
                <li key={name}>
                  <MotionRow name={name} value={value} usage={usage} duration={value} />
                </li>
              ))}
            </ul>
          </SgSection>
        </main>
      </div>
    </>
  );
}
