import React from "react";
import Container from 'react-bootstrap/Container';

function Mvv() {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Nossa Missão, Visão e Valores</h1>
            <div className="text-justify">
                <h2>Missão:</h2>
                <p>
                    Nossa missão é proporcionar aos cães uma vida mais saudável e feliz, oferecendo serviços de passeio que promovam o exercício, socialização e bem-estar. Ao mesmo tempo, proporcionamos tranquilidade aos donos que confiam em nós para cuidar de seus queridos companheiros peludos.
                </p>
                <h2>Visão:</h2>
                <p>
                    Nossa visão é ser a principal empresa de passeios para cães na nossa região, reconhecida pela qualidade excepcional dos nossos serviços e pelo impacto positivo que geramos na vida dos cães e seus proprietários. Nos próximos anos, pretendemos expandir nossas operações para atender a mais cães e estabelecer parcerias sólidas com clínicas veterinárias e pet shops locais.
                </p>
                <h2>Valores:</h2>
                <p>
                    Nossos valores fundamentais são a empatia, a segurança e o compromisso. Acreditamos na empatia como base para entender as necessidades individuais de cada cão e proporcionar experiências personalizadas. A segurança é primordial em tudo o que fazemos, desde a seleção cuidadosa de rotas de passeio até a atenção constante durante as atividades. Nosso compromisso é com a integridade, mantendo sempre o mais alto padrão de cuidado e responsabilidade em nossas interações com os cães, clientes e parceiros comerciais.
                </p>
            </div>
        </Container>
    );
}

export default Mvv;