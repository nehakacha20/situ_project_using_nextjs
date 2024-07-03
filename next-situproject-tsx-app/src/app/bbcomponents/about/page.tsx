"use client"

import { Box, Heading, Text, Link, Card, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        async function fetchAboutData() {
            try {
                const response = await fetch("/about.json");
                const data = await response.json();
                setAboutData(data);
            } catch (error) {
                console.error("Error fetching about data:", error);
                // Optionally handle error state or retry logic here
            }
        }
        fetchAboutData();
    }, []);

    if (!aboutData) {
        return <Box>Loading...</Box>; // Handle loading state
    }

    return (
        <>
            <Card color="white" fontSize="xx-large">
                <nav className={styles.navbar}>
                    <ul className={styles.navMenu}>
                        <li>
                            <Link href="/" className={styles.link}>
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Card>
            <Box bg="green.500" py={10}>
                <Center>
                    <Box bg="white" p={8} maxW="1000px" borderRadius="lg" boxShadow="lg">

                        <Heading size="m" mb={4}>{aboutData.title}</Heading>
                        <Heading size="lg" mb={4}>{aboutData.subtitle}</Heading>
                        <Text mb={4}>{aboutData.introduction}</Text>

                        <Heading size="md" mb={2}>South Devon</Heading>
                        <Text mb={4}>{aboutData.locations.SouthDevon.description}</Text>

                        <Heading size="md" mb={2}>Paris</Heading>
                        <Text mb={4}>{aboutData.locations.Paris.description}</Text>

                        <Heading size="md" mb={2}>Pet-Friendly Accommodations</Heading>
                        <Text mb={4}>{aboutData.petFriendly}</Text>

                        <Heading size="md" mb={2}>Nearby Attractions and Activities</Heading>

                        <Heading size="sm" mb={2}>In South Devon</Heading>
                        <Text mb={4}>{aboutData.nearbyAttractions.SouthDevon.description}</Text>

                        <Heading size="sm" mb={2}>In Paris</Heading>
                        <Text mb={4}>{aboutData.nearbyAttractions.Paris.description}</Text>

                        <Heading size="md" mb={2}>Our Story</Heading>
                        <Text mb={4}>{aboutData.ourStory}</Text>

                        <Heading size="md" mb={2}>Join Us</Heading>
                        <Text mb={4}>{aboutData.invitation}</Text>
                    </Box>
                </Center>
            </Box>
        </>
    );
};

export default About;