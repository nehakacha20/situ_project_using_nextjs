import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EnquiryForm from '@/app/bbcomponents/enquiryform/page';
import { ChakraProvider } from '@chakra-ui/react';
import { addDays } from 'date-fns';

export default {
  title: 'Example/EnquiryForm',
  component: EnquiryForm,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
  argTypes: {
    property: {
      control: 'object',
    },
    bookedRanges: {
      control: 'array',
    },
    onFormSubmit: {
      action: 'formSubmitted',
    },
  },
} as ComponentMeta<typeof EnquiryForm>;

const Template: ComponentStory<typeof EnquiryForm> = (args) => <EnquiryForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  property: {
    address: '123 Example Street, Example City',
    price: '100',
    name: 'Devon',
  },
  bookedRanges: [
    {
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 7),
    },
  ],
  onFormSubmit: (formData) => {
    console.log('Form submitted:', formData);
  },
};
