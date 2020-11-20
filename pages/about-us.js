import Head from 'next/head'
import PartialLayout from '../layout/partials-layout'
export default function Home() {
  return (
    <>
    {/* hero section */}
    <section className="about-header page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-7">
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12 align-self-center p-static order-2 text-center">
                    <h1 className="text-9 font-weight-bold">Know More About Clafiya</h1>
                    <span className="sub-title">Primary Health Care Service For All</span>
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
                <div className="col-md-9 mx-md-auto">
                    <div className="overflow-hidden mb-3">
                        <h1 className="word-rotator slide font-weight-bold text-8 mb-0 appeear-animation" data-appear-animation="maskUp">
                            <span>We are Clafiya, We </span>
                            <span className="word-rotator-words bg-primary">
                                <b className="is-visible">Provide</b>
                                <b>Create</b>
                                <b>Bring</b>
                            </span>
                            <span> HealthCare Solutions</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-3">
                        <p className="lead mb-0 appeear-animation" data-appear-animation="maskUp" data-appear-animation-delay="200">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nulla vel pellentesque consequat, ante nulla hendrerit arcu, ac tincidunt mauris lacus sed leo.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mt-3 mb-5">
                <div className="col-md-4 appeear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="800">
                    <h3 className="font-weight-bold text-4 mb-2">Our Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nulla vel pellentesque consequat, ante nulla hendrerit arcu.</p>
                </div>
                <div className="col-md-4 appeear-animation" data-appear-animation="fadeIn" data-appear-animation-delay="600">
                    <h3 className="font-weight-bold text-4 mb-2">Our Vision</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nulla vel pellentesque consequat, ante nulla hendrerit arcu.</p>
                </div>
                <div className="col-md-4 appeear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay="800">
                    <h3 className="font-weight-bold text-4 mb-2">Why Us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nulla vel consequat, ante nulla hendrerit arcu.</p>
                </div>
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
                            <strong className="text-color-light font-weight-extra-bold" data-to="256" data-append="+">0</strong>
                            <label className="text-4 mt-1 text-color-light">Patients</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                        <div className="counter">
                            <i className="icons icon-badge text-color-light"></i>
                            <strong className="text-color-light font-weight-extra-bold" data-to="50">0</strong>
                            <label className="text-4 mt-1 text-color-light">Health Workers</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb-5 mb-sm-0">
                        <div className="counter">
                            <i className="icons icon-graph text-color-light"></i>
                            <strong className="text-color-light font-weight-extra-bold" data-to="14">0</strong>
                            <label className="text-4 mt-1 text-color-light">Outreach Events</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="counter">
                            <i className="icons icon-cup text-color-light"></i>
                            <strong className="text-color-light font-weight-extra-bold" data-to="352">0</strong>
                            <label className="text-4 mt-1 text-color-light">Cups of Coffee</label>
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
                    <div className="col-sm-8 col-md-6 col-lg-4 offset-sm-4 offset-md-4 offset-lg-2 mt-sm-5" style={{top: "1.7rem"}}>
                        <img src="img/generic/generic-corporate-3-1.jpg" className="img-fluid position-absolute d-none d-sm-block appeear-animation" data-appear-animation="expandIn" data-appear-animation-delay="300" style={{top: "10%", left: "-50%"}} alt="" />
                        <img src="img/generic/generic-corporate-3-2.jpg" className="img-fluid position-absolute d-none d-sm-block appeear-animation" data-appear-animation="expandIn" style={{top: "-33%", left: "-29%"}} alt="" />
                        <img src="img/generic/generic-corporate-3-3.jpg" className="img-fluid position-relative appeear-animation mb-2" data-appear-animation="expandIn" data-appear-animation-delay="600" alt="" />
                    </div>
                </div>
            </div>
        </section>
        <div className="container appeear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="300">
            <div className="row pt-5 pb-4 my-5">
                <div className="col-md-6 order-2 order-md-1 text-center text-md-left">
                    <div className="owl-carousel owl-theme nav-style-1 nav-center-images-only stage-margin mb-0" data-plugin-options="{'responsive': {'576': {'items': 1}, '768': {'items': 1}, '992': {'items': 2}, '1200': {'items': 2}}, 'margin': 25, 'loop': false, 'nav': true, 'dots': false, 'stagePadding': 40}">
                        <div>
                            <img className="img-fluid rounded-0 mb-4" src="img/team/team-1.jpg" alt="" />
                            <h3 className="font-weight-bold text-color-dark text-4 mb-0">Wisdom Doe</h3>
                            <p className="text-2 mb-0">CTO</p>
                        </div>
                        <div>
                            <img className="img-fluid rounded-0 mb-4" src="img/team/team-2.jpg" alt="" />
                            <h3 className="font-weight-bold text-color-dark text-4 mb-0">Jennie Doe</h3>
                            <p className="text-2 mb-0">CEO</p>
                        </div>
                        <div>
                            <img className="img-fluid rounded-0 mb-4" src="img/team/team-3.jpg" alt="" />
                            <h3 className="font-weight-bold text-color-dark text-4 mb-0">Chris Doe</h3>
                            <p className="text-2 mb-0">Health Worker</p>
                        </div>
                        <div>
                            <img className="img-fluid rounded-0 mb-4" src="img/team/team-4.jpg" alt="" />
                            <h3 className="font-weight-bold text-color-dark text-4 mb-0">Blessing Doe</h3>
                            <p className="text-2 mb-0">Health Worker</p>
                        </div>
                        <div>
                            <img className="img-fluid rounded-0 mb-4" src="img/team/team-5.jpg" alt="" />
                            <h3 className="font-weight-bold text-color-dark text-4 mb-0">Robert Doe</h3>
                            <p className="text-2 mb-0">Health Worker</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 order-1 order-md-2 text-center text-md-left mb-5 mb-md-0">
                    <h2 className="text-color-dark font-weight-normal text-6 mb-2 pb-1">Meet <strong className="font-weight-extra-bold">Our Team</strong></h2>
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit massa enim. Nullam id varius nunc.</p>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc. Vivamus bibendum magna ex, et faucibus lacus venenatis eget.</p>
                </div>
            </div>
        </div>
        <section className="section bg-color-grey-scale-1 section-height-3 border-0 m-0">
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
        </section>
    </>
  )
}

Home.layout = PartialLayout;