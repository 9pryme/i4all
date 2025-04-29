# Inclusion For All - Static Next.js Frontend

This is a static Next.js frontend that pulls data from the WordPress REST API for Inclusion For All.

## Features

- Fetches WordPress posts at build time using `getStaticProps`
- Uses the WordPress REST API endpoint: https://inclusion-for-all.org/wp-json/wp/v2/posts
- Displays post titles and excerpts in a list on the homepage
- Configured with `next.config.js` for static export with `output: 'export'`
- Image optimization disabled for static hosting compatibility
- Outputs a fully static `/out/` folder ready to deploy on any server

## Getting Started

First, install dependencies:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the static site:

```bash
yarn build
```

This will generate a `/out` directory with all static files ready to be deployed to any static hosting service.

## Deployment

Simply upload the contents of the `/out` directory to your web server. 