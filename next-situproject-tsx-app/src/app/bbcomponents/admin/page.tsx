"use client"

import PropertyList from "../page";
import Link from "next/link";
import styles from "./style.module.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch("/api/getenquirydata");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched enquiries:", data); // Log fetched data for debugging
          setEnquiries(data);
          setSearchResults(data);
        } else {
          console.error("Failed to fetch enquiries:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleSearch = () => {
    const filteredResults = enquiries.filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered results:", filteredResults); // Log filtered results for debugging
    setSearchResults(filteredResults);
    setIsSubmitted(true);
    setSearchTerm("");
    setTimeout(() => setIsSubmitted(false), 2000);
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
      <Box border="1px solid black" padding="4" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold" mb="4" textAlign="center">
          Client Enquiry Form
        </Text>
        <Input
          type="text"
          placeholder="Search By name/ email/ phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          focusBorderColor="green.600"
          mb="4"
        />
        <Button
          backgroundColor="green.600"
          borderColor="green.600"
          color="white"
          onClick={handleSearch}
          mb="4"
        >
          Search
        </Button>
        <TableContainer border="1px" borderColor="green.500">
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Check IN</Th>
                <Th>Check OUT</Th>
                <Th>Price</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchResults.map((enquiry, index) => (
                <Tr key={index}>
                  <Td>{enquiry.name}</Td>
                  <Td>{enquiry.email}</Td>
                  <Td>{enquiry.phoneNumber}</Td>
                  <Td>{enquiry.checkInDate}</Td>
                  <Td>{enquiry.checkOutDate}</Td>
                  <Td>£{enquiry.totalPrice}</Td>
                  <Td>{enquiry.propertyAddress}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminPage;
