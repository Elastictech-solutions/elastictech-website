# ElasticTech Solutions website

A responsive public website and content management system for ElasticTech Solutions. The site presents ICT services, projects and products. The CMS lets administrators and editors update the home page and content, upload images, manage testimonials, and review contact inquiries.

## Stack

- Next.js with server-rendered public pages
- Payload CMS at `/admin`
- PostgreSQL for CMS content and accounts
- Persistent local image storage for uploaded media
- Caddy reverse proxy with automatic HTTPS for a domain pointed at the VPS
- Docker Compose for deployment

## Local development

Requirements: Node.js 20.18.1 or newer, pnpm, and PostgreSQL 16 or newer.

1. Copy `.env.example` to `.env`, then set `DATABASE_URL` and a private `PAYLOAD_SECRET` for local use.
2. Install packages with `pnpm install`.
3. Start the site with `pnpm dev`.
4. Create the first administrator with the command below when the database is running. Then seed the starter services and infrastructure spotlight.

```sh
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='use-a-long-unique-password' pnpm create-admin
pnpm seed-content
```

## VPS deployment

The VPS needs Docker Engine and the Docker Compose plugin. Point the chosen domain's DNS `A` record (and, if used, `AAAA` record) to the VPS. Allow inbound TCP ports 80 and 443 and UDP port 443 for Caddy.

1. Clone this repository on the VPS and enter its directory.
2. Create `.env` from `.env.example`. Set `DOMAIN` to the public hostname and replace both secrets with unique values from `openssl rand -hex 32`. Do not commit `.env`.
3. Build and start the services:

   ```sh
   docker compose up -d --build
   ```

4. Create the first CMS administrator. Set the credentials only for this command; choose a password manager generated password.

   ```sh
   docker compose exec -e ADMIN_EMAIL=you@example.com -e ADMIN_PASSWORD='use-a-long-unique-password' app pnpm create-admin
   ```

   Then seed the starter website content:

   ```sh
   docker compose exec app pnpm seed-content
   ```

5. Open `https://your-domain.example/admin` and sign in. In **Users**, an administrator can create accounts and assign either the Administrator or Editor role.
6. Add or edit content in **Site settings**, **Pages**, **Projects**, **Services**, **Products**, and **Testimonials**. Upload project images through **Media**. Published entries appear on the public website; draft entries stay private.

Uploaded images are stored in a persistent Docker volume. The Postgres database and Caddy certificates are also stored in persistent volumes. To back up the database and image uploads, run `sh scripts/backup.sh ./backups` from the deployment directory and copy the resulting files off the VPS. Backups should be stored somewhere separate from the server.

### Adding users

Administrators manage accounts from **Users** in the CMS. Editors can create and edit website content, manage contact inquiries, and upload media. Only administrators can create or remove user accounts, change account roles, and delete content records.

### CMS content model

- **Site settings:** company name, tagline, home page copy, contact details and social links.
- **Pages:** editable page metadata and home page messaging fields.
- **Projects:** case study copy, images, service links, outcome metrics and featured status.
- **Services and Products:** editable descriptions, images, ordering and links.
- **Testimonials:** client quote and attribution; the home page displays published testimonials.
- **Inquiries:** private contact form messages, readable and manageable by CMS users.
- **Media:** uploaded images with required alternative text.

## Notes

- The featured homepage capability text reflects the infrastructure work described for ElasticTech Solutions. It does not invent client names, project outcomes or testimonials.
- Products, case studies, contact methods, and client proof can be added or revised in the CMS when details are ready.
- Search metadata is set on the main pages; project records include editable SEO descriptions.
- Keep the VPS operating system, Docker, and exposed services updated. Store database and media backups away from the VPS.
