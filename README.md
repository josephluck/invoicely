# Invoicely

## Setup

Few things you'll need

### Sort out environment

This app relies on environment variables being set. Take a peek at `.env.reference`; fill it out and copy it to `.env` make sure you leave `.env.reference` committed verbatim, you don't want your secrets leaked all over github!

### Install postgres (locally)

```bash
sudo apt-get install postgresql postgresql-contrib
```

### Run postgres

```bash
sudo /etc/init.d/postgresql restart
```

### Change password of postgres user

```bash
sudo -u postgres psql postgres
```

Once in the prompt run the following and remember the password you enter:

```bash
\password postgres
```

Enter the password you created in [`connect-db.ts`](./src/connect-db.ts)

### Create the db

```bash
sudo -u postgres createdb invoicely
```

## Inspecting to the DB locally

* Download Sqlectron
* Create a new connection
* Enter `localhost` as the Server Address
* Enter `5432` as the Port
* Enter `postgres` as the User
* Enter the password you created above as the Password

## Fixes

### ENOSPC error running the API

You'll need to increase the memory allowance of the watcher:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```