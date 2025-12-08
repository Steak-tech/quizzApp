import "./globals.css";
import Nav from "@/app/components/Nav";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
