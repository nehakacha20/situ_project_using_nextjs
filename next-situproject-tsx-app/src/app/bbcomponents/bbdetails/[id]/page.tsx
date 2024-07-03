"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
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
  UnorderedList,
  ListItem,
  HStack,
  Avatar
} from "@chakra-ui/react";
import EnquiryForm from "../../enquiryform/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBathtub,
  faBed,
  faBedPulse,
  faBroom,
  faBucket,
  faCalendar,
  faCalendarCheck,
  faDoorClosed,
  faHome,
  faKitchenSet,
  faMale,
  faParking,
  faSliders,
  faTowerCell,
  faTrowel,
  faTrowelBricks,
  faWalkieTalkie,
  faWarehouse,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [slide, setSlide] = useState(0);

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

  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  if (!property) {
    return <Text>Connecting to server</Text>;
  }

  const nextSlide = () => {
    setSlide(slide === property.imageLink.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? property.imageLink.length - 1 : slide - 1);
  };

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

      <Box p={5}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-evenly"
        >
          <Box display="flex" flex="70%" mr={{ md: 10 }}>
            <div className={styles.carousel}>
              <BsArrowLeftCircleFill
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={prevSlide}
              />
              {property.imageLink.map((link, index) => (
                <Image
                  src={link}
                  alt={`Slide ${index}`}
                  key={index}
                  display={slide === index ? "block" : "none"}
                  className={
                    slide === index
                      ? styles.slide
                      : `${styles.slide} ${styles.slideHidden}`
                  }
                  width="100%"
                  height="auto"
                />
              ))}
              <BsArrowRightCircleFill
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={nextSlide}
              />
              <span className={styles.indicators}>
                {property.imageLink.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSlide(index)}
                    className={
                      slide === index
                        ? styles.indicatorActive
                        : styles.indicator
                    }
                  ></button>
                ))}
              </span>
            </div>
          </Box>

          <Box flex="30%">
            <EnquiryForm
              property={property}
              bookedRanges={[]}
              onFormSubmit={handleFormSubmit}
            />
          </Box>
        </Flex>
        <Box m={5}>
          <Flex direction={{ base: "column", md: "row" }} justifyContent="space-evenly">
            <Box display="flex" flex="70%" mr={{ md: 10 }}>
              <Card m={5}>
                <Text

                  color="black"
                  fontSize="large"
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                  p={5}
                  fontFamily="Poppins, sans-serif"
                >
                  Overview <br />
                  {property.overview}
                </Text>
              </Card>
            </Box>
            <Box display="flex" flex="30%" mr={{ md: 10 }}>
              <Card size="lg">
                <CardBody fontSize="xx-large" fontFamily="Poppins, sans-serif" color="black">
                  <Stack spacing={4}>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                      <FontAwesomeIcon icon={faDoorClosed} />
                      <Text fontSize="medium">
                        {property.checkIn}!!<br /> Check yourself in with the lockbox.
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                      <FontAwesomeIcon icon={faMale} />
                      <Text fontSize="medium">
                        {property.hostedBy} is a super host. <br /> Superhosts are experienced, highly rated Hosts.
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                      <FontAwesomeIcon icon={faCalendarCheck} />
                      <Text fontSize="medium">
                        {property.cancelation} <br /> Get a full refund if you change your mind.
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Box>

          </Flex>

          <Text fontSize="x-large" m={8}>What this place offers</Text>
          <Flex>
            <SimpleGrid columns={[2, 4]} spacing="40px" m={5}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faHome} size="lg" />
                <Text fontSize="large">Entire home</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faBed} size="lg" />
                <Text fontSize="large">{property.bedroom} bedroom</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faBathtub} size="lg" />
                <Text fontSize="large">{property.bathroom} bathroom</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faWifi} size="lg" />
                <Text fontSize="large">Wi-Fi</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faKitchenSet} size="lg" />
                <Text fontSize="large">Fully Equipped Kitchen</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faParking} size="lg" />
                <Text fontSize="large">On-Site</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faTrowelBricks} size="lg" />
                <Text fontSize="large">Linen And Towels</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faBucket} size="lg" />
                <Text fontSize="large">Cleaning</Text>
              </Box>
            </SimpleGrid>
          </Flex>
        </Box>
        <Text fontSize="x-large" m={5}> <strong>{property.rating}</strong> Total <strong>{property.review}</strong> Reviews!! </Text>
        <Flex direction="column" align="center" >
          <SimpleGrid columns={[1, null, 2]} spacing="40px" m={5}>
            {property.ratings.map((rating, index) => (
              <Box key={index} className={styles.reviewBox}>
                <Flex alignItems="center" gap={4}>
                  <Avatar name={rating.name} src={rating.avatar} />
                  <Text fontWeight="bold">{rating.name}</Text>
                </Flex>
                <Text>Rating: {rating.rating} stars</Text>
                <Text>{rating.date}</Text>
                <Text>{rating.review}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
};

export default PropertyDetails;
