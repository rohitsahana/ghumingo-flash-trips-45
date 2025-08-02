# 🚀 Ghumingo Flash Trips

A modern travel platform connecting adventurous souls for spontaneous trips and verified travel experiences.

## ✨ Features

- **⚡ Flash Trip Rooms**: Join spontaneous adventures with verified travelers
- **🔐 Secure Authentication**: Supabase-powered user management
- **📱 Responsive Design**: Works seamlessly on all devices
- **🛡️ Trust & Safety**: Verified profiles and secure messaging
- **🎯 Travel Stories**: Share and discover travel experiences
- **👥 Community Groups**: Connect with like-minded travelers

## 🛠️ Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd ghumingo-flash-trips-45-4

# Run the automated setup script
./start.sh
```

This script will:
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Start both frontend and backend servers
- ✅ Verify all services are running

### Option 2: Manual Setup

#### 1. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd Backend
npm install
cd ..
```

#### 2. Environment Configuration

Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:6080
VITE_SUPABASE_URL=https://wmgsraawxxmsvzrtpjds.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZ3NyYWF3eHhtc3Z6cnRwamRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTA4NjUsImV4cCI6MjA2NzE4Njg2NX0.YKtnJcaxzJ24TL09s7oepByxlG_r78xWF6DItoVrd5U
```

Create `Backend/.env`:
```env
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```

#### 3. Start Servers

```bash
# Terminal 1: Start backend
cd Backend
npm start

# Terminal 2: Start frontend
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:6080
- **Health Check**: http://localhost:6080/api/health

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :8080
lsof -i :6080

# Kill the process
kill -9 <PID>
```

#### 2. MongoDB Connection Issues
- Verify the MongoDB connection string in `Backend/.env`
- Check if the MongoDB cluster is accessible
- Ensure network connectivity

#### 3. Supabase Connection Issues
- Verify Supabase credentials in `.env`
- Check if the Supabase project is active
- Review browser console for connection errors

#### 4. TypeScript Compilation Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run dev
```

#### 5. API Connection Issues
- Ensure backend is running on port 6080
- Check CORS configuration
- Verify API endpoints are accessible

### Health Checks

#### Backend Health
```bash
curl http://localhost:6080/api/health
```
Expected response: `{"status":"OK","timestamp":"..."}`

#### Frontend Health
```bash
curl http://localhost:8080
```
Should return the HTML page

#### Supabase Health
Check browser console for:
- ✅ Supabase client initialized successfully
- ❌ Supabase connection error: [error details]

## 🏗️ Project Structure

```
ghumingo-flash-trips-45-4/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   ├── utils/            # Utility functions
│   └── integrations/     # External integrations
├── Backend/              # Backend server
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Express server
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **API Errors**: Automatic retry with fallback data
- **Network Issues**: Graceful degradation with cached content
- **Component Errors**: Error boundaries prevent app crashes
- **Authentication Errors**: Clear user feedback and recovery options

## 🔄 Development Workflow

1. **Start Development**: `./start.sh` or manual setup
2. **Make Changes**: Edit files in `src/` or `Backend/`
3. **Test Changes**: Check browser and terminal for errors
4. **Health Check**: Verify all endpoints are working
5. **Commit Changes**: Use conventional commit messages

## 📊 Monitoring

### Development Monitoring
- Browser console shows connection status
- Terminal displays server logs
- Health endpoints provide service status

### Performance Monitoring
- Memory usage tracking
- API response time monitoring
- Error rate tracking

## 🚀 Production Deployment

### Frontend (Vite)
```bash
npm run build
```

### Backend (Node.js)
```bash
cd Backend
npm start
```

### Environment Variables
Ensure all environment variables are set for production:
- Database connection strings
- API endpoints
- Authentication credentials
- CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting guide above
2. Review the browser console for errors
3. Check server logs in the terminal
4. Verify all environment variables are set
5. Test health endpoints

For additional help, please create an issue with:
- Error messages
- Steps to reproduce
- Environment details
- Browser/OS information

---

**Happy Traveling! 🌍✈️**
