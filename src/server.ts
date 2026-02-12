import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import 'dotenv/config';
import express from 'express';
import { join } from 'node:path';
import * as nodemailer from 'nodemailer';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json({ limit: '200kb' }));

const smtpConfig = {
  host: process.env['SMTP_HOST'] ?? '',
  port: Number(process.env['SMTP_PORT'] ?? 0),
  secure: process.env['SMTP_SECURE'] === 'true',
  user: process.env['SMTP_USER'] ?? '',
  pass: process.env['SMTP_PASS'] ?? '',
  from: process.env['SMTP_FROM'] ?? '',
  to: process.env['SMTP_TO'] ?? '',
};

const hasSmtpConfig =
  smtpConfig.host &&
  smtpConfig.port &&
  smtpConfig.user &&
  smtpConfig.pass &&
  smtpConfig.from &&
  smtpConfig.to;

app.post('/api/contact', async (req, res) => {
  const { projectType, name, email, phone, company, message } = req.body ?? {};

  if (!projectType || !name || !email || !message) {
    return res.status(400).json({ message: 'Campos obrigatorios ausentes.' });
  }

  if (!hasSmtpConfig) {
    return res.status(503).json({
      message:
        'SMTP nao configurado. Verifique SMTP_USER/SMTP_PASS e SMTP_FROM/SMTP_TO.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    const safePhone = phone ? String(phone) : 'Nao informado';
    const safeCompany = company ? String(company) : 'Nao informada';

    await transporter.sendMail({
      from: smtpConfig.from,
      to: smtpConfig.to,
      replyTo: String(email),
      subject: `Novo contato pelo Website: ${String(projectType)}`,
      text: [
        `Nome: ${String(name)}`,
        `Email: ${String(email)}`,
        `Telefone: ${safePhone}`,
        `Empresa: ${safeCompany}`,
        `Tipo de projeto: ${String(projectType)}`,
        `Mensagem:`,
        String(message),
      ].join('\n'),
      html: `
        <h2>Novo contato pelo Website DHB</h2>
        <p><strong>Nome:</strong> ${String(name)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Telefone:</strong> ${safePhone}</p>
        <p><strong>Empresa:</strong> ${safeCompany}</p>
        <p><strong>Tipo de projeto:</strong> ${String(projectType)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Mensagem enviada.' });
  } catch (error) {
    console.error('SMTP error:', error);
    return res.status(500).json({ message: 'Falha ao enviar email.' });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
