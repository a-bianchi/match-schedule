import * as Yup from 'yup';

export const MatchSchema = Yup.object().shape({
  name: Yup.string().required('*El nombre es requerido!'),
  address: Yup.string().required('*La dirección es requerida!'),
  time: Yup.string().required('*La hora y fecha es requerida!'),
  note: Yup.string().required('*La nota es requerida!'),
});
