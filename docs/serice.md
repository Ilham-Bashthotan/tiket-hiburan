# 1. Tempat Rekreasi (Place)

- POST /places – Tambah tempat
- GET /places – Lihat semua tempat
- GET /places/:id – Lihat detail tempat
- PUT /places/:id – Edit tempat
- DELETE /places/:id – Hapus tempat

Contoh Field:
```js
{
    id: number,
    name: string,
    description: string,
    address: string,
    categoryId: number,
    imageUrl: string
}
```

# 2. Kategori Tempat Rekreasi (Category)

- POST /categories
- GET /categories
- GET /categories/:id
- PUT /categories/:id
- DELETE /categories/:id

Contoh Field:

```js
{
    id: number,
    name: string // e.g., "Waterpark", "Eduwisata", "Petualangan"
}
```

# 3. Tiket (Ticket)

- POST /tickets
- GET /tickets
- GET /tickets/:id
- PUT /tickets/:id
- DELETE /tickets/:id

Contoh Field:

```js
{
    id: number,
    placeId: number,
    name: string,
    price: number,
    stock: number,
    validDate: Date
}
```

# 4. Pengguna (User)

- POST /users
- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

Contoh Field:

```js
{
    id: number,
    fullName: string,
    email: string,
    password: string (hashed),
}
```

# 5. Pemesanan Tiket (Order)

- POST /orders
- GET /orders
- GET /orders/:id
- PUT /orders/:id
- DELETE /orders/:id

Contoh Field:

```js
{
    id: number,
    userId: number,
    ticketId: number,
    quantity: number,
    totalPrice: number,
    orderDate: Date
}
```
