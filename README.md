# OpenAI Apps
---

## My Painter

Generate logo use openai.

<img src="/public/img-logo.png" width="256" height="256">

---

### Some example 

| 晚霞1 | 晚霞2 | 
| ------------- |:-------------:| 
| <img src="/public/img-sunset-1.png" width="256" height="256">| <img src="/public/img-sunset-2.png" width="256" height="256">|


---

This is an example apps used in the OpenAI API . It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd openai-apps
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! 

---
### Links:

[OpenAI API Quickstart - Node.js example app](https://github.com/openai/openai-quickstart-node)
