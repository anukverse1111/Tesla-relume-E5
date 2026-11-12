import { Logo } from "./Logo";

const footerLinks = [
  "Tesla @2026",
  "Нууцлал ба эрх зүй",
  "Машины эргүүлэн татлага",
  "Холбоо барих",
  "Мэдээ",
  "Шинэ мэдээлэл",
  "Байршил",
];

const legalLinks = ["Нууцлал", "Үйлчилгээний нөхцөл", "Cookies"];

export function Footer() {
  return (
    <footer className="bg-white px-page py-section-md">
      <div className="mx-auto flex w-full max-w-site flex-col items-center gap-12 md:gap-20">
        <div className="flex w-full max-w-small flex-col items-center gap-8">
          <Logo className="w-24 justify-start md:w-[120px] md:justify-center" />
          <nav
            aria-label="Хөлийн цэс"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-small font-semibold md:gap-8 md:whitespace-nowrap"
          >
            {footerLinks.map((label) => (
              <a key={label} href="#">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          {/* divider.svg нь preserveAspectRatio="none" тул өргөнөөр сунгахад зөв */}
          <img src="/assets/icons/divider.svg" alt="" width={1280} height={1} className="-mt-px h-px w-full" />
          <div className="flex w-full flex-col gap-4 text-small md:flex-row md:justify-between md:gap-0">
            <p>© 2025 Tesla. Бүх эрх хуулиар хамгаалагдсан.</p>
            <div className="flex flex-wrap gap-6 md:flex-nowrap">
              {legalLinks.map((label) => (
                <a key={label} href="#" className="underline">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
