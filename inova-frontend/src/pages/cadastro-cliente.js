import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';

// Marcas e modelos de veículos
const carBrands = {
  'Toyota': ['Corolla', 'Hilux', 'Yaris'],
  'Ford': ['Fiesta', 'Focus', 'Mustang'],
  'Honda': ['Civic', 'Fit', 'HR-V'],
};

// Validação de formulário com Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
  address: Yup.string().required('Endereço é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
  country: Yup.string().required('País é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
});

const CadastroCliente = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([{ type: '', brand: '', model: '', year: '', plate: '' }]);
  const [clientType, setClientType] = useState('fisica'); // Pessoa Física ou Jurídica

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      city: '',
      state: '',
      country: '',
      cnpj: '',
      responsibleName: '',
      responsibleCpf: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ ...values, vehicles });
      // Após a submissão dos dados do cliente, redirecionar para o reconhecimento facial
      router.push('/ReconhecimentoFacial');
    },
  });

  const handleVehicleChange = (index, event) => {
    const { name, value } = event.target;
    const newVehicles = [...vehicles];
    newVehicles[index][name] = value;
    setVehicles(newVehicles);
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { type: '', brand: '', model: '', year: '', plate: '' }]);
  };

  const handleCancel = () => {
    router.push('/'); // Redireciona para a tela inicial
  };

  return (
    <Container maxWidth="sm" style={{ padding: '40px 20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#003366', marginBottom: '30px' }}>
        Cadastro de Cliente
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* Escolha entre Pessoa Física ou Jurídica */}
        <Box mb={3}>
          <FormControl component="fieldset">
            <Typography variant="h6">Tipo de Cliente</Typography>
            <RadioGroup
              row
              aria-label="clientType"
              name="clientType"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <FormControlLabel value="fisica" control={<Radio />} label="Pessoa Física" />
              <FormControlLabel value="juridica" control={<Radio />} label="Pessoa Jurídica" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Campos de dados pessoais */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        {clientType === 'fisica' && (
          <Box mb={3}>
            <InputMask
              mask="999.999.999-99"
              value={formik.values.cpf}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  fullWidth
                  label="CPF"
                  variant="outlined"
                  name="cpf"
                  error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                  helperText={formik.touched.cpf && formik.errors.cpf}
                />
              )}
            </InputMask>
          </Box>
        )}
        {clientType === 'juridica' && (
          <>
            <Box mb={3}>
              <InputMask
                mask="99.999.999/9999-99"
                value={formik.values.cnpj}
                onChange={formik.handleChange}
              >
                {() => (
                  <TextField
                    fullWidth
                    label="CNPJ"
                    variant="outlined"
                    name="cnpj"
                    error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                    helperText={formik.touched.cnpj && formik.errors.cnpj}
                  />
                )}
              </InputMask>
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Nome do Responsável"
                variant="outlined"
                name="responsibleName"
                value={formik.values.responsibleName}
                onChange={formik.handleChange}
                error={formik.touched.responsibleName && Boolean(formik.errors.responsibleName)}
                helperText={formik.touched.responsibleName && formik.errors.responsibleName}
              />
            </Box>
            <Box mb={3}>
              <InputMask
                mask="999.999.999-99"
                value={formik.values.responsibleCpf}
                onChange={formik.handleChange}
              >
                {() => (
                  <TextField
                    fullWidth
                    label="CPF do Responsável"
                    variant="outlined"
                    name="responsibleCpf"
                    error={formik.touched.responsibleCpf && Boolean(formik.errors.responsibleCpf)}
                    helperText={formik.touched.responsibleCpf && formik.errors.responsibleCpf}
                  />
                )}
              </InputMask>
            </Box>
          </>
        )}

        {/* Campos de contato */}
        <Box mb={3}>
          <InputMask
            mask="(99) 99999-9999"
            value={formik.values.phone}
            onChange={formik.handleChange}
          >
            {() => (
              <TextField
                fullWidth
                label="Telefone"
                variant="outlined"
                name="phone"
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            )}
          </InputMask>
        </Box>

        {/* Campos de endereço */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="CEP"
            variant="outlined"
            name="cep"
            value={formik.values.cep}
            onChange={formik.handleChange}
            error={formik.touched.cep && Boolean(formik.errors.cep)}
            helperText={formik.touched.cep && formik.errors.cep}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Endereço"
            variant="outlined"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Cidade"
            variant="outlined"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Estado"
            variant="outlined"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="País"
            variant="outlined"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Box>

        {/* Campos de senha */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Box>

        {/* Campos de veículo */}
        {vehicles.map((vehicle, index) => (
          <Box key={index} mb={3} border={1} borderRadius={5} padding={2} marginBottom={2}>
            <Typography variant="h6">Veículo {index + 1}</Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id={`type-label-${index}`}>Tipo de Veículo</InputLabel>
              <Select
                labelId={`type-label-${index}`}
                name="type"
                value={vehicle.type}
                onChange={(e) => handleVehicleChange(index, e)}
              >
                <MenuItem value="car">Carro</MenuItem>
                <MenuItem value="motorcycle">Moto</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id={`brand-label-${index}`}>Marca</InputLabel>
              <Select
                labelId={`brand-label-${index}`}
                name="brand"
                value={vehicle.brand}
                onChange={(e) => handleVehicleChange(index, e)}
              >
                {Object.keys(carBrands).map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id={`model-label-${index}`}>Modelo</InputLabel>
              <Select
                labelId={`model-label-${index}`}
                name="model"
                value={vehicle.model}
                onChange={(e) => handleVehicleChange(index, e)}
              >
                {carBrands[vehicle.brand]?.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Ano"
              name="year"
              type="number"
              value={vehicle.year}
              onChange={(e) => handleVehicleChange(index, e)}
              inputProps={{ min: 1950, max: 2100 }}
            />
            <TextField
              fullWidth
              label="Placa"
              name="plate"
              value={vehicle.plate}
              onChange={(e) => handleVehicleChange(index, e)}
              margin="normal"
            />
          </Box>
        ))}

        <Button variant="outlined" onClick={handleAddVehicle}>
          Adicionar Veículo
        </Button>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Cadastrar Cliente
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CadastroCliente;
