import type { ReactNode } from "react";

export const specColumns = ["Үзүүлэлт", "Model Y", "Model Y Premium", "Model Y L Premium", "Model Y Performance"];

type SpecRow = {
  label: ReactNode;
  values: [ReactNode, ReactNode, ReactNode, ReactNode];
};

const allWheelDrive = "Хос мотор, бүх дугуйн";
const rearScreen = "16″ төв, 8″ арын";
const basicWarranty = "4 жил эсвэл 50,000 миль";
const longWarranty = "8 жил эсвэл 120,000 миль";

export const specRows: SpecRow[] = [
  { label: "Хүрэх зай (EPA тооцоо)", values: ["517 км (321 миль)", "526 км (327 миль)", "534 км (332 миль)", "492 км (306 миль)"] },
  { label: "0–60 миль/цаг", values: ["6.8 сек", "4.3 сек", "4.4 сек", <>3.3 сек<sup>5</sup></>] },
  { label: "Дээд хурд", values: ["—", "—", "—", "249 км/ц (155 миль/ц)"] },
  { label: "Хөтлөгч", values: ["Арын дугуйн", allWheelDrive, allWheelDrive, allWheelDrive] },
  { label: "Суудал", values: ["5", <>7 хүртэл<sup>6</sup></>, "6 хүртэл", "5"] },
  { label: "Ачааны багтаамж", values: ["2,095 л (74 куб фут)", "2,152 л (76 куб фут)", "2,520 л (89 куб фут)", "2,152 л (76 куб фут)"] },
  { label: "Обуд", values: ["18″ эсвэл 19″", "19″ эсвэл 20″", "19″ эсвэл 20″", "21″"] },
  { label: "Дэлгэц", values: ["16″ төв", rearScreen, rearScreen, rearScreen] },
  { label: "Жин", values: ["1,842 кг", "2,029 кг", "2,092 кг", "2,026 кг"] },
  { label: "Урт", values: ["4,793 мм", "4,790 мм", "4,968 мм", "4,796 мм"] },
  { label: "Өргөн (толь эвхсэн)", values: ["1,981 мм", "1,981 мм", "1,981 мм", "1,981 мм"] },
  { label: "Өндөр", values: ["1,621 мм", "1,623 мм", "1,669 мм", "1,610 мм"] },
  { label: "Газраас өндөр", values: ["163 мм", "168 мм", "170 мм", "152 мм"] },
  { label: "Supercharging дээд чадал", values: ["225 кВт", "250 кВт", "250 кВт", "250 кВт"] },
  { label: <>15 минутад нэмэгдэх зай<sup>2</sup></>, values: ["257 км (160 миль)", "272 км (169 миль)", "277 км (172 миль)", "232 км (144 миль)"] },
  { label: <>Үндсэн баталгаа<sup>7</sup></>, values: [basicWarranty, basicWarranty, basicWarranty, basicWarranty] },
  { label: <>Батерей, хөтлөгчийн баталгаа<sup>7</sup></>, values: ["8 жил эсвэл 100,000 миль", longWarranty, longWarranty, longWarranty] },
];

export const specNotes = [
  "Засгийн газрын 5 одтой үнэлгээ нь АНУ-ын NHTSA байгууллагын New Car Assessment Program-д хамаарна.",
  "15 минутад нэмэгдэх зайг 105 км/ц (65 миль/ц) тогтмол хурдаар тооцсон. Бодит зай нь Supercharger-ийн төрөл, цаг агаар, хурд зэргээс хамаарч өөр байж болно.",
  "Full Self-Driving (Supervised) ашиглах үед жолооч байнга анхааралтай байх ёстой бөгөөд энэ нь машиныг автономит болгодоггүй.",
  "2026 оны 3-р сарын 25-ны байдлаарх 2026 оны загварын EPA MPGe өгөгдөл, 18 инчийн обудтай Model Y RWD-д үндэслэсэн.",
  "Эхний хөдөлгөөний (rollout) хугацааг хассан.",
  "Зөвхөн долоон суудлын тохиргоотой Model Y Premium бүх дугуйн хөтлөгчид байна.",
  "Баталгаа нь заасан жил эсвэл милийн аль нь түрүүлж хүрснээр дуусна.",
];

export const specSource = (
  <>
    Эх сурвалж:{" "}
    <a href="https://www.tesla.com/modely" className="underline">
      tesla.com/modely
    </a>
    , 2026 оны 11-р сарын 9. Км, литр, кг, мм утгуудыг миль, куб фут, фунт, инчээс хөрвүүлж, бүхэлчилсэн. Үзүүлэлтүүд өөрчлөгдөж болно.
  </>
);
