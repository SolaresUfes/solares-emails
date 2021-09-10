import { createContext, useState } from "react";
import { useSession } from 'next-auth/client';
import Swal from 'sweetalert2'

export const EmailsDataContext = createContext();

export function EmailsDataProvider({ children }) {
    const [csvData, setCsvData] = useState([]);
    const [typeBody, setTypeBody] = useState('');
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');
    const [session] = useSession();


    function showAlert() {
        let timerInterval
        Swal.fire({
            title: 'Enviando os emails!',
            html: `O processo terminará em <b></b> millisegundos.<br/></br>
                <img src="https://aexlog.com.br/lp/wp-content/uploads/2020/08/e-mail.gif" 
                     alt="enviando email gif"
                     width="100px"
                     height="100px"
                />`,
            timer: csvData.length * 1000 + 1000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Finalizado!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    const handleSubmitEmails = () => {
        if (subject === '') {
            alert('Escreva um assunto para os emails')
            return;
        }
        else if (body === '') {
            alert('Escreva um corpo para os emails')
            return;
        }

        showAlert();

        // console.log(data);
        fetch('/api/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                list: csvData,
                body: body,
                subject: subject,
                typeBody: typeBody,
                auth: {
                    email: session.user.email,
                    accessToken: session.accessToken,
                }
            }),
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                // console.log(res.json());
                // console.log('Response succeeded!')
                setCsvData([]);
                setBody('');
                setSubject('');
                setTypeBody('');
            }
            else {
                console.log('Response failed!')
            }
        })
    }

    return (
        <EmailsDataContext.Provider value={{
            csvData,
            body,
            subject,
            typeBody,
            setCsvData,
            setBody,
            setSubject,
            setTypeBody,
            handleSubmitEmails,
        }}>
            {children}
        </EmailsDataContext.Provider>
    )
}