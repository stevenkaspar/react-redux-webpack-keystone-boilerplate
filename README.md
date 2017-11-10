### React-Redux-Webpack-KeystoneJS Boilerplate

---

### Usage

    yarn install          # or npm install
    npm run dev           # runs server with webpack HMR
    npm run serve:prod    # builds bundles and starts server

> make sure your mongo process is running

> make sure you have setup the .env file (template provided .env-template)

### Requirements

- NodeJS
- MongoDB

### Features

- **KeystoneJS**

    KeystoneJS CMS included

- **webpack**

    webpack is setup to run hot module reloading and to build for production

- **sass**

    **gulp-sass** compiles `public/styles/scss` directory to one `public/styles/site.css` file

- **bootstrap**

    bootstrap 4 (beta) is included and is ready to go

- **font awesome**

    Font Awesome included in scss

- **react**

    React with Redux and HMR middleware

- **reset password** page included

    ![Reset Password Picture](./docs/images/reset-password-form.png)

- **signin** page included

    ![Signin](./docs/images/signin-form.png)

- **Hot Module Reload ready**

    ![Home](./docs/images/home.png)

- **React Routing** skeleton setup

    ![Admin](./docs/images/admin.png)
