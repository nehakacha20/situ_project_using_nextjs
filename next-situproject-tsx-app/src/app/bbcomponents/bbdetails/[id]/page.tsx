"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Stack,
  Flex,
  Card,
  CardBody,
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

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  if (!property) {
    return <Text>Property not found</Text>;
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navMenu}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <SimpleGrid>
        <Box bg="green.500" spacing={2}>
          <Box>
            <div className={styles.embla}>
              <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                  {property.imageLink &&
                    property.imageLink.map((link, index) => (
                      <div className={styles.embla__slide} key={index}>
                        <Image
                          src={link}
                          alt={`Property ${property.id} Image ${index + 1}`}
                          borderRadius="md"
                          boxShadow="md"
                          width="100%"
                          height="700"
                          backgroundColor="green"
                          mb={2}
                          objectFit="cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <button className={styles.embla__prev} onClick={scrollPrev}>
                Prev
              </button>
              <button className={styles.embla__next} onClick={scrollNext}>
                Next
              </button>
            </div>
          </Box>
          <Flex flexDirection={"row"}>
            <Box flex="1" mt={10} maxWidth="45%" spacing={2} p={5}>
              <Card backgroundColor="green.400" size="lg">
                <CardBody>
                  <Stack>
                    <Text fontSize="xl" fontWeight="bold">
                      Location: {property.address}
                    </Text>
                    <Text fontSize="xl">{property.hostedBy}</Text>
                    <Text fontSize="xl">Price: £{property.price} night</Text>
                    <Text fontSize="xl">Guest Size:{property.guestSize}</Text>
                    <Text fontSize="xl">Bedroom:{property.bedroom}</Text>
                    <Text fontSize="xl">Bed:{property.bed}</Text>
                    <Text fontSize="xl">Bathroom:{property.bathroom}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </Box>
            <Box flex="2" mt={10} spacing={2} p={5}>
              <EnquiryForm
                property={property}
                bookedRanges={[]}
                onFormSubmit={handleFormSubmit}
              />
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default PropertyDetails;
