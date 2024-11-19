import { useAuthRedirect } from "store/use-auth-data";


function ProtectedRoute({ children }) {
  const { isLoading } = useAuthRedirect();
    if (isLoading) return <></>;

  return children;
}

export default ProtectedRoute;