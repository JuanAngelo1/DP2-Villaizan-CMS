import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 p-24 py-8 text-white">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Información de la Empresa */}
          <div>
            <h4 className="mb-4 text-xl font-semibold">Heladería Villaizan</h4>
            <p className="text-gray-200">
              Disfruta de los mejores helados artesanales con una variedad de sabores únicos. ¡Endulza tu día
              con nosotros!
            </p>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="mb-4 text-xl font-semibold">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600"
              >
                {/* Ícono de Facebook */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600"
              >
                {/* Ícono de Twitter */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.916 4.916 0 0 0-8.38 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616c-.054 2.385 1.693 4.374 4.157 4.827a4.935 4.935 0 0 1-2.224.084c.626 1.956 2.444 3.377 4.6 3.419a9.867 9.867 0 0 1-6.102 2.105c-.396 0-.787-.023-1.17-.069a13.945 13.945 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600"
              >
                {/* Ícono de Instagram */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.07 5.771.127 4.647.333 3.678 1.301 2.71 2.27 2.504 3.393 2.447 4.674 2.39 5.954 2.377 6.363 2.377 12c0 5.637.013 6.046.07 7.326.057 1.281.263 2.404 1.232 3.373.969.969 2.092 1.175 3.373 1.232 1.28.057 1.689.07 7.326.07s6.046-.013 7.326-.07c1.281-.057 2.404-.263 3.373-1.232.969-.969 1.175-2.092 1.232-3.373.057-1.28.07-1.689.07-7.326s-.013-6.046-.07-7.326c-.057-1.281-.263-2.404-1.232-3.373-.969-.969-2.092-1.175-3.373-1.232C18.046.013 17.637 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
              {/* Añade más íconos de redes sociales según sea necesario */}
            </div>
          </div>
        </div>

        {/* Línea Divisoria */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Heladería Villaizan. Todos los derechos reservados.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
