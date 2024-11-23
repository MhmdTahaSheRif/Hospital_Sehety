// UserContext.js
import React, { createContext, useState, useEffect ,useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getAuthToken = () => {
            const token = localStorage.getItem('accessToken');
            return token ? `Bearer ${token}` : '';
        };
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://10.100.100.149:500/API/ProfileView/', {
                    headers: {
                        Authorization: getAuthToken()
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('خطأ أثناء جلب بيانات المستخدم:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, loading }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);