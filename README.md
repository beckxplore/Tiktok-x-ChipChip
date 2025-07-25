# ChipChip Live Commerce - TikTok Jump Micro-App

A fully functional, mobile-first TikTok Jump micro-app for live commerce, designed specifically for Ethiopian TikTok users. The project now uses **Next.js** for both the frontend and backend, alongside TypeScript and Tailwind CSS.

## 🚀 Features

### Core Features
- **Live Product Carousel** - Swipeable product cards with auto-scroll
- **Product Detail Modal** - Zoomable images and dynamic variant selectors
- **Buyer Information Form** - Inline validation with phone number masks
- **Payment Integration** - Placeholder for Telebirr/Chapa integration
- **Confirmation Modal** - Success animation with order summary
- **Error Handling** - Toast notifications with retry functionality

### Localization
- **English & Amharic** support with RTL layout
- **Dynamic language switching** in the header
- **Comprehensive translations** for all UI elements

### TikTok Jump SDK Integration
- **Page lifecycle management** (onPageReady, onClose, onShare)
- **Analytics tracking** for view, add-to-cart, and purchase events
- **Native TikTok experience** with proper SDK initialization

### Mobile-First Design
- **Touch-optimized** with 48px minimum touch targets
- **Responsive layout** for all screen sizes
- **Smooth animations** and transitions
- **Progressive Web App** capabilities

## 🛠 Tech Stack

- **Fullstack Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Testing**: Jest + React Testing Library
- **Platform**: TikTok Jump SDK

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chipchip-live-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Color Palette
- **Primary**: `#0070F3` (Blue)
- **Secondary**: `#FFB800` (Yellow)
- **Accent**: `#4CAF50` (Green)
- **Background**: `#F9FAFB` (Light Gray)
- **Surface**: `#FFFFFF` (White)
- **Error**: `#E53E3E` (Red)

### Typography
- **Font Family**: Inter (Google Fonts)
- **H1**: 1.875rem, 700 weight
- **H2**: 1.5rem, 600 weight
- **Body**: 1rem, 400 weight
- **Small**: 0.875rem, 400 weight

### Spacing & Layout
- **Touch Targets**: Minimum 48px height
- **Border Radius**: 4px (sm), 8px (md), 16px (lg)
- **Shadows**: 3 levels (sm, md, lg)
- **Spacing Scale**: 4px increments (0, 4, 8, 16, 24, 32, 40, 48, 64)

## 📱 Usage

### For Sellers
1. **Product Management**
   - Add products with simple or variant types
   - Set pricing per variant option
   - Upload product images
   - Configure group order progress

2. **Live Streaming**
   - Activate overlay during TikTok Live
   - Monitor real-time orders
   - Manage inventory and pricing

### For Buyers
1. **Browse Products**
   - Swipe through product carousel
   - View product details and images
   - Check group order progress

2. **Place Orders**
   - Select product variants (if applicable)
   - Enter delivery information
   - Complete purchase flow

## 🔧 Configuration

### TikTok Jump SDK
The app automatically initializes the TikTok Jump SDK and handles:
- Page lifecycle events
- Analytics tracking
- Native TikTok integration

### API Endpoints
Configure your backend API endpoints in `src/api/services.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3001/api';
```

### Localization
Add new translations in `src/hooks/useLocalization.ts`:
```typescript
const translations: Translations = {
  'new.key': {
    en: 'English text',
    am: 'Amharic text'
  }
};
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Full purchase flow
- **Mock Tests**: API calls and TikTok SDK

## 📦 Deployment

### TikTok Jump Submission
1. **Build the app**
   ```bash
   npm run build
   ```

2. **Update manifest**
   - Edit `jump.json` with your app details
   - Set correct entry point URL
   - Configure permissions

3. **Deploy to hosting**
   - Upload `dist/` folder to your hosting provider
   - Ensure HTTPS is enabled
   - Set up CORS for API calls

4. **Submit to TikTok**
   - Follow TikTok Jump submission guidelines
   - Test in TikTok's development environment
   - Submit for review

## 🔒 Security

- **HTTPS Only**: All API calls use secure connections
- **Input Sanitization**: Form validation and sanitization
- **Secure Storage**: API tokens stored securely
- **CORS Configuration**: Proper cross-origin settings

## 📊 Analytics

The app tracks the following events:
- **View**: Product page views
- **Add to Cart**: Product selections
- **Purchase**: Completed orders
- **Error**: Failed operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the TikTok Jump documentation

---

**Built with ❤️ for Ethiopian TikTok users** 