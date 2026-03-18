import React from 'react';
import { Nav } from 'react-bootstrap';

const GuestFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {`
        .footer-section {
            background-color: #2c3e50;
            color: #fff;
            position: relative;
            overflow: hidden;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }
        .footer-logo {
            font-size: 28px;
            font-weight: bold;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-decoration: none;
            position: relative;
            animation: slideInFromLeft 1.5s ease-in-out;
        }
        .footer-logo:hover {
            color: #ff5c8d;
            text-decoration: underline;
        }
        .footer-links {
            list-style: none;
            padding: 0;
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 30px;
        }
        .footer-links li a {
            color: #fff;
            font-size: 16px;
            text-decoration: none;
            transition: color 0.3s ease-in-out;
        }
        .footer-links li a:hover {
            color: #ff5c8d;
        }
        .copyright-text {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
        }
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .social-icon {
            color: #fff;
            font-size: 20px;
            transition: color 0.3s ease-in-out;
        }
        .social-icon:hover {
            color: #ff5c8d;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideInFromLeft {
            from {
                transform: translateX(-100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @media (max-width: 768px) {
            .footer-links {
                flex-direction: column;
                gap: 15px;
            }
        }
        `}
      </style>
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-text">
                <div className="ft-logo">
                    Student Management System
                </div>
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {currentYear} All rights reserved | Made with <i className="fa fa-heart" aria-hidden="true"></i> by
                    <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Colorlib">Student Management</a>
                  </p>
                </div>
                <div className="social-icons">
                  <Nav className="justify-content-center">
                    <Nav.Link href="https://facebook.com" className="social-icon" aria-label="Visit our Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </Nav.Link>
                    <Nav.Link href="https://twitter.com" className="social-icon" aria-label="Visit our Twitter" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-twitter"></i>
                    </Nav.Link>
                    <Nav.Link href="https://linkedin.com" className="social-icon" aria-label="Visit our LinkedIn" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </Nav.Link>
                    <Nav.Link href="https://instagram.com" className="social-icon" aria-label="Visit our Instagram" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram"></i>
                    </Nav.Link>
                    <Nav.Link href="https://youtube.com" className="social-icon" aria-label="Visit our YouTube" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube-play"></i>
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GuestFooter;