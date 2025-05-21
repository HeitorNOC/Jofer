# Deployment Guide

This guide will help you deploy your application to production using PostgreSQL instead of SQLite.

## Prerequisites

- A PostgreSQL database server
- Node.js and npm installed on your production server
- Git for version control

## Step 1: Set Up PostgreSQL Database

1. Install PostgreSQL on your server or use a cloud-based PostgreSQL service like:
   - [Heroku Postgres](https://www.heroku.com/postgres)
   - [Supabase](https://supabase.com/)
   - [Railway](https://railway.app/)
   - [Neon](https://neon.tech/)
   - [AWS RDS](https://aws.amazon.com/rds/postgresql/)
   - [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases)

2. Create a new PostgreSQL database for your application.

3. Make note of your database connection details:
   - Hostname
   - Port (usually 5432)
   - Database name
   - Username
   - Password

## Step 2: Configure Environment Variables

1. Update your `.env` file with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@hostname:port/database_name?schema=public"
```

Replace `username`, `password`, `hostname`, `port`, and `database_name` with your actual PostgreSQL credentials.

2. Update other environment variables as needed for production:

```
NEXTAUTH_URL="https://your-production-domain.com"
NEXT_PUBLIC_APP_API_ENDPOINT="https://your-production-domain.com"
```

## Step 3: Deploy Your Application

### Option 1: Deploy to Heroku

1. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

2. Add the PostgreSQL add-on:
   ```
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. Set environment variables:
   ```
   heroku config:set NEXTAUTH_SECRET="your-secret"
   heroku config:set NEXTAUTH_URL="https://your-app-name.herokuapp.com"
   heroku config:set NEXT_PUBLIC_APP_API_ENDPOINT="https://your-app-name.herokuapp.com"
   ```

4. Push your code to Heroku:
   ```
   git push heroku main
   ```

The Procfile we've created will automatically run the database migrations and seed the database during deployment.

### Option 2: Deploy to Vercel

1. Connect your GitHub repository to Vercel.

2. Configure environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Your authentication secret
   - `NEXTAUTH_URL`: Your production URL
   - `NEXT_PUBLIC_APP_API_ENDPOINT`: Your production URL

3. Add a build command override in your project settings:
   ```
   npx prisma generate && npx prisma migrate deploy && npx prisma db seed && next build
   ```

4. Deploy your application.

### Option 3: Manual Deployment

1. Clone your repository on your production server:
   ```
   git clone your-repository-url
   cd your-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the application:
   ```
   npm run build
   ```
   
   This will automatically run the database migrations and seed the database as configured in your package.json.

4. Start the application:
   ```
   npm start
   ```

## Step 4: Verify Database Seeding

After deployment, verify that your database has been properly seeded:

1. Check your application to see if the data is displayed correctly.

2. If needed, you can manually run the seed command:
   ```
   npx prisma db seed
   ```

## Troubleshooting

### Database Connection Issues

- Ensure your PostgreSQL server allows connections from your application server.
- Check if your connection string is correctly formatted.
- Verify that the database user has the necessary permissions.

### Migration Issues

If you encounter issues with migrations:

```
npx prisma migrate reset --force
npx prisma migrate deploy
npx prisma db seed
```

### Seed Issues

If the seed command fails:

1. Check the error message for specific issues.
2. Ensure your seed script is compatible with PostgreSQL.
3. Run the seed command manually:
   ```
   npx prisma db seed
   ```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
