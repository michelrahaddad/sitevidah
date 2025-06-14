import express from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { logger } from "./logger";

const app = express();

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Basic routes
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await storage.getAllPlans();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

app.post('/api/whatsapp-conversions', async (req, res) => {
  try {
    const conversion = await storage.createWhatsappConversion({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email || '',
      planType: req.body.planType || 'unknown',
      source: req.body.source || 'website'
    });
    res.json(conversion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save conversion' });
  }
});

// Admin routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const isValid = await storage.verifyAdminPassword(username, password);
    
    if (isValid) {
      res.json({ success: true, token: 'dev-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/admin/conversions', async (req, res) => {
  try {
    const conversions = await storage.getAllWhatsappConversions();
    res.json(conversions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversions' });
  }
});

app.get('/api/admin/conversions/export', async (req, res) => {
  try {
    const format = req.query.format as string;
    const conversions = await storage.getAllWhatsappConversions();
    
    if (format === 'marketing') {
      const csv = [
        'Email,Phone,First_Name,Last_Name,Interest_Category,Campaign_Type',
        ...conversions.map(c => {
          const names = c.name.split(' ');
          const firstName = names[0] || '';
          const lastName = names.slice(1).join(' ') || '';
          const cleanPhone = c.phone.replace(/\D/g, '');
          return `${c.email},"${cleanPhone}","${firstName}","${lastName}","${c.planType}","lead_capture"`;
        })
      ].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="leads_marketing.csv"');
      res.send(csv);
    } else {
      const csv = [
        'Nome,Telefone,Email,Tipo_Plano,Data_Conversao,Origem',
        ...conversions.map(c => 
          `"${c.name}","${c.phone}","${c.email}","${c.planType}","${c.createdAt}","${c.source}"`
        )
      ].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="conversoes_completo.csv"');
      res.send(csv);
    }
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  logger.info(`Simple server started on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('Server shutdown complete');
    process.exit(0);
  });
});