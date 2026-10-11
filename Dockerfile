FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN PGHOST=database PGPASSWORD=build-only-unused pnpm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY --from=builder /app ./
RUN mkdir -p /app/media && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["pnpm", "run", "start"]
