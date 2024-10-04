import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Nosotros: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="flex h-[56rem] flex-col items-center justify-center gap-12 bg-red-600 p-24 text-white"
    >
      <MaxWidthWrapper className="h-full">
        <div className="grid h-full w-full grid-cols-1 items-stretch gap-12 md:grid-cols-2">
          {/* Misión */}
          <div className="text-start">
            <h2 className="mb-4 text-6xl">Misión</h2>
            <p className="text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum rutrum nunc a
              ultricies. Curabitur at tincidunt orci. In malesuada, ligula ac iaculis luctus, ligula ipsum
              malesuada eros, id semper arcu sem id est. Aenean vel fringilla risus. Fusce euismod urna a leo
              finibus consequat. Phasellus pharetra at neque sit amet vehicula. Praesent vestibulum iaculis
              leo, ut molestie nisl dictum nec.
            </p>
          </div>
          {/* Imagen de misión */}
          <div>
            <h2 className="mb-4 text-6xl"></h2>
          </div>
          {/* Imagen de visión */}
          <div>
            <h2 className="mb-4 text-6xl"></h2>
          </div>
          {/* Visión */}
          <div className="text-end">
            <h2 className="mb-4 text-6xl">Visión</h2>
            <p className="text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum rutrum nunc a
              ultricies. Curabitur at tincidunt orci. In malesuada, ligula ac iaculis luctus, ligula ipsum
              malesuada eros, id semper arcu sem id est. Aenean vel fringilla risus. Fusce euismod urna a leo
              finibus consequat. Phasellus pharetra at neque sit amet vehicula. Praesent vestibulum iaculis
              leo, ut molestie nisl dictum nec.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Nosotros;
