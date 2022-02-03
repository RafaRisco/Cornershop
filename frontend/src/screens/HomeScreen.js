import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


export const HomeScreen = ({history}) => {

  const loginEmployee = useSelector(state => state.employeeLogin)
  const { employee } = loginEmployee

  useEffect(() => {
    if(!employee){
        history.push('/')
    } else {
      if(employee.is_staff === false) {
        history.push('/order_plate/')
      }
    }
}, [employee, history])

  return <div>
      <LinkContainer to='/today_menu/'>
        <Button variant='success' className='btn-block'>Ver el menú de hoy</Button>
      </LinkContainer>

      <LinkContainer to='/order_plate/'>
        <Button variant='primary' className='btn-block'>Pide tu plato para hoy</Button>
      </LinkContainer>

      <LinkContainer to='/create_menu/'>
        <Button variant='info' className='btn-block'>Crear menú</Button>
      </LinkContainer>

      <LinkContainer to='/create_plate/'>
        <Button variant='warning' className='btn-block'>Crear plato</Button>
      </LinkContainer>

  </div>;
};
