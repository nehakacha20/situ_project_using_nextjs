import { useState, useEffect } from "react";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Button,
  VStack,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, addYears, parseISO, format } from "date-fns";

const EnquiryForm = ({ property, bookedRanges, onFormSubmit }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();

  const calculateNumberOfNights = (checkIn:number, checkOut:number) => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(checkOut, checkIn);
      setNumberOfNights(nights);
    } else {
      setNumberOfNights(0); 
    }
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (date && checkOutDate) {
      calculateNumberOfNights(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    if (checkInDate && date) {
      calculateNumberOfNights(checkInDate, date);
    }
  };

  let totalPriceToStay = (pricePerNight: , numberOfNights, minprize) => {
    if (numberOfNights === 0) {
      return pricePerNight;
    }
    const calculatedPrice = pricePerNight * numberOfNights;
    return Math.max(calculatedPrice, minprize);
  };

  useEffect(() => {
    if (property) {
      let pricePerNight = parseInt(property.price);
      let minprize = 0;

      if (property.name === "Devon") {
        minprize = 150;
      } else {
        minprize = pricePerNight;
      }

      const total = totalPriceToStay(pricePerNight, numberOfNights, minprize);
      setTotalPrice(total);
    }
  }, [property, numberOfNights]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!checkInDate || !checkOutDate || !name || !email || !phoneNumber) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields (Check-in, Check-out, Name, Email, Phone Number).",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return; 
    }

    const formData = {
      propertyAddress: property.address,
      checkInDate: format(checkInDate, 'yyyy-MM-dd'),
      checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
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

        // Reset form fields after successful submission
        setCheckInDate(null);
        setCheckOutDate(null);
        setNumberOfNights(0);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        setTotalPrice(0);

        toast({
          description: "Your form has been submitted successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        console.log("Failed to store enquiry data", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission", error);
    }
  };

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['gb'].includes(iso2);
  });

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md" textAlign="center" fontSize="larger">
      <Heading as="h2" size="md" mb={5}>
        {property.address}
      </Heading>

      <form onSubmit={handleSubmit}>
        <HStack spacing={4}>
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
          </FormControl>
        </HStack>
        {numberOfNights > 0 && <div>Number of nights: {numberOfNights}</div>}

        <VStack>
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
            <PhoneInput
              defaultCountry="gb"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
              errorMessage="Invalid phone number"
              inputProps={{
                required: true,
              }}
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

          <Button
            type="submit"
            colorScheme="green"
            width="full"
            color="white"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EnquiryForm;
