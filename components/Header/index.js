import React, { useEffect } from 'react';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useSession, signIn, signOut } from 'next-auth/client'
import styles from '../../styles/components/Header.module.css';

export default function Header({children}) {
    const [session] = useSession();

    // console.log(session);

    useEffect(() => {
        if (session) {
            if(session.user.email !== 'projetosolaresufes@gmail.com') {
                signOut();
            }
        }
    },[session]);

    return (
        <>
            <div className={styles.container}>
                <img src="/logo-solares.png" alt="Logo do Solares" height="80%"/>
                {session && 
                <div className={styles.login}> 
                    <img src={session.user.image} alt="Imagem de perfil" style={{ height: 40, borderRadius: 20 }}/>
                    <h2 style={{ fontSize: '14px' }}>{session.user.name}</h2>
                    <h2>{session.token}</h2>
                    <p onClick={() => signOut()} className={styles.sair}>Sair <FiLogOut size="1rem"/></p>
                </div>}

                {!session && 
                    <div onClick={() => signIn("google")} className={styles.logout}>
                        <p>Entrar</p>
                        <FiLogIn color="#fff" size="1.2rem"/>
                    </div>} 
            </div>
            {children}
        </>
  );
}