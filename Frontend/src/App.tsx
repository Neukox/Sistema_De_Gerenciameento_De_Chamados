import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./routes";
import ToastContainer from "@components/ui/toast/Container";
import ToastProvider from "@context/ToastContext";
import { AuthProvider } from "@context/AuthContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
