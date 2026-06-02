# 📊 Database Storage Explanation

## 🗂️ Where Your Data Is Stored:

### **File Location:**
```
backend/tradesync.db
```

This is your SQLite database file - one single file jo pura database contain karti hai!

---

## 🔄 Data Flow:

### **Registration Flow:**
```
User fills form (Frontend)
        ↓
POST /users/register (API call)
        ↓
Backend receives: { username, email, password }
        ↓
Password hashed with bcrypt
        ↓
User object created
        ↓
Saved to tradesync.db (SQLite Database)
        ↓
Response sent back with user data
        ↓
Frontend stores in localStorage: authToken + user
```

### **Login Flow:**
```
User fills form (Frontend)
        ↓
POST /users/login (API call)
        ↓
Backend fetches user from tradesync.db
        ↓
Compare passwords using bcrypt
        ↓
If valid → Return user data
        ↓
Frontend stores in localStorage
```

---

## 💾 What Data Is Stored:

### **In Database (tradesync.db):**
```
User Table:
┌─────┬──────────────┬──────────────────┬───────────────────┬──────────────────┐
│ id  │ username     │ email            │ password          │ created_at       │
├─────┼──────────────┼──────────────────┼───────────────────┼──────────────────┤
│ 1   │ testuser     │ test@example.com │ $2a$10$hashed...  │ 2026-05-26 14:30 │
│ 2   │ john123      │ john@example.com │ $2a$10$hashed...  │ 2026-05-26 14:35 │
│ 3   │ alice99      │ alice@test.com   │ $2a$10$hashed...  │ 2026-05-26 14:40 │
└─────┴──────────────┴──────────────────┴───────────────────┴──────────────────┘
```

**Note:** Password hashed hai (secured) - plain text nahi!

### **In Browser localStorage:**
```javascript
authToken: "1"  // User ID
user: {
  "id": 1,
  "username": "testuser",
  "email": "test@example.com"
}
```

---

## 🔒 Security:

### **Passwords:**
- ✅ Hashed with bcrypt (one-way encryption)
- ✅ NOT stored as plain text
- ✅ Never sent to frontend
- ✅ Only compared on backend

### **Authentication:**
- ✅ Token stored in localStorage
- ⚠️ (Should use httpOnly cookies for production)

### **Data Protection:**
- ✅ Database file on server only
- ✅ Only backend can access database
- ✅ Frontend gets only non-sensitive data

---

## 🗄️ Database Schema:

### **User Entity (TypeORM):**
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;                    // Auto-increment ID

  @Column()
  username: string;              // Unique username

  @Column()
  email: string;                 // User email

  @Column()
  password: string;              // Hashed password

  @Column({ type: 'datetime' })
  created_at: Date;              // Account creation time
}
```

---

## 📱 Backend Storage Code:

### **Registration - Storing Data:**
```typescript
// From: backend/src/users/users.service.ts

async createUser(username: string, email: string, password: string) {
  const user = new User();
  user.username = username;
  user.email = email;
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  
  // Save to database
  return await this.usersRepository.save(user);
}
```

### **Login - Retrieving Data:**
```typescript
async validateUser(username: string, password: string) {
  // Get user from database
  const user = await this.usersRepository.findOne({ 
    where: { username } 
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  
  return user;
}
```

---

## 🔍 View Database Contents:

### **Option 1: Using VS Code Extension**
1. Install: "SQLite" extension (by alexcvzz)
2. Right-click `backend/tradesync.db`
3. Select "Open Database"
4. See all tables and data!

### **Option 2: Using Command Line**
```bash
# Install sqlite3 CLI (if not installed)
# Windows: Already installed with npm sqlite3
# Then run:
sqlite3 tradesync.db
```

Then in SQLite:
```sql
-- See all tables
.tables

-- See all users
SELECT * FROM user;

-- See specific user
SELECT username, email FROM user WHERE username = 'testuser';

-- Count users
SELECT COUNT(*) FROM user;
```

### **Option 3: View Raw Data**
The file `backend/tradesync.db` is binary but contains all your data!

---

## 📊 Data Persistence:

### **What Persists:**
✅ User registrations
✅ Passwords (hashed)
✅ User emails
✅ Account creation dates
✅ Everything across server restarts

### **What Does NOT Persist:**
❌ localStorage (browser data) - clears if you clear cache
✅ BUT database survives (can re-login)

---

## 🔄 Complete Data Lifecycle:

1. **Registration:**
   - Frontend sends data
   - Backend hashes password
   - Saves to `tradesync.db`
   - Returns user data
   - Frontend stores in localStorage

2. **Login:**
   - Frontend sends username + password
   - Backend queries `tradesync.db`
   - Verifies password
   - Returns user data
   - Frontend stores in localStorage

3. **Logout:**
   - Frontend clears localStorage
   - Database NOT affected
   - User data still in `tradesync.db`

4. **Refresh Page:**
   - localStorage persists (if not cleared)
   - User stays logged in
   - Database not queried again

5. **Browser Close:**
   - localStorage persists
   - Open browser again → auto-login
   - Query database on verification

---

## 📁 File Structure:

```
backend/
├── tradesync.db              ← SQLite Database File
├── src/
│   ├── users/
│   │   ├── user.entity.ts    ← Schema definition
│   │   ├── users.service.ts  ← Storage logic
│   │   └── users.controller.ts
│   └── app.module.ts         ← Database config
└── ...
```

---

## 🎯 Key Points:

| Item | Location | Type | Persists? |
|------|----------|------|-----------|
| **User Data** | `backend/tradesync.db` | SQLite | ✅ Yes |
| **Passwords** | `backend/tradesync.db` | Hashed | ✅ Yes |
| **Auth Token** | Browser localStorage | String | ⚠️ Until cleared |
| **User Info** | Browser localStorage | JSON | ⚠️ Until cleared |

---

## ✅ Summary:

- **Database:** `backend/tradesync.db` (SQLite file)
- **Storage:** All user data permanently stored
- **Access:** Only backend can read/write
- **Security:** Passwords hashed with bcrypt
- **Persistence:** Data survives restarts
- **Frontend:** Only gets non-sensitive data
- **Sessions:** localStorage for quick access

**Tere sab registrations/logins permanently saved hain database mein!** 🎉
