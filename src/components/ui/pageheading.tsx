interface JobDetail {
  icon: React.ReactNode;
  text: string;
}

interface PageHeadingProps {
  title: string;
  jobDetails: JobDetail[];
  actions: React.ReactNode;
}

export default function PageHeading({
  title,
  jobDetails,
  actions,
}: PageHeadingProps) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          {jobDetails.map((detail, index) => (
            <div
              key={index}
              className="mt-2 flex items-center text-sm text-gray-500"
            >
              {detail.icon}
              {detail.text}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">{actions}</div>
    </div>
  );
}
