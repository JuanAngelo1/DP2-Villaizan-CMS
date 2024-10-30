"use client";

import { FAQ, Response } from "@web/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";

function FAQSPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    <>
      <section className="flex items-center justify-center py-16 text-center">
        <h1 className="font-['Abhaya_Libre'] text-4xl font-bold sm:text-5xl md:text-7xl">
          Preguntas frecuentes
        </h1>
      </section>
      <section>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Accordion type="multiple" className="w-full px-32">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="text-lg md:text-xl">
                <AccordionTrigger className="text-lg font-semibold md:text-xl">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent>{faq.respuest}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    </>
  );
}

export default FAQSPage;
