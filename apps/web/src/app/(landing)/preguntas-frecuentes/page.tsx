"use client";

import { FAQ, Response } from "@web/types";
import axios from "axios";
import { useEffect, useState } from "react";

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
      } catch (error) {
        console.error("Ups! Algo salio mal -> ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <h1>Preguntas Frecuentes</h1>
    </div>
  );
}

export default FAQSPage;
