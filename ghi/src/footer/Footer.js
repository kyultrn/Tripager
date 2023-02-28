// import React from "react";
// import {
//     MDBFooter,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBIcon,
// } from "mdb-react-ui-kit";

// export default Footer

// function Footer () {
//     return (
//         <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
//             <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
//             <div className="me-5 d-none d-lg-block">
//                 <span>Get connected with us on social networks:</span>
//             </div>

//             <div>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="facebook-f" />
//                 </a>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="twitter" />
//                 </a>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="google" />
//                 </a>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="instagram" />
//                 </a>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="linkedin" />
//                 </a>
//                 <a href="" className="me-4 text-reset">
//                 <MDBIcon fab icon="github" />
//                 </a>
//             </div>
//             </section>

//             <section className="">
//             <MDBContainer className="text-center text-md-start mt-5">
//                 <MDBRow className="mt-3">
//                 <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
//                     <h6 className="text-uppercase fw-bold mb-4">
//                     <MDBIcon icon="gem" className="me-3" />
//                     Company name
//                     </h6>
//                     <p>
//                     Here you can use rows and columns to organize your footer
//                     content. Lorem ipsum dolor sit amet, consectetur adipisicing
//                     elit.
//                     </p>
//                 </MDBCol>

//                 <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
//                     <h6 className="text-uppercase fw-bold mb-4">Products</h6>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Angular
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         React
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Vue
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Laravel
//                     </a>
//                     </p>
//                 </MDBCol>

//                 <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
//                     <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Pricing
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Settings
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Orders
//                     </a>
//                     </p>
//                     <p>
//                     <a href="#!" className="text-reset">
//                         Help
//                     </a>
//                     </p>
//                 </MDBCol>

//                 <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
//                     <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//                     <p>
//                     <MDBIcon icon="home" className="me-2" />
//                     New York, NY 10012, US
//                     </p>
//                     <p>
//                     <MDBIcon icon="envelope" className="me-3" />
//                     info@example.com
//                     </p>
//                     <p>
//                     <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
//                     </p>
//                     <p>
//                     <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
//                     </p>
//                 </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//             </section>

//             <div
//             className="text-center p-4"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
//             >
//             © 2021 Copyright:
//             <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
//                 MDBootstrap.com
//             </a>
//             </div>
//         </MDBFooter>
//     );
// }
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
    <footer className="bg-primary text-white">
        <div className="container py-3">
        <div className="row">
            <div className="col-md-4 mb-3">
            <h5>About Tripager</h5>
            <p>
                about our project
            </p>
            <Link to="/about-tripager" className="text-white">
                Learn more &raquo;
            </Link>
            </div>
            <div className="col-md-4 mb-3">
            <h5>About Developers</h5>
            <p>
                about our team
            </p>
            <Link to="/about-developers" className="text-white">
                Meet the team &raquo;
            </Link>
            </div>
            <div className="col-md-4 mb-3">
            <h5>Technologies</h5>
            <p>
                fast-api, redux, etc
            </p>
            <Link to="/technologies" className="text-white">
                View our tech stack &raquo;
            </Link>
            </div>
        </div>
        </div>
    </footer>
    );
}
