# 1. Inisialisasi Proyek Node.js


## Inisialisasi NPM

```npm init -y```

# 2. Memasang dan Mengonfigurasi Server Express Pertama

## Instalasi Express

```npm install express```

## Membuat File Entri Aplikasi

```New-Item index.js```

## Menulis Kode Server "Hello World"

Buka file index.js dan tambahkan kode berikut untuk membuat server Express minimalis.

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
```

# Mengoptimalkan Alur Kerja Pengembangan dengan nodemon

## Instalasi nodemon

```npm install --save-dev nodemon```

## Konfigurasi Skrip NPM

Untuk mengintegrasikan nodemon ke dalam alur kerja proyek, modifikasi bagian
scripts di dalam file package.json.

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
},
```

Dengan konfigurasi ini, perintah ```npm run dev``` sekarang akan memulai server menggunakan nodemon

# 3. Penyiapan Basis Data

## Akses Shell PostgreSQL (psql)

```psql -U postgres```

## Keamanan Pertama: Atur Kata Sandi Superuser

Buat pengguna baru: 

```sql
CREATE USER tiket_hiburan_user WITH PASSWORD 'strong_app_password';
```

Buat database baru: 

```sql
CREATE DATABASE tiket_hiburan_db;
```

Berikan semua hak akses pada database baru kepada pengguna baru: 

```sql
GRANT ALL PRIVILEGES ON DATABASE tiket_hiburan_db TO tiket_hiburan_user;
```

Keluar dari psql dengan mengetik 
```sql
\q 
```

# 4. Jembatan ke Database - Konfigurasi Sequelize ORM

## Instalasi Sequelize dan Dependensi Terkait

Instalasi Sequelize Core:

```npm install sequelize```

Instalasi Driver Database:

```npm install pg pg-hstore```

Instalasi Sequelize CLI:

```npm install --save-dev sequelize-cli```

## Inisialisasi dan Konfigurasi Proyek Sequelize

Inisialisasi Proyek Sequelize:

```npx sequelize-cli init```

Instal paket dotenv untuk memuat variabel lingkungan dari file .env:

```npm install dotenv```

Buat file “.env” di root proyek:
```
#.env
DB_USER=myapp_user
DB_PASS=strong_app_password
DB_NAME=myapp_db
DB_HOST=localhost
DB_DIALECT=postgres
```

Kemudian, modifikasi config/config.json agar terlihat seperti ini:

```json
{
    "development": {
    "username": "myapp_user",
    "password": "strong_app_password",
    "database": "myapp_db",
    "host" : "localhost",
    "dialect" : "postgres"
},
    "test": {...},
    "production": {...}
}
```

## Model dan Migrasi: Mendefinisikan Skema Database

Membuat Model dan Migrasi Pertama:

```npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string```

Menjalankan Migrasi

```npx sequelize-cli db:migrate```

## Mengintegrasikan Instance Sequelize ke dalam Aplikasi Express

Di file index.js utama Anda, Anda dapat menguji koneksi sebagai berikut:

```js
const express = require('express');
const db = require('./models'); // Impor dari folder models
const app = express();
const port = process.env.PORT || 3000;
//... (kode route lainnya)

// Uji koneksi database
async function testDbConnection() {
try {
    await db.sequelize.authenticate();
    console.log('Koneksi ke database berhasil terkoneksi.');
    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
    }
}

testDbConnection();

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

```

# 5. Arsitektur Aplikasi Berlapis: Router, Controller, dan Service

Mendesain Struktur Folder Proyek

```
express-postgres-api/
├── src/
│ ├── config/ # (Dibuat oleh Sequelize) Konfigurasi database
│ ├── controllers/ # Logika orkestrasi HTTP
│ ├── migrations/ # (Dibuat oleh Sequelize) Migrasi skema database
│ ├── models/ # (Dibuat oleh Sequelize) Definisi model data
│ ├── routes/ # Definisi endpoint API
│ └── services/ # Logika bisnis dan akses data
├──.env
├── index.js # Titik masuk utama aplikasi
├── package.json
└──...
```

# 6. Implementasi API CRUD Fungsional

## Membuat Pengguna Baru (Create)

Router (src/routes/user.routes.js):

```js
//... (impor lainnya)

const userController = require('../controllers/user.controller');

router.post('/', userController.create);

//... (rute lainnya)

module.exports = router;
```

Controller (src/controllers/user.controller.js):

```js
const userService = require('../services/user.service');

exports.create = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

```

Service (src/services/user.service.js):

```js
const db = require('../models');
const User = db.User;
exports.createUser = async (userData) => {
    const { name, email, password } = userData;

    // Logika bisnis/validasi sederhana
    if (!name ||!email ||!password) {
        throw new Error('Nama, email, dan password harus diisi.');
    }

    // Interaksi dengan database menggunakan model Sequelize
    // Di sini bisa ditambahkan logika hashing password sebelum create
    const newUser = await User.create({ name, email, password });
    return newUser;
};

```

## Membaca Data Pengguna (Read)

Router: 

```router.get('/', userController.findAll);```

Controller:

```js
exports.findAll = async (req, res) => {
    try {
        const users = await userService.findAllUsers();
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

Service:

```js
exports.findAllUsers = async () => {
    const users = await User.findAll();
    return users;
};
```
## Mengambil Pengguna Berdasarkan ID

Router: 

```router.get('/:id', userController.findOne);```

Controller:

```js
exports.findOne = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.findUserById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Pengguna dengan id=${userId} tidak ditemukan.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

Service:

```js
exports.findUserById = async (id) => {
    const user = await User.findByPk(id); // findByPk adalah singkatan dari findByPrimaryKey
    
    return user;
};
```

## Memperbarui Pengguna (Update)

Router:

```router.put('/:id', userController.update);```

Controller:
```js
exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await userService.updateUser(userId, updateData);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
```

Service:

```js
exports.updateUser = async (id, updateData) => {
    const [num] = await User.update(updateData, {
        where: { id: id }
    });
    
    if (num == 1) {
        // Jika update berhasil, ambil dan kembalikan data terbaru
        const updatedUser = await User.findByPk(id);
        return updatedUser;
    } else {
        throw new Error(`Tidak dapat memperbarui pengguna dengan id=${id}. Mungkin pengguna tidak...`)
    }
};
```

## Menghapus Pengguna (Delete)

Router: 

```router.delete('/:id', userController.delete);```

Controller:

```js
exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;
        
        await userService.deleteUser(userId);
        res.status(204).send(); // 204 No Content adalah respons standar untuk delete yang sukses
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
```

Service:

```js
exports.deleteUser = async (id) => {
    const num = await User.destroy({
        where: { id: id }
    });

    if (num!= 1) {
        throw new Error(`Tidak dapat menghapus pengguna dengan id=${id}. Mungkin pengguna tidak dite...`)
    }
    // Tidak perlu mengembalikan apa pun karena penghapusan berhasil
};
```
# 7. Pengujian dan Finalisasi

```js
const express = require('express');
const db = require('./src/models');
const userRoutes = require('./src/routes/user.routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API aplikasi.' });
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}.`);
});
```