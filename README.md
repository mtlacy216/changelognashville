# Change Log Nashville

This repository hosts a static prototype for **Change Log // Nashville**.

## Structure

- `index.html` – main landing page.
- `assets/css/style.css` – site styles.
- `assets/js/main.js` – interactive behaviors.
- `prototypes/` – earlier HTML experiments kept for reference.

Open `index.html` in a browser to preview the site.

## Data example

The landing page includes a script that calls the [Legistar Web API](https://webapi.legistar.com/v1/nashville/Events) to pull upcoming Metro Council events.
The request and DOM update happen in `assets/js/main.js`, which populates the list beneath the theme filters.
