# Huwa Gebäudereinigung – Website

Next.js 14 website for Huwa Gebäudereinigung & Hausmeisterdienste, Neuwied.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite via Prisma ORM
- **Auth**: NextAuth.js (JWT, CredentialsProvider)
- **Email**: Nodemailer (IONOS SMTP)
- **Process manager**: PM2

## Local Development

```bash
npm install
cp .env.example .env          # fill in values (see below)
npx prisma db push            # creates dev.db
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment Variables

Create `.env` in the project root:

```env
# App
NEXT_PUBLIC_SITE_URL=https://www.huwa-gebaeudedienste.de
DATABASE_URL=file:./dev.db

# NextAuth
NEXTAUTH_SECRET=change-me-in-production
NEXTAUTH_URL=http://localhost:3000

# SMTP (IONOS)
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=info@huwa-gebaeudedienste.de
SMTP_PASSWORD=<password>
SMTP_FROM=info@huwa-gebaeudedienste.de
CONTACT_EMAIL=admin@huwa-gebaeudedienste.de
```

## Hetzner Server Deployment

**Server**: Hetzner CX22, Ubuntu  
**IP**: 167.233.22.240  
**App directory**: `/var/www/huwa`  
**Process name**: `huwa-web`

### First-time setup on server

```bash
# Clone repo
cd /var/www
git clone https://github.com/slidebnb/geb-udereinigung-.git huwa
cd huwa

# Install dependencies
npm ci --omit=dev

# Set up environment
cp .env.example .env
nano .env  # fill in production values

# Initialise database
npx prisma db push

# Build
npm run build

# Start with PM2
pm2 start npm --name huwa-web -- start
pm2 save
pm2 startup  # follow instructions to auto-start on reboot
```

### Nginx config

```nginx
server {
    listen 80;
    server_name www.huwa-gebaeudedienste.de huwa-gebaeudedienste.de;
    return 301 https://www.huwa-gebaeudedienste.de$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.huwa-gebaeudedienste.de;

    ssl_certificate     /etc/letsencrypt/live/www.huwa-gebaeudedienste.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.huwa-gebaeudedienste.de/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL certificate (Let's Encrypt)

```bash
certbot --nginx -d www.huwa-gebaeudedienste.de -d huwa-gebaeudedienste.de
```

## Continuous Deployment (GitHub Actions)

Pushes to `main` automatically deploy via SSH.

**Required GitHub Secrets** (Settings → Secrets → Actions):

| Secret | Value |
|--------|-------|
| `DEPLOY_HOST` | `167.233.22.240` |
| `DEPLOY_USER` | SSH username (e.g. `root`) |
| `DEPLOY_SSH_KEY` | Private key (generate with `ssh-keygen -t ed25519`) |

Add the public key to `/root/.ssh/authorized_keys` on the server.

## Admin Panel

URL: `/admin`  
No default admin password is committed. To create or reset the seed admin, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before running `npm run db:seed`.

Change the password immediately after first login via the admin settings.

### CMS sections

Homepage content (Hero, Leistungen, Warum Huwa, CTA Banner) is editable in the admin panel under **Startseite**.

## Project Structure

```
src/
  app/               # Next.js App Router pages
    admin/           # Admin panel (auth-protected)
    api/             # API routes (contact, angebot, admin)
    leistungen/      # 10 service pages
    blog/            # Blog
  components/        # React components
    home/            # Homepage sections (CMS-driven)
    shared/          # ServicePage, Breadcrumb, etc.
    layout/          # Header, Footer
  lib/
    site.ts          # Company data (phone, address, service areas)
    services.ts      # Service catalogue (single source of truth)
    mail.ts          # SMTP email sending
    validations.ts   # Zod schemas for all forms
prisma/
  schema.prisma      # Database schema
```

## Database Models

| Model | Purpose |
|-------|---------|
| `User` | Admin accounts |
| `ContactRequest` | Contact form submissions (mailSent flag tracks email delivery) |
| `QuoteRequest` | Quote request form submissions (mailSent flag tracks email delivery) |
| `BlogPost` | Blog articles |
| `Testimonial` | Customer reviews |
| `Setting` | Key-value CMS settings (homepage sections) |
| `NewsletterSubscriber` | Newsletter sign-ups |
