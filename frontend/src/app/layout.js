import "./globals.css";

import { Russo_One } from 'next/font/google';

const russo = Russo_One({
  subsets: ['latin'], // indispensable
  weight: '400', 
  variable: "--font-russo",     // Russo One n'a qu'un seul poids
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={russo.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
