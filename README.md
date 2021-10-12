# Booking frontend app

This app has been initialized with `create-react-app`. It provides a UI to interact with the [booking-contract](https://github.com/kalote/booking-contract):

- Connect to MetaMask
- View bookings
- Book a room
- Cancel your booking
- View how much time is remaining on the booking (base: 1h)

# Run locally

To run locally, you will first need to deploy the contract on a test / local network. For that, check [this readme](https://github.com/kalote/booking-contract/blob/main/README.md)

After deploying the contract, change the contract address in the `src/contractInfo/configContract.ts`.

Then, the classic:

```
npm i
npm start
```

And access the application on [localhost](http://localhost:3000)
