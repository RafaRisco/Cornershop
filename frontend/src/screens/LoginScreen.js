import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, Button, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message' 
import { employeeLoginAction } from '../actions/employeeActions'

export const LoginScreen = ({history}) => {

    const dispatch = useDispatch()

    const loginEmployee = useSelector(state => state.employeeLogin)
    const { loading, error, employee } = loginEmployee

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        dispatch(employeeLoginAction(email, password))
    }

    useEffect(() => {
        if(employee){
            if(employee.is_staff === false) {
                history.push('/order_plate/')
            } else {
                history.push('/home/')
            }
        }
    }, [employee, history])

    return (
        <div>
            <Container>
                <div className='primary-overlay'>
                    <Row className='justify-content-md-center'>
                        <Col md={6}>
                        <h1 className='mt-1 text-center'>Inicia Sesión</h1>
                        <p className='text-center text-dark'>Si todavía no tienes una cuenta, entonces por favor
                            <LinkContainer to='/register/' className='text-primary'>
                                <span> regístrate </span>
                            </LinkContainer>
                         primero.</p>
                        {error ? (
                            <Message variant='danger'>{error}</Message>)
                        : (
                            <div></div>
                        )}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='Email'
                                    className='rounded-pill text-center'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='password' className='mt-3'>
                                <Form.Control
                                    required
                                    type='password'
                                    placeholder='Contraseña'
                                    className='rounded-pill text-center'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                                <Button type='submit' disabled={loading} variant='success' className='mt-3 align-self-center btn-block btn-lg rounded-pill'>
                                    {loading ? (
                                            <Spinner
                                            animation='border'
                                            role='status'
                                            style={{
                                                height:'25px',
                                                width:'25px',
                                                margin:'auto',
                                                display:'block'
                                            }}
                                            >
                                                <span className='sr-only'>
                                                    Loading...
                                                </span>
                                            </Spinner>
                                    ) : (
                                    <span>
                                        Iniciar sesión
                                    </span>
                                    )}
                                </Button>
                        </Form>
                        <Row className='d-flex justify-content-center mb-3 mt-1'>
                            <a className="button secondaryAction align-self-center text-primary" href="https://www.verdemi.com/accounts/password/reset/">¿Olvidaste tu contraseña?</a>
                        </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Row className='bg-light d-flex justify-content-center p-3 p-md-5'>
            </Row>
        </div>
    )
}