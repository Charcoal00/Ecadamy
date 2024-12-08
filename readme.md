# Ecadamy Backend Project

## Overview

The Ecadamy backend provides a set of APIs to manage user authentication and registration through OTP (One-Time Password) verification. It supports sending OTPs, verifying phone numbers, and user management functionalities such as registration and login.

---

## Server Link

**Base URL:** [https://ecadamy.onrender.com](https://ecadamy.onrender.com)

---

## api endpoints

### 1. Send OTP

-   **Method:** `POST`
-   **Endpoint:** `{server}/api/otp/send`
-   **Purpose:** Checks if the phone number exists in the database. If not, generates and sends an OTP to the specified phone number.
-   **Request Body Example:**
    ```json
    {
        "phone": "+1234567890"
    }
    ```

### 2. Verify OTP

-   **Method:** `POST`
-   **Endpoint:** `{server}/api/otp/verify`
-   **Purpose:** Verifies the OTP sent to the phone number.
-   **Request Body Example:**
    ```json
    {
        "phone": "+1234567890",
        "otp": "123456"
    }
    ```

### 3. Register User

-   **Method:** `POST`
-   **Endpoint:** `{server}/api/users/register`
-   **Purpose:** Allows new users to register their details in the database.
-   **Request Body Example:**
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "classTitle": "Web Development",
        "email": "johndoe@example.com",
        "phone": "+1234567890",
        "password": "securepassword"
    }
    ```

### 4. Login in user

-   **Method:** `POST`
-   **Endpoint:** `{server}/aapi/users/login`
-   **Purpose:** Allows existing users to log in using their phone number and password.
-   **Request Body Example:**
    ```json
    {
        "phone": "+1234567890",
        "password": "sample"
    }
    ```

### 5. Get user data

-   **Method:** `POST`
-   **Endpoint:** `{server}/aapi/users/getUser`
-   **Purpose:** Allows existing users to log in using their phone number and password.
-   **Note:** Make sure to include token in rour headers when sending request. This token expires after 1h
-   **Request Body Example:**
    ```txt
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    ```

## User Object Structure

The user object returned by the API contains the following fields:

1. \_id - Unique identifier for the user.
2. firstName - The user's first name.
3. lastName - The user's last name.
4. classTitle - The class or course associated with the user.
5. email - The user's email address.
6. phone - The user's phone number.
