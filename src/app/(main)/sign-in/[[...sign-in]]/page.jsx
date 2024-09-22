import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white z-50 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="bg-auth inset-0 relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:relative lg:block lg:p-12">
            <Image
              src={"/images/Logo4.png"}
              alt="Los inmaduros roller Madrid"
              width={200}
              height={40}
            />

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {`Bienvenido a "Los inmaduros roller Madrid" 🛼`}
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Cada ruta, una nueva historia sobre ruedas.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}