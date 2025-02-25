import { Typography } from "@material-tailwind/react";
import { Button } from "../ui/button";

export function WidgetsExample7() {
  return (
    <section className="m-10">
      <div className="p-10 rounded-l-xl border border-blue-gray-100 bg-[url('/image/gradient-bg-1.png')] rounded-xl bg-no-repeat lg:bg-contain bg-cover bg-right">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold mb-2"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Upcoming Events
        </Typography>
        <Typography
          variant="h3"
          color="blue-gray"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Tech Summit: Shaping Tomorrow
        </Typography>
        <Typography
          className="mt-2 mb-6 !text-base font-normal text-gray-500"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Prepare to be part of dynamic conversations that will redefine the
          boundaries.
        </Typography>
        <Button variant="outline" className="flex-shrink-0">
          join now
        </Button>
      </div>
    </section>
  );
}
export default WidgetsExample7;
