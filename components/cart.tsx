import { useCartStore } from '@/utils/store';
import {
  AddIcon,
  CalendarIcon,
  EmailIcon,
  InfoIcon,
  MinusIcon,
  PhoneIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, total, count, add, remove, removeAll } = useCartStore();
  const toast = useToast();

  function sendOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const postData = async () => {
      const data = {
        name: formData.get('nom'),
        phoneNumber: formData.get('tel'),
        email: formData.get('email'),
        date: formData.get('date'),
        comment: formData.get('comment'),
        total: total(),
        cart: cart,
      };

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      if (data.id) {
        toast({
          title: 'Commande envoyée !',
          description: 'Vous allez bientôt recevoir un mél de confirmation',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        removeAll();
        onClose();
      }
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
                        {(item.price * item.count).toFixed(2)} €
                      </GridItem>
                      {/* </HStack> */}
                    </Grid>
                  );
                })}
                <Text alignSelf={'end'}>Total: {total().toFixed(2)} €</Text>
                <Text alignSelf={'end'}>
                  {
                    'Ce total est donné à titre indicatif, en fonction de la personnalisation de vos produits notamment. Des frais de livraison pourront être ajoutés le cas échéant.'
                  }
                </Text>
              </>
            )}
            {/* <Divider my={8} borderColor={"gray.600"} /> */}
          </VStack>
          <Divider my={8} borderColor={'gray.600'} />
          <Box>
            <form onSubmit={sendOrder}>
              <Stack spacing={4}>
                <Heading size={'md'}>Veuillez entrer vos informations</Heading>
                <Text>
                  Un mél vous sera envoyé par la suite pour confirmer votre
                  commande.
                </Text>
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
                <Text>
                  {`Veuillez spécifier l'heure de livraison souhaitée - comptez un minimum de 12h pour laisser au boulanger le temps de faire votre pain !`}
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CalendarIcon color="gray.600" />
                  </InputLeftElement>
                  <Input
                    type="datetime-local"
                    name="date"
                    placeholder="date et heure"
                    borderColor={'gray.600'}
                  />
                </InputGroup>
                <Textarea
                  name="comment"
                  placeholder="Un commentaire, un souhait de personnalisation, une question, ou toute autre information utile"
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
