import { PageHeadingProps } from "@/lib/interfaces";

export default function PageHeading({
  title,
  description,
  jobDetails,
  actions,
}: PageHeadingProps) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-12 mb-5">
      <div className="min-w-0 flex-1">
        <h2 className="font-bold text-foreground sm:truncate text-3xl tracking-tight">
          {title}
        </h2>
        {description && (
          <h3 className="text-foreground sm:truncate text-lg font-light tracking-tight">
            {description}
          </h3>
        )}
        {jobDetails && (
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {jobDetails.map((detail, index) => (
              <div
                key={index}
                className="mt-2 flex items-center text-sm text-accent tracking-tighter"
              >
                {detail.icon}
                {detail.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {actions && <div className="mt-5 flex lg:mt-0 lg:ml-4">{actions}</div>}
    </div>
  );
}
