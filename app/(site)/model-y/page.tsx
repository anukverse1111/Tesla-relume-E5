import type { Metadata } from "next";

import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { Footnotes } from "@/components/sections/Footnotes";
import { Hero } from "@/components/sections/Hero";
import { SpecTable } from "@/components/sections/SpecTable";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stats } from "@/components/ui/Stats";
import { specNotes, specSource } from "@/data/model-y-specs";

export const metadata: Metadata = {
  title: "Model Y | Tesla",
  description: "Model Y дунд оврын цахилгаан SUV: хүрэх зай, аюулгүй байдал, хэмнэлт, хувилбаруудын техникийн үзүүлэлт.",
};

const designUrl = "https://www.tesla.com/modely/design";

export default function ModelYPage() {
  return (
    <>
      <Hero
        variant="detail"
        image="/assets/images/model-y/hero.jpg"
        title="Model Y"
        description="Дунд оврын цахилгаан SUV. Нэг цэнэглэлтээр 517 км (321 миль) хүртэл явна."
        preload
      >
        <Button href={designUrl}>Захиалах</Button>
        <Button href="#specs" variant="onImage">
          Үзүүлэлт харах
        </Button>
      </Hero>

      <Section wideGap>
        <SectionTitle title="Онцлох үзүүлэлт" description="Model Y-ийн суурь хувилбарын гол тоонууд" />
        <Stats
          columns={3}
          items={[
            { value: "517 км", label: "Хүрэх зай, EPA тооцоо (321 миль)" },
            { value: "5 од", label: <>Аюулгүй байдлын үнэлгээ<sup>1</sup></> },
            { value: "2,095 л", label: "Ачааны багтаамж (74 куб фут)" },
          ]}
        />
      </Section>

      <Section flushTop>
        <div className="flex flex-col gap-8 md:gap-12">
          <FeatureSplit
            tagline="Хүрэх зай"
            title="Танд хэрэгтэй бүх зай"
            image="/assets/images/model-y/range.jpg"
            imageAlt="Уулын хадан хажуугийн дагуух замаар явж буй цагаан Model Y"
            stats={
              <Stats
                columns={3}
                valueSize="h5"
                items={[
                  { value: "15 мин", label: <>257 км (160 миль) хүртэл цэнэглэнэ<sup>2</sup></> },
                  { value: "80,000+", label: "Дэлхий даяарх Supercharger" },
                  { value: "99%", label: "Supercharger-ийн ажиллах хувь" },
                ]}
              />
            }
          >
            <p className="text-medium">
              Нэг цэнэглэлтээр EPA тооцоогоор 517 км (321 миль) хүртэл явна. Урт замд Trip Planner таны маршрутад
              Supercharger-ийн зогсоолуудыг нэмж өгнө.
            </p>
          </FeatureSplit>

          <FeatureSplit
            reverse
            tagline="Аюулгүй байдал"
            title="Таны аюулгүй байдлын төлөө"
            image="/assets/images/model-y/safety.jpg"
            imageAlt="Model Y-ийн арын суудалд хүүхдээ суулгаж буй эцэг, нохой"
            actions={
              <Button href="https://www.tesla.com/safety" variant="link" chevron>
                Дэлгэрэнгүй
              </Button>
            }
          >
            <p className="text-medium">
              Tesla машин бүр цохилт шингээх бүс, хатуу бүтэцтэй бүхээг, олон аюулгүйн дэртэй. Урд мөргөлдөөний
              анхааруулга, идэвхтэй яаралтай тоормос, эгнээнээс гарахаас сэргийлэх систем стандартаар ирнэ.
            </p>
            <p className="text-medium">
              Full Self-Driving (Supervised) багцыг нэмж авах боломжтой<sup>3</sup>.
            </p>
          </FeatureSplit>

          <FeatureSplit
            tagline="Хэмнэлт"
            title="Хосгүй хэмнэлт"
            image="/assets/images/model-y/efficiency.jpg"
            imageAlt="Намрын ойн дэргэдэх замаар явж буй цагаан Model Y"
          >
            <p className="text-medium">
              Model Y бол АНУ-ын хамгийн хэмнэлттэй цахилгаан SUV<sup>4</sup>. Хэмнэлт өндөр байх тусам цэнэглэлтийн
              зардал цаг хугацааны явцад багасна.
            </p>
          </FeatureSplit>

          <FeatureSplit
            reverse
            tagline="Дизайн"
            title="Хүссэн бүхэн нэг дор"
            image="/assets/images/model-y/design.jpg"
            imageAlt="Нар жаргах үеэр хүмүүсийн дэргэд зогсож буй цагаан Model Y"
            stats={
              <Stats
                columns={3}
                valueSize="h5"
                items={[
                  { value: "5", label: "Суудал" },
                  { value: "2,095 л", label: "Ачааны зай" },
                  { value: "16″", label: "Төв мэдрэгчтэй дэлгэц" },
                ]}
              />
            }
          >
            <p className="text-medium">
              Хурц шугам, налуу дээвэр, аэродинамик хайлшин обудтай гадна загвар нь бага эрчим хүчээр илүү хол, илүү
              хурдан хүргэнэ.
            </p>
          </FeatureSplit>
        </div>
      </Section>

      <Section gray wideGap>
        <SectionTitle
          title="Бензин машинаас хямд"
          description="Model Y эзэмших нь ижил төстэй бензин машин эзэмшихээс ихэвчлэн бага зардалтай."
        />
        <FeatureGrid
          onGray
          items={[
            {
              title: "Цэнэглэлт хямд",
              text: "Цахилгаан ихэвчлэн бензинээс хямд байдаг. Шөнө гэртээ цэнэглэж, өглөө хангалттай зайтайгаар гарна.",
            },
            {
              title: "Засвар бага",
              text: "Тос солих, тохируулга хийх, утааны шалгалт өгөх шаардлагагүй. Шил угаагчийн шингэн нэмж, дугуйгаа сэлгэхэд л хангалттай.",
            },
            {
              title: "Солих эд анги цөөн",
              text: "Бензин хөдөлгүүр 1,000 гаруй хөдөлгөөнт эд ангитай бол Tesla-гийн хөтлөгч систем 20 орчимтой. Эд анги цөөн байх тусам засвар бага гарна.",
            },
          ]}
        />
      </Section>

      <Section wideGap>
        <SectionTitle title="Үргэлж холбоотой" description="Tesla апп-аар машинаа хаанаас ч хянаж, удирдана." />
        <FeatureGrid
          columns={4}
          items={[
            { title: "Алсын удирдлага", text: "Бүхээгийн температурыг явахаасаа өмнө тохируулна." },
            { title: "Phone Key", text: "Утсаараа машинаа нээж, алсаас цоожилж, тайлна." },
            { title: "Pet Mode", text: "Таныг байхгүй үед гэрийн тэжээвэр амьтныг тав тухтай байлгана." },
            { title: "Sentry Mode", text: "Машин зогсож байхад эргэн тойрныг нь хянана." },
          ]}
        />
      </Section>

      <Section id="specs" gray wideGap>
        <SectionTitle
          title="Хувилбаруудын харьцуулалт"
          description="АНУ-ын зах зээлд зарагдаж буй Model Y-ийн дөрвөн хувилбар"
        />
        <SpecTable />
        <Footnotes notes={specNotes} source={specSource} />
      </Section>

      <Hero
        variant="cta"
        image="/assets/images/model-y/cta.jpg"
        title="Model Y"
        titleAs="h2"
        description="Өөрт тохирох хувилбараа сонгоорой."
      >
        <Button href={designUrl}>Өөрийнхөөрөө загварчлах</Button>
        <Button href="/#test-drive" variant="onImage">
          Туршилтын жолоодлого
        </Button>
      </Hero>
    </>
  );
}
