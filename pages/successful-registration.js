import React, { Component, createRef } from 'react';
import Head from 'next/head'
import PartialLayout from '../layout/partials-layout';
import moment from 'moment';
import Swal from 'sweetalert2';
import PaystackButton from 'react-paystack';
import MaskInput from 'react-maskinput';
// import '../public/register.css';
// import 'bootstrap/dist/js/bootstrap.js';
var loadJs = require('loadjs');


class Register extends Component {

    constructor(props) {
        super(props);
        this.paystackButtonRef = createRef();
    }

    state = {
        // key: "pk_live_477f8475b863b328656efdad927cd98e47e740fd",
        // email: "shodipovi@gmail.com",
        // amount: 100000
        // api: 'https://api.clafiya.com/api/tfap',
        api: 'http://localhost:8000/api/tfap',
        p_ref: '',
        a_url: ''
    }

    toHomePage = () => {
        window.location.pathname = '';
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


    componentDidMount() {
        loadJs("js/theme.init.js");
        let p_ref = window.localStorage.getItem('cl-pref');
        let a_url = window.localStorage.getItem('cl-aurl');

        this.setState({
            ...this.state,
            p_ref: p_ref,
            a_url: a_url
        });

        this.verifyPayment(this.state.p_ref);
    }

    render() {
        return (
            <>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
                    <title>Thank You! For Registering With Clafiya!</title>
                    <script src="vendor/jquery/jquery.min.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
                    {/* <script src="vendor/jquery.appear/jquery.appear.min.js"></script>		 */}
                    {/* <script src="vendor/jquery.easing/jquery.easing.min.js"></script>			 */}
                    <script src="vendor/owl.carousel/owl.carousel.min.js"></script>
                    <script src="js/theme.js"></script>
                    <link rel='stylesheet' href='success-page.css'></link>
                    {/* <script src="https://js.paystack.co/v1/inline.js"></script> */}
                    {/* <script src="js/theme.init.js"></script> */}
                    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link> */}
                </Head>

                {/* Main Body */}
                <div className='container main-container'>
                    <div className='container message col-12 justify-content-between'>
                        <div className='justify-content-between'>
                            <img src='img/auth-page-bg.png'></img>
                            <h1 className='font-weight-extrabold heading'>Successful.</h1>
                            <p className='font-weight-semibold'>
                                Your account was created successfully. You can start <br/> scheduling appointments with health workers near you.
                            </p>
                        </div>
                        <button type='button' onClick={() => this.toHomePage()} className='btn button'>
                            Continue
                        </button>
                    </div>
                </div>
                {/* Main Body End. */}
            </>
        )
    }
}


// Register.layout = EmptyLayout;
export default Register;