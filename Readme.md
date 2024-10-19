# Winedrops Coding Challenge

## Overview

This project is a simple web application that displays the best-selling wines. It is designed to demonstrate full-stack engineering skills, covering frontend, backend, and database interactions.

## Goal

The goal of this project is to display a list of the best-selling wines, with the ability to highlight the top and bottom 10% of wines based on sales metrics. Users can also search for wines and filter the list based on their search criteria.

## Features

- Display a list of the best-selling wines.
- Highlight the top 10% of wines in green and the bottom 10% in red.
- Allow users to select the criteria for "best selling" (revenue, total number of bottles sold, or number of orders).
- Search functionality that filters wines by name and vintage, case-insensitive.
- Roll-up sales data for wines sold at different prices but considered the same wine.

## Technical Details

- The backend is built using Fastify and interacts with a pre-populated SQLite database.
- The frontend is built using React.
- The database schema includes tables for master wines, wine products, and customer orders.

## How to Run

### Backend

1. Navigate to the backend directory:

```sh
  cd backend
```

2. Install the dependencies and run with yarn:

```sh
  yarn install
  yarn dev
```

### Frontend

1. Navigate to the backend directory:

```sh
  cd backend
```

2. Install the dependencies and run with yarn:

```sh
  yarn install
  yarn dev
```

## Database schema

```sql
create table master_wine (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  vintage NUMBER
);

create table wine_product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  master_wine_id INTEGER,
  name TEXT,
  price DECIMAL,
  FOREIGN KEY (master_wine_id) REFERENCES master_wine (id)
);

create table customer_order (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wine_product_id INTEGER,
  quantity INTEGER,
  total_amount DECIMAL,
  status TEXT,
  FOREIGN KEY (wine_product_id) REFERENCES wine_product (id)
);
```

## Acknowledgements

I would like to thank the team at Winedrops for giving me the opportunity to take part in this stage of the interview process. It has been a valuable experience, learning bout fastify  which I didn't know of and appreciate the chance to show case my skills.