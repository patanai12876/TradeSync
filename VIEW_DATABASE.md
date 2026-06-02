# 🗄️ View Your Database Data - Step by Step

## ✅ SQLite Extension Already Installed!

Now you can see all your registered users' data!

---

## 📖 How to View Database:

### **Step 1: Open Database in VS Code**
1. In VS Code, go to Explorer (left sidebar)
2. Find file: `backend/tradesync.db`
3. **Right-click** on it
4. Select: **"Open Database"**

### **Step 2: See Database Tables**
- A new tab opens: "SQLite"
- You'll see database structure
- Expand "user" table
- Click on it to see all users!

### **Step 3: View Your Data**
You'll see table like:

```
id | username  | email           | password          | created_at
1  | testuser  | test@example.com| $2a$10$hashed... | 2026-05-26 14:30
2  | john123   | john@test.com   | $2a$10$hashed... | 2026-05-26 14:35
```

---

## 🔍 What You'll See:

### **User Table Columns:**

| Column | Value | Type |
|--------|-------|------|
| **id** | 1, 2, 3... | Auto-generated |
| **username** | testuser, john123 | Text |
| **email** | user@example.com | Text |
| **password** | $2a$10$hashed... | Hashed Text |
| **created_at** | 2026-05-26 14:30 | DateTime |

### **Example Data:**
```
When you register:
- Username: testuser
- Email: test@example.com
- Password: password123

Gets stored as:
- id: 1
- username: testuser
- email: test@example.com
- password: $2a$10$N9qo8uLOickgxH7z6r...  (HASHED!)
- created_at: 2026-05-26 14:30:45
```

---

## ⚠️ Important Notes:

### **Passwords are HASHED:**
- Original: `password123`
- Stored: `$2a$10$N9qo8uLOickgxH7z6r...`
- This is GOOD for security! ✅
- Nobody can see original password

### **Every Register = New Row:**
```
Register User 1 → Row added
Register User 2 → Another row added
Register User 3 → Another row added
...
Login → Searches database, finds user, verifies password
```

---

## 🧪 Test It Now:

### **Do This:**

1. **Go to http://localhost:3000/register**
2. **Fill & Submit:**
   - Username: `demouser`
   - Email: `demo@test.com`
   - Password: `demo123`
3. **Click "Create Account"**
4. **Then:**
   - Go to VS Code
   - Right-click `backend/tradesync.db`
   - Select "Open Database"
   - Expand "user" table
   - **You'll see your new user in the table!** ✅

---

## 🎯 Key Things to Remember:

✅ **Database is permanent** - Survives restarts
✅ **Each registration creates new row**
✅ **Passwords are hashed** - Can't be seen
✅ **Login searches here** - Finds user & verifies
✅ **All data is here** - One single file

---

## 📊 Database grows like this:

### **After 1 Registration:**
```
user table:
[1 row: testuser, test@example.com, hashed_password, timestamp]
```

### **After 5 Registrations:**
```
user table:
[5 rows total]
- Row 1: testuser
- Row 2: john123
- Row 3: alice99
- Row 4: bob456
- Row 5: charlie77
```

### **When You Login:**
```
1. Query database: SELECT * FROM user WHERE username = 'testuser'
2. Found! Gets user data
3. Verify password matches
4. Login successful!
```

---

## 🔐 Security Recap:

| Thing | Status | Why? |
|-------|--------|------|
| Passwords visible? | ❌ No | Hashed with bcrypt |
| Data in database? | ✅ Yes | Permanently stored |
| Can edit from frontend? | ❌ No | Backend only |
| Data lost on restart? | ❌ No | File persists |
| See plain password? | ❌ No | One-way hash |

---

## 🚀 Next Steps:

1. **Try registering more users** - See them appear in database
2. **Try logging in** - Database is queried
3. **Close browser** - User still in database
4. **Clear localStorage** - Can login again (data still in DB)
5. **Check database** - User will still be there!

---

## 📝 Summary:

**Your data flow:**
```
Frontend Form
     ↓
API Call to Backend
     ↓
Backend validates & hashes
     ↓
Save to tradesync.db (SQLite)
     ↓
Database file has all users permanently!
```

**Tere sab users permanent stored hain!** 🎉

---

## 💡 Bonus Commands (Terminal):

If you want to check database from terminal:

```bash
# Go to backend folder
cd backend

# Open SQLite shell
sqlite3 tradesync.db

# Then run SQL:
SELECT * FROM user;
SELECT COUNT(*) FROM user;
SELECT username, email FROM user WHERE id = 1;

# Exit
.exit
```

Enjoy exploring your database! 🔍✨
