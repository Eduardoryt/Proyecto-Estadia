import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Container, Input, FormGroup } from 'reactstrap';

const SubiendoImagenes = (props) => {
    const [image, setImagen] = useState({ Array: {} });
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Container style={{ textAlign: 'center' ,tex}}>
                <h1 className='text-center'> Sube tus imagenes aqui</h1>
                <Dropzone classname="dropzone"
                    // onDrop={}
                    onChange={(e) => setImage(e.target.value)}
                    value={image}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <span> 
                                    {/* <FontAwesomeIcon icon={faFolder} size="2x" /> */}
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
