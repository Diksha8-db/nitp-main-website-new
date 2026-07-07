export const AcadProgramCard = ({ program }) => {
  return (
    <div className="w-full rounded-xl border-2 border-red-800 bg-white p-4 shadow-sm transition-all hover:shadow-lg md:p-6 flex flex-col justify-between h-full">
      <div>
        {program.title ? (
          <h3 className="mb-3 text-xl font-semibold text-start text-red-800 md:text-2xl">
            {program.title}
          </h3>
        ) : null}
        {program.degree ? (
          <p className="mb-1 text-base text-gray-600">
            <strong>Degree:</strong> <span className="font-semibold text-black">{program.degree}</span>
          </p>
        ) : null}
        {program.duration ? (
          <p className="mb-3 text-sm text-gray-600">
            <strong>Duration:</strong> <span className="font-semibold text-black">{program.duration}</span>
          </p>
        ) : null}
        {program.description ? (
          <p className="text-base leading-7 text-gray-700 text-justify">
            {program.description}
          </p>
        ) : null}
      </div>
      {program.attachments?.length ? (
        <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {program.attachments.map((attachment) => (
            <a
              key={attachment.label}
              href={attachment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-red-800 px-4 py-2 text-center text-sm font-medium text-red-800 transition hover:bg-red-800 hover:text-white flex-1 min-w-[200px]"
            >
              {attachment.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};