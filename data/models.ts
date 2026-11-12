export type Model = {
  name: string;
  href?: string;
  description: string;
  price: string;
  image: string;
  logo: string;
};

export const models: Model[] = [
  {
    name: "Model Y L Premium",
    description: "Урт тэнхлэг хоорондын зайтай дунд оврын SUV",
    price: "$61,990-аас эхэлнэ",
    image: "/assets/images/model-y-l-premium.png",
    logo: "/assets/icons/card-logo-a.svg",
  },
  {
    name: "Model 3",
    description: "Спорт седан",
    price: "Сарын $439-өөс эхлэн лизингээр",
    image: "/assets/images/model-3.png",
    logo: "/assets/icons/card-logo-b.svg",
  },
  {
    name: "Model Y",
    href: "/model-y",
    description: "Дунд оврын SUV",
    price: "Сарын $499-өөс эхлэн лизингээр",
    image: "/assets/images/model-y.jpg",
    logo: "/assets/icons/card-logo-a.svg",
  },
];
