"use client";
import FeedbackForm from "../../components/Feedback/Feedback";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaWhatsapp,
} from "react-icons/fa";
const AboutUs = () => {
  const links = [
    { name: "facebook", iconname: FaFacebookSquare },
    { name: "instagram", iconname: FaInstagramSquare },
    { name: "twitter", iconname: FaTwitterSquare },
    { name: "linked in", iconname: FaLinkedin },
    { name: "whatsapp", iconname: FaWhatsapp },
  ];
  // const [feedback,SetFeedback] = useState(0)
  const handleSubmit = ()=>{
    console.log('Feeback submitted')
  }
  const handleChange = ()=>{
    console.log('Feeback submitted')
  }
  

  return (
    <>
      <section className="w-full min-h-screen bg-black px-3 py-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl font-black text-white flex flex-col items-center">
          About Us
          <span className="font-light text-slate-100 text-xs md:text-sm text-center m-3">
            This page will tell you about us and this project.
          </span>
        </h1>
        <img
          src={"/about-top.jpg"}
          alt="about mast image"
          width={250}
          height={250}
          className="w-60 h-auto m-3 md:w-full max-w-lg"
          draggable="false"
        />
        <div className="flex flex-row items-end justify-evenly m-2">
          {links.map((link, index) => {
            return (
              <div key={index}>
                <link.iconname className="text-white cursor-pointer hover:text-blue-300 mx-2 font-black text-xl md:text-3xl" />
              </div>
            );
          })}
        </div>
        <br></br>
        <div class="bg-green-100 py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-tight text-green-900 mb-6">About Us</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">At <span class="font-semibold text-blue-600">HelpReqHub</span>, we are passionate about making a positive impact on the world. Our mission is to connect communities and organizations, ensuring that no one goes hungry.</p>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">Through our innovative platform, individuals can easily request food assistance, and we take pride in sourcing fresh, quality food from local suppliers. Every item is meticulously sanitized to guarantee safety and quality.</p>
        <p class="text-lg text-gray-700 leading-relaxed mb-8">We collaborate with NGOs dedicated to eradicating hunger, ensuring that surplus food reaches those in need efficiently and effectively. Together, we strive to create a world where access to nutritious food is a basic human right.</p>
        <p class="text-lg text-gray-700 leading-relaxed">Join us in our journey towards a hunger-free future. Together, we can make a difference, one meal at a time.</p>
    </div>
</div>
        <FeedbackForm/>
        
      </section>
    </>
  );
};

export default AboutUs;
