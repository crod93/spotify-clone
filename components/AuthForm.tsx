import { FC, useState } from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutation';
import NextImage from 'next/image';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      const user = await auth(mode, { email, password });
      console.log(user);

      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
          borderBottom: 'white 1px solid',
        }}
      >
        <NextImage src="/trax.svg" height={60} width={120} />
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)',
        }}
      >
        <Box
          sx={{
            padding: '50px',
            backgroundColor: 'gray.900',
            borderRadius: '6px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Input
              required
              placeholder="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              required
              placeholder="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: 'green.500',
                '&:hover': {
                  backgroundColor: 'green.300',
                },
              }}
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
