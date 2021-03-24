import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Card, Header, Tab, Image, Button, Grid } from 'semantic-ui-react'
import { PhotoUploadWidget } from '../../app/common/photoUpload/PhotoUploadWidget';
import { RootStoreContext } from '../../app/stores/rootStore'

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, loading, deletePhoto } = rootStore.profileStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);

    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated="left" icon="image" content="Photos" />
                    {
                        isCurrentUser &&
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {
                        addPhotoMode ? (
                            <PhotoUploadWidget handleUploadPhoto={handleUploadPhoto} loading={uploadingPhoto} />
                        ) : (
                            <Card.Group itemsPerRow={5}>
                                {
                                    profile && profile.photos.map((photo) => (
                                        <Card key={photo.id}>
                                            <Image src={photo.url} />
                                            {isCurrentUser && (
                                                <Button.Group fluid widths={2}>
                                                    <Button
                                                        name={photo.id}
                                                        floated="right"
                                                        basic
                                                        positive
                                                        content={'Main'}
                                                        loading={loading && target === photo.id}
                                                        disabled={photo.isMain}
                                                        onClick={(e) => {
                                                            setMainPhoto(photo);
                                                            setTarget(e.currentTarget.name)
                                                        }}
                                                    />
                                                    <Button
                                                        name={photo.id}
                                                        loading={loading && deleteTarget === photo.id}
                                                        disabled={photo.isMain}
                                                        floated="right"
                                                        basic
                                                        negative
                                                        icon="trash"
                                                        onClick={(e) => {
                                                            deletePhoto(photo);
                                                            setDeleteTarget(e.currentTarget.name)
                                                        }}
                                                    />
                                                </Button.Group>
                                            )}
                                        </Card>
                                    ))
                                }
                            </Card.Group>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>

    )
}

export default observer(ProfilePhotos);
