'use client'
import React, { createContext, useEffect, useState } from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';
import { usePathname } from 'next/navigation';
export const UserContext = createContext();

const Provider = ({ children }) => {
    const [products, setProducts] = useState('');
    const path = usePathname();
    const hiddenPath = ['/login', '/components/dashboard']

    useEffect(() => {
        const adminData = async () => {
            try {
                const res = await fetch('/api/products', { method: 'GET' });
                const data = await res.json();
                if (data.success) setProducts(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        adminData();
    }, []);

    return (
        <div className="">
            <UserContext.Provider value={{ products }}>
                {path !== '/login' && <Header />}
                <div className='mt-16'>{children}</div>
                {!hiddenPath.includes(path) && <Footer />}
            </UserContext.Provider>
        </div>
    )
}

export default Provider