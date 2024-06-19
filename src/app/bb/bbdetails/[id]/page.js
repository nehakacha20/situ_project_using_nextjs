"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";
import EnquiryForm from "../../enquiryform/page";

const PropertyDetails = () => {

  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const response = await fetch("/data.json");
        const properties = await response.json();
        const foundProperty = properties.find((p) => p.id === id);
        setProperty(foundProperty);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
    fetchPropertyData();
  }, [id]);

  if (!property) {
    return <Text>Property not found</Text>;
  }
  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  return (
    <Box p={5} bg='green.500'>
      <Flex flexDirection={"row"}>
        <Box p={5} maxWidth="40%">
          {property.imageLink && (
            <SimpleGrid columns={1} spacing={2}>
              {property.imageLink.map((link, index) => (
                <Box>
                  <Image
                    key={index}
                    src={link}
                    alt={`Property ${property.id} Image ${index + 1}`}
                    borderRadius="md"
                    boxShadow="md"
                    width="100%"
                    height="500"
                    mb={2}
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box flex="1"  p={50} maxWidth="25%">
          <Stack spacing={5}>
            <Text fontSize="xl" fontWeight="bold">
              Location: {property.address}
            </Text>
            <Text fontSize="xl">{property.hostedBy}</Text>
            <Text fontSize="xl">price: £{property.price} night</Text>
            <Text fontSize="xl">{property.guestSize}</Text>
            <Text fontSize="xl">{property.bedroom}</Text>
            <Text fontSize="xl">{property.bed}</Text>
            <Text fontSize="xl">{property.bathroom}</Text>
          </Stack>
        </Box>

        <Box flex='2' flexDirection='column' mt={10}>
          <EnquiryForm
            property={property}
            bookedRanges={[]}
            onFormSubmit={handleFormSubmit}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default PropertyDetails;
