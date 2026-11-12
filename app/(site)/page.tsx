import Image from "next/image";

import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { Hero } from "@/components/sections/Hero";
import { ModelCard } from "@/components/sections/ModelCard";
import { ModelSlider } from "@/components/sections/ModelSlider";
import { PromoCard } from "@/components/sections/PromoCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Stats } from "@/components/ui/Stats";
import { models } from "@/data/models";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/assets/images/hero.jpg"
        title="Model 3"
        description="Ажил олгогчоор дамжих лизинг долоо хоногт $133-аас⁵, такси/райдшэйрийн зээл долоо хоногт $187-оос эхэлнэ"
        preload
      >
        <Button href="#">Захиалах</Button>
        <Button href="#" variant="secondary">
          Дэлгэрэнгүй
        </Button>
      </Hero>

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
              <Button href="#" variant="secondary">
                Цаг авах
              </Button>
              <Button href="#" variant="link" chevron>
                Дэлгэрэнгүй
              </Button>
            </>
          }
        >
          <p className="text-medium">Аялал бүрийг илүү хялбар болгоно. Сарын $99-өөр захиалаарай.</p>
        </FeatureSplit>
      </Section>

      <Section id="models" wideGap>
        <SectionTitle title="Машины загварууд" description="Танд тохирох аялалын унаа" />
        <ModelSlider>
          {models.map((model) => (
            <ModelCard key={model.name} {...model} />
          ))}
        </ModelSlider>
      </Section>

      {/* Figma дахь хоосон 27px гарчиг ба 80px зайг хадгална */}
      <Section gray className="md:pt-[calc(var(--spacing-section-lg)+27px+80px)]">
        <div className="flex flex-col gap-8 lg:flex-row">
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
        </div>
      </Section>

      <Section gray wideGap center>
        <Image
          src="/assets/images/charging-map.png"
          alt="Tesla цэнэглэх станцуудын байршлыг харуулсан газрын зураг"
          width={1280}
          height={738}
          sizes="(min-width: 1408px) 1280px, 100vw"
          className="aspect-[1280/738] h-auto w-full rounded-card object-cover"
        />
        <div className="flex w-full max-w-large flex-col items-center gap-8">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="heading-2">Цэнэглэх цэгээ олоорой</h2>
            <p className="text-medium">
              Таны ойролцоох Tesla Supercharger болон Destination Charger цэнэглэх станцуудын байршлуудыг хараарай
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="#" variant="secondary">
              Сүлжээг үзэх
            </Button>
            <Button href="#" variant="link" chevron>
              Дэлгэрэнгүй
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-8 *:w-full *:flex-none md:flex-row md:gap-20 md:*:w-auto md:*:min-w-px md:*:flex-[1_0_0]">
          <h2 className="heading-3">Статистик</h2>
          <Stats
            items={[
              { value: "30,864", label: "Supercharger станц" },
              { value: "241", label: "Destination Charger станц" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
