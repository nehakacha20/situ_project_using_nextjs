"use client";

import React from "react";
import { Box, Button, SimpleGrid, Stack, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { id } from "date-fns/locale";
import styles from "./style.module.css";

export default function PropertyList({ properties = [] }) {
  const router = useRouter();

  const handleSelectProperty = (id: string) => {
    router.push(`/bbcomponents/bbdetails/${id}`);
  };
  const handleAdminLink = () => {
    router.push(`/bbcomponents/admin`);
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

          <li>
            <Link
              href="/bbcomponents/bbdetails/South-Devon"
              className={styles.link}
            >
              South-Devon BnB
            </Link>
          </li>
          <li>
            <Link href="/bbcomponents/bbdetails/France" className={styles.link}>
              France BnB
            </Link>
          </li>
          <li>
            <Link href="/bbcomponents/admin" className={styles.link}>
              Admin
            </Link>
          </li>
        </ul>
      </nav>

      <Text textAlign="center" color="darkgreen">
        Welcome to BNB{" "}
      </Text>
      <Text
        color="green.600"
        fontFamily="cursive"
        fontSize="xx-large"
        textAlign="center"
      >
        {" "}
        Feels Like Your Home !!
      </Text>
      <SimpleGrid minChildWidth="120px" spacing="40px" p={10}>
        {properties.length > 0 ? (
          properties.map((info) => (
            <Box
              display="-ms-grid"
              key={info.id}
              borderWidth="10px"
              borderRadius="5g"
              borderColor="green"
              overflow="hidden"
            >
              {info.imageLink && (
                <Image
                  src={info.imageLink[0]}
                  alt={info.address}
                  width="100%"
                  height="500px"
                  objectFit="fill"
                />
              )}
              <Stack spacing={3} p={5}>
                <Text fontSize="xl" fontWeight="bold">
                  {info.address}
                </Text>
                <Button
                  onClick={() => handleSelectProperty(info.id)}
                  mb={5}
                  backgroundColor="green"
                  color="white"
                >
                  view details
                </Button>
              </Stack>
            </Box>
          ))
        ) : (
          <Text>Connecting to the server</Text>
        )}
      </SimpleGrid>
    </>
  );
}
