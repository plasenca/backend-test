<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Backend Test API

This is a Test API for a backend developer position.

1. [Clone the repository](#clone-the-repository)

```bash
$ git clone
```

2. [Install dependencies](#install-dependencies)

```bash
$ yarn install
```

3. [Run Database](#run-database)

In this case, we are using docker-compose to run the database. You can run the following command to start the database:

```bash
$ docker-compose up -d
```

- Note 1: If you don't have docker-compose installed, you can install it [here](https://docs.docker.com/compose/install/).

- Note 2: Postgres is running on port 5433. If you have another service running on this port, you can change the port in '.env' file.

- Note 3: **The '.env' file is in the root of the project. This file is used to set the environment variables. This file don't have to be commited to the repository, but for this test, it is commited**.

4. [Run the app](#run-the-app)

```bash
# development and watch mode
$ yarn start:dev
```

5. [Populate the database](#populate-the-database)

To Populate the database, you can run the endpoints below in the following order:

- [Populate Categories](#populate-categories)

```bash
> localhost:3000/categories/populate GET
```

- [Populate Products](#populate-products)

```bash
> localhost:3000/products/populate GET
```

6. [Use the endpoints](#use-the-endpoints)

THis REST API has an API documentation. You can access it by running the app and accessing the following URL:

```
localhost:3000/api
```

- [Create a Product](#create-a-product)

```
> localhost:3000/products POST
```

- [Find a Product with categories](#find-a-product-with-categories)

This endpoint returns a product with it categories. It is possible to filter the categories by name and id. It's not case sensitive.

```
> localhost:3000/products?category=hogar GET
```
