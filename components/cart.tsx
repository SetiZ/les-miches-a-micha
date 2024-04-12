import { useCartStore } from '@/utils/store';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Box,
  HStack,
  VStack,
  Stack,
  Divider,
  InputGroup,
  InputLeftElement,
  Heading,
  Textarea,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, InfoIcon, CalendarIcon } from '@chakra-ui/icons';
import { FormEvent } from 'react';
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart } = useCartStore();
  // console.log(cart);
  function sendOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const postData = async () => {
      const data = {
        nom: formData.get('nom'),
        tel: formData.get('tel'),
        email: formData.get('email'),
        date: formData.get('date'),
        comment: formData.get('comment'),
        cart,
      };

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      alert(data.message);
      // onClose();
    });
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={'lg'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Panier</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            {cart.map((item) => (
              <HStack key={item.id} justify={'space-between'} w={'full'}>
                <Box>{item.name}</Box>
                <Box>{item.count}</Box>
                <Box>{item.price * item.count}</Box>
              </HStack>
            ))}
          </VStack>
          <Divider my={8} borderColor={'gray.600'} />
          <Box>
            <form onSubmit={sendOrder}>
              <Stack spacing={4}>
                <Heading size={'md'}>Veuillez rentrer vos informations</Heading>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <InfoIcon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="nom"
                    name="nom"
                    borderColor={'gray.600'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    name="tel"
                    placeholder="numéro de téléphone"
                    borderColor={'gray.600'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    borderColor={'gray.600'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CalendarIcon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    type="date"
                    name="date"
                    placeholder="date"
                    borderColor={'gray.600'}
                  />
                </InputGroup>
                <Textarea
                  name="comment"
                  placeholder="un commentaire ?"
                  borderColor={'gray.600'}
                />
                <Button type="submit" colorScheme="yellow">
                  Envoyer
                </Button>
              </Stack>
            </form>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
