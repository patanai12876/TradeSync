# ⚡ Quick Start Guide - Copy Trading Frontend

## 🚀 Start in 3 Steps

### Step 1: Install Dependencies
```bash
cd copytrading-website
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

---

## 📍 Pages to Explore

### Public Pages
- **Home Page** - http://localhost:3000/
- **Login** - http://localhost:3000/login
- **Register** - http://localhost:3000/register

### Authenticated Pages
- **Dashboard** - http://localhost:3000/dashboard
- **Traders Marketplace** - http://localhost:3000/traders
- **Trader Profile** - http://localhost:3000/traders/1
- **Trade History** - http://localhost:3000/trades
- **Leaderboard** - http://localhost:3000/leaderboard
- **Profile Settings** - http://localhost:3000/profile
- **Notifications** - http://localhost:3000/notifications

### Admin Pages
- **Admin Dashboard** - http://localhost:3000/admin
- **User Management** - http://localhost:3000/admin/users
- **Trader Applications** - http://localhost:3000/admin/applications

---

## 🎮 Test Features

### Marketplace Page
- Search traders by name
- Filter by risk level
- Sort by ROI/followers/win rate
- Click "Copy" to test modal
- Click "View Profile" for detailed trader page

### Dashboard
- View equity curve chart
- See active copies with profit/loss
- View open trades
- Click "Stop Copying" button

### Trade History
- Filter by trader/type
- Search by symbol
- Use pagination controls
- Sort by different columns

### Admin Dashboard
- Click "User Management" to see user table
- Click "Trader Applications" to review apps
- Test suspend/ban buttons

### Notifications
- Filter unread/read notifications
- Mark as read individually
- Clear all notifications

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📝 Key Files to Explore

```
src/app/
├── components/         # Reusable UI components
│   ├── Button.js      # Customizable buttons
│   ├── Card.js        # Card wrapper
│   ├── Modal.js       # Modal dialogs
│   └── ...
├── dashboard/page.js   # Main dashboard
├── traders/page.js     # Marketplace
├── traders/[id]/page.js # Trader profile
├── admin/              # Admin pages
└── layout.js           # Root layout (with navbar)
```

---

## 🎨 Customize Styling

Edit `tailwind.config.js` to change:
- Colors
- Fonts
- Spacing
- Breakpoints

---

## 📦 Add More Dependencies

```bash
npm install package-name
```

Already included:
- socket.io-client (real-time)
- recharts (charts)
- react-hook-form (forms)
- zod (validation)
- axios (HTTP)

---

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Clear cache and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Check Node version:**
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

---

## 📚 Next Steps

1. ✅ Explore all pages (they work offline with mock data)
2. 📝 Review the component structure
3. 🔌 Connect to backend API
4. 🔐 Setup authentication
5. 🚀 Deploy to production

---

## 🎯 Architecture

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS 3
- **State**: Mock data (ready for API integration)
- **Charts**: Recharts
- **Validation**: React Hook Form + Zod

---

## ✨ What You Have

✅ Complete trader marketplace UI
✅ Portfolio dashboard with charts
✅ Admin management pages
✅ User profile settings
✅ Notification center
✅ Trade history with filters
✅ Responsive mobile design
✅ Reusable component library
✅ Form validation
✅ Modal dialogs

---

## 🔗 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Docs](https://recharts.org)

---

**Everything is ready to go! Start the dev server and explore! 🚀**