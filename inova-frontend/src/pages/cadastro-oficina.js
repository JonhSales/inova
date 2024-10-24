import React, { useState } from 'react';
import { Checkbox, Button, TextField, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useRouter } from 'next/router';

const OfficeRegistrationForm = () => {
  const router = useRouter();
  
  // Estados para os campos
  const [paymentMethods, setPaymentMethods] = useState({
    cash: false,
    debit: false,
    credit: false,
    pix: false,
  });
  const [serviceType, setServiceType] = useState('');
  const [acceptScheduling, setAcceptScheduling] = useState(false);
  
  const handlePaymentChange = (event) => {
    setPaymentMethods({
      ...paymentMethods,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCancel = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previna o comportamento padrão do formulário
    // Aqui você pode adicionar a lógica para salvar os dados

    // Após a submissão dos dados da oficina, redirecionar para o reconhecimento facial
    router.push('/ReconhecimentoFacial');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Cadastro de Oficina</h2>

      <form onSubmit={handleSubmit}>
        {/* Tipo de Serviço Prestado */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="service-type-label">Tipo de Serviço Prestado</InputLabel>
          <Select
            labelId="service-type-label"
            id="service-type"
            value={serviceType}
            label="Tipo de Serviço Prestado"
            onChange={handleServiceTypeChange}
          >
            <MenuItem value="mecanica">Mecânica</MenuItem>
            <MenuItem value="auto_eletrica">Auto Elétrica</MenuItem>
            <MenuItem value="borracharia">Borracharia</MenuItem>
            <MenuItem value="reboque">Reboque</MenuItem>
            <MenuItem value="lava_jato">Lava-Jato</MenuItem>
          </Select>
        </FormControl>

        {/* Nome da Oficina */}
        <TextField label="Nome" fullWidth margin="normal" required />

        {/* CNPJ e CPF */}
        <TextField label="CNPJ" fullWidth margin="normal" required />
        <TextField label="CPF do Responsável" fullWidth margin="normal" required />

        {/* Endereço */}
        <TextField label="Endereço" fullWidth margin="normal" helperText="Você pode usar sua localização atual." required />

        {/* Horário de Funcionamento */}
        <div>
          <TextField type="time" label="Horário de Abertura" margin="normal" InputLabelProps={{ shrink: true }} required />
          <TextField type="time" label="Horário de Fechamento" margin="normal" InputLabelProps={{ shrink: true }} required />
        </div>

        {/* Aceita Agendamento de Serviço */}
        <FormControlLabel
          control={
            <Checkbox
              name="acceptScheduling"
              checked={acceptScheduling}
              onChange={(event) => setAcceptScheduling(event.target.checked)}
            />
          }
          label="Aceita Agendamento de Serviço"
        />

        {/* Formas de Pagamento */}
        <div>
          <h3>Formas de Pagamento Aceitas</h3>
          <FormControlLabel
            control={<Checkbox name="cash" checked={paymentMethods.cash} onChange={handlePaymentChange} />}
            label="Dinheiro"
          />
          <FormControlLabel
            control={<Checkbox name="debit" checked={paymentMethods.debit} onChange={handlePaymentChange} />}
            label="Débito"
          />
          <FormControlLabel
            control={<Checkbox name="credit" checked={paymentMethods.credit} onChange={handlePaymentChange} />}
            label="Crédito"
          />
          <FormControlLabel
            control={<Checkbox name="pix" checked={paymentMethods.pix} onChange={handlePaymentChange} />}
            label="Pix"
          />
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfficeRegistrationForm;
