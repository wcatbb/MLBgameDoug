import React from 'react';
import customTheme from './theme/customTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <ChakraProvider theme={customTheme}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
