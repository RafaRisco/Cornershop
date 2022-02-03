import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { platesListAction, createPlateAction } from '../actions/menuActions'
import { PLATE_CREATE_RESET, PLATES_LIST_RESET } from '../constants/menuConstants'

export const CreatePlateScreen = ({history}) => {

  const[name, setName] = useState('')

  const dispatch = useDispatch()

  const listPlates = useSelector(state => state.platesList)
  const { loading, error, plates } = listPlates

  const plateCreate = useSelector(state => state.createPlate)
  const { loading: loadingCreatePlate, error: errorCreatePlate, success } = plateCreate

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
    if(!plates && !error && loading == false) {
      dispatch(platesListAction())
    }
    if (success) {
      dispatch({type: PLATES_LIST_RESET})
      dispatch({type: PLATE_CREATE_RESET})
    }
  }, [plates, error, loading, dispatch, success, employee, history])


  const createPlateHandler = (e) => {
    e.preventDefault()
    dispatch(createPlateAction(name))
    setName('')
  }

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
            {errorCreatePlate && <Message variant='danger'>{errorCreatePlate}</Message>}
            {plates ? (
                <div>
                    <h2>Platos actuales</h2>
                    <div>
                        <p>Platos para hoy</p>
                        {plates.map(item => (<p key={item.name}>{item.name}</p>))}
                    </div>
                    <hr></hr>
                    <h2>Incluye un plato</h2>
                    <Form onSubmit={createPlateHandler}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre del plato</Form.Label>
                        <Form.Control type="text" placeholder="Nombre del plato" value={name} onChange={(e) => setName(e.target.value)}/>
                      </Form.Group>

                      <Button variant="primary" type="submit" className='btn-block'>
                        {loadingCreatePlate ? (
                          <Spinner animation="border" role="status">
                          </Spinner>                          
                        ) : (
                          <span>
                            Incluir plato
                          </span>
                        )}
                      </Button>
                    </Form>
                </div>
                ) : (
                <div>
                    No hay ningún plato en este momento.
                </div>
            )}
      </div>
  )}
</div>;;
};
