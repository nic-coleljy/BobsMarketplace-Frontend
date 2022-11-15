# Bob's Marketplace - Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up
Ensure that [Node.js](https://nodejs.org/en/download/) and npm is installed. 

You may use any one of the following links for steps on how to install npm:
- For Windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows
- For macOS: https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681

Run this command in the terminal to ensure the necessary dependencies are installed:

`npm install`

Make sure that the [backend](https://github.com/jaydxn1/Bobs-Marketplace) is up and running first before running this app.

(Feel free to change the `proxy` in `package.json` if you are using a different URL)

To enable payment for purchase:

1. Create a [Stripe](https://stripe.com/) account and login.
2. Go to Developers, API keys, and copy the publishable key.
3. Create a file with the name `.env` in this folder.
4. Inside `.env` file, add `REACT_APP_STRIPE_PUBLIC_KEY=` and append copied publishable key at the back.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.\
This command is sufficient to run the entire application.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you are not satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you will be on your own.

You do not have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you should not feel obligated to use this feature. However we understand that this tool would not be useful if you could not customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<br>
<b> Credits: </b><br>
1. Pang Jun Rong <br>
2. Ashley Loh Tsun Ning <br>
3. Nicole Lim Jia Yi<br>
4. Gregory Koh Wen Cong <br>
5. GOVINDASAMY RAJASEKAR KAUSHIK YADHUNATH <br>
6. CHEONG Wei Soon <br>
