/* eslint-disable react/jsx-pascal-case */
import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddEmpModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(e)
    {
        e.preventDefault();
        fetch(process.env.REACT_APP_API+'employee/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:null,
                EmployeeName:e.target.EmployeeName.value,
                Department:e.target.Department.value,
                DateOfJoining:e.target.DateOfJoining.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.props.refreshList();
        },
        (error)=>
        {
            alert('Failed')
        })
    }
    render()
    {
        return(
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="container-modal-title-vcenter"
                centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required 
                                        placeholder="EmployeeName"/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                        {this.state.deps.map(dep=>
                                            <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="DateOfJoining"
                                        required
                                        placeholder="DateOfJoining"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}