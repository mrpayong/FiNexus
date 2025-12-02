
import { Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import Footer from "@/components/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "FiNexus",
  description: "Cashflow Management System",
};



export default function RootLayout({ children }) {
  

  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={`${inter.className} bg-[#F5F5F5]`}
          >
              <Header />
                <main className="min-h-screen relative z-0">
                 
                      {children}
                    <SpeedInsights />
                  
                </main>
            <Toaster richColors/>
            
            <Footer/>
          </body>
        </html>
    </ClerkProvider>
  );
}
