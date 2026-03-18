export default function BarangCard({ barang, isAdmin, onEdit, onDelete }) {
    const stokColor = barang.stok === 0 ? '#ef4444'
        : barang.stok < 5 ? '#f97316'
            : '#22c55e';

    return (
        <div style={styles.card}>
            {/* Gambar Barang */}
            <div style={styles.imgWrapper}>
                {barang.gambar ? (
                    <img src={barang.gambar} alt={barang.nama} style={styles.img} />
                ) : (
                    <div style={styles.noImg}>📦</div>
                )}
            </div>

            <div style={styles.body}>
                <div style={styles.header}>
                    <span style={styles.nama}>{barang.nama}</span>
                    <span style={{ ...styles.badge, background: stokColor }}>
                        Stok: {barang.stok} {barang.satuan}
                    </span>
                </div>

                <div style={styles.info}>
                    <span>📁 {barang.kategori || 'Tanpa kategori'}</span>
                    <span>💰 Rp {barang.harga?.toLocaleString('id-ID')}</span>
                </div>

                {isAdmin && (
                    <div style={styles.actions}>
                        <button onClick={() => onEdit(barang)} style={styles.btnEdit}>Edit</button>
                        <button onClick={() => onDelete(barang._id)} style={styles.btnDelete}>Hapus</button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: '#fff', borderRadius: '10px', overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)', display: 'flex',
        flexDirection: 'column'
    },
    imgWrapper: {
        width: '100%', height: '180px', overflow: 'hidden',
        background: '#f8fafc', display: 'flex', alignItems: 'center',
        justifyContent: 'center'
    },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    noImg: { fontSize: '48px', color: '#cbd5e1' },
    body: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    nama: { fontWeight: '600', fontSize: '15px', color: '#1e293b' },
    badge: { color: '#fff', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' },
    info: { display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b' },
    actions: { display: 'flex', gap: '8px', marginTop: '4px' },
    btnEdit: {
        flex: 1, padding: '6px', background: '#3b82f6', color: '#fff',
        border: 'none', borderRadius: '6px', cursor: 'pointer'
    },
    btnDelete: {
        flex: 1, padding: '6px', background: '#ef4444', color: '#fff',
        border: 'none', borderRadius: '6px', cursor: 'pointer'
    },
};