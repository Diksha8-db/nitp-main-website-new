"use client";

import { AcadProgramCard } from "./AcadProgramCard";
const programs = [
  {
    title: "Dual Degree in Chemical Technology",
    degree: "B.Tech And M.Tech Dual Degree",
    duration: "5 Years",
    description:
      "The Department of Chemical Science and Technology offers the 5-year integrated B.Tech and M.Tech Dual Degree program in Chemical Technology. Admission to the program is granted through the prestigious IIT-JEE (Main) examination. The curriculum comprises a blend of core courses and electives, allowing students to tailor their studies to specific areas of interest. The following are the course structure and syllabus.",
    attachments: [
      {
        label: "Curriculum and Syllabus 2023 onwards",
        href: "https://drive.google.com/file/d/14IFke4roJfAJUD5jRTeBfLl-vGjefz3u/view?usp=sharing",
      },
      {
        label: "Curriculum and Syllabus 2024 onwards",
        href: "https://drive.google.com/file/d/12M1WTGQu_cwWZ2hsXZosLQrjVUBuUWCB/view?usp=sharing",
      },
      {
        label: "Curriculum and Syllabus 2025 onwards",
        href: "https://drive.google.com/file/d/18rQnrzbRAnRHP975xi_ppG_-pskrhDaJ/view?usp=sharing",
      },
    ],
  },
  {
    title: "PhD Courses",
    degree: "Ph.D.",
    duration: "",
    description:
      "The Department offers a PhD program, with admissions based on an entrance examination and interview conducted by NIT Patna. This is a research-intensive program where students carry out independent research in a specialized area of Chemical Science and Technology under the mentorship of faculty members.",
  },
];

const cheAcadProgrampage = () => {
  return (
    <div>
      <div className="py-1 mt-2">
        <div className="xs:px-0 w-[90%] mx-auto">
          <div className="w-full">
            <h2 className="text-center text-4xl text-red-700 mt-2">
              Academic Programs
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {programs.map((program, index) => (
                <AcadProgramCard program={program} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cheAcadProgrampage;
