import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>Inventory App</div>
            <div style={styles.menu}>
                {/* Semua user bisa lihat Dashboard */}
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>

                {/* Hanya admin yang lihat menu ini */}
                {user?.role === 'admin' && (
                    <>
                        <Link to="/barang" style={styles.link}>Barang</Link>
                        <Link to="/transaksi" style={styles.link}>Transaksi</Link>
                    </>
                )}

                <span style={styles.userInfo}>👤 {user?.name}</span>
                <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', background: '#1e293b', color: '#fff'
    },
    brand: { fontWeight: 'bold', fontSize: '18px' },
    menu: { display: 'flex', alignItems: 'center', gap: '16px' },
    link: { color: '#9ab4d9', textDecoration: 'none', fontSize: '14px' },
    userInfo: { color: '#64748b', fontSize: '13px' },
    btn: {
        background: '#ef4444', color: '#fff', border: 'none',
        padding: '6px 14px', borderRadius: '6px', cursor: 'pointer'
    },
};