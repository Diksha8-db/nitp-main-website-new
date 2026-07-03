"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const carouselSlides = [
    { src: "/chem-labs/mass-transfer-lab.jpg", alt: "Chemical Science and Technology mass transfer lab" },
    { src: "/chem-labs/instrument-collage-2.jpg", alt: "Chemical Science and Technology teaching lab" },
    { src: "/chem-labs/reaction-engineering-lab.jpg", alt: "Chemical Science and Technology reaction engineering lab" },
    { src: "/chem-labs/energy-lab.jpg", alt: "Chemical Science and Technology energy resources utilization lab" },
    { src: "/chem-labs/lab.png", alt: "Chemical Science and Technology research labs" },
];


const mainLabSections = [
    {
      title: "Engineering Chemistry Lab",
      description:
        "The Engineering Chemistry Laboratory offers hands-on experience with basic chemical concepts and engineering-related analytical methods. Students carry out titration, water analysis, and coal studies experiments. The lab fosters the growth of experimental proficiency, data analysis skills, and an awareness of the function of chemistry in modern engineering and technology. It serves as a link between theoretical concepts and practical industrial applications.",
      attachments: [
        {
          label: "Details of equipment",
          href: "https://drive.google.com/file/d/1FdU0qJM0p8ZqiKcjqXsOhwQ2NfDZOwrN/view?usp=sharing",
        }
      ],
      images: [
        { src: "/chem-labs/lab.png", alt: "Engineering Chemistry Teaching Lab " },
        { src: "/chem-labs/instrument-collage-1.jpg", alt: "Engineering Chemistry Lab Instruments" }
      ],
      align:"left",
    },
    {
      title: "Chemical Technology Lab and PhD Teaching Lab",
      description:
        "The Chemical Technology Lab and PhD Teaching Lab provide comprehensive training in chemical processes, material synthesis, purification, and characterization techniques. These labs provide practical experience in reaction engineering, separation procedures, and analytical techniques, supporting both advanced curriculum and research endeavours.",
      attachments: [
        {
          label: "Details of equipment",
          href: "https://drive.google.com/file/d/1u0p0vQ8a5wk9eAdT35NqYLT1Shv4w-4t/view?usp=sharing",
        }
      ],
      images: [
        { src: "/chem-labs/mass-transfer-lab.jpg", alt: "Chemical Technology Lab and PhD Teaching Lab " },
        { src: "/chem-labs/energy-lab.jpg", alt: "Chemical Technology Lab and PhD Teaching Lab Equipments" }
      ],
    },
    {
      title: "Instrument Lab",
      description:
        "The Instrument Laboratory has state-of-the-art characterisation and analytical tools for environmental, material, and chemical studies. It gives researchers and students practical experience with complex equipment operation, data collection, and experimental result evaluation. The laboratory facilitates accurate material measurement and characterisation, which supports teaching, research, and consulting activities. It is essential to the growth of technical proficiency and the advancement of superior scientific research.",
      attachments: [
        {
          label: "Details of equipment",
          href: "https://drive.google.com/file/d/1Z-Qpxl1TJcrYrrOKdhWQJ-raj-tSyNL4/view?usp=sharing",
        }
      ],
      align:"left",
      images: [
        { src: "/chem-labs/research-hall.jpg", alt: "Instrument Lab " },
        { src: "/chem-labs/instrument-collage-2.jpg", alt: "Instrument Lab Equipments" }
      ],
    },
    {
      title: "Heat Transfer Lab and Fluid Flow Operation Lab",
      description:
        "The Heat Transfer and Fluid Flow Operations Laboratory offer a hands-on understanding of basic transport phenomena that arise in the chemical and process industries. Through practical experiments in the lab, students can learn about heat transfer mechanisms, fluid flow behaviour, pressure drop, flow measurement, and equipment performance. It fosters the development of abilities in data analysis, process optimisation, and engineering design while bridging theoretical ideas with practical implementations. The facility is a vital resource for learning the foundations of chemical engineering operations and processes.",
      attachments: [
        {
          label: "Details of equipment",
          href: "https://drive.google.com/file/d/1vrD4fbWIbM4NFr5PR1a_Ok6-2SXO35P1/view?usp=sharing",
        }
      ],
      images: [
        { src: "/chem-labs/reaction-engineering-lab.jpg", alt: "Heat Transfer Lab and Fluid Flow Operation Lab" },
        { src: "/chem-labs/reaction-vessel.jpg", alt: "Heat Transfer Lab and Fluid Flow Operation Lab Equipment" }
      ],
    },
  {
    title: "Mass Transfer Lab",
    description:
      "The Mass Transfer Laboratory offers hands-on experience with the diffusion and separation processes that are essential to the chemical and process industries. To comprehend mass transfer mechanisms and equipment performance, students conduct experiments on processes like distillation, absorption, extraction, drying, and adsorption. The lab fosters the development of skills in process analysis, design, and optimization while bridging theoretical ideas with practical industrial applications. It is a crucial resource for understanding separation technologies used in the environmental, pharmaceutical, chemical, and petrochemical sectors. The laboratory is equipped with a wide range of equipment like Vapour in Air Diffusion Apparatus, Solid in Air Diffusion Apparatus, Simple Batch Distillation Column, Sieve Plate Distillation Column, Forced Draft Tray Dryer, Humidification and Dehumidification Setup, Experimental Water-Cooling Tower, Vapour Liquid Equilibrium Setup etc.",

  },
  {
    title: "Chemical Reaction Engineering Lab",
    description:
      "The Chemical Reaction Engineering Laboratory offers practical experience in reactor design, process performance, and chemical reaction kinetics. In order to comprehend reaction rates, conversion, residence time distribution, and reactor behaviour under varied operating settings, students undertake experiments on a variety of reactor types. The lab fosters the development of abilities in data analysis, process modelling, and reactor optimization while bridging theoretical ideas with industrial chemical processes. It provides a basis for comprehending and creating effective chemical production systems. The laboratory is equipped with a wide range of equipment like Batch Reactor, Isothermal Semi Batch Reactor - Peristaltic Pump Feed System, Continuous Stirred Tank Reactor - Peristaltic Pump Feed System, Plug Flow Tubular Reactor - Straight Tube Type - Peristaltic Pump Feed System, Combined Flow Reactor - plug flow reactor followed by CSTR - Peristaltic Pump Feed System etc.",
  },
  {
    title: "Energy Resources Utilization Lab",
    description:
      "The Energy Resources Utilization Laboratory offers hands-on instruction in the effective conversion, use, and administration of both renewable and traditional energy sources. Students learn energy systems, fuel characterisation, combustion processes, and energy efficiency technologies through practical experience. The lab fosters comprehension of sustainable energy practices and their industrial uses. It encourages education and research with the goal of tackling today's energy problems and encouraging ecologically conscious energy use. The laboratory is equipped with a wide range of equipment like Hot Air Oven, Muffle Furnace, Bomb Calorimeter, Cloud and Pour Point Apparatus, Flat plate or evacuated tube solar water heater, Saybolt viscometer, Pensky Marten Flash and fire Point Apparatus, Reid Vapour Pressure Apparatus etc.",
  },
];

const researchAreas = [
  "Green Synthesis Lab (Dr. Tasneem Parvin)",
  "Applied Chemistry Lab (Dr. Subrata Das)",
  "Biophysical Chemistry Lab (Dr. Niki Sweta Jha)",
  "Inorganic Lab (Dr. Mukesh Choudhary)",
  "Supramolecular Materials Lab (Dr. Suvankar Dasgupta)",
  "Synthetic Research Lab (Dr. Khursheed Ahmad)",
];

function LabSection({ title, description, image, imageAlt, attachments, align = "right", groups, images }) {
  const isImageLeft = align === "left";
  const imageList = images?.length ? images : image ? [{ src: image, alt: imageAlt || title }] : [];

  return (
    <section className="mb-12 rounded-3xl border border-red-100 bg-white/90 shadow-[0_18px_50px_rgba(127,29,29,0.08)] backdrop-blur-sm">
      <div className={`grid gap-8 px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-8 ${imageList.length ? `lg:grid-cols-[1.15fr_0.85fr] ${isImageLeft ? "lg:[direction:rtl]" : ""}` : "grid-cols-1"}`}>
        <div className={`space-y-4 ${isImageLeft && imageList.length ? "lg:[direction:ltr]" : ""}`}>
          <h3 className="text-2xl font-bold text-red-900 sm:text-3xl">{title}</h3>
          <p className="whitespace-pre-line text-justify text-sm leading-7 text-slate-700 sm:text-base">{description}</p>
          {attachments?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {attachments.map((attachment) => (
                <a
                  key={attachment.label}
                  href={attachment.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-red-800 px-4 py-2 text-sm font-medium text-red-800 transition hover:bg-red-800 hover:text-white"
                >
                  <Download size={14} className="mr-2" />
                  {attachment.label}
                </a>
              ))}
            </div>
          ) : null}
          {groups?.length ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {groups.map((group) => (
                <div
                  key={group}
                  className="rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
                >
                  {group}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {imageList.length ? (
          <div className={`flex items-center justify-center ${isImageLeft ? "lg:[direction:ltr]" : ""}`}>
            <div className={`grid w-full gap-4 ${imageList.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {imageList.map((item) => (
                <div key={item.src} className="relative w-full overflow-hidden rounded-2xl border border-red-100 bg-rose-50 shadow-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={700}
                    height={500}
                    className="h-[240px] w-full object-cover sm:h-[300px]"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


export default function ChemLabsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setActiveSlide((current) => (current === 0 ? carouselSlides.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % carouselSlides.length);
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(243,244,246,0.92))] px-4 pb-10 pt-6 sm:px-8 lg:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mt-3 text-3xl font-black tracking-tight text-red-900 sm:text-5xl">Labs</h1>
        </div>

        <div className="mb-10 overflow-hidden rounded-[2rem] border border-red-100 bg-white shadow-[0_24px_70px_rgba(127,29,29,0.14)]">
          <div className="relative h-[260px] sm:h-[360px] lg:h-[470px]">
            <Image
              src={carouselSlides[activeSlide].src}
              alt={carouselSlides[activeSlide].alt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/65"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/65"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-white backdrop-blur-sm sm:px-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    Image {activeSlide + 1} of {carouselSlides.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  {carouselSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/60"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* <TeachingLabsSection /> */}

          {mainLabSections.map((section) => (
            <LabSection key={section.title} {...section} />
          ))}

          <LabSection
            title="Research Labs"
            description="The Research Labs support faculty and student research projects in various areas of Chemical Science and Technology, providing facilities for synthesis, analysis, and advanced experimentation."
            groups={researchAreas}
          />
        </div>
      </div>
    </div>
  );
}
