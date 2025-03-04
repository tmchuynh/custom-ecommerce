import { RegistrationForm } from "@/components/registrationform";
import { GalleryVerticalEnd } from "lucide-react";
export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 lg:py-16 w-11/12 md:w-10/12 mx-auto">
      <div className="flex w-full flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <RegistrationForm />
      </div>
    </main>
  );
}
