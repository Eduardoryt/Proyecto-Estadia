import { Container, Input,For } from 'reactstrap';
import React from 'react'

const SubiendoImagenes = (props
) => {
    return (<div>
        <Container style={{ textAlign: 'center' }}>
            <h1>Subiendo Imagenes</h1>
            <FormGroup>
                <Input type="file" name="file" placeholder="Sube tu imagen aqui" />
            </FormGroup>
        </Container>
    </div>);

}

export default SubiendoImagenes;