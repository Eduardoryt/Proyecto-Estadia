import axios from 'axios'
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Container } from 'reactstrap';
import '../../css/SubiendoImagenes.css'

const SubiendoImagenes = (props) => {
    const [image, setImagen] = useState({ Array: [] });
    const [loading, setLoading] = useState("");
    const handleDrop = (files) => {
        const uploaders = files.map((file) => {
            const formData = new FormData();
            formData.append("file", file)
            formData.append("tags", `codeinfuse,medium,gist`);
            formData.append("upload_preset", "Imagenes INNEGO")
            formData.append("api_key", "611133767965517")
            formData.append("timestamp", (Date.now() / 1000) / 0)
            setLoading("true")
            return axios
                .post(" https://api.cloudinary.com/v1_1/dxmhlxdxo/image/upload", formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                })
                .then((response) => {
                    const data = response.data

                    const fileURL = data.secure_url;
                    let specificArrayInObject = image.Array;
                    specificArrayInObject.push(fileURL)
                    const newObj = { ...image, specificArrayInObject }
                    setImagen(newObj);
                    console.log(image)
                })
        })
        axios.all(uploaders).then(() => {
            setLoading("false")
        })
    }
    function imagenPreview() {
        if (loading === "true") {
            return <h3>Cargando Imagenes...</h3>
        }
        if(loading==="false") { 
            return()
        }
    }
    return (
        <div>
            <Container style={{ textAlign: 'center', color: 'black' }}>
                <h1 className='text-center'> Sube tus imagenes aqui</h1>
                <Dropzone classname="dropzone"
                    onDrop={handleDrop}
                    onChange={(e) => setImage(e.target.value)}
                    value={image}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <span>
                                    📁
                                </span>
                                <p>Coloca tus imagenes aqui,O clickea para selectionar</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </Container>
        </div >
    );
};

export default SubiendoImagenes;
