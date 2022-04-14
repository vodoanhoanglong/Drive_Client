import { useAuth } from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';
import Modal from './Modal';
export const ProtectedRoute = () => {
  const auth = useAuth();
  if (auth.loading)
    return (
      <Modal isActive={true}>
        <Loading />
      </Modal>
    );
  return auth.isLogged && !auth.loading ? <Outlet /> : <Navigate to='/login' />;
};
