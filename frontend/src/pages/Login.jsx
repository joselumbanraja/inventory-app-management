import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', form);
            login(res.data.user, res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.gradientBg}></div>
            <div style={styles.floatingShapes}>
                <div style={styles.shape1}></div>
                <div style={styles.shape2}></div>
                <div style={styles.shape3}></div>
            </div>

            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.logo}>
                            📦
                        </div>
                        <h2 style={styles.title}>Inventory App</h2>
                        <p style={styles.subtitle}>Masuk ke akun kamu</p>
                    </div>

                    {error && (
                        <div style={styles.error}>
                            <span style={styles.errorIcon}>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                style={styles.input}
                                placeholder="email@contoh.com"
                                required
                            />
                            <div style={styles.inputGlow}></div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                style={styles.input}
                                placeholder="••••••••"
                                required
                            />
                            <div style={styles.inputGlow}></div>
                        </div>

                        <button type="submit" style={styles.btn} disabled={loading}>
                            <span style={styles.btnContent}>
                                {loading ? (
                                    <>
                                        <div style={styles.spinner}></div>
                                        Memuat...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </span>
                            <div style={styles.btnShine}></div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    gradientBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: 1
    },
    floatingShapes: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 2
    },
    shape1: {
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '120px',
        height: '120px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float1 6s ease-in-out infinite',
        backdropFilter: 'blur(10px)'
    },
    shape2: {
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        animation: 'float2 8s ease-in-out infinite',
        backdropFilter: 'blur(10px)'
    },
    shape3: {
        position: 'absolute',
        top: '60%',
        right: '25%',
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        animation: 'float3 10s ease-in-out infinite',
        backdropFilter: 'blur(10px)'
    },
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
        padding: '20px'
    },
    card: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '48px 40px',
        borderRadius: '24px',
        boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9)
        `,
        width: '100%',
        maxWidth: '420px',
        transform: 'translateZ(0)',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '36px'
    },
    logo: {
        width: '72px',
        height: '72px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        margin: '0 auto 20px',
        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
        animation: 'glow 2s ease-in-out infinite alternate'
    },
    title: {
        fontSize: '28px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0 0 8px 0',
        letterSpacing: '-0.02em'
    },
    subtitle: {
        color: '#64748b',
        fontSize: '16px',
        fontWeight: '500',
        margin: 0,
        letterSpacing: '-0.01em'
    },
    error: {
        background: 'linear-gradient(90deg, #fee2e2, #fecaca)',
        color: '#dc2626',
        padding: '14px 16px',
        borderRadius: '12px',
        marginBottom: '24px',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)'
    },
    errorIcon: {
        fontSize: '16px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        position: 'relative'
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px',
        display: 'block',
        letterSpacing: '-0.01em'
    },
    input: {
        width: '100%',
        padding: '14px 18px',
        borderRadius: '12px',
        border: '2px solid rgba(148, 163, 184, 0.3)',
        fontSize: '16px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        outline: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    inputGlow: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: 'linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.1), transparent)',
        borderRadius: '50%',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: -1
    },
    btn: {
        position: 'relative',
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '16px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px',
        overflow: 'hidden',
        boxShadow: `
            0 12px 32px rgba(102, 126, 234, 0.4),
            0 4px 12px rgba(118, 75, 162, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContent: {
        position: 'relative',
        zIndex: 2
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '12px'
    },
    btnShine: {
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        transition: 'left 0.5s'
    },
    footer: {
        textAlign: 'center',
        marginTop: '28px',
        paddingTop: '24px',
        borderTop: '1px solid rgba(148, 163, 184, 0.3)'
    },
    footerText: {
        color: '#64748b',
        fontSize: '14px',
        margin: 0
    },
    link: {
        color: '#667eea',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
    }
};

// Tambahkan CSS animations di index.html atau CSS file
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float1 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    @keyframes float2 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        50% { transform: translateY(-15px) rotate(90deg) scale(1.05); }
    }
    @keyframes float3 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-25px) rotate(-90deg); }
    }
    @keyframes glow {
        0% { box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4); }
        100% { box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6), 0 0 20px rgba(102, 126, 234, 0.3); }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    input:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1), 0 12px 24px rgba(0, 0, 0, 0.15) !important;
        transform: translateY(-2px) !important;
    }
    button:not(:disabled):hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5) !important;
    }
    button:not(:disabled):hover .btnShine {
        left: '100%' !important;
    }
    .link:hover {
        color: '#5a67d8' !important;
        text-decoration: underline !important;
    }
`;
document.head.appendChild(styleSheet);