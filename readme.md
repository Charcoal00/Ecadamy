# Ecadamy backend project




## server link
https://ecadamy.onrender.com

## api endpoints

1. Method: POST
   Endpoint: {server}/api/otp/send
   Purpose: check if phone number exist on database Generate and send otp to phone number.
2. Method: POST
   Endpoint: {server}/api/otp/verify
   Purpose: Phone number verification on sent otp.
3. Method: POST
   Endpoint: {server}/aapi/users/register
   Purpose: Allow access for user to register phone number.
4. Method: POST
   Endpoint: {server}/aapi/users/login
   Purpose: Allow user to login using phone number and password.

## .user objects

1. _id
2. firstName
3. lastName
4. classTitle
5. email
6. phone
