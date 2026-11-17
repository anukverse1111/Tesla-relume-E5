import Image from "next/image";

import { HoverSurface } from "@/components/motion/HoverSurface";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollZoom } from "@/components/motion/ScrollZoom";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ModelCard } from "@/components/sections/ModelCard";
import { ModelPanel } from "@/components/sections/ModelPanel";
import { ModelStack } from "@/components/sections/ModelStack";
import { PromoCard } from "@/components/sections/PromoCard";
import { TipCards } from "@/components/sections/TipCards";
import { Button } from "@/components/ui/Button";
import { Mnt } from "@/components/ui/Mnt";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stats } from "@/components/ui/Stats";
import { Term } from "@/components/ui/Term";
import { usdToMnt } from "@/data/currency";
import { modelPanels } from "@/data/models";
import { getPublishedCarModels } from "@/lib/car-models";

const mongoliaTips = [
  {
    title: "Хүйтэнд хүрэх зай багасна",
    text: (
      <>
        Хүйтэнд батерей, бүхээгийг халаахад эрчим хүч нэмж зарцуулагддаг. Явахаасаа өмнө Tesla апп-аар{" "}
        <Term id="precondition">урьдчилан халаавал</Term> батерей бэлэн, бүхээг дулаан байна.
      </>
    ),
  },
  {
    title: "Цэнэглэгчид залгаатай байлга",
    text: "Боломжтой бол машинаа цэнэглэгчид залгаатай орхи. Залгаагүй үед цэнэгийг 50%-иас дээш байлгавал хүйтний нөлөө багасна. Дэлгэцэнд цэнхэр цасан ширхэг гарвал батерей хэт хүйтэн байна гэсэн үг.",
  },
  {
    title: "Гэртээ цэнэглэх",
    text: (
      <>
        <Term id="wallConnector" /> цагт 71 км хүртэл, Mobile Connector 240 В-ын залгуураас цагт 48 км хүртэл зай нэмнэ
        (АНУ-ын үзүүлэлт). Суурилуулахаасаа өмнө цахилгаанчинд шалгуулаарай.
      </>
    ),
  },
  {
    title: "Монголд хэрхэн авах вэ",
    text: "tesla.com-ын улсын жагсаалтад Монгол ороогүй тул Tesla-г импортоор авдаг. Энэ сайтын ₮ үнэ ойролцоо бөгөөд тээвэр, татвар ороогүй.",
  },
];

export default async function HomePage() {
  const models = await getPublishedCarModels();

  return (
    <div className="theme-dark">
      <HeroCarousel label="Tesla-гийн загварууд">
        {modelPanels.map((panel, index) => (
          <ModelPanel key={panel.name} {...panel} titleAs={index === 0 ? "h1" : "h2"} preload={index === 0} />
        ))}
      </HeroCarousel>

      <Section gray wideGap>
        <SectionTitle
          title="Монголын нөхцөлд"
          description="Улаанбаатарын хүйтэн өвөл, гэрийн цэнэглэлт, үнийн талаар хамгийн их асуудаг асуултууд."
        />
        {/* Эх сурвалж нь картуудад хамаарах тул тэдэнтэй ойрхон (16px), өөрийн хүрээтэй */}
        <div className="flex flex-col gap-4">
          <TipCards items={mongoliaTips} />
          <p className="rounded-control px-4 py-3 text-small text-white/70 ring-1 ring-white/12 ring-inset">
            Эх сурвалж:{" "}
            <a href="https://www.tesla.com/support/winter-driving-tips" className="underline">
              Tesla Winter Driving Tips
            </a>
            ,{" "}
            <a href="https://www.tesla.com/home-charging" className="underline">
              Tesla Home Charging
            </a>
            ,{" "}
            <a href={usdToMnt.url} className="underline">
              {usdToMnt.source} ({usdToMnt.date})
            </a>
            . Миль, цагийн утгыг км руу хөрвүүлж бүхэлчилсэн.
          </p>
        </div>
      </Section>

      <Section id="test-drive">
        <FeatureSplit
          tagline="Тоон үзүүлэлт"
          title="Туршилтын жолоодлого"
          image="/assets/images/test-drive.png"
          imageAlt="Tesla машины жолоочийн суудлаас харагдах дотор тал"
          stats={
            <Stats
              items={[
                { value: "7x", label: "Цөөн мөргөлдөөн" },
                { value: "17,035,000,000", label: "Туулсан миль" },
              ]}
            />
          }
          actions={
            <>
              <Button href="#">Цаг авах</Button>
              <Button href="#" variant="link" chevron>
                Дэлгэрэнгүй
              </Button>
            </>
          }
        >
          <p className="text-medium">
            Аялал бүрийг илүү хялбар болгоно. Сарын $99-өөр <Mnt usd={99} /> захиалаарай.
          </p>
        </FeatureSplit>
      </Section>

      {models.length > 0 && (
        // overflow-clip!: Section-ий overflow-hidden нь sticky картуудыг ажиллуулахгүй болгодог
        <Section id="models" wideGap className="overflow-clip!">
          <SectionTitle title="Машины загварууд" description="Танд тохирох аялалын унаа" />
          <ModelStack>
            {models.map((model, index) => (
              <ModelCard key={`${index}-${model.name}`} {...model} stacked />
            ))}
          </ModelStack>
        </Section>
      )}

      <Section gray>
        <Reveal className="flex flex-col gap-8 lg:flex-row">
          <PromoCard
            title="Онцгой урамшуулал"
            href="#"
            image="/assets/images/promo-offer.png"
            imageAlt="Tesla автомашинууд"
          />
          <PromoCard
            title="2026 оны хувьцаа эзэмшигчдийн хурал"
            description="Tesla-гийн ирээдүй таны гарт байна. Таны санал бидэнд чухал ."
            href="#"
            image="/assets/images/promo-shareholder.png"
            imageAlt="Хар дэвсгэр дээрх улаан Tesla автомашин"
          />
        </Reveal>
      </Section>

      <Section gray wideGap center>
        {/* Газрын зураг: доош гүйлгэхэд ойртож, хулганы ард гэрэл тусна (hero-тэй ижил spotlight) */}
        <HoverSurface className="spotlight relative w-full overflow-hidden rounded-card">
          <ScrollZoom>
            <Image
              src="/assets/images/charging-map.png"
              alt="Tesla цэнэглэх станцуудын байршлыг харуулсан газрын зураг"
              width={1280}
              height={738}
              sizes="(min-width: 1408px) 1280px, 100vw"
              className="scroll-zoom-media aspect-[1280/738] h-auto w-full object-cover"
            />
          </ScrollZoom>
        </HoverSurface>
        <Reveal className="flex w-full max-w-large flex-col items-center gap-8">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="heading-2">Цэнэглэх цэгээ олоорой</h2>
            <p className="text-medium">
              Таны ойролцоох Tesla <Term id="supercharger" /> болон <Term id="destinationCharger" /> цэнэглэх
              станцуудын байршлуудыг хараарай
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="https://www.tesla.com/findus" variant="secondary">
              Сүлжээг үзэх
            </Button>
            <Button href="#" variant="link" chevron>
              Дэлгэрэнгүй
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section>
        {/* Туршилтын жолоодлоготой ижил гэрэлтдэг гадаргуу, тоонууд 0-ээс тоолж гарна */}
        <HoverSurface className="glow-card overflow-hidden rounded-card bg-gray p-6 md:p-12">
          <Reveal className="flex flex-col items-start gap-8 *:w-full *:flex-none md:flex-row md:gap-20 md:*:w-auto md:*:min-w-px md:*:flex-[1_0_0]">
            <h2 className="heading-2">Статистик</h2>
            <Stats
              items={[
                { value: "30,864", label: <><Term id="supercharger" /> станц</> },
                { value: "241", label: <><Term id="destinationCharger" /> станц</> },
              ]}
            />
          </Reveal>
        </HoverSurface>
      </Section>
    </div>
  );
}
