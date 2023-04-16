import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Notifications />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
