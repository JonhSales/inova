import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import Image from 'next/image';
import ServiceIcon from '@mui/icons-material/Build';
import ClientIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import styles from './Home.module.css'; 

const Home = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '50px 20px' }}>
      <Box mb={4}>
        <Image
          src="/logo.png"
          alt="Logomarca"
          width={150}
          height={75}
        />
      </Box>

      <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', color: '#003366' }}>
        Bem-vindo à Inova Mecânicas e Oficinas
      </Typography>

      <Typography variant="subtitle1" style={{ color: '#555', marginBottom: '40px' }}>
        Conectando clientes e prestadores de serviço de forma rápida e eficiente.
      </Typography>

      <Box display="flex" justifyContent="space-around" mt={4}>
        <Link href="/cadastro-oficina" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ServiceIcon />}
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Sou Prestador de Serviço
          </Button>
        </Link>
        <Link href="/cadastro-cliente" passHref>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<ClientIcon />}
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Sou Cliente
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
