import type { ReactNode } from "react";

import { Mnt } from "@/components/ui/Mnt";
import { Term } from "@/components/ui/Term";

export type Model = {
  name: string;
  /** Картын нэрний холбоос */
  href?: string;
  description: string;
  price: ReactNode;
  image: string;
  logo: string;
};

/** Нүүрний бүтэн дэлгэцийн хэсэг */
export type ModelPanel = {
  name: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  orderUrl: string;
  learnUrl: string;
};

export const models: Model[] = [
  {
    name: "Model Y L Premium",
    description: "Урт тэнхлэг хоорондын зайтай дунд оврын SUV",
    price: (
      <>
        $61,990-аас эхэлнэ <Mnt usd={61990} />
      </>
    ),
    image: "/assets/images/model-y-l-premium.png",
    logo: "/assets/icons/card-logo-a.svg",
  },
  {
    name: "Model 3",
    description: "Спорт седан",
    price: (
      <>
        Сарын $439-өөс эхлэн лизингээр <Mnt usd={439} />
      </>
    ),
    image: "/assets/images/model-3.png",
    logo: "/assets/icons/card-logo-b.svg",
  },
  {
    name: "Model Y",
    href: "/model-y",
    description: "Дунд оврын SUV",
    price: (
      <>
        Сарын $499-өөс эхлэн лизингээр <Mnt usd={499} />
      </>
    ),
    image: "/assets/images/model-y.jpg",
    logo: "/assets/icons/card-logo-a.svg",
  },
];

export const modelPanels: ModelPanel[] = [
  {
    name: "Model 3",
    description: (
      <>
        Ажил олгогчоор дамжих <Term id="lease">лизинг</Term> долоо хоногт $133-аас <Mnt usd={133} />, такси,{" "}
        <Term id="rideshare">райдшэйрийн</Term> зээл долоо хоногт $187-оос <Mnt usd={187} /> эхэлнэ
      </>
    ),
    image: "/assets/images/model-3.png",
    imageAlt: "Нуур, толгодын дэргэдэх замаар явж буй цагаан Model 3",
    orderUrl: "https://www.tesla.com/model3/design",
    learnUrl: "https://www.tesla.com/model3",
  },
  {
    name: "Model Y",
    description: (
      <>
        Дунд оврын цахилгаан SUV. <Term id="lease">Лизинг</Term> сарын $499-өөс <Mnt usd={499} />
      </>
    ),
    image: "/assets/images/model-y.jpg",
    imageAlt: "Улаан хадны дэргэдэх замаар явж буй мөнгөлөг Model Y",
    orderUrl: "https://www.tesla.com/modely/design",
    learnUrl: "/model-y",
  },
  {
    name: "Model Y L Premium",
    description: (
      <>
        Урт тэнхлэг хоорондын зайтай, 6 хүртэл суудалтай SUV. $61,990-аас <Mnt usd={61990} />
      </>
    ),
    image: "/assets/images/model-y-l-premium.png",
    imageAlt: "Цастай ойн дэргэдэх замаар явж буй, дээвэртээ ачаа тээгчтэй цагаан Model Y L Premium",
    orderUrl: "https://www.tesla.com/modely/design",
    learnUrl: "/model-y#specs",
  },
];
