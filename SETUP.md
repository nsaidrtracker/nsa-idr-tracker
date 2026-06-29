*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy: #0A1628;
  --navy-mid: #112240;
  --blue: #1B4FD8;
  --blue-light: #3B82F6;
  --gold: #F59E0B;
  --green: #059669;
  --surface: #F8FAFC;
  --white: #FFFFFF;
  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #E2E8F0;
  --gray-400: #94A3B8;
  --gray-600: #475569;
  --gray-800: #1E293B;
  --text: #0F172A;
  --radius: 10px;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font);
  background: var(--surface);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button { font-family: var(--font); cursor: pointer; border: none; }
