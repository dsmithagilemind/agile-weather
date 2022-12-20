# Agile Weather Dev Setup Instructions

## **Checkout Repo:**

### **From SVN:**

```bash
svn co https://svn2.agilemind.com/svn/admin/applications/trunk/agile-weather
```

Setup Git after SVN Checkout (optional)

Create new local git repository:
```bash
git init
```

If git has not been updated and still uses a default “master” branch, rename that branch to “main”
```bash
git branch -m master main
```

If also connecting to a remote repository, add that remote
```bash
git remote add origin https://github.com/dsmithagilemind/agile-weather.git
```

Fetch remote changes
```bash
git fetch
```

Override local file history (artifacts from git init)
```bash
git reset --hard origin/main
```

### **From Github** (git only):

For dev (with history):
```bash
git clone https://github.com/dsmithagilemind/agile-weather.git
```

For building (no history):
```bash
git clone --depth 1 https://github.com/dsmithagilemind/agile-weather.git
```

---

## **Environment configuration**

Copy development environment variables (configuration):

- Copy `.env.example` to `.env` in the project root -- this will overwrite default variables kept in .env.defaults
- Edit `.env` so the following variables are set for your database:
  - DATABASE_URL
  - TEST_DATABASE_URL
- Also make sure the SESSION_SECRET variable is generated and set as described in the `.env.example` file.
- For more detail see
  - Prisma documentation here: https://www.prisma.io/docs/reference/database-reference/connection-urls
  - dbAuth documentation here: https://redwoodjs.com/docs/auth/dbauth

### **Node Version:**

Redwood requires node 14.19 - 16.x

Check for proper versions of [NodeJS](https://nodejs.org/en/) (currently v16) and [NPM](https://www.npmjs.com/) (currently v8).
Instructions for this may be found on the [wiki](https://trac.agilemind.com/tng/wiki/JavascriptDevEnv#NodeInstall).
If you are running [nvm](https://github.com/nvm-sh/nvm) this will be taken care of for you via the `.nvmrc` file in the project root directory.

```bash
node --version
npm --v
```

### **Install yarn (globally)**

This will install [Yarn](https://yarnpkg.com/) globally into your NodeJS installation. (If using `nvm`, `yarn` will be installed into whichever version of `node` is currently active. If/when the `node` version is changed at a later date, `yarn` will need to be reinstalled.)
```bash
npm i –g yarn
```

When in the project directory, the version should match what is in `.yarnrc.yml` (currently 3.2.3). When outside the project directory be prepared for a much lower version; this is expected. A good walk-through of `yarn` installation and basic usage may be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-yarn-package-manager-for-node-js).
```bash
yarn -–version
```

---

## **Install yarn packages:**

To download the project dependencies, simply run the following from the main directory where the `package.json` file lives:
```bash
yarn install
```

Note that this is pretty wordy and generates a lot of warnings that we are currently ignoring. Should take about a minute.

---

## **Schema setup:**

When setting up a new project or updating from svn the schema migration command needs to be executed to ensure the code is in sync with the database.

[Prisma](https://www.prisma.io/) is used to perform the following tasks:
- Ensure databases specified by the connection url in `.env` exist, which should be `agile_weather` and `agile_weather_test`
- Apply a schema to that database to match the schema in `api/db/schema.prisma`
- Seed a small amount of data from `scripts/seed.ts`
  - Currently only redwood user demo data

Execute command in project root
```bash
yarn redwood prisma migrate dev
```

If asked to enter a name for the migration in this step, there is probably a dos vs. unix linefeed issue somewhere.

[FYI](https://redwoodjs.com/docs/cli-commands): `yarn rw` is shorthand for `yarn redwood` and will be used henceforth.

---

## **Data migrations:**

When setting up a new project or updating from svn the data migration command needs to be executed to ensure the code is in sync with the database.
```bash
yarn rw dm up
```
- This will use the data migrations defined in `api/db/dataMigrations`
- This creates and inserts records from the datasets located in `api/db/datasets`
- This is quite slow when executed on a new or reset db; see next note about dump files to optionally improve performance with a fresh db.

### **Optionally reload agile_weather database from dump (dev only):**

There is a dump file committed that will load the db with the same data as provided by the initial migration steps, saving a lot of time.
If this step is skipped, the data migration files will load and process the NOAA data, but is slow.

- Use your favorite method to import one or both of the following dump files
  - dev data: api/db/mysql-dump.sql
  - test data: api/db/mysql-dump-test.sql (for use with agile_weather_test db)
  - (for a sqlite environment (not recommended)): api/db/sqlite-dump.sql
- Command line:
```bash
mysql -u root -p agile_weather < api/db/dumps/mysql-dump.sql
mysql -u root -p agile_weather_test < api/db/dumps/mysql-dump-test.sql
```
- MySQL workbench
  - Server > Data Import > Import from Disk
  - Import from Self-Container File > api/db/dumps/mysql-dump.sql
  - Import Progress (tab) > Import

After loading the dumps, it is a good idea to execute the first migration step (`yarn rw dm up`) to ensure everything is completely up-to-date.


### **Verify data using prisma studio (optional):**

Run the following command in project root:
```bash
yarn rw prisma studio
```

If prisma studio wasn't launched in a new browser tab, navigate to http://localhost:5555/

Look over data, especially noting relationships

- In GeoLocations model check for attached station records, a good example is Alpine, Alabama 35014

### **Resetting the database:**

If you need to reset your database you can do it through prisma using the following command:
```bash
yarn rw prisma migrate reset
```

Or you can just drop the `agile_weather` database directly from mysql.

Note that after a reset, the data migration will need to be executed again.

---

## **Start the dev server:**

Run the following command in project root:
```bash
yarn rw dev
```

If a tab isn’t opened in your browser, navigate to http://localhost:8910/

---

## **Testing:**

### **Run unit tests:**

This will run all tests and then watch for modifications or new tests.
```bash
yarn rw test
```

If watch mode is not desired such as when running from a script, use:
```bash
yarn rw test --no-watch
```

### **Start Storybook (isolated UI component manual exploration)**

[Storybook](https://storybook.js.org/) is a tool that provides a sandbox for seeing how UI components work in isolation.
```bash
yarn rw storybook
```

If a browser tab isn’t opened navigate to http://localhost:7910/

### **Prisma Studio (for investigating and editing data)**

```bash
yarn rw prisma studio
```

If prisma studio wasn't launched in a new browser tab, navigate to http://localhost:5555/

### **Redwood GraphQL Playground for testing GraphQL queries:**

When redwood dev server is launched in development mode (this document only covers development mode), just navigate to the graphql endpoint at http://localhost:8911/graphql
