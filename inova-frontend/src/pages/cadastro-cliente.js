import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const carBrands = {
  'Toyota': ['Corolla', 'Hilux', 'Yaris'],
  'Ford': ['Fiesta', 'Focus', 'Mustang'],
  'Honda': ['Civic', 'Fit', 'HR-V'],
};

const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
});

const CadastroCliente = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([{ type: '', brand: '', model: '', year: '', plate: '' }]);

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
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
    router.push('/'); // Retorna para a tela inicial
  };

  return (
    <Container maxWidth="sm" style={{ padding: '40px 20px' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#003366', marginBottom: '30px' }}>
        Cadastro de Cliente
      </Typography>

      <form onSubmit={formik.handleSubmit}>
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
        <Box mb={3}>
          <TextField
            fullWidth
            label="CPF"
            variant="outlined"
            name="cpf"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            error={formik.touched.cpf && Boolean(formik.errors.cpf)}
            helperText={formik.touched.cpf && formik.errors.cpf}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Telefone"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>

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
