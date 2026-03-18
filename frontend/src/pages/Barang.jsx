import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BarangCard from '../components/BarangCard';
import api from '../api/axios';

const emptyForm = { nama: '', kategori: '', stok: 0, harga: 0, satuan: 'pcs', gambar: '' };

export default function Barang() {
    const [barang, setBarang] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');

    const fetchBarang = () => api.get('/barang').then(r => setBarang(r.data));

    useEffect(() => { fetchBarang(); }, []);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setForm({ ...form, gambar: '' });
    };

    const handleUrlChange = (e) => {
        setForm({ ...form, gambar: e.target.value });
        setFile(null);
        setPreview(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const formData = new FormData();
            formData.append('nama', form.nama);
            formData.append('kategori', form.kategori);
            formData.append('stok', form.stok);
            formData.append('harga', form.harga);
            formData.append('satuan', form.satuan);

            if (file) {
                formData.append('gambar', file);
            } else {
                formData.append('gambar', form.gambar);
            }

            if (editId) {
                await api.put(`/barang/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/barang', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            setForm(emptyForm);
            setFile(null);
            setPreview('');
            setEditId(null);
            setShowForm(false);
            fetchBarang();

        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan barang');
        }
    };

    const handleEdit = (b) => {
        setForm({
            nama: b.nama,
            kategori: b.kategori,
            stok: b.stok,
            harga: b.harga,
            satuan: b.satuan,
            gambar: b.gambar
        });
        setPreview(b.gambar || '');
        setFile(null);
        setEditId(b._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus barang ini?')) return;
        try {
            await api.delete(`/barang/${id}`);
            fetchBarang();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus barang');
        }
    };

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Kelola Barang</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setForm(emptyForm);
                            setFile(null);
                            setPreview('');
                            setEditId(null);
                            setError('');
                        }}
                        style={styles.btnAdd}
                    >
                        {showForm ? 'Batal' : '+ Tambah Barang'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h3 style={styles.formTitle}>
                            {editId ? 'Edit Barang' : 'Tambah Barang'}
                        </h3>

                        {/* Tampilkan error dari demo restriction */}
                        {error && (
                            <div style={styles.errorBox}>{error}</div>
                        )}

                        <div style={styles.grid2}>
                            {[
                                { label: 'Nama Barang', key: 'nama', type: 'text', required: true },
                                { label: 'Kategori', key: 'kategori', type: 'text', required: false },
                                { label: 'Stok', key: 'stok', type: 'number', required: false },
                                { label: 'Harga (Rp)', key: 'harga', type: 'number', required: true },
                                { label: 'Satuan', key: 'satuan', type: 'text', required: false },
                            ].map(f => (
                                <div key={f.key} style={styles.field}>
                                    <label style={styles.label}>{f.label}</label>
                                    <input
                                        type={f.type}
                                        value={form[f.key]}
                                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        style={styles.input}
                                        required={f.required}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Section Upload Gambar */}
                        <div style={styles.imgSection}>
                            <p style={styles.label}>Gambar Barang</p>

                            {preview && (
                                <div style={styles.previewWrapper}>
                                    <img src={preview} alt="preview" style={styles.previewImg} />
                                </div>
                            )}

                            <div style={styles.field}>
                                <label style={styles.label}>Upload dari Komputer</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={styles.inputFile}
                                />
                            </div>

                            <div style={styles.orDivider}>— atau —</div>

                            <div style={styles.field}>
                                <label style={styles.label}>Pakai URL Gambar</label>
                                <input
                                    type="text"
                                    placeholder="https://contoh.com/gambar.jpg"
                                    value={form.gambar}
                                    onChange={handleUrlChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <button type="submit" style={styles.btnSave}>
                            {editId ? 'Simpan Perubahan' : 'Tambah Barang'}
                        </button>
                    </form>
                )}

                <div style={styles.gridCard}>
                    {barang.map(b => (
                        <BarangCard
                            key={b._id}
                            barang={b}
                            isAdmin={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
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
    errorBox: {
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
    inputFile: {
        padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0',
        fontSize: '14px', cursor: 'pointer'
    },
    imgSection: { marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
    previewWrapper: {
        width: '100%', height: '200px', borderRadius: '8px',
        overflow: 'hidden', background: '#f8fafc',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
    orDivider: { textAlign: 'center', color: '#94a3b8', fontSize: '13px' },
    btnSave: {
        marginTop: '16px', padding: '12px 24px', background: '#22c55e',
        color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'
    },
    gridCard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
        gap: '16px'
    },
};