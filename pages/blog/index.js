import Head from 'next/head'
import PartialLayout from '../../layout/partials-layout'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    {/* hero section */}
    <section className="page-header page-header-modern bg-color-light-scale-1 page-header-md">
        <div className="container">
            <div className="row">

                <div className="col-md-12 align-self-center p-static order-2 text-center">

                    <h1 className="text-dark font-weight-bold text-8">Learn More About Clafiya's Impact</h1>
                    <span className="sub-title text-dark">Read more about our work, impact, and how Clafiya is improving the lives of Africans across the Continent</span>
                </div>
            </div>
        </div>
    </section>
    <div className="container py-4">

    <div className="row">
        <div className="col">
            <div className="blog-posts">
            
                <section className="timeline">
                    <div className="timeline-body">

                        <div className="timeline-date">
                            <h3 className="text-primary font-weight-bold">April 2021</h3>
                        </div>

                        <article className="timeline-box right post post-small">
                            <div className="timeline-box-arrow"></div>
                            <div className="p-2">
                                <div className="row mb-2">

                                    <div className="col">
                                        <div className="post-image">
                                        <Link href="https://techcabal.com/2021/04/27/jennie-and-itoro-nigerian-mobile-healthcare-service-founders/">
                                            <a>
                                                <img src="https://x7d4c5z5.stackpathcdn.com/wp-content/uploads/tc/2021/04/IMG_3272-1536x1152.jpg" className="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt="" />
                                            </a>
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">

                                        <div className="post-content">
                                            <h2 className="font-weight-semibold text-5 line-height-4 mt-2 mb-2">
                                                <Link href="https://techcabal.com/2021/04/27/jennie-and-itoro-nigerian-mobile-healthcare-service-founders/">
                                                    <a>
                                                        Jennie Nwokoye and Itoro Inoyo are bringing hospital-to-home services to rural communities in Nigeria
                                                    </a>
                                                </Link>
                                            </h2>
                                            {/* <p>Last year a new strain of coronavirus disease also known as COVID-19 was identified in China. Since then, the World Health Organization (WHO) has declared this as a global pandemic that has reached 185 countries and has claimed 126,722 lives to date. Although ... </p> */}
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="post-meta">
                                            <span><i className="far fa-calendar-alt"></i> April 27, 2021 </span>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="post-meta">
                                            <span><i className="far fa-user"></i> By <a href="#">Tech Cabal</a> </span>
                                            {/* <span><i className="far fa-folder"></i> <a href="#">Lifestyle</a>, <a href="#">Design</a> </span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <Link href="/blog/healthcare-mobile-and-covid-news-story"><a className="btn btn-xs btn-light text-1 text-uppercase">Read More</a></Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="timeline-date">
                            <h3 className="text-primary font-weight-bold">July 2020</h3>
                        </div>
            
                        <article className="timeline-box left post post-medium">
                            <div className="timeline-box-arrow"></div>
                            <div className="p-2">
                                <div className="row mb-2">
            
                                    <div className="col">
                                        <div className="post-image">
                                        <Link href="/blog/healthcare-mobile-and-covid-news-story">
                                            <a>
                                                <img src="img/blog/blog1.jpeg" className="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt="" />
                                            </a>
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
            
                                        <div className="post-content">
                                            <h2 className="font-weight-semibold text-5 line-height-4 mt-2 mb-2">
                                                <Link href="/blog/healthcare-mobile-and-covid-news-story">
                                                    <a>HealthCare Mobile on the Frontlines of COVID-19 in Nigeria.</a>
                                                </Link>
                                            </h2>
                                            <p>Last year a new strain of coronavirus disease also known as COVID-19 was identified in China. Since then, the World Health Organization (WHO) has declared this as a global pandemic that has reached 185 countries and has claimed 126,722 lives to date. Although ... </p>
                                        </div>
            
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="post-meta">
                                            <span><i className="far fa-calendar-alt"></i> January 10, 2020 </span>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="post-meta">
                                            <span><i className="far fa-user"></i> By <a href="#">Clafiya Blog</a> </span>
                                            {/* <span><i className="far fa-folder"></i> <a href="#">Lifestyle</a>, <a href="#">Design</a> </span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <Link href="/blog/healthcare-mobile-and-covid-news-story"><a className="btn btn-xs btn-light text-1 text-uppercase">Read More</a></Link>
                                    </div>
                                </div>
                            </div>
                        </article>
            
                        
        
            
                        {/* <div className="timeline-date">
                            <h3 className="text-primary font-weight-bold"><a href="#">Load More...</a></h3>
                        </div> */}
            
                    </div>
            
                </section>
            
            </div>
        </div>

    </div>

    </div>
    </>
  )
}

Home.layout = PartialLayout;