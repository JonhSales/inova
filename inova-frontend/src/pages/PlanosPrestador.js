import React, { useState } from 'react';
import { Button, Container, Typography, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';

const PlanosPrestador = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    if (selectedPlan) {
      alert(`Plano ${selectedPlan} selecionado! Redirecionando para pagamento...`);
      router.push('/pagamento-prestador'); // Redireciona para a página de pagamento do prestador
    }
  };

  return (
    <Container style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Selecione o Plano para Prestadores de Serviço
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <Card onClick={() => handlePlanSelect('Básico')}>
          <CardContent>
            <Typography variant="h5">Plano Básico</Typography>
            <Typography>R$ 50/mês</Typography>
          </CardContent>
        </Card>

        <Card onClick={() => handlePlanSelect('Premium')}>
          <CardContent>
            <Typography variant="h5">Plano Premium</Typography>
            <Typography>R$ 120/mês</Typography>
          </CardContent>
        </Card>

        <Card onClick={() => handlePlanSelect('Profissional')}>
          <CardContent>
            <Typography variant="h5">Plano Profissional</Typography>
            <Typography>R$ 200/mês</Typography>
          </CardContent>
        </Card>
      </div>

      <Button variant="contained" color="primary" onClick={handlePayment} disabled={!selectedPlan}>
        Confirmar e Pagar
      </Button>
    </Container>
  );
};

export default PlanosPrestador;
