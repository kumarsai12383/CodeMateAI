# Online HTML/CSS/JS Editor 🚀

A powerful, feature-rich web-based code editor that allows users to write HTML, CSS, and JavaScript code with live preview functionality. Think CodePen or JSFiddle, but with enhanced features and a modern interface.

![Online Code Editor](https://img.shields.io/badge/HTML-CSS-JS-Editor-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## ✨ Features

### 🎨 Editor Capabilities

- *Syntax Highlighting*: Powered by CodeMirror with support for HTML, CSS, and JavaScript
- *Auto-completion*: Smart bracket closing, tag closing, and code completion
- *Code Formatting*: Built-in code beautification using js-beautify
- *Line Numbers*: Clear line numbering with gutter support
- *Code Folding*: Collapsible code sections for better organization
- *Multiple Themes*: Light and dark theme support

### 📱 User Interface

- *Responsive Design*: Works seamlessly on desktop, tablet, and mobile devices
- *Split-Screen Layout*: Resizable panels for editors and preview
- *Tabbed Interface*: Easy switching between HTML, CSS, and JavaScript editors
- *Modern UI*: Clean, professional interface with intuitive controls

### 🔧 Live Preview

- *Real-time Updates*: Live preview updates as you type (optional)
- *iframe Security*: Safe code execution in sandboxed environment
- *Console Integration*: Built-in console for JavaScript output and errors
- *Fullscreen Mode*: Dedicated fullscreen preview for better testing
- *External Preview*: Open preview in new tab

### 💾 Project Management

- *Local Storage*: Automatic saving to browser's local storage
- *Project Save/Load*: Named project saving and loading
- *Auto-save*: Automatic backup of current work
- *Project Sharing*: Generate shareable URLs for projects
- *Import/Export*: Share code via encoded URLs

### 🎯 Advanced Features

- *Console Output*: Real-time JavaScript console with error tracking
- *Keyboard Shortcuts*: Productivity shortcuts for common actions
- *Theme Toggle*: Switch between light and dark themes
- *Clear Functions*: Quick clear options for each editor
- *Error Handling*: Comprehensive error catching and display

## 🚀 Getting Started

### Quick Start

1. Download or clone the project files
2. Open index.html in your web browser
3. Start coding immediately with the default template
4. See your changes live in the preview panel

### File Structure


online-editor/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and themes
├── script.js           # JavaScript functionality
└── README.md          # Documentation


### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser
- Internet connection for CDN resources (CodeMirror, Font Awesome, etc.)

## 📖 Usage Guide

### Basic Usage

1. *Writing Code*: Click on HTML, CSS, or JS tabs to switch between editors
2. *Live Preview*: Enable "Auto Update" for real-time preview updates
3. *Manual Update*: Click "Run Code" to update preview manually
4. *Theme Switch*: Use the theme toggle button in the header

### Keyboard Shortcuts

- Ctrl/Cmd + S: Save project
- Ctrl/Cmd + O: Load project
- Ctrl/Cmd + Enter: Run code
- F5: Refresh preview
- Alt + 1/2/3: Switch between HTML/CSS/JS editors

### Project Management

1. *Saving*: Click "Save" button, enter project name and description
2. *Loading*: Click "Load" button, select from saved projects
3. *Sharing*: Click "Share" to generate a shareable URL
4. *Auto-save*: Work is automatically saved as you type

### Console Usage

- View JavaScript output in the integrated console
- Console automatically expands when messages are logged
- Clear console output with the clear button
- Toggle console visibility as needed

## 🎨 Customization

### Adding Custom Themes

The editor supports theme customization through CSS variables:

css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --accent-color: #007bff;
  /* Add more custom colors */
}


### Extending Functionality

The modular JavaScript structure allows easy extension:

javascript
// Add new editor functionality
codeEditor.addCustomFeature = function () {
  // Your custom code here
};


## 🔧 Technical Details

### Dependencies

- *CodeMirror 5.65.2*: Code editor with syntax highlighting
- *js-beautify 1.14.0*: Code formatting and beautification
- *Font Awesome 6.0.0*: Icons and UI elements

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance

- Optimized for large code files
- Efficient re-rendering and updates
- Minimal memory footprint
- Fast startup time

## 🔒 Security

### Code Execution

- Preview runs in sandboxed iframe
- Safe execution environment
- No server-side code execution
- XSS protection built-in

### Data Storage

- All data stored locally in browser
- No server communication required
- Privacy-focused design
- Optional sharing via URL encoding

## 🛠 Troubleshooting

### Common Issues

1. *Preview not updating*: Check if auto-update is enabled
2. *Console not showing*: Click the console toggle button
3. *Code not saving*: Ensure browser allows local storage
4. *Share URL not working*: Check if URL is complete and properly copied

### Browser Compatibility

If you experience issues:

1. Ensure JavaScript is enabled
2. Clear browser cache and cookies
3. Try in an incognito/private window
4. Update to the latest browser version

## 📝 Development

### Local Development

1. Clone the repository
2. Open index.html in your browser
3. Make changes to HTML, CSS, or JavaScript files
4. Refresh browser to see changes

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- *CodeMirror*: For the excellent code editor component
- *js-beautify*: For code formatting capabilities
- *Font Awesome*: For beautiful icons
- *Community*: For feedback and suggestions

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Contact the development team

---

*Happy Coding! 🎉*

Made with ❤ for developers who love clean, efficient tools.
