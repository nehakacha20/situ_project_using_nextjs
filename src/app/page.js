"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import PropertyList from "./bb/page";

export default function Home() {
  const [propertyInformation, setPropertyInformation] = useState([]);

  useEffect(() => {
    async function fetchDataFromServer() {
      try {
        const response = await fetch("/data.json");
        const informations = await response.json();
        setPropertyInformation(informations);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
    fetchDataFromServer();
  }, []);

  return (
    <>
      <Box>
        <Box p={5}>
          <PropertyList properties={propertyInformation} />
        </Box>
      </Box>
    </>
  );
}
