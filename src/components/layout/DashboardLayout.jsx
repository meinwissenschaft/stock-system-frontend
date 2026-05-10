import Sidebar from './Sidebar';
import ToastContainer from '../ui/ToastContainer';

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-main">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
