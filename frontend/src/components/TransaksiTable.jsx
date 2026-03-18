// Komponen tabel untuk menampilkan riwayat transaksi
export default function TransaksiTable({ data }) {
    return (
        <div style={styles.wrapper}>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.thead}>
                        <th style={styles.th}>Tanggal</th>
                        <th style={styles.th}>Barang</th>
                        <th style={styles.th}>Tipe</th>
                        <th style={styles.th}>Jumlah</th>
                        <th style={styles.th}>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={styles.empty}>Belum ada transaksi</td>
                        </tr>
                    ) : (
                        data.map(t => (
                            <tr key={t._id} style={styles.tr}>
                                <td style={styles.td}>
                                    {new Date(t.tanggal).toLocaleDateString('id-ID')}
                                </td>
                                <td style={styles.td}>{t.barang?.nama || '-'}</td>
                                <td style={styles.td}>
                                    {/* Badge warna berbeda untuk masuk/keluar */}
                                    <span style={{
                                        ...styles.badge,
                                        background: t.tipe === 'masuk' ? '#22c55e' : '#ef4444'
                                    }}>
                                        {t.tipe}
                                    </span>
                                </td>
                                <td style={styles.td}>{t.jumlah}</td>
                                <td style={styles.td}>{t.keterangan || '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    wrapper: {
        overflowX: 'auto', borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
    },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff' },
    thead: { background: '#1e293b' },
    th: {
        padding: '12px 16px', textAlign: 'left', color: '#94a3b8',
        fontSize: '13px', fontWeight: '500'
    },
    tr: { borderBottom: '1px solid #f1f5f9' },
    td: { padding: '12px 16px', fontSize: '14px', color: '#334155' },
    badge: { color: '#fff', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' },
    empty: { padding: '24px', textAlign: 'center', color: '#94a3b8' },
};