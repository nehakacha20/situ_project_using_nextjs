"use client";

import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Box,
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, addYears } from "date-fns";

const EnquiryForm = ({ property, bookedRanges, onFormSubmit }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateNumberOfNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(checkOut, checkIn);
      setNumberOfNights(nights);
    }
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate) {
      calculateNumberOfNights(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    calculateNumberOfNights(checkInDate, date);
  };

  let totalPriceToStay = (pricePerNight, numberOfNights) => {
    return pricePerNight * numberOfNights;
  };

  useEffect(() => {
    if (property) {
      let pricePerNight = parseInt(property.price);
      const total = totalPriceToStay(pricePerNight, numberOfNights);
      setTotalPrice(total);
    }
  }, [property, numberOfNights]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      propertyAddress: property.address,
      checkInDate,
      checkOutDate,
      numberOfNights,
      name,
      email,
      phoneNumber,
      message,
      totalPrice,
    };

    console.log("FormData:", formData);

    try {
      const response = await fetch("/api/storeenquirydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);

        onFormSubmit(formData);

        setCheckInDate(new Date());
        setCheckOutDate(null);
        setNumberOfNights(0);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        setTotalPrice(0);

        setIsSubmitted(true);

        setTimeout(() => setIsSubmitted(false), 2000);
      } else {
        console.log("Failed to store enquiry data", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission", error);
    }
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="md" mb={5}>
        Enquiry Form for {property.address}
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="checkInDate">Check-in Date</FormLabel>
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
              <DatePicker
                id="checkInDate"
                selected={checkInDate}
                onChange={handleCheckInChange}
                minDate={new Date()}
                maxDate={addYears(new Date(), 1)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                dateFormat="dd/MM/yyyy"
                excludeDateIntervals={bookedRanges}
                border="2px solid black"
                showTimeSelect={false}
              />
            </Box>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="checkOutDate">Check-out Date</FormLabel>
            <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
              <DatePicker
                id="checkOutDate"
                selected={checkOutDate}
                onChange={handleCheckOutChange}
                minDate={checkInDate}
                maxDate={addYears(new Date(), 1)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                excludeDateIntervals={bookedRanges}
                disabled={!checkInDate}
                placeholderText="checkout date"
                border="2px solid black"
                dateFormat="dd/MM/yyyy"
                showTimeSelect={false}
              />
            </Box>
            <FormHelperText>Please select the check-out date</FormHelperText>
          </FormControl>
          {numberOfNights > 0 && <div>Number of nights: {numberOfNights}</div>}

          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              border="1px solid black"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              border="1px solid black"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              id="phoneNumber"
              type="string"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Your phone number"
              border="1px solid black"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              border="1px solid black"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="total price">
              Total Price for the stay
            </FormLabel>
            <Input
              id="totalPrice"
              value={`£${totalPrice}`}
              readOnly
              border="1px solid black"
            />
          </FormControl>
          {isSubmitted && (
            <Alert
              status="success"
              mb={5}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="100px"
            >
              <AlertIcon />
              Your form has been submitted successfully!
            </Alert>
          )}
          <Button type="submit" colorScheme="green" width="full" color="white">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EnquiryForm;
