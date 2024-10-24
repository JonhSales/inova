const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zod = require('zod');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

const SECRET_KEY = "secret_key"; // Mudar em produção

// Schemas de Validação (Zod)
const workshopSchema = zod.object({
  name: zod.string().nonempty(),
  cnpj: zod.string().nonempty(),
  cpf: zod.string().nonempty(),
  location: zod.string().nonempty(),
  services: zod.string().nonempty(),
  hours: zod.string().nonempty(),
  paymentMethods: zod.string().nonempty(),
});

const customerSchema = zod.object({
  cpf: zod.string().nonempty(),
  name: zod.string().nonempty(),
  phone: zod.string().nonempty(),
  email: zod.string().email(),
  address: zod.string().nonempty(),
  vehicles: zod.array(
    zod.object({
      plate: zod.string().nonempty(),
      model: zod.string().nonempty(),
      year: zod.number(),
    })
  ),
});

// Rotas

// Cadastro de Workshop
app.post('/workshops', async (req, res) => {
  try {
    const workshopData = workshopSchema.parse(req.body);
    const newWorkshop = await prisma.workshop.create({
      data: workshopData,
    });
    res.json(newWorkshop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cadastro de Cliente
app.post('/customers', async (req, res) => {
  try {
    const customerData = customerSchema.parse(req.body);
    const { vehicles, ...customerInfo } = customerData;

    const newCustomer = await prisma.customer.create({
      data: {
        ...customerInfo,
        vehicles: {
          create: vehicles,
        },
      },
    });
    res.json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Autenticação JWT (exemplo básico)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // A lógica para autenticar vai aqui (busca usuário, compara senha, gera token JWT)
});

// Porta de servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:5000');
});
