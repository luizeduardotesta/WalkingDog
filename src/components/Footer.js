import React from 'react';
import Container from 'react-bootstrap/Container';

function FooterComponent() {
    return (
        <footer className="bg-dark text-white py-3">
            <Container className="text-center">
                © {new Date().getFullYear()} Walking-Dog. All rights reserved.
            </Container>
        </footer>
    );
}

export default FooterComponent;
