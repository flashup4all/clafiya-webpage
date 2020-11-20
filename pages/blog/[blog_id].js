import Head from 'next/head'
import PartialLayout from '../../layout/partials-layout'
export default function Home() {
  return (
    <>
    {/* hero section */}
    <section className="page-header page-header-modern bg-color-light-scale-1 page-header-md">
        <div className="container">
            <div className="row">

                <div className="col-md-12 align-self-center p-static order-2 text-center">

                    <h1 className="text-dark font-weight-bold text-8">Nice... Let’s read this together!</h1>
                        <span className="sub-title text-dark">HealthCare Mobile on the Frontlines of COVID-19 in Nigeria.</span>
                </div>
            </div>
        </div>
    </section>
    <div className="container py-4">
        <div className="row">
            <div className="col">
                <div className="blog-posts single-post">
                
                    <article className="post post-large blog-single-post border-0 m-0 p-0">
                        <div className="post-image ml-0">
                            <a>
                                <img src="/img/blog/wide/blog-11.jpg" className="img-fluid img-thumbnail img-thumbnail-no-borders rounded-0" alt="" />
                            </a>
                        </div>
                
                        {/* <div className="post-date ml-0">
                            <span className="day">10</span>
                            <span className="month">JUL</span>
                        </div> */}
                
                        <div className="post-content ml-0">
                
                            <h2 className="font-weight-bold"><a href="blog-post.html">HealthCare Mobile on the Frontlines of COVID-19 in Nigeria.</a></h2>
                
                            <div className="post-meta">
                                <span><i className="far fa-user"></i> By <a href="#">Clafiya Blog</a> </span>
                                {/* <span><i className="far fa-folder"></i> <a href="#">Lifestyle</a>, <a href="#">Design</a> </span> */}
                            </div>

                            <p>Last year a new strain of coronavirus disease also known as COVID-19 was identified in China. Since then, the World Health Organization (WHO) has declared this as a global pandemic that has reached 185 countries and has claimed 126,722 lives to date. Although the African continent has recorded a relatively low number of positive cases and deaths due to COVID-19, there is a high possibility for this number to increase due to poor healthcare infrastructure and expected improvements in wide-scale testing across the country. Vulnerable populations in low-income, remote and peri-urban regions may be the most impacted by the spread of the disease in Africa. These low-income individuals experience decreased access to reliable primary healthcare. There is a need to create sustainable technology solutions to address the gaps that exist in access to affordable healthcare.

In Nigeria, a healthcare company run by a social entrepreneur and her cadre of Community Health Workers are targeting this solution head-on. HealthCare Mobile is connecting low-income patients directly to qualified community health workers in remote, rural regions of Nigeria, providing quality primary healthcare services at the patient’s doorstep. There are 70,000 community health workers in Nigeria, most are women (95%), but only 25% are employed. In line with their mission, “Increasing access to primary care services for low-income, remote/peri-urban populations in Africa” HealthCare Mobile is using low fidelity tech solutions to promote an inclusive experience for access to primary care services in Nigeria via their USSD platform.

In response to the COVID-19 pandemic, HealthCare Mobile is mobilizing its health workers in Enugu State to engage the community by hosting a series of free COVID-19 educational seminars at various health centers. The purpose of these seminars is to disseminate information on how to prepare and protect yourself during the ongoing pandemic and spread awareness around the HealthCare Mobile platform. As of April 2020, HealthCare Mobile has hosted four seminars and registered 256 new users on the platform. Through this initiative, they have developed key features on the platform that allow registered users to:

1) Receive daily updates on COVID-19 via SMS messaging
2) Anonymously report suspected symptoms of COVID-19 to health official for assistance
3) Receive information on test and isolation centers in the area

Registered users can dial *347*58# on any cellular device to screen for (COVID 19) or connect to registered health workers based on LGA and State.

To support HealthCare Mobile’s Response to COVID-19 in Nigeria, please send donations here.</p>
                            {/* <div className="post-block mt-5 post-share">
                                <input type="submit" value="Share Post" className="btn btn-primary btn-modern" data-loading-text="Loading..." />
                            </div> */}
                
                        </div>
                    </article>
                
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

Home.layout = PartialLayout;