"use client";

import React from "react";
import { Box, Button, SimpleGrid, Stack, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function PropertyList({ properties = [] }) {
  const router = useRouter();

  const handleSelectProperty = (id) => {
    router.push(`/bb/bbdetails/${id}`);
  };

  return (
    <>
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
