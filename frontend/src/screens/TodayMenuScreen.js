import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Message from '../components/Message'
import { todayMenuAction } from '../actions/menuActions'

export const TodayMenuScreen = ({history}) => {

  const dispatch = useDispatch()

  const menuToday = useSelector(state => state.todayMenu)
  const {loading, menu, error} = menuToday

  const loginEmployee = useSelector(state => state.employeeLogin)
  const { employee } = loginEmployee


  useEffect(() => {
    if(!employee){
        history.push('/')
        }
      if (!menu && loading === false && !error){
          dispatch(todayMenuAction())
      }
  }, [menu, loading, dispatch, error, employee, history])

  return <div>

      <LinkContainer to='/home/'>
          <Button>Atrás</Button>
      </LinkContainer>
      {loading ? (<div>
        <Spinner animation="border" role="status">
        </Spinner>
      </div>) : (
          <div>
                {error && <Message variant='danger'>{error}</Message>}
                {menu && menu.length > 0 ? (
                    <div>
                        <p>Menú para el {menu[0].day}</p>
                        <div>
                            <p>Platos para hoy</p>
                            {menu[0].plates.map(item => (<p>{item.name}</p>))}
                        </div>
                    </div>
                    ) : (
                    <div>
                        No hay menú todavía para hoy. Te notificaremos por Slag cuando haya menú
                    </div>
                )}
          </div>
      )}
  </div>;
};
