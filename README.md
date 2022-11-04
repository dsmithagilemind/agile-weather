# Agile Weather Dev Setup Instructions

## **Checkout Repo:**

### **From SVN:**

svn co https://svn2.agilemind.com/svn/admin/applications/trunk/agile-weather

Setup Git after SVN Checkout (optional)

1. Create new local git repository:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` git init`

2. If git has not been updated and still uses a default “master” branch, rename that branch to “main”

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` git branch -m master main`

3. If also connecting to a remote repository, add that remote

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git remote add origin https://github.com/dsmithagilemind/agile-weather.git`

4. fetch remote changes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` git fetch`

5. override local file history (artifacts from git init)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` git reset --hard origin/main`

<br />

### **From Github** (git only):

For dev (with history):

` git clone https://github.com/dsmithagilemind/agile-weather.git`

For building (no history):

`git clone --depth 1 https://github.com/dsmithagilemind/agile-weather.git`

---

## **Environment configuration**

Copy development environment variables (configuration):

- Create a file called ".env" in the project root -- this will overwrite default variables kept in .env.defaults

- The following variables MUST be set:

  - DATABASE_URL

  - TEST_DATABASE_URL

- Look at .env.example for quick reference.
- For more detail see prisma documentation here: https://www.prisma.io/docs/reference/database-reference/connection-urls

---

## **Node Version:**

Redwood requires node 14.19 - 16.x

Check your node version:
` node –version`

## **Install yarn (globally)**

` npm i –g yarn`

Yarn version should be > 1.15
` yarn –version`

## **Install yarn packages:**

execute command in project root:
` yarn install`

---

## **Schema migrations:**

Run migrations with prisma, execute command in project root

` yarn rw prisma migrate dev`

("`yarn rw`" &nbsp;is shorthand for&nbsp; "`yarn redwood`") https://redwoodjs.com/docs/cli-commands

This performs the following tasks:

- Creates a database specified by the connection url in .env, which should be agile_weather
- Applies a schema to that database to match the schema in api/db/schema.prisma
- Seeds a small amount of data from scripts/seed.ts
  - Currently only redwood user demo data

---

## **Data migrations:**

Import data in one of two ways:

### **Option 1, wipe data and reload agile_weather database from dump (dev only):**

Use dump files to set data from a previous version

- Use your favorite method to import one or both of the following dump files
  - dev data: api/db/mysql-dump.sql
  - test data: api/db/mysql-dump-test.sql (for use with agile_weather_test db)
  - (for a sqlite environment (not recommended)): api/db/sqlite-dump.sql
- Command line:
  - ` mysql -u root -p agile\_weather < api/db/dumps/mysql-dump.sql`
- MySQL workbench
  - Server > Data Import > Import from Disk
  - Import from Self-Container File > api/db/dumps/mysql-dump.sql
  - Import Progress (tab) > Import

### **Option 2, run data migrations to rebuild data (preserves db):**

Use redwood dataMigrate commands to create data from record files

- Run the following command in project root:
  ` ` `yarn rw dm up`
- This will use the data migrations defined in api/db/dataMigrations
- This creates and inserts records from the datasets located in api/db/datasets
- Since this runs and creates all records from an empty db state, this takes a few minutes

### **Verify data using prisma studio (optional):**

Run the following command in project root:

` yarn rw prisma studio`

If prisma studio wasn’t launched in a new browser tab, navigate to http://localhost:5555/

Look over data, especially noting relationships

- In GeoLocations model check for attached station records, a good example is Alpine, Alabama 35014

### **Resetting the database:**

If you need to reset your database you can do it through prisma using the following command:

` yarn rw prisma migrate reset`

Or you can just drop the databases in mysql:

` mysql -u root -p;`

` drop database agile\_weather;`

---

## **Start the dev server:**

Run the following command in project root:

` yarn rw dev`

If a tab isn’t opened in your browser, navigate to http://localhost:8910/

---

## **Testing:**

### **Run unit tests:**

` yarn rw test`

### **Start Storybook (isolated UI component testing)**

` yarn rw storybook`

If a browser tab isn’t opened navigate to http://localhost:7910/

### **Prisma Studio (for investigating and editing data)**

`yarn rw prisma studio`

If prisma studio wasn’t launched in a new browser tab, navigate to http://localhost:5555/

### **Redwood GraphQL Playground for testing GraphQL queries:**

If redwood dev server is launched in development mode, just navigate to the graphql endpoint at http://localhost:8911/graphql
