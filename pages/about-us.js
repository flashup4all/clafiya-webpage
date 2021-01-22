import React, { Component } from 'react';
import Head from 'next/head'


import PartialLayout from '../layout/partials-layout'
var loadJs = require('loadjs');

class Home extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        

        
        // loadJs("vendor/jquery/jquery.min.js");
        // loadJs("vendor/jquery.appear/jquery.appear.min.js");
        // loadJs("vendor/jquery.easing/jquery.easing.min.js");
        // loadJs("vendor/jquery.cookie/jquery.cookie.min.js");
        // loadJs("vendor/popper/umd/popper.min.js");

        // // loadJs("master/style-switcher/style.switcher.js");
        // loadJs("vendor/bootstrap/js/bootstrap.min.js");
        // loadJs("vendor/common/common.min.js");
        // loadJs("vendor/jquery.validation/jquery.validate.min.js");
        // loadJs("vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js");
        // loadJs("vendor/jquery.gmap/jquery.gmap.min.js");
        // loadJs("vendor/jquery.lazyload/jquery.lazyload.min.js");
        // loadJs("vendor/isotope/jquery.isotope.min.js");
        // loadJs("vendor/owl.carousel/owl.carousel.min.js");
        // loadJs("vendor/magnific-popup/jquery.magnific-popup.min.js");
        // loadJs("vendor/vide/jquery.vide.min.js");
        // loadJs("vendor/vivus/vivus.min.js");
        // loadJs("js/theme.js");
        // loadJs("js/theme.init.js");

	
    }

    render(){
        return (
            <>
            <Head>
                <script src="vendor/jquery/jquery.min.js"></script>		
                <script src="vendor/jquery.appear/jquery.appear.min.js"></script>		
                <script src="vendor/jquery.easing/jquery.easing.min.js"></script>		
                <script src="vendor/jquery.cookie/jquery.cookie.min.js"></script>		
                {/* <script src="master/style-switcher/style.switcher.js" id="styleSwitcherScript" data-base-path="" data-skin-src=""></script>		 */}
                <script src="vendor/popper/umd/popper.min.js"></script>		
                <script src="vendor/bootstrap/js/bootstrap.min.js"></script>		
                <script src="vendor/common/common.min.js"></script>		
                <script src="vendor/jquery.validation/jquery.validate.min.js"></script>		
                <script src="vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>		
                <script src="vendor/jquery.gmap/jquery.gmap.min.js"></script>		
                <script src="vendor/jquery.lazyload/jquery.lazyload.min.js"></script>		
                <script src="vendor/isotope/jquery.isotope.min.js"></script>		
                <script src="vendor/owl.carousel/owl.carousel.min.js"></script>		
                <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>		
                <script src="vendor/vide/jquery.vide.min.js"></script>		
                <script src="vendor/vivus/vivus.min.js"></script>
                <script src="js/theme.js"></script>
                <script src="js/theme.init.js"></script>
            </Head>
                <section className="about-header page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-12 align-self-center p-static order-2 text-center">
                                <h1 className="text-9 font-weight-bold">Know More About Clafiya</h1>
                                <span className="sub-title">Primary Health Care For All</span>
                            </div>
                            <div className="col-md-12 align-self-center order-1">
                                <ul className="breadcrumb breadcrumb-light d-block text-center">
                                    <li><a href="#">Home</a></li>
                                    <li className="active">About us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            {/* service section */}
            <div className="container">

                <div className="row pt-5">
                    <div className="col">

                        <div className="row text-center pb-5">
                            <div className="col-md-10 mx-md-auto">
                                <div className="overflow-hidden mb-3">
                                    <h1 className="word-rotator slide font-weight-bold text-8 mb-0 appeear-animation">
                                        <span>We are Clafiya, We </span>
                                        <span className="word-rotator-words bg-primary">
                                            <b className="is-visible">Provide</b>
                                            <b>Create</b>
                                            <b>Bring</b>
                                        </span>
                                        <span> Primary Health Care Solutions</span>
                                    </h1>
                                </div>
                                <div className="overflow-hidden mb-3">
                                    <p className="lead mb-0 appeear-animation" data-appear-animation="maskUp" data-appear-animation-delay="200">
                                    We at Clafiya believe that access to affordable and quality primary health care should be a basic right for all Africans.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center justify-content-center mt-3 mb-5 mission-vision">
                            <div className="col-md-4 text-center appeear-animation mission" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="800">
                                <h2 className="font-weight-bold text-4 mb-2">Our Mission</h2>
                                <p>Bringing quality primary health care to the doorsteps of those who need it the most</p>
                            </div>
                            <hr className="about-divider"></hr>
                            <div className="col-md-4 text-center appeear-animation vision" data-appear-animation="fadeIn" data-appear-animation-delay="600">
                                <h2 className="font-weight-bold text-4 mb-2">Our Vision</h2>
                                <p>A world where all Africans have access to quality and affordable primary health care regardless of their socioeconomic status.</p>
                            </div>
                            {/* <div className="col-md-4 appeear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay="800">
                                <h3 className="font-weight-bold text-4 mb-2">Why Us</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nulla vel consequat, ante nulla hendrerit arcu.</p>
                            </div> */}
                        </div>

                    </div>
                </div>

                </div>
                    {/* difference */}
                    <section className="section section-primary border-0 mb-0 appeear-animation" data-appear-animation="fadeIn" data-plugin-options="{'accY': -150}">
                        <div className="container">
                            <div className="row counters counters-sm pb-4 pt-3">
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="counter">
                                        <i className="icons icon-user text-color-light"></i>
                                        <strong className="text-color-light font-weight-extra-bold" data-to="256">256</strong>
                                        <label className="text-4 mt-1 text-color-light">Patients</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                                    <div className="counter">
                                        <i className="icons icon-badge text-color-light"></i>
                                        <strong className="text-color-light font-weight-extra-bold" data-to="50" data-append="+">50</strong>
                                        <label className="text-4 mt-1 text-color-light">Health Workers</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3 mb-5 mb-sm-0">
                                    <div className="counter">
                                        <i className="icons icon-graph text-color-light"></i>
                                        <strong className="text-color-light font-weight-extra-bold" data-to="7">7</strong>
                                        <label className="text-4 mt-1 text-color-light">Outreach Events</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="counter">
                                        <i className="icons icon-cup text-color-light"></i>
                                        <strong className="text-color-light font-weight-extra-bold" data-to="405">405</strong>
                                        <label className="text-4 mt-1 text-color-light">Health Interventions</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-height-3 bg-color-grey-scale-1 m-0 border-0">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-6 pb-sm-4 pb-lg-0 pr-lg-5 mb-sm-5 mb-lg-0">
                                    <h2 className="text-color-dark font-weight-normal text-6 mb-2">Our <strong className="font-weight-extra-bold">Story</strong></h2>
                                    <p className="pr-5 mr-5">Building Clafiya continues to be a remarkable & meaningful journey. We strongly believe that access to fast 
                                        and affordable primary care is a basic right for everyone. High medical fees should not be an impediment to one's health or 
                                        future. Success for us is when Clafiya is the platform not only used among all patients seeking primary care, but ubiquitously 
                                        used to create networks aimed at building primary health resiliency at the population level. Our core ethos remains that primary
                                            care programs have to adapt to individual health needs, integrate into current care practices and make optimal use of health 
                                            system resources so as to improve health outcomes & reduce cost.</p>
                                </div>
                                <div className="col-md-6">

                                <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/17Za5jeRkaU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                {/* <video controls >
                                    <source src="videos/about.mp4" type="video/mp4"/>
                                </video> */}
                                    {/* <img src="img/generic/generic-corporate-3-1.jpg" className="img-fluid position-absolute d-none d-sm-block appeear-animation" data-appear-animation="expandIn" data-appear-animation-delay="300" style={{top: "10%", left: "-50%"}} alt="" />
                                    <img src="img/generic/generic-corporate-3-2.jpg" className="img-fluid position-absolute d-none d-sm-block appeear-animation" data-appear-animation="expandIn" style={{top: "-33%", left: "-29%"}} alt="" />
                                    <img src="img/generic/generic-corporate-3-3.jpg" className="img-fluid position-relative appeear-animation mb-2" data-appear-animation="expandIn" data-appear-animation-delay="600" alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container appeear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="300">
                        <div className="row pt-5 pb-4 my-5">
                            <div className="col-md-6 order-2 order-md-1 text-center text-md-left">
                                <div className="owl-carousel owl-theme nav-style-1 nav-center-images-only stage-margin mb-0" data-plugin-options="{'responsive': {'576': {'items': 1}, '768': {'items': 1}, '992': {'items': 2}, '1200': {'items': 2}}, 'margin': 25, 'loop': false, 'nav': true, 'dots': false, 'stagePadding': 40}">
                                    <div>
                                        <img className="team-img img-fluid rounded-0 mb-4" src="img/team/jennie.svg" alt="" />
                                        <h3 className="font-weight-bold text-color-dark text-4 mb-0">Jennie Nwokoye</h3>
                                        <p className="text-2 mb-0">CEO / Co-Founder</p>
                                    </div>
                                    <div>
                                        <img className="team-img img-fluid rounded-0 mb-4" src="img/team/itoro.svg" alt="" />
                                        <h3 className="font-weight-bold text-color-dark text-4 mb-0">Itoro Inoyo</h3>
                                        <p className="text-2 mb-0">Co-Founder</p>
                                    </div>
                                    <div>
                                        <img className="team-img img-fluid rounded-0 mb-4" src="img/team/blessing.svg" alt="" />
                                        <h3 className="font-weight-bold text-color-dark text-4 mb-0">Blessing Onyirimba</h3>
                                        <p className="text-2 mb-0">Health Coordinator</p>
                                    </div>
                                    <div>
                                        <img className="team-img img-fluid rounded-0 mb-4" src="img/team/miracle.svg" alt="" />
                                        <h3 className="font-weight-bold text-color-dark text-4 mb-0">Miracle Agada</h3>
                                        <p className="text-2 mb-0">Product Designer</p>
                                    </div>
                                    <div>
                                        <img className="team-img img-fluid rounded-0 mb-4" src="img/team/ahead.svg" alt="" />
                                        <h3 className="font-weight-bold text-color-dark text-4 mb-0">Bardeson Lucky</h3>
                                        <p className="text-2 mb-0">Tech Lead</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 order-1 order-md-2 text-center text-md-left mb-5 mb-md-0">
                                <h2 className="text-color-dark font-weight-normal text-6 mb-2 pb-1">Meet <strong className="font-weight-extra-bold">Our Team</strong></h2>
                                <p className="lead">Meet the team changing the way Africans access primary health care.</p>
                                <p className="mb-4">Our team has a combined, 10 years of experience in global health, big tech, management consulting and social impact. We’ve all been impacted by the inability to access timely and affordable primary care. Either by losing a family member or close friend. That's what drives us to do what we do today. We are prepared to dedicate our lives to ensure that access to primary health care is a basic right for all Africans</p>
                            </div>
                        </div>
                    </div>
                    {/* <section className="section bg-color-grey-scale-1 section-height-3 border-0 m-0">
                        <div className="container pb-2">
                            <div className="row">
                                <div className="col-lg-6 text-center text-md-left mb-5 mb-lg-0">
                                    <h2 className="text-color-dark font-weight-normal text-6 mb-2">About <strong className="font-weight-extra-bold">Our Clients</strong></h2>
                                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit massa enim. Nullam id varius nunc.</p>
                                    
                                </div>
                                <div className="col-lg-6">
                                    <div className="owl-carousel owl-theme nav-style-1 stage-margin" data-plugin-options="{'responsive': {'576': {'items': 1}, '768': {'items': 1}, '992': {'items': 1}, '1200': {'items': 1}}, 'loop': true, 'nav': false, 'dots': false, 'stagePadding': 40, 'autoplay': true, 'autoplayTimeout': 6000, 'loop': true}">
                                        <div>
                                            <div className="testimonial testimonial-style-2 testimonial-with-quotes testimonial-quotes-dark testimonial-remove-right-quote pl-md-4 mb-0">
                                                <div className="testimonial-author">
                                                    <img src="img/clients/client-1.jpg" className="img-fluid rounded-circle mb-0" alt="" />
                                                </div>
                                                <blockquote>
                                                    <p className="text-color-dark text-4 line-height-5 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus tellus. Curabitur non lorem at odio tempus consectetur vel eu lacus. Morbi.</p>
                                                </blockquote>
                                                <div className="testimonial-author">
                                                    <p><strong className="font-weight-extra-bold text-2">John Smith</strong><span>Okler</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="testimonial testimonial-style-2 testimonial-with-quotes testimonial-quotes-dark testimonial-remove-right-quote pl-md-4 mb-0">
                                                <div className="testimonial-author">
                                                    <img src="img/clients/client-1.jpg" className="img-fluid rounded-circle mb-0" alt="" />
                                                </div>
                                                <blockquote>
                                                    <p className="text-color-dark text-4 line-height-5 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus tellus. Curabitur non lorem at odio tempus consectetur vel eu lacus. Morbi.</p>
                                                </blockquote>
                                                <div className="testimonial-author">
                                                    <p><strong className="font-weight-extra-bold text-2">John Smith</strong><span>Okler</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
            </>
        )
    }
}
// export default function Home() {
//   return (
//     <>
//      <Head>
//         <script src="vendor/jquery/jquery.min.js"></script>		
// 		<script src="vendor/jquery.appear/jquery.appear.min.js"></script>		
// 		<script src="vendor/jquery.easing/jquery.easing.min.js"></script>		
// 		<script src="vendor/jquery.cookie/jquery.cookie.min.js"></script>		
// 		{/* <script src="master/style-switcher/style.switcher.js" id="styleSwitcherScript" data-base-path="" data-skin-src=""></script>		 */}
// 		<script src="vendor/popper/umd/popper.min.js"></script>		
// 		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>		
// 		<script src="vendor/common/common.min.js"></script>		
// 		<script src="vendor/jquery.validation/jquery.validate.min.js"></script>		
// 		<script src="vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>		
// 		<script src="vendor/jquery.gmap/jquery.gmap.min.js"></script>		
// 		<script src="vendor/jquery.lazyload/jquery.lazyload.min.js"></script>		
// 		<script src="vendor/isotope/jquery.isotope.min.js"></script>		
// 		<script src="vendor/owl.carousel/owl.carousel.min.js"></script>		
// 		<script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>		
// 		<script src="vendor/vide/jquery.vide.min.js"></script>		
// 		<script src="vendor/vivus/vivus.min.js"></script>
//         <script src="js/theme.js"></script>
//         <script src="js/theme.init.js"></script>
        

//         </Head>

//     {/* hero section */}
    
//     </>
//   )
// }

Home.layout = PartialLayout;
export default Home;