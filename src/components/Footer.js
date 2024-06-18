import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Footer.css'; // Certifique-se de que o arquivo de estilos está sendo importado corretamente

const Footer = () => {
    return (
        (<footer>
            <section className="footer-top">
                <div className="container-fluid justify-content-between align-items-center bg-color">
                    <div className="row bg-black">
                        {/* Redes Sociais */}
                        <div className="col-md-6">
                            <h2 className="sc-media-title">Redes Sociais</h2>
                            <div className="footer-media-container">
                                <div className="row footer-media">
                                    <a className="d-flex col-auto custom-margin"
                                        rel="noreferrer"
                                        aria-label="instagram"
                                        target="_blank"
                                        href="https://www.instagram.com/chalocloset/">
                                        <FaInstagram/>
                                    </a>
                                    <a className="d-flex col-auto"
                                        rel="noreferrer"
                                        aria-label="tiktok"
                                        target="_blank"
                                        href="https://www.tiktok.com/@chalocloset?lang=pt-BR">
                                        <FaTiktok/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Newsletter */}
                        <div className="col-md-6">
                            <div className="footer-newsletter">
                                <div className="row mb-4">
                                    <div className="col">
                                        <h2 className="sc-media-title">Receba novidades e promoções</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <form className="form-inline" action="URL_DO_SEU_SCRIPT_DE_PROCESSAMENTO" method="POST">
                                            <input type="text" id="nome" name="nome" className="form-control mr-2 mb-2 mb-md-0" placeholder="Nome" required />
                                            <input type="email" id="email" name="email" className="form-control mr-2 mb-2 mb-md-0" placeholder="E-mail" required />
                                            <button type="submit" className="btn input-btn">OK</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="line-div"></div>
            <section>
                <div className="footer-nav container-fluid bg-black">
                    <div className="row justify-content-between align-items-start">
                        <div className="foot col-md-4 text-center">
                            <div className="footer-navigation">
                                <div className="help">
                                    <h2 className="title">Como podemos te ajudar?</h2>
                                    <ul className="list-unstyled">
                                        <li><a href="#">Rastrear pedido</a></li>
                                        <li><a href="#">Chamar no WhatsApp</a></li>
                                        <li><a href="#">Troca de devoluções</a></li>
                                        <li><a href="#">Conheça nosso Instagram</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="foot col-md-4 text-center">
                            <div className="institutional">
                                <h2 className="title">Institucional</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#">Contato</a></li>
                                    <li><a href="#">Sobre nós</a></li>
                                    <li><a href="#">Política de privacidade</a></li>
                                    <li><a href="#">Entrega e Frete</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="foot col-md-4 text-center">
                            <div className="footer-contact">
                                <h2 className="title">Central de atendimento</h2>
                                <ul className="list-unstyled contact-info">
                                    <li><a href="#"><i className="fab fa-whatsapp"></i> WhatsApp</a></li>
                                    <li><a href="mailto:chalostore2602@gmail.com"><i className="far fa-envelope"></i> chalostore2602@gmail.com</a></li>
                                    <li><span className="text">Seg a sex das 9h-12h / 14h-18h</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="end-footer">
                </div>
            </section>
        </footer>)
    );
}

export default Footer;
