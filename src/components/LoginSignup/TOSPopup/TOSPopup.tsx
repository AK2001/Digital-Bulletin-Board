import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type popupProps = {
    show: boolean,
    onHide: () => void;
}

// This component is used to display the applications' Terms of Service in a modal form
// This component is called by the Signup.tsx component.
export default function TOSPopup(props: popupProps){
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Terms of Service
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Welcome to Digital Bulletin Board!</h5>
                <p>
                    These terms and conditions outline the rules and regulations for the use of Industrial Studies's Website, located at digitalbulletinboard.gr.<br/><br/>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Digital Bulletin Board if you do not agree to take all of the terms and conditions stated on this page.<br/><br/>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.<br/>
                </p>

                <h5>Cookies</h5>

                <p>
                    We employ the use of cookies. By accessing Digital Bulletin Board, you agreed to use cookies in agreement with the Industrial Studies's Privacy Policy.<br/><br/>

                    Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.<br/>
                </p>

                <h5>License</h5>

                <p>
                    Unless otherwise stated, Industrial Studies and/or its licensors own the intellectual property rights for all material on Digital Bulletin Board. All intellectual property rights are reserved. You may access this from Digital Bulletin Board for your own personal use subjected to restrictions set in these terms and conditions.<br/><br/>

                    You must not:<br/>
                </p>

                <ul>
                    <li>Republish material from Digital Bulletin Board</li>
                    <li>Sell, rent or sub-license material from Digital Bulletin Board</li>
                    <li>Reproduce, duplicate or copy material from Digital Bulletin Board</li>
                    <li>Redistribute content from Digital Bulletin Board</li>
                    <li>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator.</li>
                </ul>

                <p>
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Industrial Studies does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Industrial Studies,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Industrial Studies shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.<br/><br/>

                    Industrial Studies reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.<br/><br/>

                    You warrant and represent that:<br/>
                </p>

                <ul>
                    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                </ul>

                <p>
                    You hereby grant Industrial Studies a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.<br/>
                </p>

                <h5>Hyperlinking to our Content</h5>

                <p>The following organizations may link to our Website without prior written approval:<br/></p>

                <ul>
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                </ul>

                <p>
                    These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.<br/><br/>

                    We may consider and approve other link requests from the following types of organizations:<br/>
                </p>

                <ul>
                    <li>commonly-known consumer and/or business information sources;</li>
                    <li>dot.com community sites;</li>
                    <li>associations or other groups representing charities;</li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                </ul>

                <p>
                    We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Industrial Studies; and (d) the link is in the context of general resource information.<br/><br/>

                    These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.<br/><br/>

                    If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Industrial Studies. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.<br/><br/>

                    Approved organizations may hyperlink to our Website as follows:<br/>
                </p>

                <ul>
                    <li>By use of our corporate name; or</li>
                    <li>By use of the uniform resource locator being linked to; or</li>
                    <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                </ul>

                <p>
                    No use of Industrial Studies's logo or other artwork will be allowed for linking absent a trademark license agreement.<br/>
                </p>

                <h5>iFrames</h5>

                <p>
                    Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.<br/>
                </p>

                <h5>Your Privacy</h5>

                <p>
                    Please read Privacy Policy<br/>
                </p>

                <h5>Preservation of Rights</h5>

                <p>
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.<br/>
                </p>

                <h5>Removal of links from our website</h5>

                <p>
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br/><br/>

                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.<br/>
                </p>

                <h5>Disclaimer</h5>

                <p>
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:<br/>
                </p>

                <ul>
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>

                <p>
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br/><br/>

                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.<br/>
                </p>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    );

}