import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TransaksiTable from '../components/TransaksiTable';
import api from '../api/axios';

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const [barangList, setBarangList] = useState([]);
    const [form, setForm] = useState({ barang: '', tipe: 'masuk', jumlah: 1, keterangan: '' });
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/transaksi').then(r => setTransaksi(r.data));
        api.get('/barang').then(r => setBarangList(r.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/transaksi', form);
            const [t, b] = await Promise.all([
                api.get('/transaksi'),
                api.get('/barang'),
            ]);
            setTransaksi(t.data);
            setBarangList(b.data); // refresh stok barang
            setForm({ barang: '', tipe: 'masuk', jumlah: 1, keterangan: '' });
            setShowForm(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mencatat transaksi');
        }
    };

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Riwayat Transaksi</h1>
                    <button onClick={() => setShowForm(!showForm)} style={styles.btnAdd}>
                        {showForm ? 'Batal' : '+ Catat Transaksi'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h3 style={styles.formTitle}>Catat Transaksi Baru</h3>
                        {error && <div style={styles.error}>{error}</div>}
                        <div style={styles.grid2}>

                            <div style={styles.field}>
                                <label style={styles.label}>Barang</label>
                                <select
                                    value={form.barang}
                                    onChange={e => setForm({ ...form, barang: e.target.value })}
                                    style={styles.input} required
                                >
                                    <option value="">-- Pilih Barang --</option>
                                    {barangList.map(b => (
                                        <option key={b._id} value={b._id}>
                                            {b.nama} (Stok: {b.stok})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Tipe</label>
                                <select
                                    value={form.tipe}
                                    onChange={e => setForm({ ...form, tipe: e.target.value })}
                                    style={styles.input}
                                >
                                    <option value="masuk">Masuk</option>
                                    <option value="keluar">Keluar</option>
                                </select>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Jumlah</label>
                                <input
                                    type="number" min="1"
                                    value={form.jumlah}
                                    onChange={e => setForm({ ...form, jumlah: Number(e.target.value) })}
                                    style={styles.input} required
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Keterangan</label>
                                <input
                                    type="text"
                                    value={form.keterangan}
                                    onChange={e => setForm({ ...form, keterangan: e.target.value })}
                                    style={styles.input}
                                    placeholder="Opsional"
                                />
                            </div>
                        </div>
                        <button type="submit" style={styles.btnSave}>Simpan Transaksi</button>
                    </form>
                )}

                <TransaksiTable data={transaksi} />
            </div>
        </div>
    );
}

const styles = {
    page: { minHeight: '100vh', background: '#f1f5f9' },
    container: { padding: '24px', maxWidth: '1100px', margin: '0 auto' },
    header: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px'
    },
    title: { fontSize: '22px', fontWeight: '700', color: '#1e293b' },
    btnAdd: {
        background: '#1e293b', color: '#fff', border: 'none',
        padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'
    },
    form: {
        background: '#fff', padding: '24px', borderRadius: '12px',
        marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
    },
    formTitle: { marginBottom: '16px', color: '#1e293b' },
    error: {
        background: '#fee2e2', color: '#ef4444', padding: '10px',
        borderRadius: '6px', marginBottom: '12px', fontSize: '13px'
    },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', fontWeight: '500', color: '#475569' },
    input: {
        padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0',
        fontSize: '14px', outline: 'none'
    },
    btnSave: {
        marginTop: '16px', padding: '12px 24px', background: '#22c55e',
        color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'
    },
};