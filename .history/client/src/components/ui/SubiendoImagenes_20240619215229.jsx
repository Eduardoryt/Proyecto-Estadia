import { Container, Input, FormGroup } from 'reactstrap';
import React from 'react'

const SubiendoImagenes = (props
) => {
    const [imagen, setImagen] = useState("");
    const [loading, setLoading] = useState();
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