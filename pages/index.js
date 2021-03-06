import React, { Component, createRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PartialLayout from '../layout/partials-layout';
import MaskInput from 'react-maskinput';
import PaystackButton from 'react-paystack';
import Link from 'next/link';
// import 'bootstrap/dist/js/bootstrap.js';
var loadJs = require('loadjs');
// var window;


class Home extends Component {

    constructor(props) {
        super(props);
        this.closeModal = createRef();
        this.closeSingleModal = createRef();
        this.closeMaternityModal = createRef();
        this.closeFamilyModal = createRef();
        // this.window = window;
    }

    state = {
        api: 'https://api.clafiya.com/api/tfap',
        // api: 'http://localhost:8000/api/tfap',
        key: "pk_live_477f8475b863b328656efdad927cd98e47e740fd",
        email: "shodipovi@gmail.com",
        amount: 100000,
        name: '',
        user_email: '',
        phone: '',
        plan: ''
    }

    isRegisterFormValid = false;

    verifyPayment = async (p_ref) => {
        // console.log('P REF', p_ref);
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

                // CLEAR cl-pref && cl-aurl
            }
        })
    }

    isFormValid = (event, input) => {
        if (input === 'name') this.setState({ ...this.state, name: event.target.value });
        if (input === 'email') this.setState({ ...this.state, user_email: event.target.value });
        if (input === 'phone') this.setState({ ...this.state, phone: event.target.value });

        if (
            this.state.name !== '' && this.state.email !== '' && this.state.phone !== ''
        ) this.isRegisterFormValid = true;
    }

    toRegisterPage = () => {
        window.location.pathname = '/register';
    }

    // router = useRouter();


    callback = (response) => {
        alert('success. transaction ref is ' + response.reference);
    }

    close = () => {
        console.log("Payment closed");
    }

    setAmount = (plan, amount) => {
        this.setState({ ...this.state, amount: amount, plan: plan });
        let data = {
            plan: plan,
            amount: amount
        };

        window.localStorage.setItem('cl-reg', JSON.stringify(data));
        this.closeModal.current.click();
        this.closeSingleModal.current.click();
        this.closeMaternityModal.current.click();
        this.closeFamilyModal.current.click();
        // this.toRegisterPage();
        // this.router.push({
        //     pathname: '/register',
        //     query: { pid: 'basic' },
        // })
        //   this.state.amount = amount;
        //   console.log(this.state.amount);
    }

    getReference = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    componentDidMount() {
        loadJs("js/theme.init.js");
        // this.verifyPayment(window.localStorage.getItem('cl-pref'));
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
                    <title>Clafiya - Quality Primary Healthcare at Your Door Step</title>
                    <script src="vendor/jquery/jquery.min.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
                    {/* <script src="vendor/jquery.appear/jquery.appear.min.js"></script>		 */}
                    {/* <script src="vendor/jquery.easing/jquery.easing.min.js"></script>			 */}
                    <script src="vendor/owl.carousel/owl.carousel.min.js"></script>
                    <script src="js/theme.js"></script>
                    {/* <script src="https://js.paystack.co/v1/inline.js"></script> */}
                    {/* <script src="js/theme.init.js"></script> */}
                    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link> */}
                </Head>
                {/* hero section */}
                <div className="hero mb-5">
                    <div className="container hero-content">
                        <div className="row align-items-center py-5">
                            <div className="col-md-6 hero-text text-center text-md-left">
                                <h1 className="font-weight-bold text-color-dark">
                                    QUALITY PRIMARY HEALTHCARE FOR ALL AFRICANS.
                            </h1>
                                <p className="hero-p font-weight-bold">We are focused on bringing fast, affordable, and quality healthcare to your doorstep, anywhere in Africa.</p>
                                <div><a className="btn button px-4 py-2 text-white" href="#about_clafiya">Learn more</a></div>
                            </div>
                            <div className="hero-img col-md-6 col-sm-push-6 pt-5 mt-3">
                                <img src="img/indexImg/hero IMG.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* service section */}
                <div className="services-grid py-5" id="about_clafiya">
                    <div className="container">
                        <div className="text-left service-head pb-4">
                            <h3 className="font-weight-extrabold my-2">
                                Who is Clafiya For?
                            </h3>
                            <div className="rectangle mb-4"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 service">
                                <img src="./img/indexImg/img 1.svg" alt="" />
                                <div className="service-text px-4 py-2">
                                    <h4 className="lead text-color-dark font-weight-bold">
                                        For Patients
                                    </h4>
                                    <p>
                                        Our patients can register, pick their desired plan, schedule appointments, and get connected with health workers nearest to them!
                                    </p>
                                    <a href="#get_started" className="text-color-dark pb-5">Learn more <i className="fa fa-arrow-right px-2"></i></a>
                                </div>
                            </div>

                            <div className="col-md-4 service">
                                <img src="./img/indexImg/Group 2604.svg" alt="" />
                                <div className="service-text px-4 py-2 my-0">
                                    <h4 className="lead text-color-dark font-weight-bold">
                                        For Health Workers
                                    </h4>
                                    <p>
                                        We connect our community health workers with people who need their services. Would you like to work with us? Click the button below.
                                    </p>
                                    <a href="#for_health_workers" className="text-color-dark pb-5">Learn more <i className="fa fa-arrow-right px-2"></i></a>
                                </div>
                            </div>

                            <div className="col-md-4 service">
                                <img src="./img/indexImg/tech.svg" alt="" />
                                <div className="service-text px-4 py-2">
                                    <h4 className="lead text-color-dark font-weight-bold">
                                        For You!
                                    </h4>
                                    <p>
                                        Consistent medical checkups saves you a lot, and it's a good way to live! Register with us and stay up to date with your health.
                                    </p>
                                    <a href="#our_tech" className="text-color-dark pb-5">Learn more <i className="fa fa-arrow-right px-2"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* difference */}
                <div className="difference-container">
                    <div className="container">
                        <div className="row scroll-section">
                            <div className="text-md-left text-center service-head pb-4 col-md-6">
                                <section>
                                    <div className="rectangle mb-0 d-inline-block"></div>
                                    <h2 className="my-2 font-weight-extrabold">
                                        This is What Makes Clafiya Different From All Others.
                                    </h2>
                                    <p>
                                        Clafiya thrives on a mission to consistently provide basic healthcare to individuals in both rural and urban communities. <br /><br />

                                        We think of it as a responsibility to ensure that quality and affordable healthcare services are available everywhere in Africa. <br /><br />

                                        Are you into SDGs? This brings us closer to meeting SDGs 1,3 and 8. <br />
                                    </p>
                                </section>
                            </div>
                            <div className="col-md-6 what-scroll">
                                <div className="what-card bg-light p-3 shadow mb-4">
                                    <div className="text-left">
                                        <h2 className="lead font-weight-bold mb-1">
                                            Easy to Use Technology
                                        </h2>
                                        <p>
                                            Struggling with poor internet connection, or no access to the internet at all? You can easily dial our shortcode *347*58# and get started with appointment scheduling and more.
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/indexImg/easy to use tech.svg " className="what-img" alt="" />
                                        {/* <div className="info mt-3">
                                            <img src="./img/indexImg/sdg1.svg" alt="" />
                                        </div> */}
                                    </div>
                                </div>

                                <div className="what-card bg-light p-3 shadow mb-4">
                                    <div className="text-left">
                                        <h2 className="lead font-weight-bold mb-1">
                                            Last Mile Distribution of Primary Care Services
                                        </h2>
                                        <p>
                                            Our Community Health Workers employ a door-to-door approach to increase access to primary care services in semi-urban, and rural communities.
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/indexImg/left img last mile.svg " className="what-img" alt="" />
                                        <div className="info mt-3">
                                            <img src="./img/indexImg/sdg1.svg" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="what-card bg-light p-3 shadow mb-4">
                                    <div className="text-left">
                                        <h2 className="lead font-weight-bold mb-1">
                                            Increasing Job Opportunities for Women

                                        </h2>
                                        <p>
                                            According to the UN, less than half of the global women population are under employed. Particularly in Africa, the women unemployment rate is estimated to be 49.6%. By increasing job opportunities for women, Clafiya is re-writing this narrative.
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/indexImg/Group 2609.svg" alt="" className="what-img" />
                                        <div className="info mt-3">
                                            <img src="./img/indexImg/sdg.svg" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="what-card bg-light p-3 shadow mb-4">
                                    <div className="text-left">
                                        <h2 className="lead font-weight-bold mb-1">
                                            Promoting Socio-Economic Development In Low Income Communities


                                        </h2>
                                        <p>
                                            Clafiya takes a holistic approach to address Africa???s fractured primary healthcare system. At Clafiya, we understand that in order to realize our impact, we have to make something that Africans need. That is leveraging existing systems and technologies to improve access to home based primary care services. We also understand that this problem is two sided and addressing one side without the other will not generate the desired sustained impact needed in Africa. Overtime, Clafiya seeks to improve the life expectancy of Africans and reduce healthcare expenditure ??? thus alleviating people out of poverty.
                                        </p>
                                    </div>
                                    <div>
                                        <img src="./img/indexImg/124.jpeg" alt="" className="what-img" />
                                        <div className="info mt-3">
                                            <img src="./img/indexImg/poverty.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Getting started */}
                <div className="getting-started" id="get_started">
                    <div className="container">
                        <h2 className="font-weight-extrabold mb-5 text-md-left text-center">Getting Started</h2>
                        <div className="row">

                            <div className="col-md-3">
                                <div>
                                    <img src="img/indexImg/Group 2587.svg" alt="" className="mb-2 started-img" />
                                    <p className="lead-2 font-weight-bold text-color-dark">1. Dial *347*58#</p>
                                    <p>
                                        Simply dial our shortcode on any mobile device
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div>
                                    <img src="img/indexImg/Group 2586.svg" alt="" className="mb-2 started-img" />
                                    <p className="lead-2 font-weight-bold text-color-dark">2. Register</p>
                                    <p>
                                        Registration is simple and straightforward
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div>
                                    <img src="img/indexImg/Group 2588.svg" alt="" className="mb-2 started-img" />
                                    <p className="lead-2 font-weight-bold text-color-dark">3. Schedule an appointment</p>
                                    <p>
                                        After registration, you can make a request anytime, schedule an appointment and get connected with our approved health workers
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div>
                                    <img src="img/indexImg/Group 2590.svg" alt="" className="mb-2 started-img" />
                                    <p className="lead-2 font-weight-bold text-color-dark">4. You???re all set!</p>
                                    <p>
                                        Enjoy fast and affordable primary healthcare at your doorstep
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* our tech */}
                <div>
                    <div className="container row d-flex align-items-center justify-content-between" id="our_tech">
                        {/* <div className="row align-items-center justify-content-between tech"> */}
                            <div className="col-md-6 justify-content-center">
                                <img src="./img/indexImg/renders.svg" alt="" className="phone" />
                            </div>
                            <div className="col-md-6 text-md-right text-center">
                                <div className="tech-head ">
                                    <h3 className="text-color-dark font-weight-extrabold mb-1">
                                        Our Technology
                                    </h3>
                                    <div className="rectangle mb-2 tech-rect d-inline-block"></div>
                                </div>
                                <p>
                                    Clafiya is a USSD (Unstructured Supplementary Service Data) session-based text communication protocol available on every GSM-enabled mobile device. A USSD is a short code that enables one to reach customers who are in hard to reach areas and does not require internet connectivity to function. According to GMSA, mobile internet penetration on the African Continent was 26% - approximately 272 million people. As such, it was imperative that our platform is easily accessible. In various African countries, people are using their mobile phones for banking, telecoms, agriculture and sports. With Clafiya they can now use it for healthcare.
                                </p>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
                {/* stories */}
                <section className="section bg-color-grey-scale-1 section-height-3 border-0 m-0 mb-5 testimonial-section">
                    <div className="container pb-2">
                        <div className="row">
                            <div className="col-lg-6 text-center text-md-left mb-5 mb-lg-0">
                                <h2 className="text-color-light font-weight-extrabold text-6 mb-2">Stories People Tell About Us.</h2>
                                <div className="rectangle mb-2 stories-rect d-inline-block"></div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                            <div className="owl-carousel owl-theme nav-style-1 nav-center-images-only stage-margin mb-0" data-plugin-options="{'responsive': {'576': {'items': 1}, '768': {'items': 3}, '992': {'items': 3}, '1200': {'items': 3}}, 'margin': 25, 'loop': true, 'nav': true, 'dots': true, 'stagePadding': 40}">
                                    <div className='row testimonial'>
                                        <div className='col-12 col-md-12 col-lg-12'>
                                            <img className="testimonial-img img-fluid rounded-0 mb-4" src="img/indexImg/testimonial1.svg" alt="" />
                                        </div>
                                        <div className='col-12 col-md-12 text-center col-lg-12'>
                                            <p className="text-color-light font-weight-semibold mb-0">
                                                I loveee that I don???t have to downlaod a mobile app, it is pretty straight forward. It is way faster and easier than going to the hospital
                                            </p>
                                        </div>
                                        <div className='col-12 col-md-12 col-lg-12 text-center'>
                                            <small className='text-color-light'>Name</small>
                                            <p className='testimonial-by text-color-light'>
                                                GABRIEL
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row testimonial'>
                                        <div className='col-12 col-md-12 col-lg-12'>
                                            <img className="testimonial-img img-fluid rounded-0 mb-4" src="img/indexImg/testimonial2.svg" alt="" />
                                        </div>
                                        <div className='col-12 col-md-12 text-center col-lg-12'>
                                            <p className="text-color-light font-weight-semibold mb-0">
                                                Clafiya is what I have been waiting for, it is easy and fast. It  feels good to know someone is there when I call.
                                            </p>
                                        </div>
                                        <div className='col-12 col-md-12 col-lg-12 text-center'>
                                            <small className='text-color-light'>Name</small>
                                            <p className='testimonial-by text-color-light'>
                                                ESTHER ECHE
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row testimonial'>
                                        <div className='col-12 col-md-12 col-lg-12'>
                                            <img className="testimonial-img img-fluid rounded-0 mb-4" src="img/indexImg/testimonial3.svg" alt="" />
                                        </div>
                                        <div className='col-12 col-md-12 text-center col-lg-12'>
                                            <p className="text-color-light font-weight-semibold mb-0">
                                                The best EVERRRRR! I am so excited about this, I can???t wait to sign my parents up for this, and I will definitely pay for this.
                                            </p>
                                        </div>
                                        <div className='col-12 col-md-12 col-lg-12 text-center'>
                                            <small className='text-color-light'>Name</small>
                                            <p className='testimonial-by text-color-light'>
                                                JULIANNA AMEH
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* packages */}
                <div className="packages-section">
                    <div className="container justify-content-center packages">
                        <div>
                            <h3 className="text-color-dark font-weight-extrabold mb-2 text-md-left ">
                                Our Affordable Plans
                            </h3>
                            <div className="rectangle d-inline-block mb-4"></div>
                        </div>
                        {/* Mobile Packages View */}
                        <div className='d-block d-sm-none mobile-packages'>
                            {/* Basic Plan */}
                            <div className='plan'>
                                <p className='plan-name'>
                                    Basic Plan
                                </p>
                                <p className='plan-price'>
                                    <sup>???</sup>2,000
                                </p>
                                <small>Pay as you go - charges for extra services</small>
                                <div className='plan-button'><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#basicPlanModal">Get Started</a></div>
                                <div className='plan-services'>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Primary Care Consultation
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Hypertension Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Blood Sugar Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Rapid Diagnostic Test for: Malaria, Typhoid
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Pregnancy Test
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Prenatal | Antenatal |  Postnatal Care Services
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Protein and Urine Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                </div>
                            </div>
                            {/* Single Plan */}
                            <div className='plan'>
                                <p className='plan-name'>
                                    Single Plan
                                </p>
                                <p className='plan-price'>
                                    <sup>???</sup>3,000
                                </p>
                                <small>Monthly</small>
                                <div className='plan-button'><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#singlePlanModal">Get Started</a></div>
                                <div className='plan-services'>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Primary Care Consultation
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Hypertension Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Blood Sugar Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Rapid Diagnostic Test for: Malaria, Typhoid
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Pregnancy Test
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Prenatal | Antenatal |  Postnatal Care Services
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Protein and Urine Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-x.svg'></img>
                                    </div>
                                </div>
                            </div>
                            {/* Maternity Care */}
                            <div className='plan'>
                                <p className='plan-name'>
                                    Maternity Care
                                </p>
                                <p className='plan-price'>
                                    <sup>???</sup>3,500
                                </p>
                                <small>Monthly</small>
                                <div className='plan-button'><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#maternityPlanModal">Get Started</a></div>
                                <div className='plan-services'>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Primary Care Consultation
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Hypertension Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Blood Sugar Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Rapid Diagnostic Test for: Malaria, Typhoid
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Pregnancy Test
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Prenatal | Antenatal |  Postnatal Care Services
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Protein and Urine Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                </div>
                            </div>
                            {/* Family */}
                            <div className='plan'>
                                <p className='plan-name'>
                                    Family
                                </p>
                                <p className='plan-price'>
                                    <sup>???</sup>5,000
                                </p>
                                <small>Monthly</small>
                                <div className='plan-button'><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#familyPlanModal">Get Started</a></div>
                                <div className='plan-services'>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Primary Care Consultation
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Hypertension Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Blood Sugar Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Rapid Diagnostic Test for: Malaria, Typhoid
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Pregnancy Test
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Prenatal | Antenatal |  Postnatal Care Services
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                    <div className='plan-service row'>
                                        <hr></hr>
                                        <p className='justify-content-start service-name col-xs-12'>
                                            Protein and Urine Screening
                                        </p>
                                        <img className='justify-content-end' height='40px' width='40px' src='./img/icons/icon-check.svg'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}

                        <div className='table-responsive d-none d-md-block d-lg-block'>
                            <table className='table packages-table'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='justify-content-start benefits-heading'>Benefits</th>
                                        <th scope="col" className='text-center'>
                                            <div>
                                                Basic Plan <br />
                                                <sup>???</sup>2,000 <br />
                                                <small>Pay as you go - charges for extra services</small>
                                            </div>
                                            <div><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#basicPlanModal">Get Started</a></div>
                                        </th>
                                        <th scope="col" className='text-center basic-col'>
                                            <div>
                                                Single Plan <br />
                                                <sup>???</sup>3,000 <br />
                                                <small>Monthly</small>
                                            </div>
                                            <div><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#singlePlanModal">Get Started</a></div>
                                        </th>
                                        <th scope="col" className='text-center'>
                                            <div>
                                                Maternity Care <br />
                                                <sup>???</sup>3,500 <br />
                                                <small>Monthly</small>
                                            </div>
                                            <div><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#maternityPlanModal">Get Started</a></div>
                                        </th>
                                        <th scope="col" className='text-center'>
                                            <div>
                                                Family <br />
                                                <sup>???</sup>5,000 <br />
                                                <small>Monthly</small>
                                            </div>
                                            <div><a className="btn button px-4 py-2 text-white" data-toggle="modal" data-target="#familyPlanModal">Get Started</a></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Primary Care Consultation */}
                                    <tr>
                                        <td scope="row" className='service-name'>Primary Care Consultation</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Hypertension Screening */}
                                    <tr>
                                        <td scope="row" className='service-name'>Hypertension Screening</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Blood Sugar Screening */}
                                    <tr>
                                        <td scope="row" className='service-name'>Blood Sugar Screening</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Rapid Diagnostic Test For: Malaria, Typhoid */}
                                    <tr>
                                        <td scope="row" className='service-name'>Rapid Diagnostic Test For: Malaria, Typhoid</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Pregnancy Test */}
                                    <tr>
                                        <td scope="row" className='service-name'>Pregnancy Test</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Prenatal | Antenatal | Postnatal Care Services */}
                                    <tr>
                                        <td scope="row" className='service-name'>Prenatal | Antenatal | Postnatal Care Services</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                    {/* Protein and Urine Screening */}
                                    <tr>
                                        <td scope="row" className='service-name'>Protein and Urine Screening</td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center basic-col'>
                                            <img src='./img/icons/icon-x.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                        <td className='text-center'>
                                            <img src='./img/icons/icon-check.svg'></img>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="dots packages-dots">
                    <img src="./img/indexImg/dots-background-2 1packages.svg" alt="" />
                </div>


                {/* contact */}

                <div className="contact py-4" id='for_health_workers'>
                    <div className="container text-white align-items-center text-center text-md-left">
                        <div className="d-flex align-items-center mt-4 mb-5">
                            <div className="rectangle bg-light mx-3"></div>
                            <p className="text-white mb-0 text-sm-4">
                                Let's get in touch
                            </p>
                        </div>
                        <div className="row align-items-center mb-5 mt-4">
                            <div className="col-md-8">
                                <h2 className="text-white font-weight-semibold">
                                    Are you a skilled and qualified health worker who is interested in working in your community?
                                </h2>
                                <p className="text-white">
                                    We would love to hear from you. Click on the button to register.
                                </p>
                            </div>
                            <div className="col-md-4 d-flex justify-content-center ">
                                {/* <a href="https://localhealer.typeform.com/to/AWUPye" target="_black" className="text-white sign-up d-flex justify-content-center align-items-center">
                                    Register
                                    <i className="fa fa-arrow-right px-2"></i>
                                </a> */}
                                <a href="https://forms.gle/qBmnqJm6MfSjCcZH6" target="_black" className="text-white sign-up d-flex justify-content-center align-items-center">
                                    Register
                                    {/* <i className="fa fa-arrow-right px-2"></i> */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* map section */}
                <div className="map-section mb-5">
                    <div className="row">
                        <div className="map-head d-flex text-center align-items-center justify-content-center mb-4 col-12 col-md-6 col-lg-6">
                            <h4 className="font-weight-extrabold w-75 map-title">We are part of a movement advancing <wbr /> access to primary healthcare to all Africans.</h4>
                        </div>
                        <div className='map-img d-flex justify-content-center col-12 col-md-6 col-lg-6'>
                            <img src="./img/indexImg/dotted_africa_map.svg" alt="map of africa" />
                        </div>

                    </div>
                </div>

                <div className="dots map">
                    <img src="./img/indexImg/dots-background-1 5map.svg" alt="" />
                </div>

                {/* sponsors */}
                <div className="mb-5 mt-4">
                    <div className="container justify-content-center packages">
                        <div>
                            <h3 className="text-color-dark font-weight-extrabold mb-2 text-md-left ">
                                Meet Our Sponsors and Partners
                        </h3>
                            <div className="rectangle d-inline-block mb-4"></div>
                        </div>
                        <div className="sponsor-grid mb-5">
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Novartis Foundation Logo  1.svg" alt="" />
                            </div>
                            {/* <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Aws logo 1.svg" alt="" />
                            </div> */}
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Inspired Minds Logo  1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Acumen Academy Logo 1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Women in Global Health logo  1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Citi Ventures logo 1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Ted Leonsis logo 1.svg" alt="" />
                            </div>

                        </div>
                        <div className="sponsor-grid mb-5">
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/NSF Corps Logo 1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Georgetown University Logo  1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Future founders logo 1.svg" alt="" />
                            </div>
                            {/* <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/twilio logo 1.svg" alt="" />
                            </div> */}
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Rockerfeller Foundation logo 1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Berkely Skydeck logo 1.svg" alt="" />
                            </div>
                            <div className="sponsor-img">
                                <img src="./img/indexImg/sponsors/Anambra Ministry of Health Logo  1.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODALS */}

                {/* Basic plan modal */}
                <div className="modal fade plan-details-modal" id="basicPlanModal" aria-labelledby="basicPlanModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content my-modal plan-details">
                            <div className="d-flex flex-column plan-details-header">
                                <div className="w-100 d-flex justify-content-end p-2">
                                    <button type="button" ref={this.closeModal} className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
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
                                                ???2,000
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
                                            Prefer to pay for your primary care on the go? This option is for you! Enjoy access to quality and affordable primary care on the go.
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
                                    <Link href='/register'>
                                        <button className='btn button text-white mx-auto p-2 plan-modal-button' onClick={() => this.setAmount('basic', 2000_00)}>Select</button>
                                    </Link>
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
                                    <button type="button" ref={this.closeSingleModal} className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
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
                                                ???3,000
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
                                    <Link href='/register'>
                                        <button className='btn button text-white mx-auto p-2 plan-modal-button' onClick={() => this.setAmount('single', 3000_00)}>Select</button>
                                    </Link>
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
                                    <button type="button" ref={this.closeMaternityModal} className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
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
                                                ???3,500
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
                                    <Link href='/register'>
                                        <button className='btn button text-white mx-auto p-2 plan-modal-button' onClick={() => this.setAmount('maternity', 3500_00)}>Select</button>
                                    </Link>
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
                                    <button type="button" ref={this.closeFamilyModal} className="close-modal d-flex outline-none" data-dismiss="modal" aria-label="Close">
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
                                                ???5,000
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
                                            Enjoy access to primary healthcare for your family <br />
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
                                    <Link href='/register'>
                                        <button className='btn button text-white mx-auto p-2 plan-modal-button' onClick={() => this.setAmount('family', 5000_00)}>
                                            Select
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Family plan modal end */}

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
                                    disabled={!this.isRegisterFormValid}
                                    embed={false}
                                    reference={this.getReference()}
                                    email={this.state.email}
                                    amount={this.state.amount}
                                    paystackkey={this.state.key}
                                    tag="button"
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


Home.layout = PartialLayout;
export default Home;