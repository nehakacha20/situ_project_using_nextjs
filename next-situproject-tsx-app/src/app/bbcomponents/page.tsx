"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faBroom,
  faParking,
  faKitchenSet,
  faTv,
  faTable,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Card,
  CardBody,
  Heading,
  CardFooter,
  HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { id } from "date-fns/locale";
import styles from "./style.module.css";
import { color } from "framer-motion";
import About from "./about/page";

function PropertyList({ properties = [] }) {
  const router = useRouter();

  const handleSelectProperty = (id: string) => {
    router.push(`/bbcomponents/bbdetails/${id}`);
  };
  const handleAdminLink = () => {
    router.push(`/bbcomponents/admin`);
  };

  return (
    <>

      <Card mt={5}>
        <nav className={styles.navbar}>
          <ul className={styles.navMenu}>
            <li>
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/bbcomponents/bbdetails/South-Devon"
                className={styles.link}
              >
                South-Devon BnB
              </Link>
            </li>
            <li>
              <Link
                href="/bbcomponents/bbdetails/France"
                className={styles.link}
              >
                France BnB
              </Link>
            </li>
            <li>
              <Link
                href="bbcomponents/blog"
                className={styles.link}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="bbcomponents/about"
                className={styles.link}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </Card>

      <Card m={10} border="black">
        <Text
          fontFamily="cursive"
          fontSize="medium"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          "Experience the warmth and comfort of home, no matter where your
          travels take you. Welcome to BNB. Our cozy ambiance and thoughtful
          amenities ensure a relaxing and enjoyable stay. Whether it's a weekend
          getaway or an extended visit, BNB offers a sanctuary on the road,
          where you can unwind, recharge, and feel right at home."
        </Text>
      </Card>

      {properties.length > 0 ? (
        properties.map((info) => (
          <Card
            key={info.id}
            direction={{ base: "column", lg: "row" }}
            overflow="hidden"
            variant="outline"
            fontFamily="Poppins, sans-serif"

            mb={5}
            mt={5} 
            _hover={{
              backgroundColor: "green.500",
              color: "white",

              fontWeight: "bolder"

            }}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", md: "500px" }}
              src={info.imageLink[0]}
              alt={info.address}
            />

            <Stack>
              <CardBody >
                <Heading size="md" mb={5} fontSize="x-large">{info.type}</Heading>
               
                <Text py="2" lineHeight="1em" fontSize="small">
                  From £{info.price} per night
                </Text>
                <Text py="2" lineHeight="1em" fontSize="small">
                  {info.details}
                </Text>
                <Text py="2" lineHeight="1.5em" fontSize="small">
                  {info.description}
                </Text>

                <SimpleGrid columns={[2, 7]} spacing="40px" m={5}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faWifi} />
                    <Text fontSize="small">WiFi</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faBroom} />
                    <Text fontSize="small">Cleaning</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faParking} />
                    <Text fontSize="small">Parking</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faKitchenSet} />
                    <Text fontSize="small">Kitchen</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faTv} />
                    <Text fontSize="small">TV</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                  >
                    <FontAwesomeIcon icon={faTable} />
                    <Text fontSize="small">Dedicated Work Space</Text>
                  </Box>
                </SimpleGrid>
              </CardBody>

              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="green"
                  fontSize="large"
                  onClick={() => handleSelectProperty(info.id)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))
      ) : (
        <Text>Connecting to the server</Text>
      )}


      <nav className={styles.navbar}>
        <ul className={styles.navMenu}>
          <li>
            <Link href="/bbcomponents/admin" className={styles.link}>
              {" "}
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default PropertyList;
