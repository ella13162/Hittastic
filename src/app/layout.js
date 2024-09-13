'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import './style.css';

export default function Layout({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.username === username) {
                setUser(storedUser);
            }
        }
    }, []);

    const handleLogout = () => {
        // Clear the cookies and local storage
        Cookies.remove('username');
        localStorage.removeItem('user');
        setUser(null);

        // Use router.replace to navigate and re-render
        router.replace('/');
    };

    return (
        <html>
            <body>
                <div className="layout">
                    <header>
                        <nav>
                            <div className="nav-links">
                                <Link href="/">Home</Link>
                                <Link href="/about">About</Link>
                                <Link href="/search">Search</Link>
                            </div>
                            {user ? (
                                <div className="user-info">
                                    <span>Welcome, {user.username}</span>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <div className="auth-links">
                                    <Link href="/login">Login</Link>
                                    <Link href="/signup">Signup</Link>
                                </div>
                            )}
                        </nav>
                    </header>
                    <main>{children}</main>
                    <footer>
                        <p>&copy; {new Date().getFullYear()} HitTastic. All rights reserved.</p>
                        <p>
                            <Link href="/privacy-policy">Privacy Policy</Link> |
                            <Link href="/terms-of-service"> Terms of Service</Link>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
