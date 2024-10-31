"use client";

import { FAQ, Response } from "@web/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Faqs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response: Response<FAQ[]> = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/faq`);
        if (response.data.status === "Error") throw new Error(response.data.message);
        setFaqs(response.data.result);
        console.log("FAQs -> ", response.data.result);
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="bg-red-600 px-4 py-24 text-white" id="faqs">
      <MaxWidthWrapper className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="flex text-center font-['Abhaya_Libre'] text-4xl sm:text-5xl md:text-7xl">
            Preguntas Frecuentes
          </h1>
          {/* Preguntas */}
          <Accordion type="single" collapsible className="w-full px-32">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="text-lg md:text-xl">
                <AccordionTrigger className="text-lg font-semibold md:text-xl">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent>{faq.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Faqs;
