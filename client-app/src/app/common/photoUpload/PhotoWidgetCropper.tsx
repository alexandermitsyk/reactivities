import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
    setCropper: (cropper: Cropper) => void;
    imagePreview: string,
}

const PhotoWidgetCropper: React.FC<IProps> = ({ setCropper, imagePreview }) => {
    return (
        <Cropper
            src={imagePreview}
            style={{ height: 200, width: "100%" }}
            preview='.img-preview'
            initialAspectRatio={1 / 1}
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            onInitialized={(cropper) => {
                setCropper(cropper);
            }}
        />
    )
}

export default PhotoWidgetCropper;
