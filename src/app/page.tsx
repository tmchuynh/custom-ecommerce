import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Create the screens
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              your visitors deserve to see
            </div>
            <p className="mt-0 mb-4 line-height-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Button type="button" className="mr-3 p-button-raised">
              Test
            </Button>
            <Button type="button" className="p-button-outlined">
              Test
            </Button>
          </section>
        </div>
      </div>
    </>
  );
}
