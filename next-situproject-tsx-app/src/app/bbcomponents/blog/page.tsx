"use client"

import { Box, Heading, Text, Link, Card, Image, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Content } from "next/font/google";

const Blog = () => {
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        async function fetchAboutData() {
            try {
                const response = await fetch("/blog.json");
                const data = await response.json();
                setBlogData(data);
            } catch (error) {
                console.error("Error fetching about data:", error);
                // Optionally handle error state or retry logic here
            }
        }
        fetchAboutData();
    }, []);

    if (!blogData) {
        return <Box>Loading...</Box>;
    }
    return (
        <>
            <Card color="white" >
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


                        <Heading size="md" mb={4}>{blogData.title}</Heading>
                        <Heading size="lg" mb={4}>{blogData.sections[0].heading}</Heading>
                        <Text mb={4}>{blogData.sections[0].content}</Text>
                        <Image src={blogData.sections[0].image} alt="Banner Image" boxSize='700px'
                            objectFit='cover' m={5} />

                        <Heading size="lg" mb={4}>{blogData.sections[1].heading}</Heading>
                        <Text mb={4}>{blogData.sections[1].content}</Text>
                        <Image src={blogData.sections[1].image} alt="Comfort Image" boxSize='700px'
                            objectFit='cover' m={5} />

                        <Heading size="lg" mb={4}>{blogData.sections[2].heading}</Heading>
                        <Heading size="md" mb={4}>{blogData.sections[2].subsections[0].title}</Heading>
                        <Text mb={4}>{blogData.sections[2].subsections[0].content}</Text>

                        <Heading size="md" mb={4}>{blogData.sections[2].subsections[1].title}</Heading>
                        <Text mb={4}>{blogData.sections[2].subsections[1].content}</Text>

                        <Heading size="lg" mb={4}>{blogData.sections[3].heading}</Heading>
                        <Text mb={4}>{blogData.sections[3].content}</Text>
                        <Image src={blogData.sections[3].image} alt="pet Image" boxSize='700px'
                            objectFit='cover' m={5} />

                        <Heading size="lg" mb={4}>{blogData.sections[4].heading}</Heading>
                        <Heading size="md" mb={4}>{blogData.sections[4].subsections[0].title}</Heading>
                        <Text mb={4}>{blogData.sections[4].subsections[0].content}</Text>

                        <Heading size="md" mb={4}>{blogData.sections[4].subsections[1].title}</Heading>
                        <Text mb={4}>{blogData.sections[4].subsections[1].content}</Text>

                        <Heading size="lg" mb={4}>{blogData.sections[5].heading}</Heading>
                        <Text mb={4}>{blogData.sections[5].content}</Text>
                        <Image src={blogData.sections[5].image} alt="Join us Image" boxSize='700px'
                            objectFit='cover' m={5} />

                        <Heading size="lg" mb={4}>{blogData.sections[6].heading}</Heading>
                        <Text mb={4}>{blogData.sections[6].content}</Text>
                        <Image src={blogData.sections[6].image} alt="memory Image" boxSize='700px'
                            objectFit='cover' m={5} />

                        <Heading size="lg" mb={4}>{blogData.sections[7].heading}</Heading>
                        <Text mb={4}>{blogData.sections[7].content}</Text>








                    </Box>
                </Center>
            </Box>

        </>
    );
}

export default Blog;