import { useSession, signIn } from "next-auth/client";
import React, { useContext } from "react";
import { WelcomeAnimation } from "../../components/Animations";
import CsvDropzone from "../../components/CsvDropzone";
import Header from "../../components/Header";
import { EmailsDataContext } from "../../contexts/EmailsDataContext";
import JSONViewer from 'react-json-viewer';
import styles from '../../styles/Home.module.css'

export default function Home() {
    const [session] = useSession();
    const {
        csvData,
        subject,
        body,
        typeBody,
        setBody,
        setSubject,
        setTypeBody,
        handleSubmitEmails,
    } = useContext(EmailsDataContext)

    return (
        <>
            <Header />
            <div className={styles.container}>
                {!session ?
                    <>
                        <h1>Disparador automático de emails</h1>
                        <WelcomeAnimation />
                        <div className={styles.login} onClick={() => signIn("google")}>
                            <img src="/logo-google.png" alt="logo do google" width="30px" />
                            <p>Logar com o Google</p>
                        </div>
                    </>
                    :
                    <div className={csvData.length > 0 ? styles.formArea : null}>

                        {typeBody === '' && <>
                            <label htmlFor="type" className={styles.label}>Selecione o tipo do email: </label>
                            <select name="type" onChange={(e) => setTypeBody(e.target.value)}>
                                <option value="">Selecione</option>
                                <option>Texto</option>
                                <option>HTML</option>
                            </select>
                        </>}
                        {typeBody !== '' && <CsvDropzone />}
                        {csvData.length > 0 && (
                            <>
                                <input 
                                    type="text" 
                                    placeholder="Assunto" 
                                    value={subject} 
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                <textarea 
                                    placeholder="Corpo da mensagem. Use ~@nomedocampo~ para persornalizar cada email com os campos do CSV." 
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                                <button className={styles.button} onClick={() => handleSubmitEmails()}>Enviar emails</button>
                                <h3>Dados do CSV:</h3>
                                <JSONViewer key={String(Math.random())} json={csvData} />
                            </>
                        )}
                    </div>
                }
            </div>
        </>
    )
}