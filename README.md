This is sample project for building Shopify Public App with Nodejs & React

**What includes in this project?**
1. A Nodejs Express Server
2. React SPA 
3. Shopify App Connector: Install, Webhook & API

To use this project, please prepare these credentials:
```
APP_URL=<Your app URL>
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
SHOPIFY_API_KEY=<Shopify Public App API Key>
SHOPIFY_API_SECRET=<Shopify Public App Secret Key>
SHOPIFY_SCOPES=<Define app scopes>
```

After update your `.env` file, continue to run:
```
composer install
knex migrate:latest
npm run dev
```
Now you can start to use your Shopify Public App by install your app via Partner Dashboard

In some tutorials, they use Koala & Next to build the Application. However, in this project, I separate server and admin-app
into 2 parts and use `shopify-api-node` module to help you guys can easily to understand the process of whole system.

You can contribute to this sample project by push your code to my repository.

Happy coding ^^.