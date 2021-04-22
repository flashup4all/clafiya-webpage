import React, { Component } from 'react';
import Head from 'next/head'
import PartialLayout from '../layout/partials-layout';
import moment from 'moment';
import Swal from 'sweetalert2';
import PaystackButton from 'react-paystack';
// import '../public/register.css';
// import 'bootstrap/dist/js/bootstrap.js';
var loadJs = require('loadjs');


class Register extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        // key: "pk_live_477f8475b863b328656efdad927cd98e47e740fd",
        // email: "shodipovi@gmail.com",
        // amount: 100000
        api: 'https://api.clafiya.com/api/tfap',
        currentStep: 1,
        // Form One
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        state: '',
        lga: '',
        phone: '',
        address: '',
        selectedPlan: '',
        subscriptions: '',
        registerLoading: false
    }

    states = [];
    lgas = [];
    selectedPlan = '';
    subscriptions = [
        {
            name: 'single',
            id: 1
        },
        {
            name: 'maternity',
            id: 2
        },
        {
            name: 'family',
            id: 3
        },
        {
            name: 'basic',
            id: 4
        },
    ];

    userData = '';

    getAge = (dob) => {
        dob = moment(new Date(dob).toISOString());
        let age = moment().diff(dob, 'years');
        console.log('AGE', age);
        return age;
    }

    alert = (type) => {
        if (type === 'succsss') {
            Swal.fire()
        }
    }

    nextStep = (event) => {
        event.preventDefault();
        if (this.state.currentStep === 1) {
            this.setState({
                ...this.state,
                firstname: event.target.firstname.value,
                lastname: event.target.lastname.value,
                email: event.target.email.value,
                password: event.target.password.value,
            })
        }
        this.setState({ ...this.state, currentStep: this.state.currentStep + 1 });
        console.log('STATE', this.state);
    }

    register = async (event) => {
        this.state.registerLoading = true;
        event.preventDefault();
        let sub_id;
        await this.subscriptions.filter((sub) => {
            if (sub.name === this.selectedPlan) sub_id = sub.id;
        });

        let data = await {
            name: `${this.state.firstname} ${this.state.lastname}`,
            phone_number: this.state.phone,
            email: this.state.email,
            age: this.getAge(this.state.dob),
            date_of_birth: this.state.dob,
            gender: this.state.gender,
            state_id: Number(this.state.state),
            lga_id: Number(this.state.lga),
            address: this.state.address,
            password: this.state.password,
            subscription_type_id: sub_id
        };

        console.log('REG DATA', data);

        const response = await fetch(`${this.state.api}/clients/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        console.log(res);
        if (res.status === "error") {
            this.error_msg = res.data.msg;
            Swal.fire({
                title: "Error!",
                text: res.msg,
                type: "error",
                confirmButtonText: "ok",
            });
            this.state.registerLoading = false;
        } else if (res.status === 'ok') {
            Swal.fire({
                title: "Successful!",
                text: 'Account Created Sucessfully',
                type: "success",
                confirmButtonText: "Thank You!",
            });
            this.state.registerLoading = false;
            setTimeout(() => {
                window.location.pathname = '/';
            }, 3000);
            this.resetForm();
        }
        // FOR PARTICULAR ERROR MESSAGES
        // if (!res.status) {
        //     Swal.fire({
        //         title: 'Error!',
        //         text: res.msg
        //     })
        // }
    }

    resetForm = () => {
        this.selectedPlan = '';
        this.setState({
            ...this.state,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
            dob: '',
            state: '',
            lga: '',
            address: ''
        });
    }

    getSubscriptions = async () => {
        const response = await fetch(`${this.state.api}/client-subscription`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allSubs = await response.json();
        console.log('SUBSCRIPTIONS', allSubs);
        this.setState({ ...this.state, subscriptions: allSubs.data });
    }

    selectPlan = (plan_name) => {
        // console.log(plan_name);
        // this.setState({ ...this.state, selectedPlan: plan_name })
        this.selectedPlan = plan_name;
    }

    getStates = async () => {
        const response = await fetch(`${this.state.api}/states`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            }
        });

        const allStates = await response.json();
        console.log('STATES', allStates);
        this.states = allStates.data;
        // this.setState({...this.state, states: allStates.data})
    }

    getLgas = async (state_id) => {
        // this.lgas = [];
        const response = await fetch(`${this.state.api}/states/locals/${state_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            }
        });

        const allLgas = await response.json();
        this.lgas = await allLgas.data;
        console.log('LGAS', allLgas);

        // this.getLgas(state_id);
    }

    prevStep = (event) => {
        event.preventDefault();
        this.setState({ ...this.state, currentStep: this.state.currentStep - 1 })
    }

    formValue = (event) => {
        event.preventDefault();
        // console.log(event.target);
        if (event.target.name === 'state') this.getLgas(event.target.value);
        this.setState({ ...this.state, [event.target.name]: event.target.value });
        // console.log(value);
    }



    componentDidMount() {
        loadJs("js/theme.init.js");
        this.getStates();
        this.getSubscriptions();
        this.userData = JSON.parse(window.localStorage.getItem('cl-reg'));
        this.setState({
            ...this.state,
            firstname: this.userData.name.split(' ')[0],
            lastname: this.userData.name.split(' ')[1],
            email: this.userData.email,
            phone: this.userData.phone
        });
        this.selectedPlan = this.userData.plan;
        // loadJs("https://js.paystack.co/v1/inline.js");


        // var handler = PaystackPop.setup({
        //             key: 'pk_live_477f8475b863b328656efdad927cd98e47e740fd',
        //             email: 'customer@email.com',
        //             amount: 10000,
        //             currency: "NGN",
        //             ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        //             firstname: 'Stephen',
        //             lastname: 'King',
        //             // label: "Optional string that replaces customer email"
        //             metadata: {
        //                custom_fields: [
        //                   {
        //                       display_name: "Mobile Number",
        //                       variable_name: "mobile_number",
        //                       value: "+2348012345678"
        //                   }
        //                ]
        //             },
        //             callback: function(response){
        //                 alert('success. transaction ref is ' + response.reference);
        //             },
        //             onClose: function(){
        //                 alert('window closed');
        //             }
        //           });
        //           handler.openIframe();

    }

    render() {
        return (
            <>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
                    <title>Clafiya - Register An Account With Us Today!</title>
                    <script src="vendor/jquery/jquery.min.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
                    {/* <script src="vendor/jquery.appear/jquery.appear.min.js"></script>		 */}
                    {/* <script src="vendor/jquery.easing/jquery.easing.min.js"></script>			 */}
                    <script src="vendor/owl.carousel/owl.carousel.min.js"></script>
                    <script src="js/theme.js"></script>
                    <link rel='stylesheet' href='register.css'></link>
                    {/* <script src="https://js.paystack.co/v1/inline.js"></script> */}
                    {/* <script src="js/theme.init.js"></script> */}
                    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link> */}
                </Head>

                {/* Main Body */}
                <div className='register-container container'>
                    <div className="row">
                        <div className='col-12 col-md-8 col-lg-7' id='left'>
                            {this.state.currentStep === 1 ?
                                <div>
                                    <div>
                                        <p className='heading'>Step 0{this.state.currentStep}/03</p>
                                        <p className='heading'>Create Your Free Account</p>
                                    </div>

                                    <div>
                                        <p>
                                            Please fill out the form on the side to get started with Clafiya <br />
                                    (Your information will not be shared with anyone)
                                    <br />
                                            <br />
                                            <br />
                                    By clicking “Continue” you agree to our Terms of Service, Privacy Policy.
                                </p>
                                    </div>
                                </div> : ''}

                            {this.state.currentStep === 2 ?
                                <div>
                                    <div>
                                        <p className='heading'>Step 0{this.state.currentStep}/03</p>
                                        <p className='heading'>Tell us a bit about yourself</p>
                                    </div>

                                    <div>
                                        <p>
                                            Your details help us get you the best services and find health workers closest to you.
                                </p>
                                    </div>
                                </div> : ''}

                            {this.state.currentStep === 3 ?
                                <div>
                                    <div>
                                        <p className='heading'>Step 0{this.state.currentStep}/03</p>
                                        <p className='heading'>And that's it, you are done!!</p>
                                    </div>

                                    <div>
                                        <p>
                                            You are all set here.
                                </p>
                                    </div>
                                </div> : ''}

                            <div id='left-bottom'>
                                <p>Already a member?</p>
                                <button type='button' className='btn btn-white'>Log into your account</button>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-5' id='right'>
                            {/* Form One */}
                            {this.state.currentStep === 1 ? <form onSubmit={this.nextStep} >
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='firstname'>First Name</label>
                                        <input value={this.state.firstname} onChange={(event) => this.formValue(event)} name='firstname' id='firstname' type='text' autoComplete='firstname' className="item-value form-control form-control-lg" placeholder='E.g Jessica' required />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='lastname'>Last Name</label>
                                        <input value={this.state.lastname} onChange={(event) => this.formValue(event)} name='lastname' id='lastname' type='text' autoComplete='lastname' className="item-value form-control form-control-lg" placeholder='E.g Etsemobor' required />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='email'>Your Email Address</label>
                                        <input value={this.state.email} onChange={(event) => this.formValue(event)} name='email' id='email' type='email' autoComplete='email' className="item-value form-control form-control-lg" placeholder='E.g jess@jessica.com' required />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='password'>Pick A Password</label>
                                        <input value={this.state.password} onChange={(event) => this.formValue(event)} name='password' id='password' type='password' autoComplete='password' className="item-value form-control form-control-lg" placeholder='********' required />
                                    </div>
                                </div>
                                <div className='row'>
                                    {/* <button type='submit' className='btn outline-primary button ml-auto col-6'>Go Back</button> */}
                                    <div className='col-6 col'>
                                        {/* <button type='submit' className='btn button'>Continue</button> */}
                                    </div>
                                    <div className='col-6 col'>
                                        <button type='submit' className='btn button'>Continue</button>
                                    </div>
                                </div>
                            </form> : ''}
                            {/* Form One End */}

                            {/* Form Two */}
                            {this.state.currentStep === 2 ? <form onSubmit={this.nextStep} >
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='gender'>Gender</label>
                                        <select value={this.state.gender} onChange={(event) => this.formValue(event)} name='gender' type='text' autoComplete='gender' className="item-value form-control form-control-lg" placeholder='Please Select A Gender' required>
                                            <option value='null'>Gender</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='dob'>Date Of Birth</label>
                                        <input value={this.state.dob} onChange={(event) => this.formValue(event)} name='dob' type='date' format='dd/mm/yyyy' autoComplete='dob' className="item-value form-control form-control-lg" placeholder='E.g Etsemobor' required />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='state'>State</label>
                                        <select value={this.state.state} onChange={(event) => this.formValue(event)} name='state' type='text' autoComplete='state' className="item-value form-control form-control-lg" placeholder='Please Select A State' required>
                                            <option value='null'>State</option>
                                            {this.states.map((state) => {
                                                return (<option value={state.id} key={state.id}>{state.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='lga'>Local Govt. Area</label>
                                        {
                                            this.lgas.length > 0 ?
                                                <select value={this.state.lga} onChange={(event) => this.formValue(event)} name='lga' type='text' autoComplete='lga' className="item-value form-control form-control-lg" placeholder='Please Select An LGA' required>
                                                    <option value='null'>LGA</option>
                                                    {this.lgas.map((lga) => {
                                                        return (<option value={lga.id} key={lga.id}>{lga.name}</option>)
                                                    })}
                                                </select> : <input className='form-control item-value' placeholder='Please Select A State' readOnly />
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 col'>
                                        <button type='button' className='btn outline-primary button' onClick={this.prevStep}>Go Back</button>
                                    </div>
                                    <div className='col-6 col'>
                                        <button type='submit' className='btn button'>Continue</button>
                                    </div>
                                </div>
                            </form> : ''}
                            {/* Form Two End */}

                            {/* Form Three */}
                            {this.state.currentStep === 3 ? <form onSubmit={(event) => this.register(event)} >
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='phone'>Phone Number</label>
                                        <input value={this.state.phone} onChange={(event) => this.formValue(event)} name='phone' type='tel' autoComplete='phone' className="item-value form-control form-control-lg" placeholder='E.g 0900 XXX XXXX' required />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='address'>Address</label>
                                        <input value={this.state.address} onChange={(event) => this.formValue(event)} name='address' type='text' autoComplete='address' className="item-value form-control form-control-lg" placeholder='E.g No 01, Healthcare Close, Enugu' required />
                                    </div>
                                </div>
                                <p className='plan-heading'>Kindly Pick A Subscription Plan</p>
                                <div className='row plan-row'>
                                    <div className={(this.selectedPlan == 'basic' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'} onClick={() => this.selectPlan('basic')}>
                                        <p className='plan-name'>Basic Plan</p>
                                        <small className='plan-desc'>Pay As You Go</small>
                                        <p className='plan-price'>₦2,000</p>
                                    </div>
                                    <div className={(this.selectedPlan == 'single' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'} onClick={() => this.selectPlan('single')}>
                                        <p className='plan-name'>Single Plan</p>
                                        <small className='plan-desc'>Monthly</small>
                                        <p className='plan-price'>₦3,000</p>
                                    </div>
                                    <div className={(this.selectedPlan == 'maternity' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'} onClick={() => this.selectPlan('maternity')}>
                                        <p className='plan-name'>Maternity</p>
                                        <small className='plan-desc'>Monthly</small>
                                        <p className='plan-price'>₦3,500</p>
                                    </div>
                                    <div className={(this.selectedPlan == 'family' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'} onClick={() => this.selectPlan('family')}>
                                        <p className='plan-name'>Family Plan</p>
                                        <small className='plan-desc'>Monthly</small>
                                        <p className='plan-price'>₦5,000</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6 col'>
                                        <button type='button' className='btn outline-primary button' onClick={this.prevStep}>Go Back</button>
                                    </div>
                                    <div className='col-6 col'>
                                        <button type='submit' disabled={this.state.registerLoading} className='btn button'>
                                            {/* <span className="spinner-border spinner-border-sm text-light" style={(this.state.registerLoading === false) ? 'display: none' : 'display: inline-block'} role="status"></span>
                                            <span className="visually-hidden">Loading...</span> */}
                                            Create Account
                                        </button>
                                    </div>
                                </div>
                            </form> : ''}
                            {/* Form Three End */}
                        </div>
                    </div>
                </div>
                {/* Main Body End. */}
            </>
        )
    }
}


Register.layout = PartialLayout;
export default Register;