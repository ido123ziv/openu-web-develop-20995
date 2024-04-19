# How to connect to Docker DB using PGAdmin
First download [PGAdmin](./assets/https://www.pgadmin.org/download/) if you don't have it

__Remember the command: `export DB_PASSWORD=...` ?__ 

you'll need the password you set earlier in order to access the database.

In this guide we will go over the connection steps for accessing the gui for our database.

**Important**

We use Postgres Docker version 14 because the latest (15) removed features we have in the older versions of PGadmin, make sure to install the correct version.

# Setup the connection
launch PGadmin:

![start a new connection](./assets/connect.png?raw=true)
## Configuration
![Configure](./assets/connection-tab-connection-setup.png?raw=true)
![Configure](./assets/general-tab-connection-setup.png?raw=true)
## Querying
![launch-query-tool](./assets/launch-query-tool.png?raw=true)
![list all tables:](./assets/list-tables.png?raw=true)
![select](./assets/select-query.png?raw=true)