import React, { Component, createRef } from 'react';
import Head from 'next/head'
import PartialLayout from '../layout/partials-layout';
import moment from 'moment';
import Swal from 'sweetalert2';
import PaystackButton from 'react-paystack';
import MaskInput from 'react-maskinput';
import Loader from "react-loader-spinner";

// import '../public/register.css';
// import 'bootstrap/dist/js/bootstrap.js';
var loadJs = require('loadjs');
// var window;


class Register extends Component {

    constructor(props) {
        super(props);
        this.paystackButtonRef = createRef();
    }

    state = {
        // key: "pk_live_477f8475b863b328656efdad927cd98e47e740fd",
        // email: "shodipovi@gmail.com",
        // amount: 100000
        api: 'https://testapi.clafiya.com/api/tfap',
        // api: 'http://localhost:8000/api/tfap',
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
        price: '',
        states: [],
        lgas: [],
        subscriptions: '',
        registerLoading: false,
        paystack_email: 'dev@clafiya.com',
        paystack_key: 'pk_live_477f8475b863b328656efdad927cd98e47e740fd'
    }

    states = [];
    lgas = [];
    selectedPlan = '';
    selectedPlanPrice = '';
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
        // const paystackButton = document.getElementById('paystackButton');
        // this.paystackButtonRef.current.click();
        let sub_id;
        await this.subscriptions.filter((sub) => {
            if (sub.name === this.selectedPlan) sub_id = sub.id;
        });

        let phone_number = this.state.phone.split('-').join('');

        if (phone_number.length == 11) {
            phone_number =  "+234" + phone_number.substring(1);
        }
        if (phone_number.length == 10) {
            phone_number =  "+234" + phone_number;
        }

        let data = await {
            name: `${this.state.firstname} ${this.state.lastname}`,
            phone_number: phone_number,
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
            // Swal.fire({
            //     title: "Successful!",
            //     text: 'Account Created Sucessfully',
            //     type: "success",
            //     confirmButtonText: "Thank You!",
            // });
            this.state.registerLoading = false;
            // CALL PAYSTACK GENERATE PAYMENT LINK
            let client_id = res.data.id;
            let subscription_type_id = sub_id;
            let callback_url = (window.location.hostname === 'localhost') ? 'localhost:3000/successful-registration' : 'https://clafiya.com/successful-registration';
            this.generatePaymentLink(client_id, subscription_type_id, callback_url);
            this.resetForm();
        }
        // FOR PARTICULAR ERROR MESSAGES
        if (!res.status) {
            if (res.phone_number) {
                Swal.fire({
                    title: 'Error!',
                    text: res.phone_number[0]
                });
                this.state.registerLoading = false;
            }
            if (res.email) {
                Swal.fire({
                    title: 'Error!',
                    text: res.email[0]
                });
                this.state.registerLoading = false;
            }
        }
    }

    generatePaymentLink = async (cid, sid, url) => {
        let data = {
            client_id: cid,
            subscription_type_id: sid,
            callback_url: url
        }

        const response = await fetch(`${this.state.api}/subscription/payment/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = response.json();
        console.log('INIT RES', result);

        // VERIFY PAYMENT ON SUCCESS
        result.then((res) => {
            // RES PROPS => access_code, authorization_url, reference
            console.log(res);
            if (res.status === 'ok') {
                // ROUTE TO AUTHORIZATION URL TO PAY
                window.open(res.data.authorization_url, '_self');
                window.localStorage.setItem('cl-pref', res.data.reference);
                window.localStorage.setItem('cl-aurl', res.data.authorization_url);
                // this.verifyPayment()

            }
        })
    }

    verifyPayment = async (p_ref) => {
        let data = {
            reference: p_ref
        }

        const response = await fetch(`${this.state.api}/subscription/payment/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = response.json();
        console.log('VERIFY RES', result);    
        
        // ROUTE TO SUCCESS PAGE ON SUCCESS
        result.then((res) => {
            console.log('V RES', res);
            if (res.status === 'ok') {
                // ROUTE TO SUCCESS
            }
        })
    }

    // PaystackHookExample = () => {
    //     const initializePayment = usePaystackPayment(config);
    //     return (
    //       <div>
    //           <button onClick={() => {
    //               initializePayment(onSuccess, onClose)
    //           }}>Paystack Hooks Implementation</button>
    //       </div>
    //     );
    // };

    getReference = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    callback = (response) => {
        alert('success. transaction ref is ' + response.reference);
    }

    close = () => {
        console.log("Payment closed");
    }

    simulateClick(e) {
        // e.target.click();
        // console.log('E', e)
    }

    resetForm = () => {
        this.selectedPlan = '';
        this.setState({
            ...this.state,
            currentStep: 1,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            gender: '',
            dob: '',
            state: '',
            lga: '',
            address: '',
            selectedPlan: '',
            price: ''
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

    selectPlan = (plan_name, amount) => {
        console.log(plan_name, amount);
        this.setState({ ...this.state, selectedPlan: plan_name, price: Number(amount) })
        this.selectedPlan = plan_name;
        this.selectedPlanPrice = amount;
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
        // console.log('STATES', allStates);
        this.states = allStates.data;
        this.setState({ ...this.state , states: allStates.data });
        console.log('STATES', this.states);
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
        this.setState({ ...this.state , lgas: allLgas.data });
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
        // this.getSubscriptions();
        this.userData = JSON.parse(window.localStorage.getItem('cl-reg'));
        this.setState({
            ...this.state,
            // firstname: this.userData.name.split(' ')[0],
            // lastname: this.userData.name.split(' ')[1],
            // email: this.userData.email,
            // phone: this.userData.phone
            selectedPlan: this.userData.plan,
            price: Number(this.userData.amount)
        });
        this.selectedPlan = this.userData.plan;
        this.selectedPlanPrice = this.userData.amount;
        console.log(this.paystackButtonRef);
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
                        <div className='col-12 col-md-6 col-lg-7' id='left'>
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
                                    By clicking “Continue” you agree to our <span className='orange-text'>Terms of Service</span>, <br /> <span className='orange-text'>Privacy Policy</span>.
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
                        <div className='col-12 col-md-6 col-lg-5' id='right'>
                            {/* Form One */}
                            {this.state.currentStep === 1 ? <form onSubmit={this.nextStep} >
                                <div className="form-div">
                                    <input type="text" className="form-input" value={this.state.firstname} onChange={(event) => this.formValue(event)} name='firstname' id='firstname' autoComplete='firstname' placeholder='E.g Jessica' required />
                                    <label className="form-label">First Name</label>
                                </div>

                                <div className="form-div">
                                    <input type="text" className="form-input" value={this.state.lastname} onChange={(event) => this.formValue(event)} name='lastname' id='lastname' autoComplete='lastname' placeholder='E.g Etsemobor' required />
                                    <label className="form-label">Last Name</label>
                                </div>

                                <div className="form-div">
                                    <input type="email" className="form-input" value={this.state.email} onChange={(event) => this.formValue(event)} name='email' id='email' autoComplete='email' placeholder='E.g jess@jessica.com' required />
                                    <label className="form-label">Your Email Address</label>
                                </div>

                                <div className="form-div">
                                    <input type="password" className="form-input" value={this.state.password} onChange={(event) => this.formValue(event)} name='password' id='password' autoComplete='password' placeholder='********' required />
                                    <label className="form-label">Pick A Password</label>
                                </div>

                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='firstname'>First Name</label>
                                        <input value={this.state.firstname} onChange={(event) => this.formValue(event)} name='firstname' id='firstname' type='text' autoComplete='firstname' className="item-value form-control form-control-lg" placeholder='E.g Jessica' required />
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='lastname'>Last Name</label>
                                        <input value={this.state.lastname} onChange={(event) => this.formValue(event)} name='lastname' id='lastname' type='text' autoComplete='lastname' className="item-value form-control form-control-lg" placeholder='E.g Etsemobor' required />
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='email'>Your Email Address</label>
                                        <input value={this.state.email} onChange={(event) => this.formValue(event)} name='email' id='email' type='email' autoComplete='email' className="item-value form-control form-control-lg" placeholder='E.g jess@jessica.com' required />
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='password'>Pick A Password</label>
                                        <input value={this.state.password} onChange={(event) => this.formValue(event)} name='password' id='password' type='password' autoComplete='password' className="item-value form-control form-control-lg" placeholder='********' required />
                                    </div>
                                </div> */}
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
                                <div className="form-div">
                                    <select type="text" className="form-input" value={this.state.gender} onChange={(event) => this.formValue(event)} name='gender' id='gender' autoComplete='gender' placeholder='Please Select A Gender' required>
                                        <option value='null' defaultValue>Gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>
                                    <label className="form-label">Gender</label>
                                </div>
                                <div className='form-div'>
                                    <input type="date" className="form-input date" value={this.state.dob} onChange={(event) => this.formValue(event)} name='dob' id='dob' autoComplete='dob' placeholder='Please Input Your Date of Birth' required />
                                    <label className="form-label">Date Of Birth</label>
                                </div>
                                <div className="form-div">
                                    <select type="text" className="form-input select" value={this.state.state} onChange={(event) => this.formValue(event)} name='state' id='state' autoComplete='state' placeholder='Please Select A State' required>
                                        <option value='null' defaultValue>State</option>
                                        {this.state.states.map((state) => {
                                            return (<option value={state.id} key={state.id}>{state.name}</option>)
                                        })}
                                    </select>
                                    <label className="form-label">State</label>
                                </div>
                                <div className="form-div">
                                    {
                                        this.lgas.length > 0 ?
                                            <select value={this.state.lga} onChange={(event) => this.formValue(event)} name='lga' type='text' autoComplete='lga' className="form-input select" placeholder='Please Select An LGA' required>
                                                <option value='null'>LGA</option>
                                                {this.state.lgas.map((lga) => {
                                                    return (<option value={lga.id} key={lga.id}>{lga.name}</option>)
                                                })}
                                            </select> : <input className='form-input item-value' placeholder='Please Select A State' readOnly />
                                    }
                                    <label className="form-label">Local Govt. Area</label>
                                </div>
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='gender'>Gender</label>
                                        <select value={this.state.gender} onChange={(event) => this.formValue(event)} name='gender' type='text' autoComplete='gender' className="item-value form-control form-control-lg" placeholder='Please Select A Gender' required>
                                            <option value='null'>Gender</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='dob'>Date Of Birth</label>
                                        <input value={this.state.dob} onChange={(event) => this.formValue(event)} name='dob' type='date' format='dd/mm/yyyy' autoComplete='dob' className="item-value form-control form-control-lg" placeholder='E.g Etsemobor' required />
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='state'>State</label>
                                        <select value={this.state.state} onChange={(event) => this.formValue(event)} name='state' type='text' autoComplete='state' className="item-value form-control form-control-lg" placeholder='Please Select A State' required>
                                            <option value='null'>State</option>
                                            {this.states.map((state) => {
                                                return (<option value={state.id} key={state.id}>{state.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
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
                                </div> */}
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
                                <div className='form-div'>
                                    <MaskInput type="tel" className="form-input" value={this.state.phone} onChange={(event) => this.formValue(event)} name='phone' id='phone' autoComplete='phone' placeholder='E.g 0900 XXX XXXX' mask={'0000-000-0000'} size={11} maskChar=""  required />
                                    <label className="form-label">Phone Number</label>
                                </div>
                                <div className='form-div'>
                                    <input type="text" className="form-input" value={this.state.address} onChange={(event) => this.formValue(event)} name='address' id='address' autoComplete='address' placeholder='E.g No 01, Healthcare Close, Enugu' required />
                                    <label className="form-label">Address</label>
                                </div>
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='phone'>Phone Number</label>
                                        <input value={this.state.phone} onChange={(event) => this.formValue(event)} name='phone' type='tel' autoComplete='phone' className="item-value form-control form-control-lg" placeholder='E.g 0900 XXX XXXX' required />
                                    </div>
                                </div> */}
                                {/* <div className="form-item">
                                    <div className="item-content form-group">
                                        <label className="item-heading" htmlFor='address'>Address</label>
                                        <input value={this.state.address} onChange={(event) => this.formValue(event)} name='address' type='text' autoComplete='address' className="item-value form-control form-control-lg" placeholder='E.g No 01, Healthcare Close, Enugu' required />
                                    </div>
                                </div> */}
                                <p className='plan-heading'>Kindly Pick A Subscription Plan</p>
                                <div className='row plan-row'>
                                    <div className={(this.state.selectedPlan == 'basic' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'}  data-toggle="modal" data-target="#basicPlanModal">
                                        <p className='plan-name'>Basic <br /> Plan</p>
                                        <small className='plan-desc'>Pay As You Go</small>
                                        <p className='plan-price'>₦2,000</p>
                                    </div>
                                    <div className={(this.state.selectedPlan == 'single' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'}  data-toggle="modal" data-target="#singlePlanModal">
                                        <p className='plan-name'>Single <br /> Plan</p>
                                        <small className='plan-desc'>Monthly</small>
                                        <p className='plan-price'>₦3,000</p>
                                    </div>
                                    <div className={(this.state.selectedPlan == 'maternity' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'}  data-toggle="modal" data-target="#maternityPlanModal">
                                        <p className='plan-name'>Maternity <br /> Plan</p>
                                        <small className='plan-desc'>Monthly</small>
                                        <p className='plan-price'>₦3,500</p>
                                    </div>
                                    <div className={(this.state.selectedPlan == 'family' ? 'selected ' : ' ') + 'col-6 col-md-6 col-lg-4 plan-item'}  data-toggle="modal" data-target="#familyPlanModal">
                                        <p className='plan-name'>Family <br /> Plan</p>
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
                                            {
                                                this.state.registerLoading ? 
                                                <Loader
                                                    type="TailSpin"
                                                    color="#F4F5F7"
                                                    height={30}
                                                    width={30}
                                                    // timeout={3000} //3 secs
                                                /> :
                                                'Create Account'
                                            }
                                            {/* <span className="spinner-border spinner-border-sm text-light" style={(this.state.registerLoading === false) ? 'display: none' : 'display: inline-block'} role="status"></span>
                                            <span className="visually-hidden">Loading...</span> */}
                                            
                                        </button>
                                    </div>
                                </div>
                                {/* <PaystackButton
                                    className="btn button text-white w-100n register-form-button"
                                    text="Make Payment"
                                    callback={this.callback}
                                    close={this.close}
                                    disabled={false}
                                    embed={false}
                                    reference={this.getReference()}
                                    email={this.state.paystack_email}
                                    amount={Number(this.state.price)}
                                    paystackkey={this.state.paystack_key}
                                    tag="button"
                                    style='display: none'
                                    ref={this.paystackButtonRef}
                                /> */}
                            </form> : ''}
                            {/* Form Three End */}
                        </div>
                    </div>
                </div>
                {/* Main Body End. */}

                {/* MODALS */}

                {/* Basic plan modal */}
                <div className="modal fade plan-details-modal" id="basicPlanModal" aria-labelledby="basicPlanModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal plan-details">
                            <div className="d-flex flex-column plan-details-header">
                                <div className="w-100 d-flex justify-content-end p-2">
                                    <button type="button" className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
                                        <p className="text-sm-1 text-dark mb-0">Close</p> <span aria-hidden="true" className="justify-content-center d-flex align-items-center"><i className="fa fa-times"></i></span>
                                    </button>
                                </div>

                                <div className="text-center w-90 p-4">
                                    <div className='row align-items-center'>
                                        <div className='col-8'>
                                            <h2 className="modal-title font-weight-semibold" id="basicPlanModal">Basic Plan</h2>
                                            <small className="modal-sub" id="basicPlanModal">Pay As You Go</small>
                                        </div>
                                        <div className='col-4'>
                                            <p className='plan-details-price'>
                                                ₦2,000
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-body plan-details-body">
                                {/* plan description */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Description
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <p className='plan-description'>
                                            Prefer to pay for your primary care on the go? This option is for you! Enjoy access to quality and affordable primary care on the go!
                                        </p>
                                    </div>
                                </div>
                                {/* plan benefits */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Benefits Included
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Primary Care Consultation</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Hypertension Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Blood Sugar Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Rapid Diagnostic Test for: Malaria, Typhoid</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Pregnancy Test</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Prenatal | Antenatal | Postnatal Care Services </p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Protein and Urine Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <button className='btn button text-white mx-auto p-2 plan-modal-button' data-dismiss="modal" onClick={() => this.selectPlan('basic', 2000_00)}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Basic plan modal end */}

                {/* Single plan modal */}
                <div className="modal fade plan-details-modal" id="singlePlanModal" aria-labelledby="singlePlanModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal plan-details">
                            <div className="d-flex flex-column plan-details-header">
                                <div className="w-100 d-flex justify-content-end p-2">
                                    <button type="button" className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
                                        <p className="text-sm-1 text-dark mb-0">Close</p> <span aria-hidden="true" className="justify-content-center d-flex align-items-center"><i className="fa fa-times"></i></span>
                                    </button>
                                </div>

                                <div className="text-center w-90 p-4">
                                    <div className='row align-items-center'>
                                        <div className='col-8'>
                                            <h2 className="modal-title font-weight-semibold" id="singlePlanModal">Single Plan</h2>
                                            <small className="modal-sub" id="singlePlanModal">Paid Monthly</small>
                                        </div>
                                        <div className='col-4'>
                                            <p className='plan-details-price'>
                                                ₦3,000
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-body plan-details-body">
                                {/* plan description */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Description
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <p className='plan-description'>
                                            Enjoy unlimited access to our services when you subscribe at any time! You can subscribe Weekly, Monthly, Quarterly, Or Annually
                                        </p>
                                    </div>
                                </div>
                                {/* plan benefits */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Benefits Included
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Primary Care Consultation</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Hypertension Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Blood Sugar Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Rapid Diagnostic Test for: Malaria, Typhoid</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Pregnancy Test</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Prenatal | Antenatal | Postnatal Care Services </p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Protein and Urine Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-x.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <button className='btn button text-white mx-auto p-2 plan-modal-button' data-dismiss="modal" onClick={() => this.selectPlan('single', 3000_00)}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Single plan modal end */}

                {/* Maternity plan modal */}
                <div className="modal fade plan-details-modal" id="maternityPlanModal" aria-labelledby="maternityPlanModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal plan-details">
                            <div className="d-flex flex-column plan-details-header">
                                <div className="w-100 d-flex justify-content-end p-2">
                                    <button type="button" className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
                                        <p className="text-sm-1 text-dark mb-0">Close</p> <span aria-hidden="true" className="justify-content-center d-flex align-items-center"><i className="fa fa-times"></i></span>
                                    </button>
                                </div>

                                <div className="text-center w-90 p-4">
                                    <div className='row align-items-center'>
                                        <div className='col-8'>
                                            <h2 className="modal-title font-weight-semibold" id="maternityPlanModal">Maternity Plan</h2>
                                            <small className="modal-sub" id="maternityPlanModal">Paid Monthly</small>
                                        </div>
                                        <div className='col-4'>
                                            <p className='plan-details-price'>
                                                ₦3,500
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-body plan-details-body">
                                {/* plan description */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Description
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <p className='plan-description'>
                                            Are you a new or expectant mother? Then enjoy this dedicated package for your motherhood journey.
                                        </p>
                                    </div>
                                </div>
                                {/* plan benefits */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Benefits Included
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Primary Care Consultation</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Hypertension Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Blood Sugar Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Rapid Diagnostic Test for: Malaria, Typhoid</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Pregnancy Test</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Prenatal | Antenatal | Postnatal Care Services </p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Protein and Urine Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <button className='btn button text-white mx-auto p-2 plan-modal-button' data-dismiss="modal" onClick={() => this.selectPlan('maternity', 3500_00)}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Maternity plan modal end */}

                {/* Family plan modal */}
                <div className="modal fade plan-details-modal" id="familyPlanModal" aria-labelledby="familyPlanModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal plan-details">
                            <div className="d-flex flex-column plan-details-header">
                                <div className="w-100 d-flex justify-content-end p-2">
                                    <button type="button" className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
                                        <p className="text-sm-1 text-dark mb-0">Close</p> <span aria-hidden="true" className="justify-content-center d-flex align-items-center"><i className="fa fa-times"></i></span>
                                    </button>
                                </div>

                                <div className="text-center w-90 p-4">
                                    <div className='row align-items-center'>
                                        <div className='col-8'>
                                            <h2 className="modal-title font-weight-semibold" id="familyPlanModal">Family Plan</h2>
                                            <small className="modal-sub" id="familyPlanModal">Paid Monthly</small>
                                        </div>
                                        <div className='col-4'>
                                            <p className='plan-details-price'>
                                                ₦5,000
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-body plan-details-body">
                                {/* plan description */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Description
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <p className='plan-description'>
                                            Enjoy access to primary health care for your family <br />
                                            *Two parents and two children (maximum of four)
                                        </p>
                                    </div>
                                </div>
                                {/* plan benefits */}
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1 className='heading'>
                                            Benefits Included
                                        </h1>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Primary Care Consultation</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Hypertension Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Blood Sugar Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Rapid Diagnostic Test for: Malaria, Typhoid</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Pregnancy Test</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Prenatal | Antenatal | Postnatal Care Services </p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='plan-benefit row'>
                                            <div className='col-10'>
                                                <p>Protein and Urine Screening</p>
                                            </div>
                                            <div className='col-2 justify-content-end'>
                                                <img className='justify-content-end' height='20px' width='20px' src='./img/icons/icon-check.svg'></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <button className='btn button text-white mx-auto p-2 plan-modal-button' data-dismiss="modal" onClick={() => this.selectPlan('family', 5000_00)}>Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Maternity plan modal end */}

                {/* Payment modal */}
                <div className="modal fade" id="paymentModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal p-4">
                            <div className="d-flex flex-column">
                                <div className="w-100 d-flex justify-content-end">
                                    <button type="button" className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
                                        <p className="text-sm-1 text-dark mb-0">Close</p> <span aria-hidden="true" className="justify-content-center d-flex align-items-center"><i className="fa fa-times"></i></span>
                                    </button>
                                </div>

                                <div className="text-center w-100">
                                    <h2 className="modal-title font-weight-semibold" id="exampleModalLabel">Hey there, Let's get you started</h2>
                                    <p className="modal-title" id="exampleModalLabel">Quickly sign up and pay for a subscription plan</p>
                                </div>

                            </div>
                            <div className="modal-body">
                                <form action="" className="my-form">
                                    <div className="form-div">
                                        <input type="text" className="form-input" value={this.state.name} onChange={(event) => this.isFormValid(event, 'name')} placeholder='E.g Firstname Lastname' required />
                                        <label className="form-label">Full Name</label>
                                    </div>

                                    <div className="form-div">
                                        <input type="email" className="form-input" value={this.state.user_email} onChange={(event) => this.isFormValid(event, 'email')} required />
                                        <label className="form-label">Email Address</label>
                                    </div>

                                    <div className="form-div">
                                        <MaskInput type="tel" className="form-input" value={this.state.phone} onChange={(event) => this.isFormValid(event, 'phone')} mask={'0000-000-0000'} size={11} maskChar="" required />
                                        {/* <input type="tel" className="form-input" value={this.state.phone} onChange={(event) => this.isFormValid(event, 'phone')} required /> */}
                                        <label className="form-label">Phone Number</label>
                                    </div>
                                </form>
                            </div>
                            <div className="w-100 register-button">
                                <button type="button" className="btn button text-white w-100n register-form-button" data-dismiss="modal" onClick={() => this.toRegisterPage()}>Proceed To Register</button>
                                {/* <PaystackButton
                                    className="btn button text-white w-100n register-form-button"
                                    text="Make Payment"
                                    callback={this.callback}
                                    close={this.close}
                                    disabled={false}
                                    embed={false}
                                    reference={this.getReference()}
                                    email={this.state.paystack_email}
                                    amount={Number(this.state.price)}
                                    paystackkey={this.state.paystack_key}
                                    tag="button"
                                    style='visibility: hidden'
                                    ref={this.paystackButtonRef}
                                    id='paystackButton'
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODALS END. */}
            </>
        )
    }
}


// Register.layout = EmptyLayout;
export default Register;
