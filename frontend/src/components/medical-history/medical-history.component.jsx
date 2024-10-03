import { sampleHistorias } from "../../constants/patient.const";
import { Container, List, ListItem, Section, SectionTitle, Title } from "./medical-history.styles";

const HistoriaClinica = () => {
    const historia = sampleHistorias[0];
    const { consultas, diagnosticos, tratamientos, recetas, documentos, ultima_actualizacion } = historia;

    return (
        <Container>
            <Title>Historia Clínica</Title>

            <Section>
                <SectionTitle>Consultas</SectionTitle>
                <List>
                    {consultas.map((consulta, index) => (
                        <ListItem key={index}>
                            <strong>Fecha:</strong> {new Date(consulta.fecha).toLocaleDateString()} <br />
                            <strong>Médico:</strong> {consulta.doctor_id} <br />
                            <strong>Notas:</strong> {consulta.notas}
                        </ListItem>
                    ))}
                </List>
            </Section>

            <Section>
                <SectionTitle>Diagnósticos</SectionTitle>
                <List>
                    {diagnosticos.map((diagnostico, index) => (
                        <ListItem key={index}>{diagnostico}</ListItem>
                    ))}
                </List>
            </Section>

            <Section>
                <SectionTitle>Tratamientos</SectionTitle>
                <List>
                    {tratamientos.map((tratamiento, index) => (
                        <ListItem key={index}>{tratamiento}</ListItem>
                    ))}
                </List>
            </Section>

            <Section>
                <SectionTitle>Recetas</SectionTitle>
                <List>
                    {recetas.map((receta, index) => (
                        <ListItem key={index}>Receta ID: {receta}</ListItem>
                    ))}
                </List>
            </Section>

            <Section>
                <SectionTitle>Documentos</SectionTitle>
                <List>
                    {documentos.map((documento, index) => (
                        <ListItem key={index}>{documento}</ListItem>
                    ))}
                </List>
            </Section>

            <Section>
                <strong>Última actualización:</strong> {new Date(ultima_actualizacion).toLocaleDateString()}
            </Section>
        </Container>
    );
};

export default HistoriaClinica;
