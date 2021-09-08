import React from "react";
import { CSVReader } from 'react-papaparse';
import styles from '../../styles/components/CsvDropzone.module.css';
import { useContext } from "react";
import { EmailsDataContext } from "../../contexts/EmailsDataContext";

export default function CsvDropzone(props) {

    const {
        setCsvData,
    } = useContext(EmailsDataContext)

    const handleOnDrop = (data) => {
        let dataArray = data.map(item => {
            return item.data;
        });
        setCsvData(dataArray);
    };

    const handleOnRemoveFile = (data) => {
        setCsvData([]);
    };

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    return (
        <div className={styles.container}>
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
                style={{ width: '100%', backgroundColor: '#fafafa' }}
                config={{
                    header: true,
                }}
            >
                <span>Selecione ou arraste seu arquivo CSV</span>
            </CSVReader>
        </div>
    )
}