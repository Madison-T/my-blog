import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const allowedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser?.email === allowedEmail) {
                setUser(firebaseUser);
            } else {
                setUser(null);
                signOut(auth);
            }
        });
        return () => unsubscribe();
    }, [allowedEmail]);
    
    const login = async (email: string, password: string): Promise<boolean> => {
        if (email !== allowedEmail) {
            return false;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (err) {
            return false;
        }
    };

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};