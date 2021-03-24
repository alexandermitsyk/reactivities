import React, { Fragment, useState, useEffect } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropZone from './PhotoWidgetDropZone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface IProps {
    loading: boolean,
    handleUploadPhoto: (file: Blob) => void;
}

export const PhotoUploadWidget: React.FC<IProps> = ({ loading, handleUploadPhoto }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob: any) => {
                if (blob) {
                    handleUploadPhoto(blob)
                }
            });
        }
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files]);

    return (
        <Fragment>
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWidgetDropZone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {
                        files.length > 0 && (
                            <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                        )
                    }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {
                        files.length > 0 && (
                            <>
                                <div className="img-preview" style={{ minHeight: '200px', overflow: 'hidden' }} />
                                <Button.Group widths={2}>
                                    <Button positive icon="check" loading={loading} onClick={onCrop} />
                                    <Button basic icon="close" disabled={loading} onClick={() => setFiles([])} />
                                </Button.Group>
                            </>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Fragment>
    )
};

export default observer(PhotoUploadWidget);