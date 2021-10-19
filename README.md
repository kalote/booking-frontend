# Booking frontend app

This app has been initialized with `create-react-app`. It provides a UI to interact with the [booking-contract](https://github.com/kalote/booking-contract):

- Connect to MetaMask
- View bookings
- Book a room
- Cancel your booking
- View how much time is remaining on the booking (base: 1h)

# Run locally

To run locally, you will first need to deploy the contract on a test / local network. For that, check [this readme](https://github.com/kalote/booking-contract/blob/main/README.md)

After deploying the contract, update the contract address in the `src/contractInfo/configContract.ts`.

Then, the classic:

```
npm i
npm start
```

And access the application on [localhost](http://localhost:3000).

You will need to configure metamask to connect to your local blockchain. The settings for Ganache are the following:

- Name: ganache
- RPC URL: http://localhost:7545
- ChainID: 1337
- Currency symbol: ETH

Once configured & selected, use the "connect" button on the WebUI.

# Note

If you receive "failed transaction" message during usage of the app, it's probably because you reseted your local blockchain and the nonce is not valid anymore.
To fix that, go in settings > advanced in MetaMask and selet "Reset Account" (don't worry, it will just clean your tx history, and won't remove any of your coins).
