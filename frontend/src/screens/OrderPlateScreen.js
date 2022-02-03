import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Spinner, Form } from 'react-bootstrap'

// import { employeeListAction } from '../actions/employeeActions'
import { todayMenuAction, createEmployeeSelectionAction } from '../actions/menuActions'
import Message from '../components/Message'

export const OrderPlateScreen = ({ history }) => {

  const dispatch = useDispatch()

  // const[employee, setEmployee] = useState()
  const[plate, setPlate] = useState()
  const[plateRequest, setPlateRequest] = useState('')

  // const listEmployee = useSelector(state => state.employeeList)
  // const { loading, error, employees } = listEmployee

  const menuToday = useSelector(state => state.todayMenu)
  const { loading: loadingTodayMenu, menu, error:errorTodayMenu } = menuToday

  const employeeSelectionCreate = useSelector(state => state.createEmployeeSelection)
  const { success, loading:createEmployeeSelectionLoading, error:createEmployeeSelectionError  } = employeeSelectionCreate

  const loginEmployee = useSelector(state => state.employeeLogin)
  const { employee } = loginEmployee

  useEffect(() => {
    if(!employee){
      history.push('/')
    } 
    if (!menu && loadingTodayMenu === false && !errorTodayMenu){
      dispatch(todayMenuAction())
    }
  }, [dispatch, menu, errorTodayMenu, loadingTodayMenu])

  const selectPlateHandler = (e) => {
    e.preventDefault()
    dispatch(createEmployeeSelectionAction(menu[0].id, plate, plateRequest))
    // setEmployee('')
    setPlateRequest('')
    setPlate('')
  }

  return <div>
      <LinkContainer to='/home/' className='mb-3'>
        <Button>Atrás</Button>
      </LinkContainer>

      {createEmployeeSelectionError && <Message>{createEmployeeSelectionError}</Message>}
      {loadingTodayMenu ? (
        <Spinner animation="border" role="status">
        </Spinner>        
      ) : (
        <div>
          {errorTodayMenu ? (
            <div>
              {/* {error && <Message>{error}</Message>} */}
              {errorTodayMenu && <Message>{errorTodayMenu}</Message>}
            </div>
          ) : (
            <div>
              {menu && menu.length > 0 && (
                <div>
                <p>Elige tu plato para hoy para hoy</p>
                  <Form onSubmit={selectPlateHandler}>

                  {/* <Form.Select aria-label="Default select example" className='form-control my-3' value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option>Selecciona empleado</option>
                    {employees.map(item => (<option value={item.pk} key={item.email}>{item.name} ({item.email})</option>))}
                  </Form.Select> */}

                  <Form.Select aria-label="Default select example" className='form-control my-3' value={plate} onChange={(e) => setPlate(e.target.value)}>
                    <option>Selecciona uno de los platos de hoy</option>
                    {menu[0].plates.map(item => (<option value={item.pk} key={item.pk}>{item.name}</option>))}
                  </Form.Select>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Tus peticiones para el plato</Form.Label>
                    <Form.Control as="textarea" rows={3} value={plateRequest} onChange={(e) => setPlateRequest(e.target.value)}/>
                  </Form.Group>

                  <Button variant="primary" type="submit" className='btn-block'>
                    {createEmployeeSelectionLoading ? (
                      <Spinner animation="border" role="status">
                      </Spinner>                          
                    ) : (
                      <span>
                        Seleccionar plato
                      </span>
                    )}
                  </Button>
                  </Form>
                </div>
              )}
            </div>
          )}
        </div>
      )}
  </div>;
};
