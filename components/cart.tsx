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
  Grid,
  GridItem,
  Box,
  HStack,
  VStack,
  Text,
  Stack,
  Divider,
  Center,
  InputGroup,
  InputLeftElement,
  Heading,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import {
  PhoneIcon,
  EmailIcon,
  InfoIcon,
  CalendarIcon,
  MinusIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { FormEvent } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, total, count, add, remove } = useCartStore();

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
        // totalCart,
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
            {count() === 0 ? (
              <Center>Panier vide</Center>
            ) : (
              <>
                {cart.map((item) => {
                  return (
                    // <HStack key={item.id} justify={"space-between"} w={"full"}>
                    <Grid
                      key={item.id}
                      templateColumns="repeat(6, 1fr)"
                      gap={3}
                      w={'full'}
                      alignItems={'center'}>
                      <GridItem colSpan={3}>{item.name}</GridItem>
                      <GridItem colStart={4} colSpan={1}>
                        <HStack>
                          <IconButton
                            aria-label="minus"
                            size="xs"
                            icon={<MinusIcon />}
                            onClick={() => remove(item.id)}
                          />
                          <Text>{item.count}</Text>
                          <IconButton
                            aria-label="add"
                            size="xs"
                            icon={<AddIcon />}
                            onClick={() => add(item)}
                          />
                        </HStack>
                      </GridItem>
                      <GridItem colEnd={7} colSpan={2} justifySelf={'end'}>
                        {item.price * item.count} €
                      </GridItem>
                      {/* </HStack> */}
                    </Grid>
                  );
                })}
                <Text alignSelf={'end'}>total: {total()} €</Text>
              </>
            )}
            {/* <Divider my={8} borderColor={"gray.600"} /> */}
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