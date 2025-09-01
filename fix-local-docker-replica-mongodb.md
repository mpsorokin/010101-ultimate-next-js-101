Thanks for pasting the logs 🙏

The key error is:

```
errmsg":"permissions on /data/configdb/mongo-keyfile are too open"
```

MongoDB is **very strict** about the `keyFile` permissions — it must be readable only by the MongoDB process (like `chmod 600`).

---

### Why this happens on Windows

When you mount a file from **Windows → Docker Linux container**, the Linux permissions are not preserved. MongoDB then sees the file as world-readable and refuses to start.

---

### ✅ Fix Options

#### Option 1. Generate the keyfile inside the container (recommended)

Instead of mounting from Windows, create it inside the container where permissions work correctly:

```yaml
version: "3.8"
services:
  mongo:
    image: mongo:latest
    container_name: nextjs101
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
    command: >
      bash -c "
        if [ ! -f /data/configdb/mongo-keyfile ]; then
          openssl rand -base64 756 > /data/configdb/mongo-keyfile &&
          chmod 600 /data/configdb/mongo-keyfile &&
          chown mongodb:mongodb /data/configdb/mongo-keyfile;
        fi &&
        exec mongod --replSet rs0 --bind_ip_all --keyFile /data/configdb/mongo-keyfile
      "
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

This way the `keyfile` is created with proper Linux permissions inside the container — no Windows filesystem issues.

---

#### Option 2. Use a **Docker named volume** for the keyfile

Instead of mounting from the host, create a separate volume and initialize the file there.
This avoids Windows permission conflicts too.

---

### After it starts

Don’t forget to initialize the replica set:

```bash
docker exec -it nextjs101 mongosh -u admin -p secret --authenticationDatabase admin
```

```js
rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
})
```

---

👉 Do you want me to rewrite your `docker-compose.yml` so that it **also auto-runs `rs.initiate()`** at startup, so you never need to exec into the container manually?
