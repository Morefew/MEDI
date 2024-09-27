import LoginForm from '../../components/login-form/login-form-component';
import axios from 'axios';

const Login = () => {
  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios', formData);
      console.log('Usuario creado:', response.data);
    } catch (error) {
      console.error('Error al crear usuario:', error.response.data);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Login;
