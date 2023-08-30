# assignment-syook
# Time Series Data Streaming App

This project demonstrates a small backend application that generates, encrypts, and emits a data stream over a socket. The emitted data stream is listened to by a backend service, decrypted, validated, and stored in a MongoDB collection for time-series data. The valid data is then displayed in real-time on a simple frontend app.

## Project Structure

The project is organized into three main components: emitter, listener, and frontend.

- **emitter**: This component generates an encrypted data stream and emits it over a socket.
- **listener**: This component receives the data stream, decrypts it, validates the data, and stores it in a MongoDB collection.
- **frontend**: This component displays the valid data in real-time.

## Usage

1. **Emitter Service**

   ```bash
   # Navigate to the emitter directory
   cd emitter

   # Install dependencies
   npm install

   # Run the emitter service
   node emit.js
   ```

2. **Listener Service**

   ```bash
   # Navigate to the listener directory
   cd listener

   # Install dependencies
   npm install

   # Run the listener service
   node listener.js
   ```

3. **Frontend App**

   ```bash
   # Navigate to the frontend directory
   cd frontend

   # Install http-server (if not installed)
   npm install -g http-server

   # Start the frontend app
   http-server
  

4. **Docker Compose (Optional)**

   ```bash
   # Start all services using Docker Compose
   docker-compose up
   ```

## Notes

- The emitter service generates a periodic data stream every 10 seconds with randomized data.
- The listener service decrypts the data, validates it using a secret key, and stores valid data in a MongoDB collection.
- The frontend app displays the valid data received from the listener service in real-time.
- Remember to replace placeholders like `your_encryption_key`, URLs, and other configurations as needed.
