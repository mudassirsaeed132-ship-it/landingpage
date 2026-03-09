// src/shared/ui/AppDownloadStrip.jsx
import React from "react";
import { IMG } from "../../config/images";
import Container from "./Container";

export default function AppDownloadStrip() {
  return (
    <section className="bg-[#F7E3E0] py-12">
      <Container className="grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-[#D66557]">
            Find amazing deals on the go.
          </p>
          <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
            Download Real estate app now!
          </h3>
        </div>

        <div className="flex justify-center">
          <img
            src={IMG.ui.appMock}
            alt="App mock"
            className="h-44 w-auto md:h-52"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <img
            src={IMG.ui.googlePlay}
            alt="Google Play"
            className="h-12 w-auto"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <img
            src={IMG.ui.appGallery}
            alt="AppGallery"
            className="h-12 w-auto"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </Container>
    </section>
  );
}