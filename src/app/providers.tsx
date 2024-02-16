import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { LanguageContextProvider } from "@/contexts/language-context";
import { ReactQueryWrapper } from "@/libs/react-query";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // for development purposes
    <HydrationOverlay>
      <ReactQueryWrapper>
        <LanguageContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children} <ReactQueryDevtools initialIsOpen={true} />
          </ThemeProvider>
        </LanguageContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryWrapper>
    </HydrationOverlay>
  );
}
