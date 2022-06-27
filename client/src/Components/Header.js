import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown'
    },
};

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            userName: undefined,
            isLoggedIn: false,
            loginCredentialModalIsOpen:false,
            createAccountModalIsOpen:false,
            username:undefined,
            password:undefined,
            createAccUsername:undefined,
            createAccPassword:undefined,
            firstname:undefined,
            lastname:undefined,
            createAccount:{},
            fake:undefined
           

        }
    }

    

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }
    handleCreateAccount=()=>{
        this.setState({createAccountModalIsOpen:true})

    }

    handleLoginCredentialModal=()=>{
        this.setState({loginCredentialModalIsOpen:true});
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }

    handleInputChangeLogin=(state,event)=>{
        this.setState({[state]:event.target.value})

    }
    handleLoginSubmit=(event)=>{
        const {username,password,fake}=this.state;
        

        const loginObject={username,password}

        axios({
            method: 'POST',
            url: '/userlogin',
            headers: { 'Content-Type': 'application/json' },
            data:loginObject
            
        })
            .then(response => {
                const as=response.data.user.map(item=>item.username);
                this.setState({fake:as.toString()});
                
                console.log(fake);
                console.log(response.data.user.username);
                if(response.data.isAuthenticated==true){

                    this.setState({isLoggedIn:true,
                        userName:response.data.user.map(item=>item.username),
                        loginModalIsOpen:false,
                        loginCredentialModalIsOpen:false});
                        alert("logged in successfully");
                  
                }
              
               
                
            })
            .catch(err => console.log(err));


        event.preventDefault();
    
    }



    handleInputChangeCreateAccount=(state,event)=>{
       
        this.setState({[state]:event.target.value});
 }
        

handleSubmitChangeCreateAccount=(event)=>{
    
    const {createAccUsername,createAccPassword,firstname,lastname}=this.state;
   
        const createAccObject={
            createAccUsername,createAccPassword,firstname,lastname
        }

        console.log(createAccObject);
    axios({
        method: 'POST',
        url: '/usersignup',
        headers: { 'Content-Type': 'application/json' },
        data:createAccObject
        
    })
        .then(response => {
            alert("created successfully");
            this.setState({createAccountModalIsOpen:false});
           
        })
        .catch(err => console.log(err));
    event.preventDefault();

}


        

    

    render() {
        const { loginModalIsOpen, isLoggedIn, userName,loginCredentialModalIsOpen,createAccountModalIsOpen } = this.state;
        return (
            <div className="header">
                <div className="header-logo" onClick={this.handleNavigate}>
                    <p>e!</p>
                </div>
                {
                    !isLoggedIn ? <div className="user-account">
                        <div className='login' onClick={this.handleLogin}>Login</div>
                        <div className='signup' onClick={this.handleCreateAccount}>Create an account</div>
                    </div> :
                        <div className="user-account">
                            <div className='login'>{userName}</div>
                            <div className='signup' onClick={this.handleLogout()}>Logout</div>
                        </div>
                }

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                     <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                    <div>
                        <button className='btn btn-primary' style={{padding:'6px 15px',marginBottom:'7px'}} onClick={this.handleLoginCredentialModal}>Continue with Credentials</button>
                        <br />
                        <GoogleLogin
                            clientId="99732128509-l3t19utcnqmb7asna7juicn6978to4cd.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>


                {/* creadintaial modal */}

                <Modal
                    isOpen={loginCredentialModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginCredentialModalIsOpen', false)}></div>
                        <form>
                            <label class="form-label">Username</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChangeLogin('username', event)} placeholder="Username"/>
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChangeLogin('password', event)}  placeholder="Password"/>
                          
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} onClick={this.handleLoginSubmit}>Login</button>
                        </form>
                    </div>
                </Modal>


            {/* create account Modal */}
            <Modal
                    isOpen={createAccountModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('createAccountModalIsOpen', false)}></div>
                        <form>
                        <label class="form-label">Username</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChangeCreateAccount('createAccUsername', event)} />
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChangeCreateAccount('createAccPassword', event)} />
                            <label class="form-label">FirstName</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChangeCreateAccount('firstname', event)} />
                            <label class="form-label">LastName</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChangeCreateAccount('lastname', event)} />
                            <button class="btn btn-danger" type='submit' style={{ marginTop: '20px', float: 'right' }} onClick={this.handleSubmitChangeCreateAccount} >SignUp</button>
                        </form>
                    </div>
                </Modal>



                
            </div>

           
        )
    }
}

export default withRouter(Header);