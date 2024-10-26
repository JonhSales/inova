import React, { useState } from 'react';
import { Checkbox, Button, TextField, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';

const OfficeRegistrationForm = () => {
  const router = useRouter();

  // Estados para campos
  const [paymentMethods, setPaymentMethods] = useState({
    cash: false,
    debit: false,
    credit: false,
    pix: false,
  });
  const [serviceType, setServiceType] = useState('');
  const [servicesOffered, setServicesOffered] = useState([]);
  const [acceptScheduling, setAcceptScheduling] = useState(false);

  // Serviços disponíveis para seleção
  const services = {
    mecanica: [
      'Manutenção Preventiva', 'Serviços de Freios', 'Suspensão e Direção', 
      'Diagnóstico e Reparo de Motor', 'Serviços de Transmissão', 'Serviços Elétricos', 
      'Serviços de Ar-condicionado', 'Troca de Pneus', 'Lataria e Pintura', 
      'Troca e Reparo de Vidros', 'Serviços de Inspeção e Emissão de Laudos', 
      'Socorro e Reboque'
    ],
    lava_jato: [
      'Lavagem Externa Simples', 'Lavagem Completa', 'Lavagem a Seco', 'Lavagem de Motor', 
      'Higienização Interna', 'Hidratação de Bancos de Couro', 'Polimento', 'Enceramento', 
      'Cristalização ou Espelhamento', 'Vitrificação de Pintura', 'Descontaminação da Pintura', 
      'Limpeza de Estofados e Tapetes', 'Impermeabilização de Estofados', 'Desodorização ou Odorização', 
      'Revitalização de Plásticos e Borrachas', 'Lavagem de Rodas e Pneus', 'Envelopamento de Veículos', 
      'Remoção de Piche e Insetos', 'Limpeza de Vidros e Para-brisas', 'Aplicação de Anti-chuva', 
      'Serviços de Polimento de Faróis'
    ],
  };

  const handlePaymentChange = (event) => {
    setPaymentMethods({
      ...paymentMethods,
      [event.target.name]: event.target.checked,
    });
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
    setServicesOffered([]); // Limpa os serviços quando o tipo de serviço muda
  };

  const handleServiceOfferedChange = (event) => {
    const value = event.target.value;
    setServicesOffered(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleCancel = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Após a submissão dos dados da oficina, redirecionar para o reconhecimento facial
    router.push('/ReconhecimentoFacial');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Cadastro de Prestador de Serviço</h2>

      <form onSubmit={handleSubmit}>
        {/* Tipo de Serviço */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="service-type-label">Tipo de Serviço Prestado</InputLabel>
          <Select
            labelId="service-type-label"
            id="service-type"
            value={serviceType}
            label="Tipo de Serviço Prestado"
            onChange={handleServiceTypeChange}
          >
            <MenuItem value="mecanica">Oficina Mecânica</MenuItem>
            <MenuItem value="lava_jato">Lava-Jato</MenuItem>
          </Select>
        </FormControl>

        {/* Nome do Prestador */}
        <TextField label="Nome" fullWidth margin="normal" required />

        {/* CNPJ e CPF do responsável */}
        <InputMask mask="99.999.999/9999-99">
          {() => (
            <TextField label="CNPJ" fullWidth margin="normal" required />
          )}
        </InputMask>

        <InputMask mask="999.999.999-99">
          {() => (
            <TextField label="CPF do Responsável" fullWidth margin="normal" required />
          )}
        </InputMask>

        {/* Número de Funcionários */}
        <TextField label="Número de Funcionários" type="number" fullWidth margin="normal" required />

        {/* Email */}
        <TextField label="E-mail" fullWidth margin="normal" required />

        {/* Senha e Confirmação de Senha */}
        <TextField label="Senha" type="password" fullWidth margin="normal" required />
        <TextField label="Confirmar Senha" type="password" fullWidth margin="normal" required />

        {/* Endereço Completo */}
        <TextField label="CEP" fullWidth margin="normal" required />
        <TextField label="Logradouro" fullWidth margin="normal" required />
        <TextField label="Cidade" fullWidth margin="normal" required />
        <TextField label="Estado" fullWidth margin="normal" required />
        <TextField label="País" fullWidth margin="normal" required />

        {/* Localização Atual */}
        <TextField label="Endereço (usar localização atual)" fullWidth margin="normal" required />

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

        {/* Escolha dos Serviços Oferecidos */}
        {serviceType && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="services-offered-label">Serviços Oferecidos</InputLabel>
            <Select
              labelId="services-offered-label"
              id="services-offered"
              multiple
              value={servicesOffered}
              onChange={handleServiceOfferedChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {services[serviceType]?.map((service) => (
                <MenuItem key={service} value={service}>
                  <Checkbox checked={servicesOffered.indexOf(service) > -1} />
                  {service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

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
            Cadastrar e Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfficeRegistrationForm;

