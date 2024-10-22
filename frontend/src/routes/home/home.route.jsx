import AppointmentForm from "../../components/appointment-form/appointment-form.component"
import HistoriaClinica from "../../components/medical-history/medical-history.component"


const Home = () => {
    return (
        <div>
            <h3>Home Page</h3>
            <AppointmentForm />
            <HistoriaClinica />
        </div>
    )
}

export default Home
