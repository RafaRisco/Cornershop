import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form, Spinner } from 'react-bootstrap'
import { platesListAction, createMenuAction, todayMenuAction } from '../actions/menuActions'
import Message from '../components/Message'
import { CREATE_MENU_RESET } from '../constants/menuConstants'

export const CreateMenuScreen = ({history}) => {

  const dispatch = useDispatch()

  const[selectedPlates, setSelectedPlates] = useState([])
  const[selectedDay, setSelectedDay] = useState('')

  const listPlates = useSelector(state => state.platesList)
  const { loading: loadingListPlates, error: errorListPlates, plates } = listPlates

  const menuToday = useSelector(state => state.todayMenu)
  const {loading, menu, error} = menuToday

  const createMenu = useSelector(state => state.menuCreate)
  const {loading: loadingCreateMenu, error: errorCreateMenu, success} = createMenu

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
    if(!plates && !errorListPlates && loadingListPlates === false) {
      dispatch(platesListAction())
    }
    if(!menu && !error && loading === false) {
      dispatch(todayMenuAction())
    }
    if(success) {
      dispatch(todayMenuAction())
      dispatch({type: CREATE_MENU_RESET})
    }
  }, [plates, error, loading, dispatch, selectedPlates, selectedDay, success, errorListPlates, loadingListPlates, menu, history, employee])

  const plateSelectedChange = (e) => {
    if(e.target.checked === true){
      setSelectedPlates([
            ...selectedPlates,
            e.target.id
        ]
        )
    } else if(e.target.checked === false){
      setSelectedPlates(
          selectedPlates.filter(x => x !== e.target.id)
        )
    }
}

  const createMenuHandler = (e) => {
    e.preventDefault()
    dispatch(createMenuAction(selectedDay, selectedPlates))
    setSelectedPlates('')
    setSelectedDay('')
  }

  Date.prototype.addDays = function(noOfDays){
    var tmpDate = new Date(this.valueOf());
    tmpDate.setDate(tmpDate.getDate() + noOfDays);
    return tmpDate;
  }

  var minDate = new Date(); //today
  var maxDate = minDate.addDays(7) 

  var mindd = minDate.getDate();
  var minmm = minDate.getMonth() + 1;
  var minyyyy = minDate.getFullYear();
  var maxdd = maxDate.getDate();
  var maxmm = maxDate.getMonth() + 1;
  var maxyyyy = maxDate.getFullYear();

  if (mindd < 10) {
      mindd = '0' + mindd
  }

  if (minmm < 10) {
      minmm = '0' + minmm
  }

  if (maxdd < 10) {
      maxdd = '0' + maxdd
  }

  if (maxmm < 10) {
      maxmm = '0' + maxmm
  }

  var today = minyyyy + '-' + minmm + '-' + mindd;
  var maxDay = maxyyyy + '-' + maxmm + '-' + maxdd;
  
  return <div>
      <LinkContainer to='/home/'>
        <Button>Atrás</Button>
      </LinkContainer>

    {errorCreateMenu && <Message variant='danger'>{errorCreateMenu}</Message>}

    {loading ? (
      <Spinner animation="border" role="status">
      </Spinner>                                
    ) : (
      <div>
        {menu && menu.length > 0 ? (
          <div>
            <p>Ya hay menú para hoy</p>
            <p>Menú para el {menu[0].day}</p>
              <div>
                  <p>Platos para hoy</p>
                  {menu[0].plates.map(item => (<p key={item.pk}>{item.name}</p>))}
              </div>
          </div>
        ) : (
          <div>
          {loadingListPlates ? (
            <Spinner animation="border" role="status">
            </Spinner>                                      
          ) : (
            <div>
              {errorListPlates && <Message variant='danger'>{errorListPlates}</Message>}

              {plates ? (
                  <div>
                        Crea el menú
                  <Form onSubmit={createMenuHandler}>
                    <input
                      type="date"
                      id="datefield"
                      name="trip-start"
                      value={selectedDay}
                      min={today}
                      max={maxDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                    >
                    </input>
                    {plates.map(item => <div key={item.pk}>
                          {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check 
                              type={type}
                              id={item.pk}
                              onChange={plateSelectedChange}
                              label={item.name}
                            />
                          </div>
                        ))}
                      </div>)}
                      <Button variant="primary" type="submit" className='btn-block'>
                        {loadingCreateMenu ? (
                          <div>
                            <Spinner animation="border" role="status">
                            </Spinner>                                
                          </div>
                        ) : (
                          <span>
                            Crear menú
                          </span>
                        )}
                      </Button>

                  </Form>

                  </div>
                ) : (
                  <div></div>
                )}
            </div>
          )}
          </div>
        )}

      </div>
    )}

  </div>;
};
