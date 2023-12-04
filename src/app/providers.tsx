import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { ReactQueryWrapper } from "@/libs/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryWrapper>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children} <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </ReactQueryWrapper>
  );
}
