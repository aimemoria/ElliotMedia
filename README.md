# Elliot Media - Professional Real Estate Media

[![Website Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-Private-red.svg)]()

## About

Elliot Media is a professional real estate photography and media service company based in Phoenix, Arizona. We specialize in creating stunning visual content that helps properties sell faster through high-quality photography, aerial drone shots, videography, 3D virtual tours, and floor plans.

## Company Information

- **Company Name:** Elliot Media
- **Location:** Phoenix, Arizona & Surrounding Areas
- **Phone:** (405) 926-6844
- **Email:** contact@elliotmediapro.com
- **Website:** https://elliotmediapro.com
- **Booking Portal:** https://book.elliotmediapro.com

## Services

- **Real Estate Photography** - Professional interior and exterior property photography
- **Aerial Drone Services** - Stunning aerial views and property overviews
- **Videography** - Cinematic property tour videos
- **3D Virtual Tours** - Immersive 360° virtual property experiences
- **Floor Plans** - Professional architectural floor plans
- **Twilight Photography** - Dramatic dusk and twilight property shots

## Project Structure

```
elliot-website/
├── index.html              # Main website file
├── css/
│   └── style.css          # Custom styles and animations
├── js/
│   └── main.js            # Interactive features and form handling
├── images/                # All website images and assets
│   ├── favicon*.png       # Favicon files (multiple sizes)
│   ├── elliotmedialogo.png
│   └── [property photos]
└── README.md              # Project documentation
```

## Features

### Website Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern carousel/slider for property showcase
- ✅ Portfolio filtering system (Photos, Drone, Video, 3D Tours, etc.)
- ✅ Contact form with Web3Forms integration
- ✅ Smooth scrolling navigation
- ✅ Fixed navigation bar
- ✅ Social media integration (Instagram, YouTube, LinkedIn)
- ✅ Mobile-friendly menu

### SEO Optimization
- ✅ Comprehensive meta tags
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card integration
- ✅ Schema.org structured data (JSON-LD)
- ✅ Optimized images with lazy loading
- ✅ Semantic HTML5 structure
- ✅ Favicon implementation (multiple sizes)
- ✅ Canonical URLs

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **JavaScript (ES6+)** - Interactive features
- **TailwindCSS** - Utility-first CSS framework
- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family
- **Web3Forms** - Contact form backend

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Web server for local testing (optional)

### Local Development

1. Clone or download the repository
2. Open `index.html` in your browser, or
3. Use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

4. Navigate to `http://localhost:8000`

## Deployment

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push your code to the repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Go to repository Settings → Pages
4. Select main branch as source
5. Save and wait for deployment

### Custom Domain Setup

1. Add a `CNAME` file with your domain name
2. Configure DNS records with your domain provider:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `your-username.github.io`
3. Enable HTTPS in GitHub Pages settings

## Configuration

### Contact Form

The contact form uses Web3Forms API. To configure:

1. Sign up at https://web3forms.com
2. Get your access key
3. Update the access key in `index.html`:

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```

### Social Media Links

Update social media URLs in `index.html`:

- Instagram: Line 323, 414
- YouTube: Line 326, 417, 453
- LinkedIn: Line 329, 420

### Booking System

The booking system links point to:
- Main booking: https://book.elliotmediapro.com
- Account portal: https://book.elliotmediapro.com/order/elliot/aorder

Update these URLs if using a different booking system.

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Lazy loading for images
- Optimized image sizes
- Minified CSS/JS (recommended for production)
- CDN for external libraries
- Efficient carousel with hardware acceleration

## Security

- HTTPS enforced (recommended)
- Form validation (client-side and server-side via Web3Forms)
- No sensitive data stored in frontend
- External links use `rel="noopener noreferrer"`

## Maintenance

### Regular Updates
- Update copyright year (automatically set via JavaScript)
- Add new portfolio items in the portfolio section
- Update service offerings as needed
- Refresh contact information if changed

### Content Updates
- Portfolio images: Add to `images/` folder
- Update filtering classes: `photography`, `drone`, `video`, `twilight`, `floorplan`, `3dtour`

## License

**Private & Confidential**

This project is proprietary software owned by Elliot Media. All rights reserved. Unauthorized copying, distribution, or use of this software is strictly prohibited.

© 2024 Elliot Media. All Rights Reserved.

## Contact & Support

For technical support or inquiries:

- **Email:** contact@elliotmediapro.com
- **Phone:** (405) 926-6844
- **Website:** https://elliotmediapro.com

---

**Note:** This is a private company project. All code and content are confidential and proprietary to Elliot Media.
