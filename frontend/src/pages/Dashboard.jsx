import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BarangCard from '../components/BarangCard';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function Dashboard() {
    const [barang, setBarang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    // Ambil data barang saat halaman pertama dibuka
    useEffect(() => {
        api.get('/barang')
            .then(res => setBarang(res.data))
            .finally(() => setLoading(false));
    }, []);

    // Filter barang berdasarkan pencarian
    const filtered = barang.filter(b =>
        b.nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Stok Barang</h1>
                    <input
                        style={styles.search}
                        placeholder="🔍 Cari barang..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p style={styles.info}>Memuat data...</p>
                ) : filtered.length === 0 ? (
                    <p style={styles.info}>Barang tidak ditemukan</p>
                ) : (
                    <div style={styles.grid}>
                        {filtered.map(b => (
                            <BarangCard
                                key={b._id}
                                barang={b}
                                isAdmin={user?.role === 'false'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: { minHeight: '100vh', background: '#f1f5f9' },
    container: { padding: '24px', maxWidth: '1100px', margin: '0 auto' },
    header: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px'
    },
    title: { fontSize: '22px', fontWeight: '700', color: '#1e293b' },
    search: {
        padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0',
        fontSize: '14px', width: '240px', outline: 'none'
    },
    grid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
    },
    info: { color: '#94a3b8', textAlign: 'center', marginTop: '48px' },
};