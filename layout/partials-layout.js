import Head from 'next/head'
import Link from 'next/link'

function PartialLayout({ children }) {
  return (
    <>
        <Head>
            <title>Clafiya</title>
            <link rel="icon" href="/favicon.ico" />
		    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800%7CShadows+Into+Light" rel="stylesheet" type="text/css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />

            <script src="vendor/jquery/jquery.min.js"></script>		
            <script src="vendor/jquery.appear/jquery.appear.min.js"></script>		
            <script src="vendor/jquery.easing/jquery.easing.min.js"></script>			
            <script src="vendor/bootstrap/js/bootstrap.min.js"></script>       
            <script src="vendor/owl.carousel/owl.carousel.min.js"></script>	
        </Head>
        {/* Header */}
        <div className="body">
            <nav className="navbar navbar-expand-lg navbar-light bg-light my-nav sticky-top">
                <div className="container">
                    <a href="demo-it-services.html" className="navbar-brand pl-0">
                        <img alt="Clafiya's logo" src="img/logo.png" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav nav-pills navbar-nav ml-auto" id="mainNav">
                            <li className="nav-item font-weight-semibold">
                                <Link href="/">
                                    <a className="nav-link" href="Index.html">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item font-weight-semibold">
                                <Link href="/about-us">
                                    <a className="nav-link">
                                        About Us
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item font-weight-semibold">
                                <a className="nav-link" href="#">
                                    Impacts
                                </a>
                            </li>
                            <li className="nav-item font-weight-semibold">
                                <Link href="/blog">
                                    <a className="nav-link">
                                    Our Blog
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item font-weight-semibold">
                                <a className="nav-link" href="#">
                                    Contact Us
                                </a>
                            </li>
                            {/* <li className="nav-item font-weight-semibold ml-2">
                                <a className="nav-link text-white button btn" href="https://localhealer.typeform.com/to/AWUPye" target="_blank">
                                    Apply now
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* routing goes here */}
            <div role="main" className="main">
                {children}
            </div>
            {/* footer */}
            <footer id="footer">				
            <div className="container">					
                <div className="footer-ribbon">						
                    <span>Get in Touch</span>					
                </div>					
                <div className="row py-5 my-4">						
                    <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">							
                        <h5 className="text-3 mb-3">NEWSLETTER</h5>							
                        <p className="pr-1">Keep up on our always evolving product features and technology. Enter your e-mail address and subscribe to our newsletter.</p>							
                        <div className="alert alert-success d-none" id="newsletterSuccess">								<strong>Success!</strong> You've been added to our email list.							
                        </div>							
                        <div className="alert alert-danger d-none" id="newsletterError">
    
                        </div>							
                        <form id="newsletterForm" action="https://preview.oklerthemes.com/porto/8.0.0/php/newsletter-subscribe.php" method="POST" className="mr-4 mb-3 mb-md-0">								
                            <div className="input-group input-group-rounded">									
                                <input className="form-control form-control-sm bg-light" placeholder="Email Address" name="newsletterEmail" id="newsletterEmail" type="text" />									
                                <span className="input-group-append">										
                                    <button className="btn btn-light text-color-dark" type="submit"><strong>GO!</strong>
                                    </button>									
                                </span>								
                            </div>							
                        </form>						
                    </div>						
                                            
                    <div className="col-md-6 col-lg-3 mb-4 mb-md-0">							
                        <div className="contact-details">								
                            <h5 className="text-3 mb-3">CONTACT US</h5>								
                            <ul className="list list-icons list-icons-lg">									
                                <li className="mb-1"><i className="far fa-dot-circle text-color-primary"></i><p className="m-0">234 Street Name, City Name</p></li>									
                                <li className="mb-1"><i className="fab fa-whatsapp text-color-primary"></i><p className="m-0"><a href="tel:8001234567">(800) 123-4567</a></p></li>									
                                <li className="mb-1"><i className="far fa-envelope text-color-primary"></i><p className="m-0"><a href="mailto:mail@example.com">mail@example.com</a></p></li>								
                            </ul>							
                            </div>						
                        </div>	
                        
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">							
                        <h5 className="text-3 mb-3">Pages</h5>							
                        <ul className="list list-unstyled">
                            <li className="mb-1"><a href="#" className="link-hover-style-1"> Home</a></li>
                            <li className="mb-1"><a href="#" className="link-hover-style-1"> About Us</a></li>
                            <li className="mb-1"><a href="#" className="link-hover-style-1"> Impacts</a></li>
                            <li className="mb-1"><a href="#" className="link-hover-style-1"> Our Blog</a></li>
                            <li className="mb-1"><a href="#" className="link-hover-style-1"> Contact Us</a></li>
                        </ul>						
                    </div>
    
                    <div className="col-md-6 col-lg-2">							
                            <h5 className="text-3 mb-3">FOLLOW US</h5>							
                            <ul className="social-icons">								
                                <li className="social-icons-facebook"><a href="https://www.facebook.com/ClafiyaAfrica" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>								
                                <li className="social-icons-twitter"><a href="https://twitter.com/Clafiya1" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>								
                                <li className="social-icons-instagram"><a href="https://www.instagram.com/clafiya/" target="_blank" title="instagram"><i className="fab fa-instagram"></i></a></li>							
                                <li className="social-icons-instagram"><a href="https://www.linkedin.com/company/clafiya" target="_blank" title="LinkedIn"><i className="fab fa-linkedin"></i></a></li>							
                            </ul>						
                    </div>	
                                        
                    </div>				
                </div>				
        </footer>

        </div>
        
    </>
  )
}

export default PartialLayout;