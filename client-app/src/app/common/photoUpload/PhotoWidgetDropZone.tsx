import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface IProps {
    setFiles: (files: object[]) => void;
}

const dropZoneStyle = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    heigth: '200px',
}

const dropZoneActiveStyle = {
    borderColor: 'green',
}

const PhotoWidgetDropZone: React.FC<IProps> = ({ setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file),
        })));
    }, [setFiles]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dropZoneStyle, ...dropZoneActiveStyle } : dropZoneStyle}>
            <input {...getInputProps()} />
            <Icon name='upload' size="huge" />
            <Header content="Drop image here" />
        </div>
    )
}

export default PhotoWidgetDropZone;