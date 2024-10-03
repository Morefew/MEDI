import { useState } from 'react';
import {
  LoginFormContainer,
  LoginFormTitle,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  ErrorMessage
} from './login-form-styles';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    email: '',
    contraseña: '',
    rol: 'paciente',
    contacto_emergencia: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <LoginFormContainer>
     <LoginFormTitle>Registro de usuario</LoginFormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="primer_apellido">Primer Apellido</Label>
          <Input
            type="text"
            name="primer_apellido"
            placeholder="Primer Apellido"
            value={formData.primer_apellido}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
          <Input
            type="text"
            name="segundo_apellido"
            placeholder="Segundo Apellido"
            value={formData.segundo_apellido}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
          <Input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contraseña">Contraseña</Label>
          <Input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rol">Rol</Label>
          <Select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="doctor">Doctor</option>
            <option value="administrador">Administrador</option>
            <option value="paciente">Paciente</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contacto_emergencia">Contacto de Emergencia</Label>
          <Input
            type="text"
            name="contacto_emergencia"
            placeholder="Contacto de Emergencia"
            value={formData.contacto_emergencia}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Crear Cuenta</Button>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
